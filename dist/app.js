define(["require", "exports", "ProjectInput", "ProjectList"], function (require, exports, ProjectInput_1, ProjectList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var App;
    (function (App) {
        App.proj = new ProjectInput_1.ProjectInput.ProjectInput();
        App.activeProjList = new ProjectList_1.ProjectList.ProjectList("active");
        App.finishedProjList = new ProjectList_1.ProjectList.ProjectList("finished");
    })(App = exports.App || (exports.App = {}));
});
