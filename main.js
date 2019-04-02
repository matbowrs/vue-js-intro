const app = new Vue ({
    // Connect to id='app'
    el: '#app', 
    // The data we want to insert
    data: {
        // product is what we pass in
        product: 'Blue socks',
        image: '/vmSocks-blue.jpg',
        //inStock: false
        inventory: 100,
        onSale: false,
        // Array of products
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "blue"
            }, 
            {
                variantId: 2235,
                variantColor: "green"
            }
        ],
        cart: 0
    }
});
