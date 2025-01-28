let cart = [];

async function fetchProducts() {
    try {
        let response = await fetch("https://fakestoreapi.com/products?limit=30");
        let products = await response.json();

        let container = document.getElementById("products");
        container.innerHTML = ""; 

        products.forEach(product => {
            let productCard = document.createElement("div");
            productCard.classList.add("product");

            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p>${product.price} €</p>
                <button onclick="addToCart(${product.id}, '${product.title.replace(/'/g, "\\'")}', ${product.price})">Ajouter au panier</button>
            `;

            container.appendChild(productCard);
        });
    } catch (error) {
        console.error("Erreur lors de la récupération des produits :", error);
    }
}

function addToCart(id, title, price) {
    let existingProduct = cart.find(item => item.id === id);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ id, title, price, quantity: 1 });
    }

    updateCart();
}

function updateCart() {
    let cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    document.getElementById("cart-count").textContent = cartCount;

    let cartContainer = document.getElementById("cart-items");
    let cartTotal = document.getElementById("cart-total");

    cartContainer.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.quantity;

        let li = document.createElement("li");
        li.innerHTML = `
            ${item.title} - ${item.price.toFixed(2)} € x ${item.quantity}
            <button onclick="removeFromCart(${item.id})">❌</button>
        `;

        cartContainer.appendChild(li);
    });

    cartTotal.textContent = total.toFixed(2);
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

function clearCart() {
    cart = [];
    updateCart();
}

function toggleCart() {
    let cartContainer = document.getElementById("cart-container");
    cartContainer.classList.toggle("hidden");
}

fetchProducts();

