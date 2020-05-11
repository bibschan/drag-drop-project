var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind } from "../decorators/autobind";
import { Project } from "./Project";
import { ProjectItem } from "./ProjectItem";
import { Component } from "./Component";
import { ProjectState } from "../state/ProjectState";
export var ProjectList;
(function (ProjectList_1) {
    class ProjectList extends Component.Component {
        constructor(type) {
            super("project-list", "app", false, `${type}-projects`);
            this.type = type;
            this.assignedProjects = [];
            this.configure();
            this.renderContent();
        }
        dragOverHandler(event) {
            if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
                event.preventDefault();
                const listEl = this.element.querySelector("ul");
                listEl.classList.add("droppable");
            }
        }
        dropHandler(event) {
            const projId = event.dataTransfer.getData("text/plain");
            ProjectState.projectState.moveProject(projId, this.type === "active"
                ? Project.ProjectStatus.active
                : Project.ProjectStatus.finished);
        }
        dragLeaveHandler(_event) {
            const listEl = this.element.querySelector("ul");
            listEl.classList.remove("droppable");
        }
        renderProjects() {
            const listEl = document.getElementById(`${this.type}-projects-list`);
            listEl.innerHTML = "";
            for (const prjItem of this.assignedProjects) {
                new ProjectItem.ProjectItem(this.element.querySelector("ul").id, prjItem);
            }
        }
        renderContent() {
            const listId = `${this.type}-projects-list`;
            this.element.querySelector("ul").id = listId;
            this.element.querySelector("h2").textContent =
                this.type.toUpperCase() + " PROJECTS";
        }
        configure() {
            this.element.addEventListener("dragover", this.dragOverHandler);
            this.element.addEventListener("dragleave", this.dragLeaveHandler);
            this.element.addEventListener("drop", this.dropHandler);
            ProjectState.projectState.addListener((projects) => {
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
    __decorate([
        autobind
    ], ProjectList.prototype, "dragOverHandler", null);
    __decorate([
        autobind
    ], ProjectList.prototype, "dropHandler", null);
    __decorate([
        autobind
    ], ProjectList.prototype, "dragLeaveHandler", null);
    ProjectList_1.ProjectList = ProjectList;
})(ProjectList || (ProjectList = {}));
//# sourceMappingURL=ProjectList.js.map