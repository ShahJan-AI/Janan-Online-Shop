
const params = new URLSearchParams(window.location.search);
const categoryKey = params.get("category") || "dress";

/* Image filename prefixes must match your image folder */
const collections = {
    "dress": {
        title: "Women Dresses",
        prefix: "Dress",
        count: 20
    },
    "skirt": {
        title: "Skirts",
        prefix: "skirt",
        count: 15
    },
    "jeans": {
        title: "Women's Jeans",
        prefix: "Jeans",
        count: 15
    },
    "tshirt": {
        title: "Men's T-Shirts",
        prefix: "T-shirt",
        count: 14
    },
    "coat": {
        title: "Men's Coats",
        prefix: "coat ",
        count: 8
    },
    "girls-dress": {
        title: "Girls Dresses",
        prefix: "girls dress",
        count: 20
    },
    "boy-dress": {
        title: "Boys Clothing",
        prefix: "boy dress",
        count: 20
    },
    "rings": {
        title: "Rings",
        prefix: "Rings",
        count: 20
    },
    "earrings": {
        title: "Earrings",
        prefix: "Earrings",
        count: 20
    },
    "necklaces": {
        title: "Necklaces",
        prefix: "Necklaces",
        count: 20
    },
};

const collection = collections[categoryKey];

const titleElement = document.getElementById("collection-title");
const descriptionElement =
    document.getElementById("collection-description");
const countElement = document.getElementById("product-count");
const grid = document.getElementById("products-grid");
const emptyMessage = document.getElementById("empty-message");
const cartMessage = document.getElementById("cart-message");

let cartCount = 0;
let messageTimeout;

/* Check whether the selected collection exists */
if (!collection) {
    titleElement.textContent = "Collection Not Found";
    descriptionElement.textContent =
        "Please return to the shop and choose a category.";
    countElement.textContent = "0 Products";
    emptyMessage.hidden = false;
} else {
    titleElement.textContent = collection.title;
    descriptionElement.textContent =
        `Explore our ${collection.title.toLowerCase()} collection.`;

    document.title =
        `${collection.title} | Janan Online Shop`;

    let loadedProducts = 0;

    for (let i = 1; i <= collection.count; i++) {
        const product = createProduct(i);
        grid.appendChild(product);
        loadedProducts++;
    }

    countElement.textContent = `${loadedProducts} Products`;
}

/* Create each product card */
function createProduct(number) {
    const card = document.createElement("article");
    card.className = "product-card";

    const imageWrap = document.createElement("div");
    imageWrap.className = "product-image-wrap";

    const image = document.createElement("img");
    image.className = "product-image";
    image.src = `./image/${collection.prefix} ${number}.jpg`;
    image.alt = `${collection.title} ${number}`;
    image.loading = "lazy";

    image.onerror = function () {
        /* Hide cards whose image files do not exist */
        card.remove();

        const remaining =
            grid.querySelectorAll(".product-card").length;

        countElement.textContent = `${remaining} Products`;

        if (remaining === 0) {
            emptyMessage.hidden = false;
        }
    };

    const info = document.createElement("div");
    info.className = "product-info";

    const name = document.createElement("h3");
    name.className = "product-name";
    name.textContent = `${collection.title} ${number}`;

    const rating = document.createElement("div");
    rating.className = "product-rating";

    const stars = document.createElement("span");
    stars.textContent = "★★★★★";

    const ratingNumber = document.createElement("span");
    ratingNumber.className = "rating-number";
    ratingNumber.textContent = " 5.0";

    rating.append(stars, ratingNumber);

    const price = document.createElement("p");
    price.className = "product-price";
    price.textContent = `$${(15 + number * 2).toFixed(2)}`;

    const button = document.createElement("button");
    button.className = "add-cart";
    button.type = "button";
    button.textContent = "ADD TO CART";

    button.addEventListener("click", function () {
        cartCount++;

        button.textContent = "ADDED ✓";
        button.classList.add("added");

        cartMessage.textContent =
            `${name.textContent} added! Cart items: ${cartCount}`;

        clearTimeout(messageTimeout);

        messageTimeout = setTimeout(() => {
            cartMessage.textContent = "";
        }, 2200);

        setTimeout(() => {
            button.textContent = "ADD TO CART";
            button.classList.remove("added");
        }, 1000);
    });

    imageWrap.appendChild(image);
    info.append(name, rating, price, button);
    card.append(imageWrap, info);

    return card;
}