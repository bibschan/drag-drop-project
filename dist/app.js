"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
class ProjectState {
    constructor() {
        this.projects = [];
        this.listeners = [];
    }
    static getInstance() {
        if (this.instance)
            return this.instance;
        return (this.instance = new ProjectState());
    }
    addListener(listenerFn) {
        this.listeners.push(listenerFn);
    }
    addProject(title, description, numOfPeople) {
        const newProject = {
            id: Math.random().toString(),
            title: title,
            description: description,
            people: numOfPeople,
        };
        this.projects.push(newProject);
        for (const listenerFn of this.listeners) {
            listenerFn(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
function Validate(validateInput) {
    let isValid = true;
    if (validateInput.required)
        isValid = isValid && validateInput.value.toString().trim().length !== 0;
    if (validateInput.minLength != null &&
        typeof validateInput.value === "string")
        isValid = isValid && validateInput.value.length > validateInput.minLength;
    if (validateInput.maxLength != null &&
        typeof validateInput.value === "string")
        isValid = isValid && validateInput.value.length < validateInput.maxLength;
    if (validateInput.min != null && typeof validateInput.value === "number")
        isValid = isValid && validateInput.value > validateInput.min;
    if (validateInput.max != null && typeof validateInput.value === "number")
        isValid = isValid && validateInput.value < validateInput.max;
    return isValid;
}
function autobind(_target, _methodName, descriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor = {
        configurable: true,
        get() {
            const boundFunction = originalMethod.bind(this);
            return boundFunction;
        },
    };
    return adjDescriptor;
}
class ProjectList {
    constructor(type) {
        this.type = type;
        this.assignedProjects = [];
        this.templateElement = (document.getElementById("project-list"));
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = `${this.type}-projects`;
        projectState.addListener((projects) => {
            this.assignedProjects = projects;
            this.renderProjects();
        });
        this.attach();
        this.renderContent();
    }
    renderProjects() {
        const listEl = document.getElementById(`${this.type}-projects-list`);
        for (const prjItem of this.assignedProjects) {
            const listItem = document.createElement("li");
            listItem.textContent = prjItem.title;
            listEl.appendChild(listItem);
        }
    }
    renderContent() {
        const listId = `${this.type}-projects-list`;
        this.element.querySelector("ul").id = listId;
        this.element.querySelector("h2").textContent =
            this.type.toUpperCase() + " PROJECTS";
    }
    attach() {
        this.hostElement.insertAdjacentElement("beforeend", this.element);
    }
}
class ProjectInput {
    constructor() {
        this.templateElement = (document.getElementById("project-input"));
        this.hostElement = document.getElementById("app");
        const importedNode = document.importNode(this.templateElement.content, true);
        this.element = importedNode.firstElementChild;
        this.element.id = "user-input";
        this.titleInputElement = (this.element.querySelector("#title"));
        this.descriptionInputElement = (this.element.querySelector("#description"));
        this.peopleInputElement = (this.element.querySelector("#people"));
        this.configure();
        this.attach();
    }
    gatherUserInput() {
        const inputTitle = this.titleInputElement.value;
        const inputDescription = this.descriptionInputElement.value;
        const inputPeople = this.peopleInputElement.value;
        const titleValidatable = {
            value: inputTitle,
            required: true,
        };
        const descriptionValidatable = {
            value: inputDescription,
            required: true,
            minLength: 5,
        };
        const peopleValidatable = {
            value: inputTitle,
            required: true,
            min: 1,
            max: 5,
        };
        if (!Validate(titleValidatable) ||
            !Validate(descriptionValidatable) ||
            !Validate(peopleValidatable))
            alert("Input is incorrect! Try again");
        else
            return [inputTitle, inputDescription, +inputPeople];
    }
    clearingFields() {
        this.titleInputElement.value = "";
        this.descriptionInputElement.value = "";
        this.peopleInputElement.value = "";
    }
    submitHandler(event) {
        event.preventDefault();
        const userInput = this.gatherUserInput();
        if (Array.isArray(userInput)) {
            const [title, description, number] = userInput;
            projectState.addProject(title, description, number);
            this.clearingFields();
        }
    }
    configure() {
        this.element.addEventListener("submit", this.submitHandler);
    }
    attach() {
        this.hostElement.insertAdjacentElement("afterbegin", this.element);
    }
}
__decorate([
    autobind
], ProjectInput.prototype, "submitHandler", null);
const proj = new ProjectInput();
const activeProjList = new ProjectList("active");
const finishedProjList = new ProjectList("finished");
//# sourceMappingURL=app.js.map