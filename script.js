// Cart state management
let cart = [];
let cartCount = 0;

// Product data
const products = [
    { id: 1, name: "Taba Cream", description: "For Glowing Skin", price: 20.00, originalPrice: 25.00, image: "./images/image1.webp" },
    { id: 2, name: "Taba Cream", description: "For Glowing Skin", price: 20.00, originalPrice: 25.00, image: "./images/taba-cream.png" },
    { id: 3, name: "Taba Cream", description: "For Glowing Skin", price: 20.00, originalPrice: 25.00, image: "./images/image2.webp" },
    { id: 4, name: "Taba Cream", description: "For Glowing Skin", price: 20.00, originalPrice: 25.00, image: "./images/image3.webp" },
    { id: 5, name: "Taba Cream", description: "For Glowing Skin", price: 20.00, originalPrice: 25.00, image: "./images/image4.webp" },
    { id: 6, name: "Taba Cream", description: "For Glowing Skin", price: 20.00, originalPrice: 25.00, image: "./images/image5.webp" }
];

// function to include html popup video code
function includePopupHtml() {
    let html = `
        <div class="video-section">
            <div class="main-video-popup">
                <video controls src="./video.mp4"></video>
            </div>
        </div>`;
    let popDiv = document.createElement("div");
    popDiv.innerHTML = html;
    document.body.insertBefore(popDiv, document.body.firstChild);
}

// function init plugin
function videoPopupInit() {
    includePopupHtml();

    // select both buttons (.paly-btn and .play-btn)
    let buttons = document.querySelectorAll(".paly-btn, .play-btn");
    let popup = document.querySelector(".video-section");
    let videoEl = popup.querySelector("video");

    // add click listener to each button
    buttons.forEach(btn => {
        btn.addEventListener("click", function (e) {
            e.stopPropagation(); // prevent immediate closing
            popup.style.display = "flex";
            videoEl.currentTime = 0;
            videoEl.play();
        });
    });

    // hide popup when user clicks anywhere outside the video
    popup.addEventListener("click", function () {
        popup.style.display = "none";
        videoEl.pause();
    });

    // stop closing if clicking inside the video itself
    videoEl.addEventListener("click", function (e) {
        e.stopPropagation();
    });
}

// Create product detail modal
function createProductDetailModal() {
    const modalHTML = `
        <div id="product-detail-modal" class="modal" style="display: none;">
            <div class="modal-content">
                <span class="close-modal" onclick="closeModal('product-detail-modal')">&times;</span>
                <div class="product-detail-container">
                    <div class="product-detail-image">
                        <img id="detail-image" src="" alt="Product">
                    </div>
                    <div class="product-detail-info">
                        <h2 id="detail-name"></h2>
                        <p id="detail-description"></p>
                        <div class="price-container">
                            <span class="original-price" id="detail-original-price"></span>
                            <span class="sale-price" id="detail-price"></span>
                        </div>
                        <div class="product-features">
                            <h3>Key Features:</h3>
                            <ul>
                                <li>✓ Made with natural ingredients</li>
                                <li>✓ Suitable for all skin types</li>
                                <li>✓ Fast absorbing formula</li>
                                <li>✓ Dermatologically tested</li>
                                <li>✓ Glowing results in 7 days</li>
                            </ul>
                        </div>
                        <button class="add-to-cart-detail all-product" id="add-to-cart-detail">Add To Cart</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
}

// Create cart modal
function createCartModal() {
    const cartModalHTML = `
        <div id="cart-modal" class="modal" style="display: none;">
            <div class="modal-content cart-modal-content">
                <div class="cart-header">
                    <h2>Shopping Cart</h2>
                    <span class="close-modal" onclick="closeModal('cart-modal')">&times;</span>
                </div>
                <div id="cart-items-container">
                    <!-- Cart items will be inserted here -->
                </div>
                <div class="cart-footer">
                    <div class="cart-total">
                        <strong>Total:</strong> <span id="cart-total-price">$0.00</span>
                    </div>
                    <button class="checkout-btn all-product">Proceed to Checkout</button>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', cartModalHTML);
}

// Close modal function
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.style.display = 'none';
        const video = modal.querySelector('video');
        if (video) {
            video.pause();
            video.currentTime = 0;
        }
    }
}

// Show product details
function showProductDetail(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const modal = document.getElementById('product-detail-modal');
    document.getElementById('detail-image').src = product.image;
    document.getElementById('detail-name').textContent = product.name;
    document.getElementById('detail-description').textContent = product.description;
    document.getElementById('detail-original-price').textContent = `$${product.originalPrice.toFixed(2)}`;
    document.getElementById('detail-price').textContent = `$${product.price.toFixed(2)}`;
    
    modal.style.display = 'flex';
    
    // Set up add to cart button
    const addToCartBtn = document.getElementById('add-to-cart-detail');
    addToCartBtn.onclick = function() {
        addToCart(product);
        modal.style.display = 'none';
    };
}

// Add to cart function
function addToCart(product) {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }
    
    updateCartCount();
    showCartNotification();
}

// Update cart count
function updateCartCount() {
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartIcon = document.getElementById('shopping');
    
    // Remove existing badge if any
    const existingBadge = cartIcon.querySelector('.cart-badge');
    if (existingBadge) {
        existingBadge.remove();
    }
    
    // Add new badge
    if (cartCount > 0) {
        const badge = document.createElement('span');
        badge.className = 'cart-badge';
        badge.textContent = cartCount;
        cartIcon.appendChild(badge);
    }
}

// Show cart notification
function showCartNotification() {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Item added to cart!';
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Show cart modal
function showCartModal() {
    const modal = document.getElementById('cart-modal');
    const container = document.getElementById('cart-items-container');
    
    console.log('Cart items:', cart); // Debug log
    
    if (cart.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <p>Your cart is empty</p>
                <p style="font-size: 14px; color: #999; margin-top: 10px;">Add some products to get started!</p>
            </div>`;
    } else {
        let cartHTML = '';
        cart.forEach(item => {
            cartHTML += `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}">
                    <div class="cart-item-info">
                        <h3>${item.name}</h3>
                        <p>${item.description}</p>
                        <p class="cart-item-price">${item.price.toFixed(2)}</p>
                    </div>
                    <div class="cart-item-quantity">
                        <button class="qty-btn decrease" data-id="${item.id}">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="qty-btn increase" data-id="${item.id}">+</button>
                    </div>
                    <div class="cart-item-total">
                        ${(item.price * item.quantity).toFixed(2)}
                    </div>
                    <button class="remove-item" data-id="${item.id}">&times;</button>
                </div>
            `;
        });
        container.innerHTML = cartHTML;
        
        // Add event listeners for quantity buttons
        container.querySelectorAll('.qty-btn').forEach(btn => {
            btn.addEventListener('click', handleQuantityChange);
        });
        
        // Add event listeners for remove buttons
        container.querySelectorAll('.remove-item').forEach(btn => {
            btn.addEventListener('click', removeFromCart);
        });
    }
    
    updateCartTotal();
    modal.style.display = 'flex';

    // ✅ ALERT ON PROCEED TO CHECKOUT
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.onclick = function () {
            alert('Thank you! Proceeding to checkout.');

            // ✅ CLEAR THE CART
            cart = [];
            updateCartCount();

            // ✅ CLOSE CART MODAL AFTER OK
            const modal = document.getElementById('cart-modal');
            modal.style.display = 'none';
        };
    }
}

// Handle quantity change
function handleQuantityChange(e) {
    const productId = parseInt(e.target.dataset.id);
    const item = cart.find(i => i.id === productId);
    
    if (e.target.classList.contains('decrease')) {
        if (item.quantity > 1) {
            item.quantity--;
        }
    } else {
        item.quantity++;
    }
    
    updateCartCount();
    showCartModal(); // Refresh the modal
}

// Remove from cart
function removeFromCart(e) {
    const productId = parseInt(e.target.dataset.id);
    cart = cart.filter(item => item.id !== productId);
    updateCartCount();
    showCartModal(); // Refresh the modal
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cart-total-price').textContent = `$${total.toFixed(2)}`;
}

// Initialize everything
function initializeShoppingSystem() {
    console.log('Initializing shopping system...'); // Debug
    
    // Create modals
    createProductDetailModal();
    createCartModal();
    
    console.log('Modals created'); // Debug
    console.log('Cart modal exists:', document.getElementById('cart-modal')); // Debug
    
    // Add click listeners to product cards
    document.querySelectorAll('.card-item').forEach((card, index) => {
        const img = card.querySelector('.user-image');
        const productName = card.querySelector('.product-name');
        
        // Click on image or name to show details
        [img, productName].forEach(el => {
            if (el) {
                el.style.cursor = 'pointer';
                el.addEventListener('click', () => {
                    showProductDetail(index + 1);
                });
            }
        });
        
        // Add to cart button
        const addToCartBtn = card.querySelector('.all-product');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                addToCart(products[index]);
            });
        }
    });
    
    // Cart icon click - handle both the container and the image
    const shoppingCart = document.getElementById('shopping');
    const shoppingCartImg = document.querySelector('.shopping-cart');
    
    console.log('Shopping cart element:', shoppingCart); // Debug
    console.log('Shopping cart image:', shoppingCartImg); // Debug
    
    if (shoppingCart) {
        shoppingCart.style.cursor = 'pointer';
        shoppingCart.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Cart icon clicked - opening modal'); // Debug
            console.log('Current cart:', cart); // Debug
            showCartModal();
        });
    } else {
        console.error('Shopping cart element not found!');
    }
    
    if (shoppingCartImg) {
        shoppingCartImg.style.cursor = 'pointer';
        shoppingCartImg.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Cart image clicked - opening modal'); // Debug
            console.log('Current cart:', cart); // Debug
            showCartModal();
        });
    }
    
    // Close modal when clicking outside (on backdrop)
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            const modalId = e.target.id;
            closeModal(modalId);
        }
    });
    
    console.log('Shopping system initialized successfully'); // Debug
}

// Products List Swiper
const productsSwiper = new Swiper('.slider-wrapper', {
    loop: true,
    grabCursor: true,
    spaceBetween: 30,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        dynamicBullets: true
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    }
});

// Saying About Our Product Swiper
const testimonialsSwiper = new Swiper('.slider-wrappers', {
    loop: true,
    grabCursor: true,
    spaceBetween: 20,
    navigation: {
        nextEl: '.swiper-button-nex',
        prevEl: '.swiper-button-pre',
    },
    breakpoints: {
        0: { slidesPerView: 1 },
        768: { slidesPerView: 2 },
        1024: { slidesPerView: 3 }
    }
});

// Form Validation
let userName = document.getElementById("username");
let userEmail = document.getElementById("email");
let flag = 1;

function validateForm() {
    if (userName.value == "") {
        document.getElementById("userError").innerHTML = "Username is Empty";
        flag = 0;
    } else if (userName.value.length < 3) {
        document.getElementById("userError").innerHTML = "Username requires min 3 characters";
        flag = 0;
    } else {
        document.getElementById("userError").innerHTML = "";
        flag = 1;
    }
    
    if (userEmail.value == "") {
        document.getElementById("emailError").innerHTML = "Email is Empty";
        flag = 0;
    } else {
        document.getElementById("emailError").innerHTML = "";
        flag = 1;
    }
    
    if (flag) {
        return true;
    } else {
        return false;
    }
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', function() {
    videoPopupInit();
    initializeShoppingSystem();
}); 