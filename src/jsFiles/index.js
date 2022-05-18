import { endOfDay } from "date-fns";
import createDOMSkeleton from "./skeleton.js"
import { maintask, subtask } from "./storedData.js";
import todayDomElements from "./today.js";
import endOfToday from 'date-fns/endOfToday'

let defaultSkeleton = createDOMSkeleton();
let todayDOM = todayDomElements();

let testMainTask = new maintask('Learn How to Code','Bob the Builder', '1',  endOfToday(), 'Work');
let testSubtask = new subtask('Finish this to-do list asap','Hello','Learn How to Code','Work');

let allMainTasks = [];
let allSubtasks = [];
let allProjects = [];

allMainTasks.push(testMainTask);
allSubtasks.push(testSubtask);

defaultSkeleton.createSkeleton();
todayDOM.createDefaultTodayFormat();

export {allMainTasks, allSubtasks, allProjects};
