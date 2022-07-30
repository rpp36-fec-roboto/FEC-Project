# Atelier Project
A complete remake of a retail site for a mordern look with improvement on user experience. Features includes different views of product images, recommendation list, questions and answers for the product and more.

## Table of Content
[Description](https://github.com/rpp36-fec-roboto/FEC-Project/tree/overview#description)
[Installation](https://github.com/rpp36-fec-roboto/FEC-Project/tree/overview#installation)
[Usage](https://github.com/rpp36-fec-roboto/FEC-Project/tree/overview#usage)

## Description
The design of the site includes 3 sections that provides customer a fluid experience. From browsing the product, to see recommended and saved products, to useful question and answers for the product.

### Product Overview Section
The product overview boats a diversed view of image gallery and key information related to the product.
#### Image Gallery
In the default view, customers can scroll through images and thumbnails. Clicking the image will expand image gallery to the page. Furthermore, clicking again on the image will zoom in on the image, where customers can check details of fabric, texture and more.

[Image Gallery Experience] (url) show thumbnail and image scrolls, showing view change, click image to expand view, click again to zoom, click again to expanded, click on expand icon return to default view

#### Product Information
Product information are listed on the right side including name, category, price, rating, styles available and cart selection. Sale price is represented in red with original price crossed out. Clikcin on the total reviews will jump to the rating and reviews section. Customer can select from styles available for current product.
[Rating and Style change] (url) click read all reivews, click style to show icon indicate currently selected style

#### Cart
Adding to cart requires selection of a size and quantity. Warning will show if a customer attempts to add a product to chart without selecting a size and quantity. The quantity available is linked to the inventory, so no customer will be able to select a quantity that exceeds current inventory of the selected product and style. Quantity show max at 15.

[Add To Cart] (url) click without size selection, select size and show quantity, 15 and less than 15 (71699) size XXL, click add to cart

When product is out of stock, the add to cart button will disappear. However, customers can always add the current product to their outfit list by clicking on the '☆'. Once added, the star will turn solid '★' and product will apper in the your outfit list.

[Out Of Stock and Add To My Outfit] (url) out of stock product id, 71698. click star to add and remove, show your outfit section

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

## Installation
Want to try it out on you local machine? Here's what to do:
1. Clone down the repo to your local machine
2. `npm install` to install all dependencies
3. Build bundle for production `npm run build` and star the server `npm start`.
4. Now go to `http://localhost:5555/` to have a real-time shopping experience

## Usage
Integrate this page as the product page to your existing ecommerce website to boost customer flow.
