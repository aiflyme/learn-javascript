import {renderOrderSummary} from "./checkout/orderSummary.js";
import {renderPaymentSummary} from "./checkout/paymentSummary.js";
import {checkoutHeader} from "./checkout/checkoutHeader.js";

//left checkout cart goods
renderOrderSummary();

//right checkout price list
renderPaymentSummary();

//top head
checkoutHeader();
