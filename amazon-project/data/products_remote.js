fetch("./backend/products.json")
    .then((response) => response.json())
    .then((products) => console.log(products));