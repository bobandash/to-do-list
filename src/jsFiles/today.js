import {createDOMElem, createImgElem} from './helperFunctions.js'
import plusIcon from '../assets/plus-circle.svg';
import {taskDOMFunction} from './taskDOM.js'

//to create today skeleton
let todayDomElements = () => {

    let createDefaultTodayFormat = () => {
        let taskDOM = taskDOMFunction();


        const mainMenuDiv = document.getElementById('mainmenu');
        createDOMElem('h1', mainMenuDiv, ['header-text'], '', 'Today');
        
        //create work section
        const workHeader = createDOMElem('h2', mainMenuDiv, [], 'work-header', 'Work');
        const addWorkBtn = createDOMElem('button', workHeader, ['icon-btn','header-icon-btn','icon-adj-text'],'add-work-task');
        createImgElem(plusIcon, addWorkBtn);

        const workSection = createDOMElem('section', mainMenuDiv, [], 'work-tasks');
        //create div that stores all work elements
        const allWorkTasksContainerDiv = createDOMElem('div', workSection, [], 'work-div');

        //create project section
        const projectHeader = createDOMElem('h2', mainMenuDiv, [], 'project-header', 'Project');
        const addProjectBtn = createDOMElem('button', projectHeader, ['icon-btn','header-icon-btn','icon-adj-text'],'add-project');
        createImgElem(plusIcon, addProjectBtn);       
        const projectSection = createDOMElem('section', mainMenuDiv, [], 'project-tasks');

        //add default button functionality
        taskDOM.appendInsertMainTaskForm('Work', addWorkBtn);
        taskDOM.addAllTasksDOM();

/*         btns.addTask('Work', addWorkBtn); */
    }
    
    return {createDefaultTodayFormat}; 
}


export {todayDomElements as default};