var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
define(["require", "exports", "autobind", "Component"], function (require, exports, autobind_1, Component_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ProjectItem;
    (function (ProjectItem_1) {
        class ProjectItem extends Component_1.Component.Component {
            constructor(hostId, project) {
                super("single-project", hostId, false, project.id);
                this.project = project;
                this.configure();
                this.renderContent();
            }
            get persons() {
                const people = this.project.people === 1
                    ? "1 Person"
                    : `${this.project.people} People`;
                return people;
            }
            dragStartHandler(event) {
                event.dataTransfer.setData("text/plain", this.project.id);
                event.dataTransfer.effectAllowed = "move";
            }
            dragEndHandler(_event) {
                console.log("drag event ended");
            }
            configure() {
                this.element.addEventListener("dragstart", this.dragStartHandler);
                this.element.addEventListener("dragend", this.dragEndHandler);
            }
            renderContent() {
                this.element.querySelector("h2").textContent = this.project.title;
                this.element.querySelector("h3").textContent =
                    this.persons + " assigned";
                this.element.querySelector("p").textContent =
                    "Project description: " + this.project.description;
            }
        }
        __decorate([
            autobind_1.autobind
        ], ProjectItem.prototype, "dragStartHandler", null);
        ProjectItem_1.ProjectItem = ProjectItem;
    })(ProjectItem = exports.ProjectItem || (exports.ProjectItem = {}));
});
