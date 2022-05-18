import {project, maintask, subtask} from "./storedData.js"
import {allMainTasks, allSubtasks, allProjects} from "./index.js"
import {createDOMElem, createDOMInsertBefore, createImgElem, createInput} from "./helperFunctions.js";
import plusIcon from '../assets/plus-circle.svg';
import priority1Icon from '../assets/priority-1.svg';
import priority2Icon from '../assets/priority-2.svg';
import priority3Icon from '../assets/priority-3.svg';
import priority4Icon from '../assets/priority-4.svg';
import priority5Icon from '../assets/priority-5.svg';
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';
import checkboxIcon from '../assets/checkbox.svg';
import checkmarkIcon from '../assets/checkmark.svg';
import format from 'date-fns/format'
import endOfToday from 'date-fns/endOfToday'


let taskDOMFunction = () => {

    function lCaseHyphen(stringValue = '') {
        let newStringValue = stringValue.toLowerCase();
        newStringValue = newStringValue.replaceAll(' ','-');
        return newStringValue;
    }

    //find if there is a child in the project task
    function getContainerId(projectName = '') {
        let id = projectName.toLowerCase();
        id.replaceAll(' ','-');
        id = id + '-div';
        return id;
    }

    function getTaskSectionID(project, title) {
        let taskSectionID = `${lCaseHyphen(project)}-${lCaseHyphen(title)}-section`;
        return taskSectionID;
    }

    //this is to get the individual main and subtasks for the edit button
    function getTaskID(project, mainTaskTitle, subTaskTitle = ''){
        let taskID = `${lCaseHyphen(project)}-${lCaseHyphen(mainTaskTitle)}`;
        if(subTaskTitle != ''){
            taskID = `${taskID}-${lCaseHyphen(subTaskTitle)}`;
        }
        return taskID;
    }

    //add insert main task form
    let appendInsertMainTaskForm = (projectName, addTaskBtn) => {
    
        addTaskBtn.addEventListener('click', function() {
            removeAllForms();
            //add the task form
            const containerDivID = getContainerId(projectName)
            const divToAppend = document.getElementById(containerDivID);
            const allTasksInDiv = Array.from(divToAppend.querySelectorAll('.task'));
            const insertForm = mainTaskForm('insert', projectName);

            if(allTasksInDiv.length == 0) {
                divToAppend.appendChild(insertForm)}
            else {
                divToAppend.insertBefore(insertForm, allTasksInDiv[0]);
            }
        })
    }

    //for appending the edit task form
    let appendEditMainTaskForm = (mainTaskObj, editTaskBtn, taskSection) => {
        editTaskBtn.addEventListener('click', function () {
            removeAllForms();
            const editForm = mainTaskForm('edit', mainTaskObj);
            const allTasksInDiv = Array.from(taskSection.querySelectorAll('.task'));
            if(allTasksInDiv.length == 0) {
                taskSection.appendChild(editForm)}
            else {
                taskSection.insertBefore(editForm, allTasksInDiv[0]);
            }
        })

    }

    let mainTaskForm = (functionality, mainTaskObj = '') => {
        const form = document.createElement('form');
        const formName = createDOMElem('h3', form, ['form-header']);

        const inputTitle = createInput('text', form, true, 'Title');
        const inputDescription = createInput('text', form, false, 'Description');

        //for input priority and form submit, delete, edit buttons
        const sameLineContainerDiv = createDOMElem('div', form, [], 'form-same-line');
        const inputPriority = createInputPriority(sameLineContainerDiv);
        const formBtnsContainer = createDOMElem('div', sameLineContainerDiv, ['form-btns']);
        const submitBtn = createDOMElem('button', formBtnsContainer, ['icon-btn','subheader-icon-btn']);
        submitBtn.setAttribute('type','submit');
        createImgElem(checkmarkIcon, submitBtn);
        const deleteBtn = createDOMElem('button', formBtnsContainer, ['icon-btn','subheader-icon-btn']);        
        createImgElem(deleteIcon, deleteBtn);
        inputTitle.id = 'input-title';
        inputDescription.id = 'input-description';
        inputPriority.id = 'input-priority';
        form.id = "main-task-form";
        if(functionality == 'insert') {
            formName.innerText = 'Insert Task';
            if(mainTaskObj == '' ? insertMainTaskFormBtns(form, 'Work', deleteBtn) : insertMainTaskFormBtns(form, mainTaskObj.projectName, deleteBtn));
        }
        else if (functionality == 'edit') {
            formName.innerText = 'Edit Task';
            inputTitle.value = mainTaskObj.title;
            inputDescription.value = mainTaskObj.description;
            inputPriority.value = mainTaskObj.priority;
            editMainTaskFormBtns(form, mainTaskObj, deleteBtn);
        }

        disableRedirectFunction(form);
        return form;
    }

    function disableRedirectFunction(form) {
        function handleForm(event) { event.preventDefault(); } 
        form.addEventListener('submit', handleForm);
    }

    function createInputPriority(parentDiv){
        const inputPriority = document.createElement('select');
        //for the inputPriority option choices
        inputPriority.setAttribute('name','priority');
        inputPriority.required = true;
        const disabledDefaultOption = document.createElement('option');
        inputPriority.appendChild(disabledDefaultOption);
        disabledDefaultOption.setAttribute('value',"");
        disabledDefaultOption.innerText = "Priority";
        disabledDefaultOption.disabled = true;
        disabledDefaultOption.selected = true;
        disabledDefaultOption.hidden = true;
        for(let i = 1; i <= 5; i++) {
            let option = document.createElement('option');
            option.setAttribute('value', i);
            option.innerText = i;
            inputPriority.appendChild(option);
        }
        parentDiv.appendChild(inputPriority);
        return inputPriority;
    }

    let removeAllForms = () => {
        let contentDiv = document.getElementById('mainmenu');
        let allForms = Array.from(contentDiv.querySelectorAll('form'));
        allForms.forEach(form => form.remove());
    }


    //ON HERE
    let insertMainTaskFormBtns = (form, projectName = 'Work', deleteBtn) => {
        //when form is submitted
        form.addEventListener('submit', function() {
            //add element to array and dom
            const titleInputDOM = form.querySelector('#input-title');
            const descriptionInputDOM = form.querySelector('#input-description');
            const title = titleInputDOM.value;
            const description = descriptionInputDOM.value;
            const priority = form.querySelector('#input-priority').value;
            const dueDate = format(endOfToday(), "M-dd-yyyy");
            const containerDiv = document.getElementById(getContainerId(projectName));

            //form validation, if no redundant title
            if(!redundantTitle(projectName, title)){
                let newMainTask = new maintask(title, description, priority, dueDate, projectName)
                allMainTasks.push(newMainTask);
                containerDiv.appendChild(mainTask(newMainTask));
                form.remove();
            }
            //if there's a redundant title
            else{
                //on here
                let errorMessage = createDOMInsertBefore('p', form, titleInputDOM, ['error-message'], '', 'This main task title is already taken.');
                titleInputDOM.classList.add('error-input');
                titleInputDOM.addEventListener('focus', function() {
                    errorMessage.remove();
                    titleInputDOM.classList.remove('error-input');
                })
            }
            



            //CHECK LATER
            //if there are no current tasks or no redundant titles
            //need to add form valiation error
/* 
            let currMainTasksInProject = allMainTasks.filter(mainTask => mainTask.projectType == projectName); */
/*             if (currMainTasksInProject.length == 0 || checkRedundantTitle(currMainTasksInProject, title)) {
            } */
        })

        deleteBtn.addEventListener('click', function() {
            form.remove();
        })
    }

    //check if there's any existing tasks that equal the title trying to add 
    function redundantTitle(project, maintaskTitle, subtaskTitle = '') {
        const taskId = getTaskID(project, maintaskTitle, subtaskTitle);
        if(document.getElementById(taskId) != null)
            return true;
        return false;
    }


    let editMainTaskFormBtns = (form, mainTaskObj, deleteBtn) => {
        form.addEventListener('submit', function() {
            //replace the element in the array
            const taskIndex = allMainTasks.findIndex(mainTaskObj);
            const title = form.querySelector('#input-title').value;
            const description = form.querySelector('#input-description').value;
            const priority = form.querySelector('#input-priority').value;
            allMainTasks[taskIndex].title = title;
            allMainTasks[taskIndex].description = description;           
            allMainTasks[taskIndex].priority = priority;
            clearAllTasksDOM();
            addAllTasksDOM();
        })

        deleteBtn.addEventListener('click', function () {
            form.remove();
        })
    }

    //returns main task dom
    let mainTask = (mainTaskObj) => {
        const taskSection = document.createElement('section');
        taskSection.classList.add('task');
        taskSection.id = getTaskSectionID(mainTaskObj.project, mainTaskObj.title);

        //entire main task contains main task and description
        const entireMainTask = createDOMElem('div', taskSection, ['entire-main-task']);
        entireMainTask.id = getTaskID(mainTaskObj.project, mainTaskObj.title);

        //main task contains main task + main task's description
        const mainTask = createDOMElem('div', entireMainTask, ['main-task']);

        const checkboxPriorityContainer = createDOMElem('div', mainTask, ['icon-btn-container','checkbox-container']);
        const checkboxBtn = createDOMElem('button', checkboxPriorityContainer, ['icon-btn','checkbox','subheader-icon-btn']);
        createImgElem(checkboxIcon, checkboxBtn);
        appendPriorityImg(mainTaskObj.priority, checkboxPriorityContainer, ['priority-img','priority-subheader-img']);

        //for second col of main task
        const taskNameDiv = createDOMElem('div', mainTask, ['task-name']);
        const taskNameHeader = createDOMElem('h3', taskNameDiv, [], '', mainTaskObj.title);
        
        
        //for the third col of main task (the buttons)
        const taskHoverIconsDiv = createDOMElem('div', mainTask, ['task-hover-icons']);
        const addSubtaskBtn = createMainTaskHoverBtns('add-subtask-icon', plusIcon, taskHoverIconsDiv)
        const editTaskBtn = createMainTaskHoverBtns('edit-task-icon', editIcon, taskHoverIconsDiv)       
        const deleteTaskBtn = createMainTaskHoverBtns('delete-task-icon', deleteIcon, taskHoverIconsDiv)    

        //for the description div
        const descriptionDiv = createDOMElem('div', entireMainTask, ['main-task-description', 'description']);
        const descriptionText = createDOMElem('h4', descriptionDiv, [], '', mainTaskObj.description);

        hiddenUntilHoverFunctionality(taskHoverIconsDiv, entireMainTask);

        //add functionality to main task buttons
        mainTaskBtnsFunctionality(addSubtaskBtn, editTaskBtn, deleteTaskBtn, checkboxBtn, taskSection, mainTaskObj);

        return taskSection;
    }

    function hiddenUntilHoverFunctionality(buttonsDiv, entireTaskDiv){
        buttonsDiv.style.visibility = 'hidden';
        entireTaskDiv.addEventListener('mouseover', function () {
            buttonsDiv.style.visibility = 'visible';
        })

        entireTaskDiv.addEventListener('mouseout', function () {
            buttonsDiv.style.visibility = 'hidden';
        })                
    }

    function createMainTaskHoverBtns(uniqueClass, imgSrc, parentDiv){
        const btn = document.createElement('button')
        btn.classList.add('icon-btn','subheader-icon-btn', uniqueClass);
        const img = document.createElement('img');
        img.src = imgSrc;
        btn.appendChild(img);
        parentDiv.appendChild(btn);
        return btn;
    }

    function appendPriorityImg(priorityNum, parentDiv, classList) {
        switch (priorityNum) {
            case '1':
                createImgElem(priority1Icon, parentDiv, classList);
                break;
            case '2':
                createImgElem(priority2Icon, parentDiv, classList);
                break;
            case '3':
                createImgElem(priority3Icon, parentDiv, classList);
                break;
            case '4':
                createImgElem(priority4Icon, parentDiv, classList);
                break;
            case '5':
                createImgElem(priority5Icon, parentDiv, classList);
                break;               
        }
    }

    let mainTaskBtnsFunctionality = (addSubtaskBtn, editTaskBtn, deleteTaskBtn, checkboxBtn, taskSection, mainTaskObj) => {
        addSubtaskBtn.addEventListener('click', function() {
            taskSection.appendChild(subtaskForm('insert', mainTaskObj.title, mainTaskObj.project));
        })

        appendEditMainTaskForm(mainTaskObj, editTaskBtn, taskSection);

        deleteTaskBtn.addEventListener('click', function() {
            removeMainTask(mainTaskObj);
            taskSection.remove();
        })

        checkboxBtn.addEventListener('click', function () {
            removeMainTask(mainTaskObj);
            taskSection.remove();
        })
    }

    //removes the main task and the subtasks that have the main tasks
    function removeMainTask(mainTaskObj) {
        const indexMainTask = allMainTasks.findIndex(task => task == mainTaskObj);
        allMainTasks.splice(indexMainTask, 1);

        const mainTaskTitle = mainTaskObj.title;
        for(let i = 0; i < allSubtasks.length; i++) {
            if(allSubtasks[i].maintask == mainTaskTitle){
                allSubtasks.splice(i,1);
                i--;
            }
        }
    } 


    let subtaskForm = (functionality, mainTaskTitle, mainTaskProject, subTaskObj = '') => {
        const form = document.createElement('form');
        disableRedirectFunction(form);
        const subtaskHeader = createDOMElem('h4', form, ['subtask-form-header']);
        const titleInput = createInput('text', form, true, 'Title');
        const descriptionInput = createInput('text', form, true, 'Description');
        
        const subtaskBtnsContainer = createDOMElem('div', form, ['form-btns','subtask-btns']);;
        const submitBtn = createDOMElem('button', subtaskBtnsContainer, ['icon-btn','undersubheader-icon-btn']);
        submitBtn.setAttribute('type','submit');
        createImgElem(checkmarkIcon, submitBtn);
        const deleteBtn = createDOMElem('button', subtaskBtnsContainer, ['icon-btn','undersubheader-icon-btn']);
        createImgElem(deleteIcon, deleteBtn);
        form.id = 'subtask-form';
        titleInput.id = 'input-title';
        descriptionInput.id = 'input-description';

        if(functionality == 'insert'){
            subtaskHeader.innerText = 'Insert Subtask';
            insertSubtaskFormBtns(form, mainTaskTitle, mainTaskProject, deleteBtn);

        }
        else if (functionality == 'edit'){
            subtaskHeader.innerText = 'Edit Subtask';
            titleInput.value = subTaskObj.title;
            descriptionInput.value = subTaskObj.description;
            editSubtaskFormBtns(form, subTaskObj, deleteBtn);
        }

        return form;
    }

    let insertSubtaskFormBtns = (form, mainTaskTitle, mainTaskProject, deleteBtn) => {
        form.addEventListener('submit', function () {
            const taskSectionId = getTaskSectionID(mainTaskProject, mainTaskTitle);
            const taskSection = document.getElementById(taskSectionId);
            const title = form.querySelector('#input-title').value;
            const description = form.querySelector('#input-description').value;
            
            const newSubTask = new subtask(title, description, mainTaskTitle, mainTaskProject);
            allSubtasks.push(newSubTask);
            taskSection.appendChild(subTask(newSubTask));
            form.remove();
        })

        deleteBtn.addEventListener('click', function () {
            form.remove();
        })
    }

    let editSubtaskFormBtns = (form, subTaskObj, deleteBtn) => {
        form.addEventListener('submit', function() {
            const title = form.querySelector('#input-title').value;
            const description = form.querySelector('#input-description').value;
            let indexSubTask = allSubtasks.indexOf(subTaskObj);
            allSubtasks[indexSubTask].edit(title, description);
            clearAllTasksDOM();
            addAllTasksDOM();
        })

        deleteBtn.addEventListener('click', function (){
            form.remove();
        })

    }


    let clearAllTasksDOM = () => {
        let allProjects = getAllProjects();

        for(let i = 0; i < allProjects.length; i++) {
            let containerDiv = document.getElementById(getContainerId(allProjects[i]));
            containerDiv.remove();
        }
    }

    let addAllTasksDOM = () => {
        let allProjects = getAllProjects();
        //these are where the div is appended
        const workTaskSection = document.getElementById('work-tasks');
        const projectTaskSection = document.getElementById('project-tasks');

        //create the default work-div under the work-tasks
        let workDiv = '';
        if(document.getElementById(getContainerId('Work')) == null){
            workDiv = createDOMElem('div', workTaskSection, [], getContainerId('Work'));
        } else {
            workDiv = document.getElementById(getContainerId('Work'));
        }

        //add main task and subtasks
        for(let i = 0; i < allProjects.length; i++) {
            let currProject = allProjects[i];
            let containerDiv = '';
            let mainTasksInProject = allMainTasks.filter(mainTask => mainTask.project == currProject);
            let subtasksInProject = allSubtasks.filter(subTask => subTask.project == currProject);
            if(currProject == 'Work'){
                containerDiv = workDiv;
            }
            else{
                containerDiv = createDOMElem('div', projectTaskSection, [], getContainerId(currProject));
            }

            mainTasksInProject.forEach(individualMainTask => containerDiv.appendChild(mainTask(individualMainTask)));
            //append all subtasks to maintask
            subtasksInProject.forEach(individualSubTask => {
                console.log(getTaskSectionID(individualSubTask.project, individualSubTask.maintask));
                let sectionToAppend = document.getElementById(getTaskSectionID(individualSubTask.project, individualSubTask.maintask));
                sectionToAppend.appendChild(subTask(individualSubTask));
            })

        }
    }

    function getAllProjects() {
        let allProjects = [];
        for(let i = 0; i < allMainTasks.length; i++){
            if(!allProjects.includes(allMainTasks[i].project,0)){
                allProjects.push(allMainTasks[i].project);
            }
        }
        return allProjects;
    }

    //to create subtasks, not appended to dom
    let subTask = (subtaskObj) => {
        const entireSubtaskDiv = document.createElement('div');
        entireSubtaskDiv.classList.add('entire-subtask');
        const subtaskDiv = createDOMElem('div', entireSubtaskDiv, ['subtask']);

        //for first col of subtaskDiv
        const checkboxContainer = createDOMElem('div', subtaskDiv, ['subtask-checkbox','checkbox-container']);
        const checkboxBtn = createDOMElem('button', checkboxContainer, ['icon-btn','checkbox','undersubheader-icon-btn']);
        createImgElem(checkboxIcon, checkboxBtn);

        //for second col of subtaskDiv
        const subtaskName = createDOMElem('div', subtaskDiv, ['subtask-name']);
        const subtaskTitle = createDOMElem('h4', subtaskName, [], '', subtaskObj.title);

        //for third col of subtaskDiv
        const subtaskBtnsContainer = createDOMElem('div',subtaskDiv,['subtask-hover-icons']);
        const editBtn = createDOMElem('button', subtaskBtnsContainer, ['icon-btn','edit-task-icon','undersubheader-icon-btn']);
        createImgElem(editIcon, editBtn);
        const deleteBtn = createDOMElem('button', subtaskBtnsContainer, ['icon-btn','delete-task-icon','undersubheader-icon-btn']);
        createImgElem(deleteIcon, deleteBtn);

        //for subtask description
        const subtaskDescriptionDiv = createDOMElem('div', entireSubtaskDiv, ['subtask-description','description']);
        const subtaskDescriptionText = createDOMElem('h5', subtaskDescriptionDiv, [], "", subtaskObj.description);

        addSubtaskBtnFunctionality(checkboxBtn, editBtn, deleteBtn, entireSubtaskDiv, subtaskObj);
        hiddenUntilHoverFunctionality(subtaskBtnsContainer, entireSubtaskDiv);

        return entireSubtaskDiv;
    }


    function addSubtaskBtnFunctionality(checkboxBtn, editBtn, deleteBtn, entireSubtaskDiv, subtaskObj) {
        checkboxBtn.addEventListener('click', function() {
            removeSubtask(subtaskObj);
            entireSubtaskDiv.remove();
        })

        editBtn.addEventListener('click', function() {
            entireSubtaskDiv.appendChild(subtaskForm('edit', subtaskObj.title, subtaskObj.project, subtaskObj));
        })

        deleteBtn.addEventListener('click', function() {
            removeSubtask(subtaskObj);            
            entireSubtaskDiv.remove();
        })
    }

    //removes the subtask obj from the array
    function removeSubtask(subtaskObj) {
        const index = allSubtasks.findIndex(subtaskObj);
        allSubtasks.splice(index, 1);
    }

    return {appendInsertMainTaskForm, addAllTasksDOM};
}

export {taskDOMFunction};