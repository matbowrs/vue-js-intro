const app = new Vue ({
    // Connect to id='app'
    el: '#app', 
    // The data we want to insert
    data: {
        // product is what we pass in
        brand: 'Vue Mastery',
        product: 'Blue socks',
        image: '/vmSocks-blue.jpg',
        inStock: true,
        inventory: 100,
        onSale: false,
        // Array of products
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "blue",
                variantImage: "/vmSocks-blue.jpg"
            }, 
            {
                variantId: 2235,
                variantColor: "green",
                variantImage: "/vmSocks-green.jpg"
            }
        ],
        cart: 0
    },
    methods: {
        addToCart: function () {
            this.cart++;
        },
        removeFromCart: function() {
            if (this.cart != 0)
                this.cart--;
        },
        updateProduct: function( variantImage ) {
            this.image = variantImage;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        }
    }
});
