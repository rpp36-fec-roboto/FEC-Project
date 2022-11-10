# Atelier Project
A complete remake of a retail site for a mordern look with improvement on user experience. Features includes different views of product images, recommendation list, questions and answers for the product and more.

## Table of Content
- [Description](https://github.com/rpp36-fec-roboto/FEC-Project/tree/overview#description)
- [Technologies](https://github.com/rpp36-fec-roboto/FEC-Project/tree/overview#technologies)
- [Installation](https://github.com/rpp36-fec-roboto/FEC-Project/tree/overview#installation)
- [Usage](https://github.com/rpp36-fec-roboto/FEC-Project/tree/overview#usage)

## Description
The design of the site includes 3 sections that provides customer a fluid experience. From browsing the product, to see recommended and saved products, to useful question and answers for the product.

### Product Overview Section
The product overview boats a diversed view of image gallery and key information related to the product.

[![Product Overview Demo](https://user-images.githubusercontent.com/67238418/200971185-08712db1-96cd-4579-ba79-b6e4ba946bd1.png)](https://youtu.be/cOyllF4gCSw)

#### Image Gallery
In the default view, customers can scroll through images and thumbnails. Clicking the image will expand image gallery to the page. Furthermore, clicking again on the image will zoom in on the image, where customers can check details of fabric, texture and more.

#### Product Information
Product information are listed on the right side including name, category, price, rating, styles available and cart selection. Sale price is represented in red with original price crossed out. Clicking on the total reviews will jump to the rating and reviews section. Customer can select from styles available for current product.

#### Cart
Adding to cart requires selection of a size and quantity. Warning will show if a customer attempts to add a product to chart without selecting a size and quantity. The quantity available is linked to the inventory, so no customer will be able to select a quantity that exceeds current inventory of the selected product and style. Quantity show max at 15.
When product is out of stock, the add to cart button will disappear. However, customers can always add the current product to their outfit list by clicking on the '☆'. Once added, the star will turn solid '★' and product will apper in the your outfit list.


### Related and Saved Product Section
Two sets of related products are displayed on product cards in carousel like lists. One is a list of products, determined internally, that are related to the product currently being viewed. The other is a list, created by the user, of products which the user has grouped into an 'outfit'.

#### List Behavior
Related product lists are shown as a list of product cards displayed in a carousel fashion scrolling horizontally. All of the related products are present in the list, but a maximum of four are displayed on screen. Any product cards that do not display on screen initially, appear offscreen in the carousel.  On initial load, the first related product is on the left hand side of the screen.

In order to navigate through and view the rest of the list, arrows appear on the right and left hand edges of the list. Clicking the left and right arrow will scroll through the list displaying previous and subsequent cards in the list, respectively. Clicking on the arrow scrolls through the list one product at a time. When the first card is all the way on the left of the screen, and no previous cards exist to display, the left arrow is hidden. Similarly, when the last card appears on the far right of the list, the right is hidden.

#### Related Products List
The first list for related products is the same for every customer. It displays products which have been associated with the current product by the company. This list is the same each time the product is loaded.

#### Your Outfit List
The second list of products appears below the Related Products section. It contains products which the user has explicitly selected to group together as an outfit. The products which appear in this list are unique to each user, a selection one customer makes does not impact any other customers. While a product can only be added to an outfit once, there is no max on the number of items a user may add to their outfit. Each customer has one outfit list, empty by default, but that list persists across page navigation and when the user exits the website and returns at a later time.

Unlike the related products list, the first card that appears on the left hand side of the list does not contain a product. Instead, the card displays a '+' icon and reads 'Add to Outfit'. This card acts as a button that adds the currently viewed product to the outfit list. While this card remains visible, clicking it will not add a product to the outfit more than once.

#### Related Product Cards
The related product lists consist of cards that display information for a single product. Each card includes the product category, name, price, rating and primary image. Sale price is represented in red with original price crossed out. If the product has not been reviewed or rated, then there will be no product rating displayed.

Each card has an action button located in the upper right corner. The button on cards in the related product list are 'star' icons; clicking it adds the product to the user's outfit list. The button on cards in the user's outfit are 'x' icons; clicking it removes the product from that list. Clicking on any part of a card, other than the action button, navigates to the detail page for that product.

### Question and Answer Section
The Question and Answer Section will help users looking for a bit more information about the product. Users will be able to find the most asked questions and answers given from other users that have bought the product as well as answers from the seller. Below include the specific sections that will enhance the overall experience for users who are still unsure of

### Search Bar
Typing in the field will narrow the questions down to what is inputted in the search bar. The search will only start when there are 3 characters inputted in. Once 3 characters have been inputted, the search will update the question list to only those with the search string included. If the user starts to delete characters to 2 characters or less, the question list will populate back to default

### Question List
By default the page will show a maximum of 2 questions. If the product has more than 2 questions, there will be button at the bottom “More Answered Questions that will populate a maximum of 2 more questions for the product. The user can keep clicking this button until all questions have been populated. Because the question list may be long, once the question list hits over 3 questions, the list will be encapsulated inside a smaller window for scrolling. Each question will have a helpful button on the right (Yes) which will let the user click to show if the question is helpful. That number will update after its been clicked. The user can also add an answer from the Add answer button on the right. Lastly the user can add a question by clicking the button below

### Answer list
Each question will show a max of 2 answers by default. If the question has more than 2 questions, a “See more answers” button will be populated to let the user click to see more answers. This button will show ALL answers in a window for scrolling. At the bottom of this window, the user will be able to click “collapse answers” to close the answers back to the default 2. Each answer will have a helpful (yes) button for the user to click. There will also be a report button to let the user click if the answer is not helpful or offensive. The report button will change to reported to show the answer is now in review. Each answer will also who the username who submitted the question along with the date. If the answerer is the seller, their name will show up in bold and be the first answer in the answer list. If the answer has photos, that will also be populated on the page in a small window.

### Add answer button
The add answer form will pop up on the page once the button has been clicked. This form will include username / answer / email / and 5 attachments for pictures. Once the user is done, they will be able to click submit which will close the form and the add answer button will change to “Added answer”. The form will not submit if any of the required fields are blank. The form will not also submit if the email field is not a correct email.

### Add a question button
The add question form will pop up on the page once the button has been clicked. This form is similar to the add answer button in all ways but will not include attachments. After the user submits the question, the page will close and the add a question button will change to “Added question”

## Technologies
- React
- NodeJS
- ExpressJS
- Jest
- Webpack
- JQuery
- AWS EC2

## Installation
Want to try it out on you local machine? Here's what to do:
1. Clone down the repo to your local machine
2. `npm install` to install all dependencies
3. Build bundle for production `npm run build` and star the server `npm start`.
4. Now, go to `http://localhost:5555/` to have a real shopping experience

## Usage
Integrate this page as the product page to your existing ecommerce website to boost customer flow.

