let cartItems = [];

function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.remove('hidden');
        } else {
            section.classList.add('hidden');
        }
    });

    if (sectionId === 'cart') {
        updateCart();
    }
}
document.getElementById('profile-button').addEventListener('click', function () {
    const profileDetails = document.getElementById('profile-details');
    if (profileDetails.style.display === 'none' || profileDetails.style.display === '') {
        profileDetails.style.display = 'block';
    } else {
        profileDetails.style.display = 'none';
    }
});


function addToCart(productName, productPrice) {
    const quantityInput = event.target.previousElementSibling;
    const quantity = parseInt(quantityInput.value);
    if (quantity > 0) {
        const existingItem = cartItems.find(item => item.name === productName);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cartItems.push({ name: productName, price: productPrice, quantity: quantity });
        }
    }
    updateCart();
}

function updateCart() {
    const cartContent = document.getElementById('cart-content');
    cartContent.innerHTML = '';
    let totalPrice = 0;

    if (cartItems.length > 0) {
        cartItems.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalPrice += itemTotal;

            const cartItem = document.createElement('div');
            cartItem.className = 'cart-item';
            cartItem.innerHTML = `
                <span>${item.name} (₹${item.price} x ${item.quantity})</span>
                <span>₹${itemTotal}</span>
            `;
            cartContent.appendChild(cartItem);
        });

        const totalPriceElement = document.createElement('p');
        totalPriceElement.className = 'total-price';
        totalPriceElement.textContent = `Total Price: ₹${totalPrice}`;
        cartContent.appendChild(totalPriceElement);

        // Add the checkout button
        const checkoutButton = document.createElement('button');
        checkoutButton.id = 'checkout-button';
        checkoutButton.textContent = 'Proceed to Checkout';
        checkoutButton.onclick = checkout;
        cartContent.appendChild(checkoutButton);
    } else {
        cartContent.innerHTML = '<p>Your cart is empty</p>';
    }
}
function checkout() {
    if (cartItems.length === 0) {
        alert('Your cart is empty! Add items before proceeding to checkout.');
        return;
    }
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    if (confirm(`Your total is ₹${totalPrice}. Proceed to payment?`)) {
        showPaymentForm();
    }
}
function showPaymentForm() {
    const paymentForm = document.getElementById('payment-form');
    if (paymentForm) {
        paymentForm.classList.remove('hidden'); // Show payment form
    } else {
        alert('Payment form integration is not yet implemented.');
    }
}
function showAddressForm() {
    const addressForm = document.getElementById('address-form');
    if (addressForm) {
        addressForm.classList.remove('hidden'); // Show address form
    } else {
        alert('Address form integration is not yet implemented.');
    }
}
