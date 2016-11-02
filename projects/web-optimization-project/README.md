## Website Performance Optimization portfolio project
Project by: Eddie Chou

### To run part 1: 
- Unzip all the files.
- Part 1: Run index.html in Google Chrome. index-work.html is more readable.

### To run part 2:
- Part 2: Run views/pizza.min.html in Google Chrome. It uses minified versions of all files.
- The unminified versions are named accordingly (without .min).
- The JavaScript file for Part 2: views/js/main.js and the minified version is views/js/main.min.js


### Part 1: Optimize PageSpeed Insights score for index.html

Mobile: 95/100, Desktop: 97/100

Optimizations made:

- Removed webfont link from HTML and CSS
- Minified styles.css and inlined it instead
- Reduced the size of pizzeria.jpg and compressed it
- Compressed profilepic.jpg as well
- Made analytics.js async

### Part 2: Optimize Frames per Second in pizza.html

In `resizePizzas()`:
No longer uses sizeSwitcher, just

In `changePizzaSizes()`:
I took some lines out of the for loop and put them right before the loop since they only needed to be performed once.

In `updatePositions()`:
I took out some calculations out of the for loop since they only needed to be performed once.

Reduced the number of background pizzas from 200 to 40.

Used `document.getElementsByClassName()` instead of `document.querySelectorAll()` for "mover"s.