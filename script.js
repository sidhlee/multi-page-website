AOS.init();

const aboutLink = document.querySelector('.nav-modal > ul > li:nth-of-type(2)');
const toggler = document.querySelector('.menu-toggler');

aboutLink.addEventListener('click', uncheckToggler);

function uncheckToggler() {
	toggler.click();
}

// Trying to find out why clicking on link doesn't toggle the checkbox
// const menuModal = document.querySelector('.menu-modal')
// menuModal.addEventListener('click', (e) => {
// 	console.log('click')
// 	console.log(e.target)
// 	console.log(toggler.checked)
// })
