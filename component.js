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
                :class="{ disabledButton: !inStock }"
                > 
        Add to Cart
        </button>

        <button @click="removeFromCart"
                :disabled="!inStock"
                :class="{ disabledButton: !inStock }">Remove from Cart
        </button>
        

    </div>
    <div>
        <h2>Reviews</h2>
        <p v-if="!reviews.length">There are no reviews yet.</p>
        <ul>
            <li v-for="review in reviews">
                <p> {{ review.name }} </p>
                <p> {{ review.review }} </p>
                <p> {{ review.rating }} </p>
            </li>
        </ul>
    </div>
    <product-review @review-submitted="addReview"></product-review>

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
            ],
            reviews: []
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
        removeFromCart() {
            this.$emit('remove-from-cart');
        },
        /*
        removeFromCart() {
            if (this.cart != 0)
                this.cart--;
        },
        */
        updateProduct(index) {
            this.selectedVariant = index;
        },
        addReview(productReview) {
            this.reviews.push(productReview);
        }
    },
    computed: {
        title() {
            return this.brand + ' ' 
            + this.variants[this.selectedVariant].variantColor 
            + ' ' + this.product;
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

Vue.component('product-review', {
    template: `
        <!-- @submit.prevent prevents the page from refreshing -->

        <form class="review-form" @submit.prevent="onSubmit">


        <p v-if="errors.length">
            <b>Please correct the following error(s):</b>

            <ul>
                <li v-for="error in errors"> {{ error }}</li>
            </ul>
        </p>

    
        <p>
            <label for="name">Name:</label>
            <input id="name" v-model="name">
        </p>

        <p>
            <label for="review">Review:</label>
            <textarea id="review" v-model="review"></textarea>
        </p>

        <p>
            <label for="rating">Rating</label>
            <select id="rating" v-model.number="rating">
                <option>5</option>
                <option>4</option>
                <option>3</option>
                <option>2</option>
                <option>1</option>
            </select>
        </p>

        <p>
            <input type="submit" value="Submit">
        </p>


    `,
    data() {
        return {
            name: null,
            review: null,
            rating: null,
            errors: []
        }
    },
    methods: {
        onSubmit() {
            if (this.name && this.review && this.rating) {
                let productReview = {
                    name: this.name,
                    review: this.review,
                    rating: this.rating
                }
                this.$emit('review-submitted', productReview)
                this.name = null;
                this.review = null;
                this.rating = null;
            } else {
                if(!this.name)
                    this.errors.push("Name required.");
                if (!this.review)
                    this.errors.push("Review required.");
                if (!this.rating)
                    this.errors.push("Rating required.");

            }
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
        },
        removeCart() {
            this.cart.pop();
        }
    }
});
