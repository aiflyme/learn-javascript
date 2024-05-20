const xhr = new XMLHttpRequest();

xhr.addEventListener('load', ()=>{

    let products = JSON.parse(xhr.response);

    console.log(products);
});
xhr.open('GET', 'https://supersimplebackend.dev/products');
//xhr.open('GET', 'https://supersimplebackend.dev/documentation');

xhr.send();