import {renderPaymentSummary} from "../scripts/checkout/paymentSummary.js";

export let cart = JSON.parse(localStorage.getItem('cart')) || [];
export let cartQuantity = Number(localStorage.getItem('cartQuantity')) || 0;

export function addToCart(productId) {
    //cart = JSON.parse(localStorage.getItem('amazonCart'));

    //get quantity user choose
    let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
    let timeoutId;

    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
            cartItem.quantity += quantity;
            cartQuantity += quantity;
        }
    });

    if(!matchingItem){
        //matchingItem.quantity += 1;
        cart.push({
            productId: productId,
            quantity: quantity,
            deliveryOptionId: '1',
        })
        cartQuantity += quantity;
    }

    saveToStorage(cartQuantity);
    //localStorage.setItem('amazonCart', JSON.stringify(cart));

    //display added top of the Add to Cart button
    let AddedToCart = document.querySelector(`.js-added-to-cart-${productId}`);
    AddedToCart.style.setProperty('opacity', '1');

    // AddedToCart.classList.add('.added-to-cart');

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        AddedToCart.style.setProperty('opacity', '0');
    },2000);
}

export function removeFromCart(productId) {
    let newCart = [];
    let removeCartQuantity = 0;
    cart.forEach((cartItem) => {

       if(cartItem.productId !== productId) {
           removeCartQuantity += cartItem.quantity;
           newCart.push(cartItem);
       }
    });
    cart = newCart;

    saveToStorage(removeCartQuantity)//localStorage.setItem('amazonCart', JSON.stringify(newCart));

    updatePaymentSummary();
}

//update the checkout payment information
function updatePaymentSummary() {
    renderPaymentSummary();
}

export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    cart.forEach((cartItem) => {
       if(cartItem.productId === productId) {
           matchingItem = cartItem;
       }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;

    saveToStorage(cartQuantity);
}

function saveToStorage(cartProductNumber) {
    localStorage.setItem('cart', JSON.stringify(cart));
    localStorage.setItem('cartQuantity', Number(cartProductNumber));
    cartQuantity = Number(cartProductNumber);

}