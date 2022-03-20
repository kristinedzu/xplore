# Explore the Xplore

## Short description of the app, concept, and idea.

Xplore is a mobile app that connects travelers and people that like exploring the world. Our idea was to create a solution that will ease the process of finding a new destination and reading real opinions while scrolling through images of the various places. You can not only check how the place that you want to visit looks like from many perspectives, but also find a lot of new interesting places that others are recommending in a specific country or city. And if you visited some interesting places and you want to share your images and opinions, you can also add your own reviews to any city in the world!

## Design Choices

The design of our app is very simple and easy to use. The structure of Pages and navigation is always visible and easy to learn. We are showing the names of the tabs in the Nav and pages titles on every step, so our users won’t feel lost, and thanks to that we increase the recognition of the icons and elements. Our design is speaking user language, so we are using user-friendly wording and we are informing about the actions that are taken in the UI by the usage of Toasts as notifications. To provide users with proper controls, we added Back Buttons on pages as well as clear Cancel Buttons in places, where the action might require going back in the process. 

As we are using Sliders to display our posts and images, we are showing a part of the next post in the slider to inform that this area is scrollable. We include the most important information in crucial places in our UI to save the data on the screen, not in the user’s memory e.g. while displaying a huge list of the countries that can be chosen while creating a post 😁 Last but not least, our design is minimalistic and clear to allow focusing on the images from travels and leave space for main elements of our app - our users content. The styling of the app is based on Ionic Components with some of the custom CSS styling to keep our Xplore theme.

## Description of the project structure and “Thinking in React”

As we know React is a JavaScript library for building user interfaces. One of the most essential advantages of React are components. The possibility of having and using them improves the whole workflow and decreases the time when some changes are required to be made in the code. Thus, our project is following React’s main rules and intentions. Our project’s structure contains two of the most important folders: components and pages.  Regarding components, we wanted to use the whole potential of them, so we created the following one as a country item, city item, form, and so on. Whereas, Page folder stores templates and layouts for exact pages such as the Login page, Home page, and much more. 

Moreover, in the component, we are able to take input data through the internal state data. Thanks to that, render markup will update the content when data changes.

## How to run the app in the browser and in the Xcode

To run the app you have to install a few npm packages: 
1. Npm
    - `npm install`
2. Ionic
    - `npm install -g @ionic/cli`
3. Plugin Eslint
    - `npm install -g eslint`
4. Firebase
    - `npm install @firebase/auth`
    - `npm install @firebase/database`
    - `npm install @firebase/storage`
5. Stars rating
    - `npm i react-rating-stars-component`

TTo run the Ionic project in the browser type in the terminal `ionic serve`.

Becuase our app uses native API you need to install Capacitor and some plugins. Firstly, in the root of your app, install Capacitor:
- `npm install @capacitor/core`
- `npm install @capacitor/cli --save-dev`

Then install plugins: 
1. Camera
    `npm install @capacitor/camera`
2. Toast
    `npm install @capacitor/toast`
    `npm install @ionic/pwa-elements`
3. Splash screen
    `npm install @capacitor/splash-screen`
4. Sync changes
    `npx cap sync` or `ionic cap sync`

To run the app in Xcode type:
`ionic cap open ios`
