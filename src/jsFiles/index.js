import createDOMSkeleton from "./skeleton.js"

let defaultSkeleton = createDOMSkeleton();
defaultSkeleton.createSkeleton();

/* projects-nav */



/* <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>To-Do List</title>
    <link rel = "stylesheet" href = "/src/cssFiles/index.css">
    <script src = "/src/jsFiles/index.js" defer></script>
</head>
<body>
    <div id="content">
        <div id = "sidebar">
            <h1 id = "logo" class = "header-text"><span class = "first-half-logo">Prod</span><span class = "second-half-logo">Hack</span></h1>
            <div class = "to-do-nav">
                <h2 class = "sidebar-main-header">To-Do</h2>
                <h3 class = "sidebar-subheader"><a href = "">Inbox</a></h3>
                <h3 class = "sidebar-subheader"><a href = "">Today</a></h3>
                <h3 class = "sidebar-subheader"><a href = "">This Week</a></h3>
            </div>
            <div class = "projects-nav">
                <h2 class = "sidebar-main-header">Projects</h2>
                <h3 class =  "icon-btn-container sidebar-subheader"><a href = ""><button class = "icon-btn subheader-icon-btn icon-adj-text"><img src = "/src/assets/plus-circle.svg"></button>Add Projects</a></h3>
            </div>
        </div>
        <div id = "mainmenu">
            <h1 class ="header-text">Today</h1>
            <section id = "work-tasks">
                <h2 class = "icon-btn-container" id = "work-header">Work<button class = "icon-btn header-icon-btn icon-adj-text" id = "add-work-task"><img src = "/src/assets/plus-circle.svg"></button></h2>

                <!-- form that pops up when click the + icon, is also the edit task form-->
                 <form id = "insert-task">
                    <h3 class = "form-header">Insert Task</h2>
                    <input type = "text" id = "insert-title" placeholder = "Title">
                    <input type = "text" id = "insert-description" placeholder = "Description">
                    <div id = "form-same-line">
                        <select id="insert-priority" name="priority">
                            <option value="" disabled selected hidden>Priority</option>
                            <option value="priority-1">1</option>
                            <option value="priority-2">2</option>
                            <option value="priority-3">3</option>
                            <option value="priority-4">3</option>
                            <option value="priority-5">3</option>
                        </select>
                        <div class = "form-btns">
                            <button type = "submit" id = "submit-insert" class = "icon-btn subheader-icon-btn"><img src = "/src/assets/checkmark.svg"></button>
                            <button id = "delete-insert" class = "icon-btn subheader-icon-btn"><img src = "/src/assets/delete.svg"></button>
                        </div>
                    </div>
                </form>


                <!-- example of task -->
                <section class = "task">
                    <div class = "main-task">
                        <div class = "icon-btn-container checkbox-container">
                            <button class = "icon-btn checkbox subheader-icon-btn"><img src = "/src/assets/checkbox.svg"></button>
                            <img class = "priority-img priority-subheader-img" src = "/src/assets/priority-1.svg">
                        </div>
                        <div class = "task-name">
                            <h3>Create VBA Macro For Item List</h3>
                        </div>
                        <div class = "task-hover-icons">
                            <button class = "icon-btn add-subtask-icon subheader-icon-btn"><img src = "/src/assets/plus-circle.svg"></button>
                            <button class = "icon-btn edit-task-icon subheader-icon-btn"><img src = "/src/assets/edit.svg"></button>
                            <button class = "icon-btn delete-task-icon subheader-icon-btn"><img src = "/src/assets/delete.svg"></button>
                        </div>
                    </div>
                    <div class = "main-task-description description">
                        <h4>Description of the thingy</h4>
                    </div>

                    <div class = "subtask">
                        <div class = "subtask-checkbox checkbox-container">
                            <button class = "icon-btn checkbox undersubheader-icon-btn"><img src = "/src/assets/checkbox.svg"></button></button>
                        </div>
                        <div class = "subtask-name">
                            <h4>Do something amazing</h4>
                        </div>
                        <div class = "subtask-hover-icons">
                            <button class = "icon-btn edit-task-icon undersubheader-icon-btn"><img src = "/src/assets/edit.svg"></button>
                            <button class = "icon-btn delete-task-icon undersubheader-icon-btn"><img src = "/src/assets/delete.svg"></button>
                        </div>
                    </div>
                    <div class = "subtask-description description">
                        <h5>Description of thingy again</h5>
                    </div>

                    <!-- form to insert / edit subtask that pops up when click the + icon, is also the edit task form-->
                    <form id = "insert-subtask">
                        <h4 class = "subtask-form-header">Insert subtask</h2>
                        <input type = "text" id = "insert-title" placeholder = "Title">
                        <input type = "text" id = "insert-description" placeholder = "Description">
                        <div class = "form-btns subtask-btns">
                            <button type = "submit" id = "subtask-submit-insert" class = "icon-btn undersubheader-icon-btn"><img src = "/src/assets/checkmark.svg"></button>
                            <button id = "subtask-delete-insert" class = "icon-btn undersubheader-icon-btn"><img src = "/src/assets/delete.svg"></button>
                        </div>
                    </form>

                </section>
            </section>

            <section id = "project-tasks">
                <h2 id = "project-header" class = "icon-btn-container">Projects<button class = "icon-btn header-icon-btn icon-adj-text" id = "add-project"><img src = "/src/assets/plus-circle.svg"></button></h2>
                <div id = "golddoof-youtube">
                    <h2 class = "icon-btn-container project-name">
                        GoldDoof Youtube
                        <button class = "icon-btn header-icon-btn icon-adj-text" id = "add-golddoof-youtube-task"><img src = "/src/assets/plus-circle.svg"></button>
                    </h2>
                    <section class = "task">
                        <div class = "main-task">
                            <div class = "icon-btn-container checkbox-container">
                                <button class = "icon-btn checkbox subheader-icon-btn"><img src = "/src/assets/checkbox.svg"></button>
                                <img class = "priority-img priority-subheader-img" src = "/src/assets/priority-1.svg">
                            </div>
                            <div class = "task-name">
                                <h3>Create VBA Macro For Item List</h3>
                            </div>
                            <div class = "task-hover-icons">
                                <button class = "icon-btn add-subtask-icon subheader-icon-btn"><img src = "/src/assets/plus-circle.svg"></button>
                                <button class = "icon-btn edit-task-icon subheader-icon-btn"><img src = "/src/assets/edit.svg"></button>
                                <button class = "icon-btn delete-task-icon subheader-icon-btn"><img src = "/src/assets/delete.svg"></button>
                            </div>
                        </div>
                        <div class = "main-task-description description">
                            <h4>Description of the thingy</h4>
                        </div>
    
                        <div class = "subtask">
                            <div class = "subtask-checkbox checkbox-container">
                                <button class = "icon-btn checkbox undersubheader-icon-btn"><img src = "/src/assets/checkbox.svg"></button></button>
                            </div>
                            <div class = "subtask-name">
                                <h4>Do something amazing</h4>
                            </div>
                            <div class = "subtask-hover-icons">
                                <button class = "icon-btn edit-task-icon undersubheader-icon-btn"><img src = "/src/assets/edit.svg"></button>
                                <button class = "icon-btn delete-task-icon undersubheader-icon-btn"><img src = "/src/assets/delete.svg"></button>
                            </div>
                        </div>
                        <div class = "subtask-description description">
                            <h5>Description of thingy again</h5>
                        </div>

                </div>
            </section>
        </div>
    </div>
</body>
</html> */