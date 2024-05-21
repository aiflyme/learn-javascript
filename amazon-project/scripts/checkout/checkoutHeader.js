import { cartQuantity} from "../../data/cart.js";

export function checkoutHeader() {
    let checkoutHeaderHtml = '';
    checkoutHeaderHtml += `
                    Checkout (<a class="return-to-home-link"
                    href="amazon.html">${cartQuantity} items</a>)
                 `;
    document.querySelector('.js-checkout-header-middle-section').innerHTML=checkoutHeaderHtml;
}