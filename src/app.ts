import { ProjectInput } from "ProjectInput";
import { ProjectList } from "ProjectList";

export module App {
  //creates a variable and instantiates a ProjectInput object
  export const proj = new ProjectInput.ProjectInput();
  //instantiates the project list
  export const activeProjList = new ProjectList.ProjectList("active");
  export const finishedProjList = new ProjectList.ProjectList("finished");
}
