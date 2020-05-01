import { autobind } from "autobind";
import { Project } from "Project";
import { ProjectItem } from "ProjectItem";
import { Component } from "Component";
import { ProjectState } from "ProjectState";

export module ProjectList {
  //projectList Class
  export class ProjectList
    extends Component.Component<HTMLDivElement, HTMLElement>
    implements DragTarget {
    assignedProjects: Project.Project[];

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
      ProjectState.projectState.moveProject(
        projId,
        this.type === "active"
          ? Project.ProjectStatus.active
          : Project.ProjectStatus.finished
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
        new ProjectItem.ProjectItem(
          this.element.querySelector("ul")!.id,
          prjItem
        ); //passes only one project item at a time
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
      ProjectState.projectState.addListener((projects: Project.Project[]) => {
        //filters the active projects
        const filteredProjects = projects.filter((prj) => {
          if (this.type === "active") {
            return prj.status === Project.ProjectStatus.active;
          }
          return prj.status === Project.ProjectStatus.finished;
        });
        this.assignedProjects = filteredProjects;
        this.renderProjects();
      });
    }
  }
}
