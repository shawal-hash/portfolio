/*
  ========================================
  PORTFOLIO INTERACTIVITY SCRIPT
  ========================================
  
  This script handles:
  1. Mobile hamburger menu toggle
  2. Smooth scrolling for navigation links
  3. Contact form validation
  4. Form submission handling
*/

// ========================================
// 1. MOBILE HAMBURGER MENU
// ========================================

/*
  Explanation:
  We need to select the hamburger element and the navigation links
  Then add an event listener that toggles a class when hamburger is clicked
  The class controls visibility of the nav menu
*/

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

/*
  document.querySelector('.hamburger') finds the first element with class "hamburger"
  We store it in a constant called "hamburger"
  Constants are like variables but can't be changed once assigned
*/

if (hamburger) {
  hamburger.addEventListener('click', () => {
    /*
      addEventListener('click', ...) listens for a click event
      The arrow function () => { } runs when clicked
      This is called an event handler
    */
    navLinks.classList.toggle('active');
    /*
      classList is a built-in property that manages CSS classes
      .toggle('active') adds the class if it doesn't exist, removes it if it does
      We'll add CSS for the .nav-links.active class below in the CSS file
    */
    hamburger.classList.toggle('active');
  });
}

/*
  if (hamburger) checks if hamburger element exists before trying to use it
  This prevents errors if the element isn't found
*/

// ========================================
// 2. SMOOTH SCROLLING FOR NAVIGATION LINKS
// ========================================

/*
  When you click a navigation link like href="#about", the browser normally jumps
  We want it to scroll smoothly instead
  HTML already handles some of this with scroll-behavior: smooth in CSS
  But we'll add JavaScript to ensure it works and to close the mobile menu
*/

const navItems = document.querySelectorAll('.nav-links a');

/*
  document.querySelectorAll() selects ALL elements matching the selector
  This returns a NodeList (similar to an array) of all nav links
*/

navItems.forEach(link => {
  /*
    forEach loops through each link
    'link' is the current item in the loop
    This is similar to a for loop but cleaner for arrays/NodeLists
  */
  link.addEventListener('click', (e) => {
    /*
      When a nav link is clicked, we want to close the mobile menu
      This happens automatically if the link has an anchor (href="#section")
      but we need to close the menu manually
    */
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
    /*
      .remove('active') removes the class, hiding the mobile menu
    */
  });
});

// ========================================
// 3. CONTACT FORM VALIDATION & SUBMISSION
// ========================================

/*
  Forms are important for user interaction
  We need to:
  1. Validate inputs (check if they're valid)
  2. Prevent form from submitting with empty fields (HTML required attribute helps)
  3. Show feedback to user
  4. Handle form submission (send data)
*/

const contactForm = document.getElementById('contactForm');

/*
  document.getElementById('contactForm') finds element with id="contactForm"
  We can use this method when looking for a specific unique element
*/

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    /*
      'submit' event fires when user clicks submit button
      'e' (event object) contains information about what happened
    */
    e.preventDefault();
    /*
      preventDefault() stops the form from doing its default behavior
      (which would normally refresh the page)
      This lets us handle the submission with JavaScript instead
    */

    // Get form values
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    /*
      .value gets what the user typed in each field
      .trim() removes whitespace from start and end
      This prevents issues like "  John  " being treated as valid
    */

    // Validate fields
    if (!name || !email || !message) {
      /*
        The ! means "not"
        !name means "if name is empty"
        If any field is empty, show error
      */
      alert('Please fill in all fields');
      return;
      /*
        return stops the function from continuing
      */
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    /*
      This is a regular expression (regex) pattern
      It checks if the email has format: something@something.something
      ^ means start, $ means end
      [^\s@]+ means one or more characters that aren't space or @
      @ is literal @
      \. is a literal dot (. has special meaning in regex, so \ escapes it)
    */

    if (!emailRegex.test(email)) {
      /*
        .test(email) checks if email matches the pattern
        Returns true if it matches, false if it doesn't
      */
      alert('Please enter a valid email address');
      return;
    }

    // If validation passes, show success message
    alert('Thank you for your message! I will get back to you soon.');

    /*
      In a real application, you would send this data to a server here
      For now, we just show a success message
      Later with Node.js, we'll actually send this data to a backend
    */

    // Clear the form
    contactForm.reset();
    /*
      .reset() clears all fields in the form
      This gives the user feedback that their submission was received
    */
  });
}

// ========================================
// 4. SCROLL TO TOP BUTTON
// ========================================

/*
  Let's add a "back to top" button that appears when user scrolls down
  This is optional but improves user experience on long pages
*/

// Create button element dynamically
const scrollTopBtn = document.createElement('button');
/*
  document.createElement() creates a new HTML element
  We're creating a button element in JavaScript instead of HTML
  This button won't exist until JavaScript runs
*/

scrollTopBtn.innerHTML = '↑';
/*
  innerHTML sets the HTML content inside the button
  ↑ is an arrow character
*/

scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.style.display = 'none';
/*
  style.display = 'none' hides the button initially
  We'll show it when user scrolls down
*/

document.body.appendChild(scrollTopBtn);
/*
  appendChild() adds the button to the page
  document.body is the body tag
  This adds the button as the last element in the body
*/

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
  /*
    'scroll' event fires whenever user scrolls
    window is the browser window/viewport
  */
  if (window.scrollY > 300) {
    /*
      window.scrollY is how many pixels the page has scrolled down
      If scrolled more than 300px, show the button
    */
    scrollTopBtn.style.display = 'block';
  } else {
    scrollTopBtn.style.display = 'none';
  }
});

// Scroll to top when button is clicked
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    /*
      window.scrollTo() scrolls the page
      top: 0 means scroll to the very top
    */
    behavior: 'smooth'
    /*
      behavior: 'smooth' makes it scroll smoothly instead of jumping
    */
  });
});

// ========================================
// 5. STYLING THE SCROLL TO TOP BUTTON
// ========================================

/*
  We're adding CSS styles to the button with JavaScript
  This is another way to style elements dynamically
*/

const styles = `
  #scrollTopBtn {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 50%;
    font-size: 24px;
    cursor: pointer;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    transition: all 0.3s ease;
    z-index: 999;
  }

  #scrollTopBtn:hover {
    background-color: #2980b9;
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.4);
  }
`;

/*
  This is CSS code stored as a string
  We're adding it to the page dynamically with JavaScript
*/

const styleSheet = document.createElement('style');
styleSheet.innerHTML = styles;
document.head.appendChild(styleSheet);

/*
  We create a <style> element, fill it with our CSS, and add it to the page head
  This is another way to inject styles dynamically
*/

// ========================================
// 6. ADD ACTIVE CLASS TO MOBILE MENU STYLES
// ========================================

/*
  We need to add CSS for when the mobile menu is active (visible)
  Let's add that styling dynamically too
*/

const mobileMenuStyles = `
  @media (max-width: 768px) {
    .nav-links.active {
      display: flex !important;
      flex-direction: column;
      position: absolute;
      top: 60px;
      left: 0;
      right: 0;
      background-color: #2c3e50;
      flex-direction: column;
      padding: 1rem 0;
    }

    .nav-links.active li {
      text-align: center;
      padding: 1rem 0;
    }

    .hamburger.active span:nth-child(1) {
      transform: rotate(45deg) translate(10px, 10px);
    }

    .hamburger.active span:nth-child(2) {
      opacity: 0;
    }

    .hamburger.active span:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -7px);
    }
  }
`;

/*
  This CSS styles the mobile menu when it's active
  .nav-links.active means "nav-links when it has the active class"
  
  The hamburger animation:
  - First span rotates 45 degrees (becomes top diagonal line)
  - Second span becomes invisible
  - Third span rotates -45 degrees (becomes bottom diagonal line)
  This creates the classic "X" animation
*/

const mobileMenuStyleSheet = document.createElement('style');
mobileMenuStyleSheet.innerHTML = mobileMenuStyles;
document.head.appendChild(mobileMenuStyleSheet);

// ========================================
// 7. CONSOLE LOGGING (For Debugging)
// ========================================

console.log('Portfolio script loaded successfully!');
/*
  console.log() outputs messages to the browser's developer console
  This helps us debug and understand what's happening
  You can open the console with F12 or right-click > Inspect > Console tab
*/
