# Tweeter Project

Tweeter is a single-page Twitter clone that allows users to create and interact with tweets. This project was built to demonstrate front-end skills in HTML, CSS, JS, jQuery, and AJAX, as well as back-end development with Node.js and Express.

---

## Features

- **Dynamic Design**:  
  The site is fully responsive, providing an optimal experience on phones, tablets, and desktops.

- **Interactive Elements**:  
  - An **animated arrow** under the "Write a new tweet" section in the navigation bar adds a nice touch.  
  - Buttons, including the **TWEET** button and the **flag**, **retweet**, and **heart** icons, change color when hovered over, as well as change cursor into a pointer enhancing the user experience.

- **Real-Time Validation**:  
  Alert messages are displayed if:  
  1. A tweet is submitted with **no text**.  
     ![Empty Tweet Alert](https://github.com/SilentYell/Tweeter/blob/master/public/images/tweeter-error-empty.jpeg?raw=true)  
  2. The tweet exceeds the **character limit of 140**.  
     ![Character Limit Alert](https://github.com/SilentYell/Tweeter/blob/master/public/images/tweeter-error-too-many-characters.jpeg?raw=true) 

- **Seamless Tweet Creation**:  
  Users can compose and post tweets dynamically without page reloads.

---

## Preview

Below are examples of how the app appears on different devices:

### Desktop View
![Desktop View](https://github.com/SilentYell/Tweeter/blob/master/public/images/tweeter-desktop.jpeg?raw=true)

### Tablet View
![Tablet View](https://github.com/SilentYell/Tweeter/blob/master/public/images/tweeter-tablet.jpeg?raw=true)

### Mobile View
![Mobile View](https://github.com/SilentYell/Tweeter/blob/master/public/images/tweeter-phone.jpeg?raw=true)

---

## Getting Started

1. Clone this repository to your local device:
  `git clone <repository-url>`

2. Navigate to the project directory:
  `cd tweeter`

3. Install dependencies using the following command:
  `npm install`

4. Start the web server with:
  `npm run local`
  The app will be served at http://localhost:8080/.

5. Open http://localhost:8080/ in your browser to view the application.

## Dependencies

- Express
- Node 5.10.x or above