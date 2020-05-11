import { ProjectInput } from "./components/ProjectInput";
import { ProjectList } from "./components/ProjectList";
export var App;
(function (App) {
    App.proj = new ProjectInput.ProjectInput();
    App.activeProjList = new ProjectList.ProjectList("active");
    App.finishedProjList = new ProjectList.ProjectList("finished");
})(App || (App = {}));
//# sourceMappingURL=app.js.map