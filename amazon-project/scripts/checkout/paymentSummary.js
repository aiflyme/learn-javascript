import {cart, cartQuantity, removeFromCart, updateDeliveryOption} from "../../data/cart.js";
import {getProduct, products} from "../../data/products.js";
import {deliveryOptions, getDeliveryOption} from "../../data/deliveryOptions.js";
import {formatCurrency} from "../../utils/money.js";

export function renderPaymentSummary() {
    let summaryGoodPrice = 0;
    let summaryShipPrice = 0;
    let summaryBeforeTaxPrice = 0;
    let summaryTaxPrice = 0;
    let summaryPrice = 0;
    cart.forEach((cartItem) => {
        //productId = cartItem.productId;
        const product = getProduct(cartItem.productId);
        summaryGoodPrice += product.priceCents * cartItem.quantity;

        const shipPrice= getDeliveryOption(cartItem.deliveryOptionId);
        summaryShipPrice += shipPrice.priceCents;
    });
    summaryBeforeTaxPrice = summaryGoodPrice + summaryShipPrice;
    summaryTaxPrice = (summaryGoodPrice + summaryShipPrice) * 0.1;

    summaryPrice = summaryBeforeTaxPrice + summaryTaxPrice;

    let paymentSummaryHtml = '';
    paymentSummaryHtml +=
    `
        <div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div class="js-payment-summary-item">Items (3):</div>
            <div class="payment-summary-money">$${formatCurrency(summaryGoodPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(summaryShipPrice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(summaryBeforeTaxPrice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(summaryTaxPrice)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(summaryPrice)}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHtml;

    //update checkout item number
    document.querySelector('.js-payment-summary-item').innerText = cartQuantity + ' items';


}