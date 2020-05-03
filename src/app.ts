import { ProjectInput } from "./components/ProjectInput";
import { ProjectList } from "./components/ProjectList";

export module App {
  export const proj = new ProjectInput.ProjectInput(); //creates a variable and instantiates a ProjectInput object
  export const activeProjList = new ProjectList.ProjectList("active"); //instantiates the project list
  export const finishedProjList = new ProjectList.ProjectList("finished"); //instantiates the project list
}
