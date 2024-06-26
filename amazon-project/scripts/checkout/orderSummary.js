import {cart, cartQuantity, removeFromCart, updateDeliveryOption, updateQuantity} from "../../data/cart.js";
import {getProduct, products} from "../../data/products.js";
import {deliveryOptions, getDeliveryOption, calculateDeliveryDate} from "../../data/deliveryOptions.js";
import {formatCurrency, isNumeric} from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import {renderPaymentSummary} from "./paymentSummary.js";

export function renderOrderSummary() {

    let checkoutsHtml = '';
    let matchingProduct;
    let productId;

    //console.log(cart);

    //document.querySelector('.js-return-home-link').innerText = cartQuantity  + ' items';

    cart.forEach((cartItem) => {
        //productId = cartItem.productId;

        matchingProduct = getProduct(cartItem.productId);

        //delivery date in item top
        let deliveryOption;
        deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);

        //delivery date in item top
        const deliveryDate = calculateDeliveryDate(deliveryOption);

        checkoutsHtml  += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
                ${deliveryDate}
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
                        <div class="product-quantity js-product-quantity-${matchingProduct.id}">
                          <span>
                            Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                          </span>
                          <input class="quantity-input js-quantity-input-${matchingProduct.id}">
                            <span class="save-quantity-link link-primary js-save-quantity-link js-save-quantity-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">Save</span>
                            <span class="update-quantity-link link-primary js-update-quantity-link js-update-quantity-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                            Update
                          </span>
                            <span class="delete-quantity-link link-primary js-delete-link js-delete-link-${matchingProduct.id}" data-product-id="${matchingProduct.id}">
                            Delete
                          </span>
                        </div>
                        <div>
                            <span class="save-warn-information-${matchingProduct.id}"></span>
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

            //use remove method
            //document.querySelector('.js-cart-item-container-'+productId).remove();

            //update checkout item number
            //document.querySelector('.js-return-home-link').innerText = cartQuantity + ' items';

        })
    });

    //update item in cart
    document.querySelectorAll('.js-update-quantity-link').forEach((updateButton)=>{
        updateButton.addEventListener('click', ()=>{
            const productId = updateButton.dataset.productId;

            const container = document.querySelector(
                `.js-cart-item-container-${productId}`
            );
            container.classList.add('is-editing-quantity');

        });
    })

    //save item in cart
    document.querySelectorAll('.js-save-quantity-link').forEach((saveButton)=>{
        saveButton.addEventListener('click', ()=>{
            const productId = saveButton.dataset.productId;

            const newQuantity= document.querySelector(`.js-quantity-input-${productId}`).value;
            if(!isNumeric(newQuantity) || newQuantity < 0 || newQuantity > 1000){
                document.querySelector(`.save-warn-information-${productId}`).innerText = 'Wrong Number';
                return ;
            }

            const container = document.querySelector(
                `.js-cart-item-container-${productId}`
            );
            container.classList.remove('is-editing-quantity');

            document.querySelector(`.js-quantity-label-${productId}`).innerText = Number(newQuantity);

            updateQuantity(productId, newQuantity);

        });
    })

    //use enter save item in cart
    document.body.addEventListener('keydown',(event)=>{
        if(event.key === 'Enter'){
            //const productId = saveButton.dataset.productId;
            document.querySelectorAll('.js-save-quantity-link').forEach((saveButton)=>{
                let productId = saveButton.dataset.productId;
                let curSaveButton= document.querySelector(`.js-quantity-input-${productId}`);
                if(curSaveButton.offsetLeft > 0){
                    console.log(curSaveButton.offsetLeft);
                    let newQuantity = curSaveButton.value;

                    if(!isNumeric(newQuantity) || newQuantity < 0 || newQuantity > 1000){
                        document.querySelector(`.save-warn-information-${productId}`).innerText = 'Wrong Number';
                        return false;
                    }

                    const container = document.querySelector(
                        `.js-cart-item-container-${productId}`
                    );
                    container.classList.remove('is-editing-quantity');

                    document.querySelector(`.js-quantity-label-${productId}`).innerText = Number(newQuantity);

                    updateQuantity(productId, newQuantity);
                }
            });
        }
    });

    function deliveryOptionsHtml(matchingProduct, cartItem) {
        let html = '';
        deliveryOptions.forEach((deliveryOption)=>{
            const today = dayjs();
            const deliveryDate = calculateDeliveryDate(deliveryOption);
            const priceString = deliveryOption.priceCents === 0 ? 'Free ' : `$${formatCurrency(deliveryOption.priceCents)}`;

            const isChecked = (deliveryOption.id === cartItem.deliveryOptionId);

            html += `
            <div class="delivery-option js-delivery-option" data-product-id="${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
                <input type="radio" ${isChecked ? 'checked' : ''} "
                       class="delivery-option-input"
                       name="delivery-option-${matchingProduct.id}">
                    <div>
                        <div class="delivery-option-date">
                            ${deliveryDate}
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
            renderPaymentSummary();
        });
    });
}