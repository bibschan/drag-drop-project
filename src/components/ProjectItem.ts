import { autobind } from "../decorators/autobind";
import { Project } from "./Project";
import { Component } from "./Component";

export module ProjectItem {
  //ProjectItem class is responsible for rendering one project item on the screen
  export class ProjectItem
    extends Component.Component<HTMLUListElement, HTMLLIElement>
    implements Draggable {
    private project: Project.Project;

    //getter
    get persons() {
      const people =
        this.project.people === 1
          ? "1 Person"
          : `${this.project.people} People`;
      return people;
    }

    constructor(hostId: string, project: Project.Project) {
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
      this.element.querySelector("h3")!.textContent =
        this.persons + " assigned";
      this.element.querySelector("p")!.textContent =
        "Project description: " + this.project.description;
    }
  }
}
