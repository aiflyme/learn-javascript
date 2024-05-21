import {renderOrderSummary} from "../../../scripts/checkout/orderSummary.js";
import {cart, loadFromStorage} from "../../../data/cart.js";

describe('test suites: renderOrderSummary', () => {
    const productId1 =  '8c9c52b5-5a19-4bcb-a5d1-158a74287c53';
    const productId2 =  '83d4ca15-0f35-48f5-b7a3-1ea210004f2e';

    beforeEach(()=>{
        spyOn(localStorage, 'setItem');

        document.querySelector('.js-test-container').innerHTML = `
            <div class="js-order-summary"></div>
            <div class="js-payment-summary"></div>
            <div class="js-checkout-header-middle-section"></div>
        `;

        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: productId1,
                quantity:2,
                deliveryOptionId: '1',
            },{
                productId: productId2,
                quantity:1,
                deliveryOptionId: '1',
            }
            ]);
        });
        loadFromStorage();

        renderOrderSummary();
    });

    it('display the cart', () => {

        //test cart number
        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(2);

        //product-quantity
        expect(
            document.querySelector(`.js-product-quantity-${productId1}`).innerText
        ).toContain('Quantity: 2');
        expect(
            document.querySelector(`.js-product-quantity-${productId2}`).innerText
        ).toContain('Quantity: 1');

        document.querySelector('.js-test-container').innerHTML = '';
    });

    it('removes a product', ()=>{

        document.querySelector(`.js-delete-link-${productId1}`).click();
        expect(
            document.querySelectorAll('.cart-item-container').length
        ).toEqual(1);
        expect(
            document.querySelector(`.js-cart-item-container--${productId1}`)
        ).toEqual(null);
        expect(
            document.querySelector(`.js-cart-item-container-${productId2}`)
        ).not.toEqual(null);
        expect(cart.length).toEqual(1);
        expect(cart[0].productId).toEqual(productId2);

        document.querySelector('.js-test-container').innerHTML = '';
    })
});