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
### Question and Answer Section

## Installation
Want to try it out on you local machine? Here's what to do:
1. Clone down the repo to your local machine
2. `npm install` to install all dependencies
3. Build bundle for production `npm run build` and star the server `npm start`.
4. Now go to `http://localhost:5555/` to have a real-time shopping experience

## Usage
Integrate this page as the product page to your existing ecommerce website to boost customer flow.
