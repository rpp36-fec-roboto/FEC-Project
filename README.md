# Atelier Project
A complete remake of a retail site for a mordern look with improvement on user experience. Features includes different views of product images, recommendation list, questions and answers for the product and more.

## Table of Content
Product Overview
Related Product and Your Outfit
Question and Answer

## Description
The design of the site includes 3 sections that provides customer a fluid experience. From browsing the product, to see recommended and saved products, to useful question and answers for the product.

### Product Overview Section
The product overview boats a diversed view of image gallery and key information related to the product.
#### The Image Gallery
In the default view, the gallery shows a main image with thumbnails that represents a list of pictures available for currently selected product and style. Image and thumbnails are both scrollable.
Clicking the image will bring customer to a expand view, which brings an immersive experience for viewing images of the product. Furthermore, clicking again on the image will zoom in on the image, where customers can find details of fabric, texture and more.

[Image Gallery Experience] (url) show thumbnail and image scrolls, showing view change, click image to expand view, click again to zoom, click again to expanded, click on expand icon return to default view

#### Product Information and Cart
Key information are listed on the right side including name, category, price, rating, styles available and cart selection. Sale price is represented in red with original price crossed out. Customer can select from styles available for current product.
[Rating and Style change] (url) click read all reivews, click style to show icon indicate currently selected style

Adding to cart requires selection of a size and quantity. Warning will show if a customer attempts to add a product to chart without selecting a size and quantity. The quantity available is linked to the inventory, so no customer will be able to select a quantity that exceeds current inventory of the selected product and style. Quantity show max at 15.

[Add To Cart] (url) click without size selection, select size and show quantity, 15 and less than 15 (71699) size XXL, click add to cart

If a product has not inventory, the customer won't be allowed to that product to cart. However, the customer will always have the option to add the current product to their saved list by clicking on the '☆' right to the add to cart button. Once added, the star will turn solid like so '★' to indicate that it is available in the save outfit list.

[Out Of Stock and Add To My Outfit] (url) out of stock product id, 71698. click star to add and remove, show your outfit section

### Related and Saved Product Section
### Question and Answer Section

## Installation
Want to try it out on you local machine? Here's what to do:
1. Clone down the repo to your local machine
2. `npm install` to install all dependencies
3. Build bundle for production `npm run build` and star the server `npm start`.
4. Now go to `http://localhost:5555/` to have a real-time shopping experience

## Usage
Integrate this page as the product page to your existing ecommerce website to boost customer flow.
