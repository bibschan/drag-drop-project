export var Project;
(function (Project_1) {
    let ProjectStatus;
    (function (ProjectStatus) {
        ProjectStatus[ProjectStatus["active"] = 0] = "active";
        ProjectStatus[ProjectStatus["finished"] = 1] = "finished";
    })(ProjectStatus = Project_1.ProjectStatus || (Project_1.ProjectStatus = {}));
    class Project {
        constructor(id, title, description, people, status) {
            this.id = id;
            this.title = title;
            this.description = description;
            this.people = people;
            this.status = status;
        }
    }
    Project_1.Project = Project;
})(Project || (Project = {}));
//# sourceMappingURL=Project.js.map