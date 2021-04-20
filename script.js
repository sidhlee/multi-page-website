AOS.init();

const toggler = document.querySelector('.menu-toggler');

// Trying to find out why clicking on link doesn't toggle the checkbox
// menuModal.addEventListener('click', (e) => {
// 	console.log('click')
// 	console.log(e.target)
// 	console.log(toggler.checked)
// })

const links = document.querySelectorAll('.nav-links > li > a');
links.forEach(function (link) {
	link.addEventListener('click', handleLinkClick);
});

function handleLinkClick(e) {
	// don't need to call e.preventDefault() because the browser will redirect AFTER running the block

	// toggle .active for active link styling
	toggleActiveClass(this);
	// toggle checkbox value(checked)
	toggler.click();
}

function toggleActiveClass(linkElem) {
	links.forEach((link) => link.classList.remove('active'));
	linkElem.classList.add('active');
}
