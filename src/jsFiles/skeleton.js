const createDOMSkeleton = function() {

    // main function to create skeleton
    const createSkeleton = () => {
        const contentDiv = document.getElementById('content');
    
        const sidebarDiv = document.createElement('div');
        sidebarDiv.setAttribute('id','sidebar');
    
        const mainmenuDiv = document.createElement('div');
        mainmenuDiv.setAttribute('id','mainmenu');
    
        contentDiv.appendChild(sidebarDiv);
        contentDiv.appendChild(mainmenuDiv);
    
        createSidebar(sidebarDiv);
    }

    // helper function to create default sidebar
    const createSidebar = (sidebarDiv) => {
        const logoElem = createLogo(sidebarDiv);
        createToDoNav(sidebarDiv);
        createProjectNav(sidebarDiv);
        addMarginLeftHeaders(logoElem);
    }

    const createLogo = (sidebarDiv) => {
        const logoName = document.createElement('h1');
        logoName.id = "logo";
        logoName.classList.add('header-text');
    
        const firstHalfLogo = document.createElement('span');
        firstHalfLogo.innerText = "Prod";
        firstHalfLogo.classList.add('first-half-logo');
    
        const secondHalfLogo = document.createElement('span');
        secondHalfLogo.innerText = "Hack";
        secondHalfLogo.classList.add('second-half-logo');
    
        logoName.appendChild(firstHalfLogo);
        logoName.appendChild(secondHalfLogo);
        sidebarDiv.appendChild(logoName);

        return logoName;
    }

    const createToDoNav = (sidebarDiv) => { 
        const toDoNavDiv = document.createElement('div');
        toDoNavDiv.classList.add('to-do-nav');

        const toDoHeader = document.createElement('h2')
        toDoHeader.classList.add('sidebar-main-header');
        toDoHeader.innerText = 'To-Do';
        toDoNavDiv.appendChild(toDoHeader);

        for(let index = 0; index < 3; index++){
            let toDoSubHeader = document.createElement('h3');
            toDoSubHeader.classList.add('sidebar-subheader');
            toDoSubHeader.classList.add('to-do-links');

            let toDoLink = document.createElement('a');
            toDoLink.classList.add('to-do-links');
            toDoLink.href = "";
            if (index == 0){
                toDoLink.innerText = "Inbox";
            }
            else if(index == 1) {
                toDoLink.innerText = "Today";
            }
            else if(index == 2) {
                toDoLink.innerText ="This Week";
            }

            toDoSubHeader.appendChild(toDoLink);
            toDoNavDiv.appendChild(toDoSubHeader);
        }
        sidebarDiv.appendChild(toDoNavDiv);
    }

    const createProjectNav = (sidebarDiv) => {
        const projectNavDiv = document.createElement('div');
        projectNavDiv.classList.add('projects-nav');
        
        const projectHeader = document.createElement('h2');
        projectHeader.classList.add('sidebar-main-header');
        projectHeader.innerText = "Projects";
        sidebarDiv.appendChild(projectHeader);
        createAddProjectsBtn(projectNavDiv);

        sidebarDiv.appendChild(projectNavDiv);
    }

    const createAddProjectsBtn = (projectNavDiv) => {
        const projectSubHeader = document.createElement('h3');
        projectSubHeader.classList.add('icon-btn-container');
        projectSubHeader.classList.add('sidebar-subheader');

        const projectLink = document.createElement('a')
        projectLink.id = "sidebar-add-project-link";
        projectLink.href = "";
        projectLink.innerText = "Add Projects"

        const plusIconBtn = document.createElement('button')
        plusIconBtn.classList.add("icon-btn","subheader-icon-btn","icon-adj-text");

        const plusIconImg = document.createElement('img');
        //need to import img assets on webpack
        plusIconImg.src = "/src/assets/plus-circle.svg";
        
        plusIconBtn.appendChild(plusIconImg);
        projectLink.appendChild(plusIconBtn);
        projectSubHeader.appendChild(projectLink);

        projectNavDiv.appendChild(projectSubHeader);
    }

    const addMarginLeftHeaders = (logoItem) => {
        const logoMarginLeft= getComputedStyle(logoItem).marginLeft;

        const sidebarMainHeader = Array.from(document.getElementsByClassName("sidebar-main-header"));
        const sidebarSubHeader = Array.from(document.getElementsByClassName('sidebar-subheader'));

        sidebarMainHeader.forEach(e => e.style.marginLeft = logoMarginLeft);
        sidebarSubHeader.forEach(e => e.style.marginLeft = parseInt(logoMarginLeft,10) + 10 + 'px');

        sidebarMainHeader[0].style.marginLeft = logoMarginLeft;
    }

    return {createSkeleton};
}



export {createDOMSkeleton as default};



{/* <div id="content">
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
</div> */}