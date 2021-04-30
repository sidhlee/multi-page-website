/* ===============================================
 *	Navigation
 *  - add .active class based on current url
 * ==============================================*/

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
	}
}

/* ===============================================
 *	Gallery Carousel (infinite scroll)
 *  - start with as many items that can be displayed
 *  - Add one more item (400x400) to the right but it's hidden to the right of the viewport
 *  - when the user navigate to that hidden item making it visible in viewport, call API again, and add another
 * ==============================================*/

const galleryElement = document.querySelector('.gallery');
const galleryItemListElement = document.querySelector('.gallery-items');

let itemCount = 3;
// first gallery item in visible area
let firstItemIndex = 0;

/**
 * Create HTMLElement with given classNames and attributes
 * @param {string} tagName
 * @param {string} className eg) "btn btn-primary"
 * @param {object} attributesObj
 * @returns {HTMLElement}
 */
function createElement(tagName, className, attributesObj) {
	const itemElement = document.createElement(tagName);
	itemElement.classList.add(...className.split(' '));
	Object.entries(attributesObj).forEach(([key, val]) => {
		itemElement.setAttribute(key, val);
	});

	return itemElement;
}

/**
 * append or prepend element into target
 * @param {HTMLElement} element
 * @param {HTMLElement} target
 * @param {boolean} isPrepend
 */
function insertElement(element, target, isPrepend = false) {
	if (isPrepend) {
		target.prepend(element);
	} else {
		target.append(element);
	}
}

// Add gallery item
function getGalleryItemElement(itemId) {
	const attributes = {
		'data-aos': 'fade-left',
		'data-aos-once': 'true',
		'data-aos-delay': '300',
	};
	const itemElement = createElement('li', 'gallery-item aaa', attributes);

	itemElement.innerHTML = `<img src="https://picsum.photos/400/400?random=${itemId}" alt="a random placeholder image" />`;

	return itemElement;
}

function addGalleryItem() {
	const currentItemId = ++itemCount;

	const galleryItemElement = getGalleryItemElement(currentItemId);
	insertElement(galleryItemElement, galleryItemListElement);
}

function slideGalleryItems(firstItemIndex) {
	const right = `calc(${firstItemIndex} * (var(--gallery-item-width) + var(--gallery-gutter)))`;
	galleryItemListElement.style.right = right;
}

function handleLeftGalleryButtonClick() {
	if (firstItemIndex > 0) {
		firstItemIndex--;
		slideGalleryItems(firstItemIndex);
	}
}

function handleRightGalleryButtonClick() {
	firstItemIndex++;
	slideGalleryItems(firstItemIndex);
	// we're showing maximum 3 items at once.
	const lastItemIndex = firstItemIndex + 2;
	// If the last item showing is the last item in the list, add another item at the end
	if (lastItemIndex === itemCount - 1) {
		addGalleryItem();
	}
}

function bindGalleryButtonClick() {
	document
		.querySelector('.gallery-btn-left')
		.addEventListener('click', handleLeftGalleryButtonClick);

	document
		.querySelector('.gallery-btn-right')
		.addEventListener('click', handleRightGalleryButtonClick);
}

/* ===============================================
 *	Init
 * ==============================================*/

const app = {
	init() {
		if (window.AOS) {
			AOS.init();
		}
		// Add handlers to links
		links.forEach(function (link) {
			link.addEventListener('click', handleLinkClick);
		});
		// activate links
		styleActiveLink(currentPath);

		if (url.pathname === '/') {
			// bind carousel next/prev buttons with click event handlers
			bindGalleryButtonClick();
			// add one more gallery item to the right
			addGalleryItem();
		}
	},
};

app.init();
