# Equipit Coding Excerpts

## Equipit Overview

Equipit.com, now out of business, was a catalogue for equipment usage for basic users. A user could create a 'kit' and indicate what equipment they used and where they got it from.

Equipit used a graphical interface where a user could post a picture of their use and indicate which pieces of equipment were used and in what context, overlaying products on the image to display said product and give an overview on where to purchase it.


## The Code Excerpts

This is to show my a portion of my time working for Equipit.com. It will be minimal and will be unable to run.

These excerpts are an attempt to show our archetectural structure and breakdown of our code, alongside a few examples of how we handled and used ReactJS and Redux in conjunction with one another.


## Equipit Architecture Overview

Our architecture consisted of ReactJS, Redux, Webpack and Sass.

React was primarily used for view components as business logic was separated from the view using Redux. React state was only used for relative simple or small adjustments to UX/UI concerns, or to increase portability of a component across the website.

We primarily relied on Redux for our caching and information at the session level. Using the store structure to maintain values and business logic separate from the react view components.

We utilized webpack component moduling to separate out sass files to fit each react component, an attempt to breakdown the monolithic css files that can occur if using a more global system.

Finally, we used CanvasAPI to maintain our product designer. Using it to manipulate images and graphical interfacing.
