// Component based 

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
        <p>Shipping: {{ shipping }} </p>
        <p> {{ onSale }} </p>

        <ul>
            <li v-for="detail in details">{{ detail }}</li>
        </ul>

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

        <button @click="removeFromCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">Remove from Cart
        </button>

        <div class="cart">
            <p>Cart ({{ cart }})</p>
        </div>

    </div>
</div>
    `,
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'socks',
            selectedVariant: 0,
            inventory: 100,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "blue",
                    variantImage: "/vmSocks-blue.jpg",
                    variantQuantity: 0,
                    variantOnSale: true
                }, 
                {
                    variantId: 2235,
                    variantColor: "green",
                    variantImage: "/vmSocks-green.jpg",
                    variantQuantity: 30,
                    variantOnSale: false
                }
            ],
            cart: 0
        }
        
    }, methods: {
        addToCart: function () {
            this.cart++;
        },
        removeFromCart: function() {
            if (this.cart != 0)
                this.cart--;
        },
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

Vue.component('productDetails', {
    
})
const app = new Vue ({
    el: '#app',
    data: {
        premium: true
    }
});
