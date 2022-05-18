//includes all the classes that can be inserted
//projects, tasks, and subtasks

import {allMainTasks, allSubtasks, allProjects} from "./index.js"

class project {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    edit(title, description) {
        this.title = title;
        this.description = description;
    }

}

class task {
    constructor(title, description) {
        this.title = title;
        this.description = description;
    }

    edit(title, description) {
        this.title = title;
        this.description = description;
    }
}

class maintask extends task{
    constructor(title, description, priority, dueDate, project = "Work") {
        super(title, description);
        this.priority = priority;
        this.dueDate = dueDate;
        this.project = project;
    }

    edit(title, description, priority, dueDate) {
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.dueDate = dueDate;
    }
}

class subtask extends task{
    constructor(title, description, maintask, project = "Work") {
        super(title, description);
        this.maintask = maintask;
        this.project = project;
    }

    editMainTask(newMainTask) {
        this.maintask = newMainTask;
    }

    editProjectType(newProject) {
        this.project = newProject;
    }
}


export {project, maintask, subtask};
