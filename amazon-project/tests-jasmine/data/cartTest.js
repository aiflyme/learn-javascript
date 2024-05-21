import {addToCart, addToCartForTest, cart, loadFromStorage} from "../../data/cart.js";

describe('test suite addToCart', () => {
   it('adds an existing product to the cart', () => {
        spyOn(localStorage,'setItem');

        spyOn(localStorage, 'getItem').and.callFake(()=>{
            return JSON.stringify([{
                productId: '54e0eccd-8f36-462b-b68a-8182611d9add',
                quantity:1,
                deliveryOptionId: '1',
            }]);
        });

        loadFromStorage();

       addToCartForTest('54e0eccd-8f36-462b-b68a-8182611d9add');

       expect(cart.length).toEqual(1);
       expect(localStorage.setItem).toHaveBeenCalledTimes(2);
       expect(cart[0].quantity).toEqual(2);
   });

   it('adds a new product to the cart', () => {
       spyOn(localStorage,'setItem');

       spyOn(localStorage, 'getItem').and.callFake(()=>{
           return JSON.stringify([]);
       });

       loadFromStorage();
       addToCartForTest('15b6fc6f-327a-4ec4-896f-486349e85a3d');
       addToCartForTest('83d4ca15-0f35-48f5-b7a3-1ea210004f2e');
       //console.log(cart);
       expect(cart.length).toEqual(2);
       expect(localStorage.setItem).toHaveBeenCalledTimes(4);
   });


});