// Fetch cartItems from localStorage when needed
function getCartItems() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}

// Function to update cart count in the navbar
function updateCartCount() {
    let cartItems = getCartItems(); // Get fresh cartItems from localStorage
    let cartCount = document.getElementById('cart-count');
    
    // Debugging log to ensure we're getting correct item count
    console.log("Cart items length:", cartItems.length);

    cartCount.textContent = cartItems.reduce((total, item) => total + item.quantity, 0); // Total items including quantities
}

// Function to add items to cart
function addItemToCart(index) {
    let cartItems = getCartItems(); // Always fetch the latest cartItems from localStorage
    
    const products = [
        { id: 1, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f1.jpg' },
        { id: 2, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f2.jpg' },
        { id: 3, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f3.jpg' },
        // Add more products as needed
    ];

    const product = products[index];

    if (product) {
        const existingProduct = cartItems.find(item => item.id === product.id);
        
        if (existingProduct) {
            existingProduct.quantity += 1; // Increment the quantity
            console.log(`Updated quantity of ${existingProduct.name} to ${existingProduct.quantity}`);
        } else {
            product.quantity = 1; // Add new product to the cart
            cartItems.push(product);
            console.log(`Added new product: ${product.name} with quantity 1`);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage with the latest cartItems
        updateCartCount(); // Update the cart count in the navbar
    }
}

// Event listeners for Add to Cart buttons
const cartButtons = document.querySelectorAll('.cart');
cartButtons.forEach((button, index) => {
    button.addEventListener('click', (event) => {
        event.preventDefault();
        addItemToCart(index);
    });
});

// Update cart count when the page loads
window.addEventListener('load', updateCartCount);
