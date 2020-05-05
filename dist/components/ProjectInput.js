var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from "./Component";
import { autobind } from "../decorators/autobind";
import { ProjectState } from "../state/ProjectState";
import { Validatable } from "../util/Validatable";
export var ProjectInput;
(function (ProjectInput_1) {
    class ProjectInput extends Component.Component {
        constructor() {
            super("project-input", "app", true, "user-input");
            this.titleInputElement = (this.element.querySelector("#title"));
            this.descriptionInputElement = (this.element.querySelector("#description"));
            this.peopleInputElement = (this.element.querySelector("#people"));
            this.configure();
            this.renderContent();
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
            if (!Validatable.validate(titleValidatable) ||
                !Validatable.validate(descriptionValidatable) ||
                !Validatable.validate(peopleValidatable))
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
                ProjectState.projectState.addProject(title, description, number);
                this.clearingFields();
            }
        }
        configure() {
            this.element.addEventListener("submit", this.submitHandler);
        }
        renderContent() { }
    }
    __decorate([
        autobind
    ], ProjectInput.prototype, "submitHandler", null);
    ProjectInput_1.ProjectInput = ProjectInput;
})(ProjectInput || (ProjectInput = {}));
//# sourceMappingURL=ProjectInput.js.map