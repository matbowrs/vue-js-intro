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
        onSale: true
    }
});
