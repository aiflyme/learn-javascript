const xhr =  new XMLHttpRequest();



xhr.open("GET", "https://supersimplebackend.dev/products", true);
xhr.send();

xhr.addEventListener('load',()=>{
    console.log(xhr.response);
});