AOS.init();

const links = document.querySelectorAll('.nav-links > li > a');
const toggler = document.querySelector('.menu-toggler');
const url = new URL(window.location.href);
// pathname doesn't contain hash
const currentPath = url.pathname + url.hash;

function matchPaths(a, b) {
	return a.replace(/\//g, '') === b.replace('/', '');
}

// Add .active to all links that match the given path and remove it from other links
function styleActiveLink(activeLinkHref) {
	links.forEach((link) => {
		const linkHref = link.attributes.href.value;
		const isMatch = matchPaths(activeLinkHref, linkHref);

		if (isMatch) {
			link.classList.add('active');
		} else {
			link.classList.remove('active');
		}
	});
}

function handleLinkClick(e) {
	// don't need to call e.preventDefault() because the browser will redirect AFTER running the block

	const clickedLinkPath = this.attributes.href.value;
	styleActiveLink(clickedLinkPath);

	// toggle checkbox value(checked) only when the modal is open and it's internal link
	// when link inside label is clicked, the targeted input value will not change.
	// this is desired behaviour because when that happens,
	// the user's intension is to navigate to that link, not to update any form values
	const isModalOpen = toggler.checked;
	const isHomePage = currentPath === '/';
	if (isHomePage && isModalOpen) {
		toggler.click();
		console.log('clicked');
	}
}

// Add handlers to links
links.forEach(function (link) {
	link.addEventListener('click', handleLinkClick);
});

// activate links on page load
styleActiveLink(currentPath);
