import plusIcon from '../assets/plus-circle.svg';

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
        plusIconImg.src = plusIcon;

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

