import {renderPaymentSummary} from "../scripts/checkout/paymentSummary.js";
import {renderOrderSummary} from "../scripts/checkout/orderSummary.js";
import {checkoutHeader} from "../scripts/checkout/checkoutHeader.js";

class Cart {
    cartItems;
    cartQuantity ;

    localStorageCartQuantity;
    localStorageKey;

    constructor(localStorageKey) {
        this.localStorageKey = localStorageKey;
        this.localStorageCartQuantity = localStorageKey + '-cartQuantity';
        this.loadFromStorage();

        cartQuantity = Number(localStorage.getItem(localStorageCartQuantity)) || 0;
    }

    loadFromStorage () {
        this.cartItems = JSON.parse(localStorage.getItem(this.localStorageKey)) || [];
    }

    saveToStorage(cartProductNumber) {
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
        localStorage.setItem(this.localStorageCartQuantity, Number(cartProductNumber));
        this.cartQuantity = Number(cartProductNumber);
    }

    addToCart(productId) {
        let quantity = 1;//Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
        let timeoutId;

        let matchingItem;
        this.cartItems.forEach((cartItem) => {
            if(productId === cartItem.productId) {
                matchingItem = cartItem;
                cartItem.quantity += quantity;
                this.cartQuantity += quantity;
            }
        });

        if(!matchingItem){
            //matchingItem.quantity += 1;
            this.cartItems.push({
                productId: productId,
                quantity: quantity,
                deliveryOptionId: '1',
            })
            this.cartQuantity += quantity;
        }

        this.saveToStorage(this.cartQuantity);
        //localStorage.setItem('amazonCart', JSON.stringify(cart));

        //display added top of the Add to Cart button
        // let AddedToCart = document.querySelector(`.js-added-to-cart-${productId}`);
        // AddedToCart.style.setProperty('opacity', '1');

        // AddedToCart.classList.add('.added-to-cart');

        // clearTimeout(timeoutId);
        //
        // timeoutId = setTimeout(() => {
        //     AddedToCart.style.setProperty('opacity', '0');
        // },2000);
    }


    removeFromCart (productId) {
        let newCart = [];
        let removeCartQuantity = 0;
        this.cartItems.forEach((cartItem) => {

            if(cartItem.productId !== productId) {
                removeCartQuantity += cartItem.quantity;
                newCart.push(cartItem);
            }
        });
        this.cartItems = newCart;

        this.saveToStorage(removeCartQuantity)//localStorage.setItem('amazonCart', JSON.stringify(newCart));

        renderOrderSummary();
        renderPaymentSummary();
        checkoutHeader();
    }

    updateDeliveryOption(productId, deliveryOptionId) {
        let matchingItem;

        this.cartItems.forEach((cartItem) => {
            if(cartItem.productId === productId) {
                matchingItem = cartItem;
            }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;

        this.saveToStorage(cartQuantity);
    }
}

const cart = new Cart();
const businessCart = new Cart();

console.log(cart);
console.log(businessCart);