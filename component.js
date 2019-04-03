// Component based 

Vue.component('productDetails', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },
    template:
    `
    <div class="productDetails">
        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>
    </div>
    `
})

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
    <div class="product-image">

        <img v-bind:src="image" />

    </div>

    <div class="product-info">
        <h1> {{ title }} </h1>

        <p :class="{ outOfStock: !inStock}">In Stock</p>
        <p v-if="inStock">Shipping: {{ shipping }} </p>
        <p v-else>Shipping: Not Available</p>
        <p> {{ onSale }} </p>

        <productDetails :details="details"></productDetails>

        <div v-for="(variant, index) in variants"
            :key="variant.variantId"
            class="color-box"
            :style="{ backgroundColor: variant.variantColor }"
            @mouseover="updateProduct(index)">
        </div>
        
        <button v-on:click="addToCart" 
                :disabled="!inStock" 
                :class="{ disabledButton: !inStock }"> Add to Cart
        </button>

        <!--
        <button @click="removeFromCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">Remove from Cart
        </button>
        -->

    </div>
</div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            selectedVariant: 0,
            inventory: 100,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "Blue",
                    variantImage: "/vmSocks-blue.jpg",
                    variantQuantity: 0,
                    variantOnSale: true
                }, 
                {
                    variantId: 2235,
                    variantColor: "Green",
                    variantImage: "/vmSocks-green.jpg",
                    variantQuantity: 30,
                    variantOnSale: false
                }
            ]
        }
    }, 
    methods: {
        /*
        addToCart() {
            this.$emit('add-to-cart');
        }
        */
        addToCart() {
            this.$emit('add-to-cart',this.variants[this.selectedVariant]
                        .variantId);
        },
        /*
        removeFromCart() {
            if (this.cart != 0)
                this.cart--;
        },
        */
        updateProduct(index) {
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
        },
        onSale() {
            if (this.variants[this.selectedVariant].variantOnSale)
                return this.brand + ' ' 
                + this.variants[this.selectedVariant].variantColor
                + ' ' + this.product + ' are on sale!';
        },
        shipping() {
            if (this.premium)
                return "Free";
            return "$3.99";
        }
    }
    
})

const app = new Vue ({
    el: '#app',
    data: {
        premium: true,
        //cart: 0
        cart: []
    },
    methods: {
        /*
        updateCart() {
            this.cart++;
        }
        */
        updateCart(id) {
            this.cart.push(id);
        }
    }
});
