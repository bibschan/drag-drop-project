import { Project } from "../components/Project";
export var ProjectState;
(function (ProjectState_1) {
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
            const newProject = new Project.Project(Math.random().toString(), title, description, numOfPeople, Project.ProjectStatus.active);
            this.projects.push(newProject);
            this.updateListeners();
        }
        moveProject(projectId, newStatus) {
            const project = this.projects.find((prj) => prj.id === projectId);
            if (project && project.status !== newStatus)
                project.status = newStatus;
            this.updateListeners();
        }
        updateListeners() {
            for (const listenerFn of this.listeners) {
                listenerFn(this.projects.slice());
            }
        }
    }
    ProjectState_1.ProjectState = ProjectState;
    ProjectState_1.projectState = ProjectState.getInstance();
})(ProjectState || (ProjectState = {}));
//# sourceMappingURL=ProjectState.js.map