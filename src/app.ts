//Drag and Drop Interfaces
interface Draggable {
  dragStartHandler(event: DragEvent): void;
  dragEndHandler(event: DragEvent): void;
}

interface DragTarget {
  //signal the browser that thing you're dragging over is a valid drag target
  dragOverHandler(event: DragEvent): void;
  //react to the drop that happens, handles the drop, updates the data
  dropHandler(event: DragEvent): void;
  //visual feedback for the user
  dragLeaveHandler(event: DragEvent): void;
}

//project type
enum ProjectStatus {
  active,
  finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

//project state management
//custom type - encode a function type with no implementation
type Listener = (items: Project[]) => void;

class ProjectState {
  private projects: Project[] = [];
  private listeners: Listener[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    // checks if instance exists
    if (this.instance) return this.instance;
    // if not, returns a new instance
    return (this.instance = new ProjectState());
  }

  addListener(listenerFn: Listener) {
    this.listeners.push(listenerFn);
  }

  addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.active
    );
    this.projects.push(newProject);
    this.updateListeners();
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    //find method runs in every element of the array
    const project = this.projects.find((prj) => prj.id === projectId);
    if (project && project.status !== newStatus) project.status = newStatus;
    this.updateListeners();
  }

  private updateListeners() {
    // loop through all listener functions with a for loop
    for (const listenerFn of this.listeners) {
      //slice returns a copy of the array, not the original one. Javascript is pass by reference so if you pass the array itself you'd be changing the original values
      listenerFn(this.projects.slice());
    }
  }
}
// instantiates project state so you can use this anywhere in the file - global constant
const projectState = ProjectState.getInstance();

//input validation interface - creates the structure of the object that will
//be passed into the validate function
interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

//validation function
function Validate(validateInput: Validatable) {
  //we set this to false as soon as any var fails the test
  let isValid = true;
  //if the required var is set and true (not undefined) then value must not be empty
  if (validateInput.required)
    //checks if value is empty after trimming the string
    isValid = isValid && validateInput.value.toString().trim().length !== 0;
  //if minLength is set then it should have a min length. only checks strings, doesnt make sense
  //to check length if a number
  if (
    validateInput.minLength != null &&
    typeof validateInput.value === "string"
  )
    isValid = isValid && validateInput.value.length > validateInput.minLength;
  //if maxLength is set, then it should have a max length.
  if (
    validateInput.maxLength != null &&
    typeof validateInput.value === "string"
  )
    isValid = isValid && validateInput.value.length < validateInput.maxLength;
  //the following checks if the input is bigger than the min value
  if (validateInput.min != null && typeof validateInput.value === "number")
    isValid = isValid && validateInput.value > validateInput.min;
  //the following checks if the input is smaller than the max value
  if (validateInput.max != null && typeof validateInput.value === "number")
    isValid = isValid && validateInput.value < validateInput.max;
  return isValid;
}

//autobind decorator, this will enable the methods to automatically bind to using 'this' instead of
//having to do .bind(this) every time
function autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFunction = originalMethod.bind(this);
      return boundFunction;
    },
  };
  return adjDescriptor;
}

//Component Base Class, using generics to ensure flexibility of the variables
abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: T;
  element: U;

  constructor(
    templateId: string,
    hostElementId: string,
    insertAtStart: boolean,
    newElementId?: string
  ) {
    this.templateElement = <
      HTMLTemplateElement //selecting elements
    >document.getElementById(templateId)!;
    this.hostElement = <T>document.getElementById(hostElementId)!; //get the piece of code in which the template should be displayed in
    const importedNode = document.importNode(
      //imports a node and set the ID
      this.templateElement.content,
      true
    );
    this.element = <U>importedNode.firstElementChild; //imports the element
    if (newElementId) {
      this.element.id = newElementId;
    }
    this.attach(insertAtStart);
  }
  private attach(insertWhere: boolean) {
    this.hostElement.insertAdjacentElement(
      insertWhere ? "afterbegin" : "beforeend",
      this.element
    );
  }
  abstract configure(): void;
  abstract renderContent(): void;
}

//ProjectItem class is responsible for rendering one project item on the screen
class ProjectItem extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable {
  private project: Project;

  //getter
  get persons() {
    const people =
      this.project.people === 1 ? "1 Person" : `${this.project.people} People`;
    return people;
  }

  constructor(hostId: string, project: Project) {
    super("single-project", hostId, false, project.id);
    this.project = project;
    this.configure();
    this.renderContent();
  }
  @autobind
  dragStartHandler(event: DragEvent) {
    event.dataTransfer!.setData("text/plain", this.project.id);
    event.dataTransfer!.effectAllowed = "move";
  }

  dragEndHandler(_event: DragEvent) {
    console.log("drag event ended");
  }

  configure() {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
  }

  renderContent() {
    //reaches out to DOM elements to render
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.persons + " assigned";
    this.element.querySelector("p")!.textContent =
      "Project description: " + this.project.description;
  }
}

//projectList Class
class ProjectList extends Component<HTMLDivElement, HTMLElement>
  implements DragTarget {
  assignedProjects: Project[];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`); // passes all relevant information to super
    this.assignedProjects = [];
    this.configure(); // set up the listener
    this.renderContent();
  }
  @autobind
  dragOverHandler(event: DragEvent) {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      // allows only text transfer
      //javascript's default behaviour is to not allow dropping, you have to prevent that
      event.preventDefault();
      const listEl = this.element.querySelector("ul")!;
      listEl.classList.add("droppable");
    }
  }

  //autobinds keyword this to the surrounding class
  @autobind
  dropHandler(event: DragEvent) {
    const projId = event.dataTransfer!.getData("text/plain");
    projectState.moveProject(
      projId,
      this.type === "active" ? ProjectStatus.active : ProjectStatus.finished
    );
  }

  @autobind
  dragLeaveHandler(_event: DragEvent) {
    const listEl = this.element.querySelector("ul")!;
    listEl.classList.remove("droppable");
  }

  private renderProjects() {
    //renders all the projects
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    listEl.innerHTML = "";
    for (const prjItem of this.assignedProjects) {
      new ProjectItem(this.element.querySelector("ul")!.id, prjItem); //passes only one project item at a time
    }
  }

  public renderContent() {
    //renders the list without content
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  configure() {
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("drop", this.dropHandler);
    // configure the listener
    projectState.addListener((projects: Project[]) => {
      //filters the active projects
      const filteredProjects = projects.filter((prj) => {
        if (this.type === "active") {
          return prj.status === ProjectStatus.active;
        }
        return prj.status === ProjectStatus.finished;
      });
      this.assignedProjects = filteredProjects;
      this.renderProjects();
    });
  }
}

//projectInput class
class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  //constructor that selects the items in the HTML code and attaches to the DOM
  constructor() {
    super("project-input", "app", true, "user-input");

    //selects items in the DOM
    this.titleInputElement = <HTMLInputElement>(
      this.element.querySelector("#title")
    );
    this.descriptionInputElement = <HTMLInputElement>(
      this.element.querySelector("#description")
    );
    this.peopleInputElement = <HTMLInputElement>(
      this.element.querySelector("#people")
    );

    //calls the configure method that adds an event listener to the form submission
    this.configure();
    this.renderContent();
  }

  private gatherUserInput(): [string, string, number] | void {
    const inputTitle = this.titleInputElement.value;
    const inputDescription = this.descriptionInputElement.value;
    const inputPeople = this.peopleInputElement.value;

    //create the validatable objects
    const titleValidatable: Validatable = {
      value: inputTitle,
      required: true,
    };

    const descriptionValidatable: Validatable = {
      value: inputDescription,
      required: true,
      minLength: 5,
    };

    const peopleValidatable: Validatable = {
      value: inputTitle,
      required: true,
      min: 1,
      max: 5,
    };

    if (
      !Validate(titleValidatable) ||
      !Validate(descriptionValidatable) ||
      !Validate(peopleValidatable)
    )
      alert("Input is incorrect! Try again");
    else return [inputTitle, inputDescription, +inputPeople];
  }
  //resets the input fields back to empty strings
  private clearingFields() {
    this.titleInputElement.value = "";
    this.descriptionInputElement.value = "";
    this.peopleInputElement.value = "";
  }

  @autobind
  private submitHandler(event: Event) {
    //prevent the default HTTP request be sent out
    event.preventDefault();
    // console.log(this.titleInputElement.value);
    const userInput = this.gatherUserInput();

    if (Array.isArray(userInput)) {
      const [title, description, number] = userInput;
      projectState.addProject(title, description, number);
      this.clearingFields();
    }
  }

  //adds an event listener to the form submission
  public configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
  public renderContent() {}
}

//creates a variable and instantiates a ProjectInput object
const proj = new ProjectInput();
//instantiates the project list
const activeProjList = new ProjectList("active");
const finishedProjList = new ProjectList("finished");
