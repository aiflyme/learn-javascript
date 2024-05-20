import {cart, cartQuantity, removeFromCart, updateDeliveryOption} from "../data/cart.js";
import {products} from "../data/products.js";
import {formatCurrency} from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {deliveryOptions} from "../data/deliveryOptions.js";


function renderOrderSummary() {

    let checkoutsHtml = '';
    let matchingProduct;
    let productId;

    //console.log(cart);

    document.querySelector('.js-return-home-link').innerText = cartQuantity  + ' items';

    cart.forEach((cartItem) => {
        productId = cartItem.productId;
        products.forEach((product)=>{
            if(productId === product.id){
                matchingProduct = product;
                matchingProduct.quantity = cartItem.quantity;
            }
        });

        //delivery date in item top
        let deliveryOption;

        deliveryOptions.forEach((option) => {
           if(cartItem.deliveryOptionId === option.id){
               deliveryOption  = option;
           }
        });
        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');


        checkoutsHtml  += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                ${deliveryDate.format('dddd, MMMM D')}
            </div>
        
            <div class="cart-item-details-grid">
                <img class="product-image"
                     src="${matchingProduct.image}">
        
                    <div class="cart-item-details">
                        <div class="product-name">
                            ${matchingProduct.name}
                        </div>
                        <div class="product-price">
                            $${formatCurrency(matchingProduct.priceCents)}
                        </div>
                        <div class="product-quantity">
                          <span>
                            Quantity: <span class="quantity-label">${matchingProduct.quantity}</span>
                          </span>
                            <span class="update-quantity-link link-primary js-update-quantity-link">
                            Update
                          </span>
                            <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                            Delete
                          </span>
                        </div>
                    </div>
        
                    <div class="delivery-options">
                        <div class="delivery-options-title">
                            Choose a delivery option:
                        </div>
                        ${deliveryOptionsHtml(matchingProduct, cartItem)}
                    </div>
            </div>
        </div>
        `;
    });
    document.querySelector('.js-order-summary').innerHTML = checkoutsHtml;

    //delete item in cart
    document.querySelectorAll('.js-delete-link').forEach((deleteButton,index)=>{
        deleteButton.addEventListener('click', ()=>{
            const productId = deleteButton.dataset.productId;
            removeFromCart(productId);

            document.querySelector('.js-cart-item-container-'+productId).remove();

            //update checkout number
            document.querySelector('.js-return-home-link').innerText = cartQuantity + ' items';

        })
    });

    function deliveryOptionsHtml(matchingProduct, cartItem) {
        let html = '';
        deliveryOptions.forEach((deliveryOption)=>{
            const today = dayjs();
            const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
            const priceString = deliveryOption.priceCents === 0 ? 'Free ' : `$${formatCurrency(deliveryOption.priceCents)}`;

            const isChecked = (deliveryOption.id === cartItem.deliveryOptionId);

            html += `
            <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
                <input type="radio" ${isChecked ? 'checked' : ''} "
                       class="delivery-option-input"
                       name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${deliveryDate.format('dddd, MMMM D')}
                        </div>
                        <div class="delivery-option-price">
                            ${priceString} Shipping
                        </div>
                    </div>
            </div> 
            `;
        })
        return html;
    }

    document.querySelectorAll('.js-delivery-option').forEach((element)=>{
            element.addEventListener('click', (e) => {
                // const productId = element.dataset.productId;
                // const deliveryOptionId = element.dataset.deliveryOptionId;
                const {productId, deliveryOptionId} = element.dataset;
                updateDeliveryOption(productId, deliveryOptionId)
                //rerun all the code
                renderOrderSummary();
            });
    });
}

renderOrderSummary();