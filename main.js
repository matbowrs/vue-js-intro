const app = new Vue ({
    // Connect to id='app'
    el: '#app', 
    // The data we want to insert
    data: {
        // product is what we pass in
        brand: 'Vue Mastery',
        product: 'Blue socks',
        // image: '/vmSocks-blue.jpg', -> Replaced with selectedVariant
        selectedVariant: 0,
        // inStock: true,
        inventory: 100,
        // Array of products
        details: ["80% cotton", "20% polyester", "Gender-neutral"],
        variants: [
            {
                variantId: 2234,
                variantColor: "blue",
                variantImage: "/vmSocks-blue.jpg",
                variantQuantity: 0
            }, 
            {
                variantId: 2235,
                variantColor: "green",
                variantImage: "/vmSocks-green.jpg",
                variantQuantity: 30
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
        /*
        updateProduct: function( variantImage ) {
            this.image = variantImage;
        }*/
        updateProduct: function(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage;
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity;
        }
    }
});
