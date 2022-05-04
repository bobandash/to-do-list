const logoItem = document.getElementById('logo');
const logoMarginLeft= getComputedStyle(logoItem).marginLeft;

const sidebarMainHeader = Array.from(document.getElementsByClassName("sidebar-main-header"));
const sidebarSubHeader = Array.from(document.getElementsByClassName('sidebar-subheader'));

sidebarMainHeader.forEach(e => e.style.marginLeft = logoMarginLeft);
sidebarSubHeader.forEach(e => e.style.marginLeft = parseInt(logoMarginLeft,10) + 10 + 'px');

sidebarMainHeader[0].style.marginLeft = logoMarginLeft;
/* projects-nav */

