export const cart = [];

export function addToCart(productId) {
    //get quantity user choose
    let quantity = Number(document.querySelector(`.js-quantity-selector-${productId}`).value);

    let matchingItem;
    cart.forEach((cartItem) => {
        if(productId === cartItem.productId) {
            matchingItem = cartItem;
            cartItem.quantity += quantity;
        }
    });

    if(!matchingItem){
        //matchingItem.quantity += 1;
        cart.push({
            productId: productId,
            quantity: quantity,
        })
    }


    //display added top of the Add to Cart button
    let AddedToCart = document.querySelector(`.js-added-to-cart-${productId}`);
    AddedToCart.style.setProperty('opacity', '1');

    // AddedToCart.classList.add('.added-to-cart');

    clearTimeout(timeoutId);

    timeoutId = setTimeout(() => {
        AddedToCart.style.setProperty('opacity', '0');
    },2000);
    console.log(cart);
}