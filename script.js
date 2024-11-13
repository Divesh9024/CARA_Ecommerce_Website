const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}
if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}



//Animation on Hero section
document.addEventListener('scroll', function() {
    const heroText = document.querySelector('#hero h1');
    if (window.scrollY > 50) {
        heroText.style.transform = 'translateY(0)';
        heroText.style.opacity = '1';
    } else {
        heroText.style.transform = 'translateY(-20px)';
        heroText.style.opacity = '3';
    }
});

// Animation on Feature Section
// Animation for feature section 
        // Get all elements with the class fe-box
        const feBoxes = document.querySelectorAll('.fe-box');

        // Get the hero section
        const hero = document.getElementById('hero');

        // Add event listener to the window
        window.addEventListener('scroll', () => {
            // Get the current scroll position
            const scrollPosition = window.scrollY;

            // Check if the hero section is in view
            if (scrollPosition > hero.offsetTop - 300) {
                hero.classList.add('animate');
            }

            // Check if each fe-box is in view
            feBoxes.forEach((feBox, index) => {
                if (scrollPosition > feBox.offsetTop - 450) {
                    feBox.classList.add('animate');
                }
            });
        });


// Initialize or retrieve cart items from localStorage
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Add event listeners to cart buttons
const cartButtons = document.querySelectorAll('.cart');
cartButtons.forEach((button, index) => {
    button.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default action
        addItemToCart(index);
        // Redirect to the cart page after adding the item
        //window.location.href = 'cart.html';
    });
});

// Function to update cart count
function updateCartCount() {
    let cartCount = document.getElementById('cart-count');
    cartCount.textContent = cartItems.length; // Number of items in the cart
}

// Update cart count when the page loads
window.addEventListener('load', updateCartCount);

function addItemToCart(index) {
    const products = [
        { id: 1, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f1.jpg' },
        { id: 2, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f2.jpg' },
        { id: 3, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f3.jpg' },
        { id: 4, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f4.jpg' },
        { id: 5, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f5.jpg' },
        { id: 6, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f6.jpg' },
        { id: 7, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f7.jpg' },
        { id: 8, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f8.jpg' },
        { id: 9, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/n1.jpg' },
        { id: 10, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/n2.jpg' },
        { id: 11, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/n3.jpg' },
        { id: 12, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/n4.jpg' },
        { id: 13, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/n5.jpg' },
        { id: 14, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/n6.jpg' },
        { id: 15, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/n7.jpg' },
        { id: 16, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/n8.jpg' },
        // Add more products as needed
    ];

    const product = products[index];
    
    if (product) { // Ensure the product exists
        // Check if the product already exists in the cart
        const existingProduct = cartItems.find(item => item.id === product.id);
        
        if (existingProduct) {
            existingProduct.quantity += 1; // Increment quantity if the item is already in the cart
        } else {
            product.quantity = 1; // Set initial quantity if the item is new to the cart
            cartItems.push(product);
        }
        
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save to localStorage
        updateCartCount(); // Update the cart count in the navbar
    }
}

function updateCart() {
    const cartTableBody = document.querySelector('#cart tbody');
    
    if (cartTableBody) {
        cartTableBody.innerHTML = ''; // Clear existing rows

        let subtotal = 0;
        cartItems.forEach((item, index) => {
            // Ensure item is properly structured and not null
            if (item && item.image && item.name && item.price && item.quantity) { 
                const row = document.createElement('tr');

                const itemTotal = item.price * (item.quantity || 1); // Ensure quantity is defined
                subtotal += itemTotal;

                row.innerHTML = `
                    <td><i class="fa-regular fa-circle-xmark remove" data-index="${index}"></i></td>
                    <td><img src="${item.image}" alt="${item.name}"></td>
                    <td>${item.name}</td>
                    <td>$${item.price.toFixed(2)}</td>
                    <td><input type="number" value="${item.quantity || 1}" min="1" class="quantity" data-index="${index}"></td>
                    <td>$${itemTotal.toFixed(2)}</td>
                `;

                cartTableBody.appendChild(row);
            }
        });

        document.querySelector('#subtotal td:last-child').innerText = `$${subtotal.toFixed(2)}`;

        // Add event listeners for removing items and updating quantities
        document.querySelectorAll('.remove').forEach(button => {
            button.addEventListener('click', () => {
                const index = button.dataset.index;
                removeItemFromCart(index);
            });
        });

        document.querySelectorAll('.quantity').forEach(input => {
            input.addEventListener('change', (e) => {
                const index = e.target.dataset.index;
                const quantity = parseInt(e.target.value);
                updateSubtotal(index, quantity);
            });
        });
    }
}

function removeItemFromCart(index) {
    cartItems.splice(index, 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
    updateCart(); // Update the cart display
}

function updateSubtotal(index, quantity) {
    if (quantity > 0) {
        cartItems[index].quantity = quantity;
        localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
        updateCart(); // Update the cart display
    }
}

// When the page loads, update the cart from localStorage
window.addEventListener('load', () => {
    // Ensure cartItems is an array of valid objects
    cartItems = cartItems.filter(item => item && item.image && item.name && item.price && item.quantity);
    updateCart();
});



// Initialize or retrieve cart items from localStorage
// let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

// Add event listeners to cart buttons
// const cartButtons = document.querySelectorAll('.cart');
// cartButtons.forEach((button, index) => {
//     button.addEventListener('click', (event) => {
//         event.preventDefault(); // Prevent the default action
//         addItemToCart(index);
//     });
// });

// function addItemToCart(index) {
//     const products = [
//         { id: 1, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f1.jpg' },
//         { id: 2, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f2.jpg' },
//         { id: 3, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f3.jpg' },
//         { id: 4, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f4.jpg' },
//         { id: 5, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f5.jpg' },
//         { id: 6, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f6.jpg' },
//         { id: 7, name: 'Cartoon Astronaut T-Shirts', price: 78, image: 'img/products/f7.jpg' },
        // Add more products as needed
    // ];

//     const product = products[index];
//     cartItems.push(product);
//     localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Save to localStorage
//     updateCart();
// }

// function updateCart() {
    // const cartTableBody = document.querySelector('#cart tbody');
    // if (!cartTableBody) return; // If the cart table isn't present, skip the update

    // cartTableBody.innerHTML = ''; // Clear existing rows

   
    // cartItems.forEach((item, index) => {
    //     const row = document.createElement('tr');

    //     row.innerHTML = `
    //         <td><i class="fa-regular fa-circle-xmark remove" data-index="${index}"></i></td>
    //         <td><img src="${item.image}" alt="${item.name}"></td>
    //         <td>${item.name}</td>
    //         <td>$${item.price.toFixed(2)}</td>
    //         <td><input type="number" value="1" min="1" class="quantity" data-index="${index}"></td>
    //         <td>$${item.price.toFixed(2)}</td>
    //     `;

    //     cartTableBody.appendChild(row);
    //     subtotal += item.price;
    // });

//     document.querySelector('#subtotal td:last-child').innerText = `$${subtotal.toFixed(2)}`;

//     // Add event listeners for removing items and updating quantities
//     document.querySelectorAll('.remove').forEach(button => {
//         button.addEventListener('click', () => {
//             const index = button.dataset.index;
//             removeItemFromCart(index);
//         });
//     });

//     document.querySelectorAll('.quantity').forEach(input => {
//         input.addEventListener('change', (e) => {
//             const index = e.target.dataset.index;
//             const quantity = parseInt(e.target.value);
//             updateSubtotal(index, quantity);
//         });
//     });
// }

// function removeItemFromCart(index) {
//     cartItems.splice(index, 1);
//     localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
//     updateCart();
// }

// function updateSubtotal(index, quantity) {
//     cartItems[index].quantity = quantity;
//     localStorage.setItem('cartItems', JSON.stringify(cartItems)); // Update localStorage
//     updateCart();
// }

// // When the page loads, update the cart if on the cart page
// window.addEventListener('load', () => {
//     updateCart();
// });
