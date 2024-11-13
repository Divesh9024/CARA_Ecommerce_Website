
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Function to update cart count
function updateCartCount() {
    let cartCount = document.getElementById('cart-count');
    cartCount.textContent = cartItems.length; // Number of items in the cart
}

// Function to add items to cart
function addItemToCart(index) {
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
            existingProduct.quantity += 1;
        } else {
            product.quantity = 1;
            cartItems.push(product);
        }

        localStorage.setItem('cartItems', JSON.stringify(cartItems));
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
