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
class ProjectState {
  private projects: Project[] = [];
  private listeners: any[] = [];
  private static instance: ProjectState;

  private constructor() {}

  static getInstance() {
    // checks if instance exists
    if (this.instance) return this.instance;
    // if not, returns a new instance
    return (this.instance = new ProjectState());
  }

  addListener(listenerFn: Function) {
    this.listeners.push(listenerFn);
  }

  public addProject(title: string, description: string, numOfPeople: number) {
    const newProject = new Project(
      Math.random().toString(),
      title,
      description,
      numOfPeople,
      ProjectStatus.active
    );
    this.projects.push(newProject);
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
//having to do so every time
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

//projectList class
class ProjectList {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLElement;
  assignedProjects: any[];

  constructor(private type: "active" | "finished") {
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById("project-list")!
    );

    //get the piece of code in which the template should be displayed in
    this.hostElement = <HTMLDivElement>document.getElementById("app")!;

    //assigns importedNode the action of importing the template content into the DOM
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    //imports the element
    this.element = <HTMLElement>importedNode.firstElementChild;

    //list has a dynamic ID assigned to it
    this.element.id = `${this.type}-projects`;
    projectState.addListener((projects: any[]) => {
      this.assignedProjects = projects;
      this.renderProjects();
    });

    this.attach();
    this.renderContent();
  }

  private renderProjects() {
    const listEl = document.getElementById(
      `${this.type}-projects-list`
    )! as HTMLUListElement;
    for (const prjItem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjItem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;
    this.element.querySelector("ul")!.id = listId;
    this.element.querySelector("h2")!.textContent =
      this.type.toUpperCase() + " PROJECTS";
  }

  private attach() {
    this.hostElement.insertAdjacentElement("beforeend", this.element);
  }
}

//projectInput class
class ProjectInput {
  //templated html div to be displayed
  templateElement: HTMLTemplateElement;
  //host element is the div in which the form will be displayed
  hostElement: HTMLDivElement;
  //element is the form itself
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

  //constructor that selects the items in the HTML code and attaches to the DOM
  constructor() {
    //get the project input piece from the html file
    this.templateElement = <HTMLTemplateElement>(
      document.getElementById("project-input")!
    );

    //get the piece of code in which the template should be displayed in
    this.hostElement = <HTMLDivElement>document.getElementById("app")!;

    //assigns importedNode the action of importing the template content into the DOM
    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    //imports the element
    this.element = <HTMLFormElement>importedNode.firstElementChild;

    //assigns the id user-input to the DOM element
    this.element.id = "user-input";

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

    //attaches the HTML code selected into the DOM
    this.attach();
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
  private configure() {
    this.element.addEventListener("submit", this.submitHandler);
  }
  //attaches the HTML form into the DOM
  private attach() {
    this.hostElement.insertAdjacentElement("afterbegin", this.element);
  }
}

//creates a variable and instantiates a ProjectInput object
const proj = new ProjectInput();
//instantiates the project list
const activeProjList = new ProjectList("active");
const finishedProjList = new ProjectList("finished");
