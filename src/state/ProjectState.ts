import { Project } from "../components/Project";
import { Listener } from "listener";

export module ProjectState {
  export class ProjectState {
    private projects: Project.Project[] = [];
    private listeners: Listener.Listener[] = [];
    private static instance: ProjectState;

    private constructor() {}

    static getInstance() {
      if (this.instance) return this.instance; // checks if instance exists
      return (this.instance = new ProjectState()); // if not, returns a new instance
    }

    addListener(listenerFn: Listener.Listener) {
      this.listeners.push(listenerFn);
    }

    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = new Project.Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        Project.ProjectStatus.active
      );
      this.projects.push(newProject);
      this.updateListeners();
    }

    moveProject(projectId: string, newStatus: Project.ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === projectId); //find method runs in every element of the array
      if (project && project.status !== newStatus) project.status = newStatus;
      this.updateListeners();
    }

    private updateListeners() {
      for (const listenerFn of this.listeners) {
        // loop through all listener functions with a for loop
        listenerFn(this.projects.slice()); //slice returns a copy of the array, not the original one. Javascript is pass by reference so if you pass the array itself you'd be changing the original values
      }
    }
  }
  export const projectState = ProjectState.getInstance(); // instantiates project state so you can use this anywhere in the file - global constant
}
