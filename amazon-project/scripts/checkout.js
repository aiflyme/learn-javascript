import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {checkoutHeader} from "./checkout/checkoutHeader.js";
import {loadProducts, loadProductsFetch} from "../data/products.js";
// import  "../data/cart-class.js";
//
// new Promise((resolve)=>{
//     console.log('start promise');
//     loadProducts(()=>{
//         console.log('finished promise');
//         resolve();
//     })
// }).then(()=>{
//     console.log('next step');
// });

Promise.all([
    loadProductsFetch(),
    new Promise((resolve) => {
        resolve();
    })
]).then((value)=>{
    console.log(value);
    //left checkout cart goods
    renderOrderSummary();

    //right checkout price list
    renderPaymentSummary();

    //top head
    checkoutHeader();
});