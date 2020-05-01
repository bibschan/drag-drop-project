import { Component } from "Component";
import { autobind } from "autobind";
import { ProjectState } from "ProjectState";
import { Valitadable } from "Validatable";

//projectInput class

export module ProjectInput {
  export class ProjectInput extends Component.Component<
    HTMLDivElement,
    HTMLFormElement
  > {
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
      const titleValidatable: Valitadable.Validatable = {
        value: inputTitle,
        required: true,
      };

      const descriptionValidatable: Valitadable.Validatable = {
        value: inputDescription,
        required: true,
        minLength: 5,
      };

      const peopleValidatable: Valitadable.Validatable = {
        value: inputTitle,
        required: true,
        min: 1,
        max: 5,
      };

      if (
        !Valitadable.Validate(titleValidatable) ||
        !Valitadable.Validate(descriptionValidatable) ||
        !Valitadable.Validate(peopleValidatable)
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
        ProjectState.projectState.addProject(title, description, number);
        this.clearingFields();
      }
    }

    //adds an event listener to the form submission
    public configure() {
      this.element.addEventListener("submit", this.submitHandler);
    }
    public renderContent() {}
  }
}
