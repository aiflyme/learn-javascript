import {cart, addToCart} from '../data/cart.js';
import {products} from "../data/products.js";
import {formatCurrency} from "../utils/money.js";
let productsHtml = '';

products.forEach((product)=>{
    productsHtml += `
        <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
          
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container js-product-quantity-container">
            <select class="js-product-quantity-select-container js-quantity-selector-${product.id}">
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
});

//generate product list
document.querySelector('.js-products-grid').innerHTML = productsHtml;

//generate product quantity list
let selectOptionHtml = '';
for(let i = 1; i <= 10; i++) {
    selectOptionHtml += "<option value='" + i + "'>" + i + "</option>";
}
//selectOptionHtml += '<select>';
document.querySelectorAll('.js-product-quantity-select-container').forEach((value)=>{
    value.innerHTML = selectOptionHtml;
});

//add cart action
document.querySelectorAll('.js-add-to-cart').forEach((button)=>{
    button.addEventListener('click',()=>{
        const productId = button.dataset.productId;

        addToCart(productId);
        updateCartQuantity();

    });
});

function updateCartQuantity() {
    let cartQuantity = 0;
    cart.forEach((cartItem)=>{
        cartQuantity += cartItem.quantity;
    });

    document.querySelector('.js-cart-quantity').innerText = cartQuantity;
}
