# Bootcamp Project 1 - Multi-Page Site

## Project Requirement

### Code

-   Site is responsive and uses media queries
-   Flexbox is used
-   Sass variables are used
-   All images considered content have descriptive alt text
-   All forms are implemented using proper accessibility techniques
-   Mobile view provides good user experience
-   Files, folders and project repo follow a consisting naming convention (ie. kabob-case)
-   Naming convention throughout HTML and CSS is consistent (ie. kabob-case) or follows a known pattern (ie. BEM)
-   Project is organized using Sass partials (minimum 2)
-   Project represents the provided design well
-   Navigation should link to other pages made for the project
-   Site is live on GH Pages, Netlify, or student’s own URL

Additionally, you will be given a general mark on how well you adhere to best practices mentioned in class. Best practices include but may not be limited to this lesson.

### Presentation

-   Discuss one technical win
-   Discuss one technical challenge
-   Stay within the specified time limit
-   Speak clearly and loud enough for everyone to hear
-   Turn your Zoom video ON as both a presenter and observer
-   Demonstrate the project effectively with screen-sharing tools

## Technical Wins

### Fluid layout with VW and CSS Math Functions

I used viewport width unit on font-size and spacing to make them stretch and shrink based on the viewport width. This eliminates the need of having many media queries where we usually define different font sizes and padding & margin values to fit the current viewport.
You can also limit the range of the font-size to avoid it getting too small or too big, and this can be done by combining CSS min function with max function. You can also create a fluid padding value with technique inside a wrapper container, to make it wider as the viewport width becomes greater. When you need smaller or larger padding value than the one you defined with vw, then you can use css calc function and scale that value as needed.
(e.g. calc(0.5 \* var(--padding-x)));

## Technical Challenges

### Handling overflow

In this particular project, the biggest challenge for me was when dealing with elements that have some of its children element overflowing the parent container. Overflowing itself wasn't that difficult, but I found it tricky to come up with a way that allows for more responsiveness. For example, I had this card component that has its image part overflowing to the side. The solution was actually not overflowing the image at all. Instead, I used the same variable that I used for the wrapper padding, to indent the text content of the card to make it look like the image was overflowing the container. This solution only worked because the given design didn't have any borders around the card so the users can't see whether the image was sticking out or the content was having extra padding on one side.

### Un-checking input without page reload or JS

When the navigation link is opened inside the modal, users can click anywhere to close it. This was implemented by wrapping the modal inside a label that links to the checkbox. However, this doesn't work when the users click on a link that navigates within the same page. The click event properly propagates into the wrapping label element but for some reason, the label is not toggling the linked checkbox.

To confirm this behavior, I ran a simple test:

```js
const menuModal = document.querySelector('.menu-modal');
menuModal.addEventListener('click', (e) => {
	console.log('click');
	console.log(e.target);
	console.log(toggler.checked);
});
```

When I click on the About link, the following result is logged into the console:

```text
click
<a href=​"#about​">​About​</a>​
true
```

It works as expected as soon as I remove the `href` attribute from the About link.
I decided not to spend more time on this behavior because in real project, it is very unlikely that I'll use checkbox to implement modal and it IS solvable with a little bit of JavaScript.

```js
const aboutLink = document.querySelector('.nav-modal > ul > li:nth-of-type(2)');
const toggler = document.querySelector('.menu-toggler');

aboutLink.addEventListener('click', uncheckToggler);

function uncheckToggler() {
	toggler.click();
}
```

## References

-   [Sass Guideline](https://sass-guidelin.es/)
-   [Airbnb CSS/SASS Style Guide](https://github.com/airbnb/css#oocss-and-bem)
