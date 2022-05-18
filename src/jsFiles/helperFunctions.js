function createDOMElem(elementType, parentDiv, classList = [], uniqueId = '', text = '') {
    const elem = document.createElement(elementType);
    classList.forEach(uniqueClass => {elem.classList.add(uniqueClass)});
    if(uniqueId != '') {
        elem.id = uniqueId;
    }
    elem.innerText = text;
    parentDiv.appendChild(elem);
    return elem;
}

function createDOMInsertBefore(elementType, parentDiv, divAfter, classList = [], uniqueId = '', text = '') {
    const elem = document.createElement(elementType);
    classList.forEach(uniqueClass => {elem.classList.add(uniqueClass)});
    if(uniqueId != '') {
        elem.id = uniqueId;
    }
    elem.innerText = text;
    parentDiv.insertBefore(elem, divAfter);
    return elem;
}

function createImgElem(imgSrc, parentDiv, classList = [], uniqueId = ''){
    const elem = document.createElement('img');
    elem.src = imgSrc;
    classList.forEach(uniqueClass => {elem.classList.add(uniqueClass)});
    if(uniqueId != '') {
        elem.id = uniqueId;
    }
    parentDiv.appendChild(elem);
    return elem;       
}

function createInput(type, parentDiv, isRequired, placeholder = '', classList = [], uniqueId = '') {
    const elem = document.createElement('input');
    elem.setAttribute('type',type);
    elem.setAttribute('placeholder',placeholder);
    elem.required = isRequired;
    classList.forEach(uniqueClass => elem.classList.add(uniqueClass));
    if(uniqueId != '') {
        elem.id = uniqueId;
    }
    parentDiv.appendChild(elem);
    return elem;
}


export {createDOMElem, createDOMInsertBefore, createImgElem, createInput};