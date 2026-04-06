const productNo = document.querySelector(".product-no");
const product_no = productNo.querySelector("p");

const addToCart = document.querySelector(".add-to-cart");
const cartItems = document.querySelector(".cart-items");
const cartItemsContainer = document.querySelector(".cart-items ul");
const cartBtn = document.querySelector(".cart-btn");

const overlay = document.querySelector(".overlay");

const productsInstance = document.querySelectorAll(".products");

const closerView = document.querySelector(".closer-view");

const menuBtn = document.querySelector(".menu-btn");
const navList = document.querySelector(".nav-list");

// const iconDirections = document.querySelector(".icon-directions");

const productImgs = document.querySelectorAll(".selected-products");

const state = {
  price: 125.0,
  product_no: 0,
  cart: [],
};

// Selecting no of sneakers
productNo.addEventListener("click", function (ev) {
  const minusBtn = ev.target.closest(".minus");
  if (minusBtn && state.product_no > 0)
    product_no.textContent = --state.product_no;

  const plusBtn = ev.target.closest(".plus");
  if (plusBtn) {
    product_no.textContent = ++state.product_no;
  }
});

//Adding and Rendering to cart
addToCart.addEventListener("click", function () {
  const product_no = state.product_no;
  const total = state.price * state.product_no;
  const product_img = `${
    [...document.querySelectorAll(".selected-products")].map((img) =>
      img.getAttribute("src"),
    )[0]
  }`;

  if (state.product_no === 0) {
    alert("Please select the number of sneakers to be purchased");
    return;
  }

  if (state.cart.length === 0) {
    state.cart.push({
      product_no,
      total,
      product_img,
    });

    renderCart(state.cart[state.cart.length - 1]);
  } else {
    const sameProduct = state.cart.find(
      (cart) => cart.product_img === product_img,
    );

    if (sameProduct) {
      ((sameProduct.product_no = product_no), (sameProduct.total = total));
      cartItemsContainer.innerHTML = "";

      state.cart.forEach((cart) => renderCart(cart));
    } else {
      state.cart.push({
        product_no,
        total,
        product_img,
      });

      renderCart(state.cart[state.cart.length - 1]);
    }
  }

  document.querySelector(".hover-product-no").textContent = state.cart.length;

  alert("You have successfully added to cart");
});

const renderCart = function (data) {
  const markup = `<li>
                <img
                  class="selected-cart-product"
                  src="${data.product_img}"
                  alt=""
                />
                <span>
                  <p>Fall Limited Edition Sneakers</p>
                  <p>
                    $125.00 × <span class="product_no">${data.product_no}</span>
                    <span class="total">$${data.total}.00</span>
                  </p>
                </span>
                <img class="delete-btn" src="./images/icon-delete.svg" alt="" />
              </li>`;

  cartItemsContainer.firstElementChild?.tagName === "P" &&
    (cartItemsContainer.innerHTML = "");

  document.querySelector(".checkout-btn").classList.remove("hidden");
  cartItemsContainer.insertAdjacentHTML("afterbegin", markup);
};

const toggleElements = function (el) {
  overlay.classList.toggle("hidden");
  el.classList.toggle("hidden");
  el.classList.toggle("over-the-overlay");
};

//Rendering cart
cartBtn.addEventListener("click", function () {
  toggleElements(cartItems);
});

overlay.addEventListener("click", function () {
  toggleElements(document.querySelector(".over-the-overlay"));

  if (navList.classList.contains("hidden")) {
    navList.style.display = "none";
  }
});

const getSelectedImg = function (products) {
  console.log(products);
  products.addEventListener("click", function (ev) {
    const product = ev.target.closest(".product");
    console.log(product);
    // if (!product) return;
    products
      .querySelectorAll("img")
      .forEach((product) => product.classList.remove("selected-product"));

    product.classList.add("selected-product");

    state.product_no = 0;
    product_no.textContent = state.product_no;

    const productSrc = product.getAttribute("src").replace("-thumbnail", "");
    productImgs.forEach((img) => img.setAttribute("src", `${productSrc}`));
  });
};

//Closing the open element
let i = 1;

document.querySelector("body").addEventListener("click", function (ev) {
  const closeBtn = ev.target.closest(".close-btn");
  const menuBtn = ev.target.closest(".menu-btn");

  if (closeBtn) {
    if (document.querySelector(".over-the-overlay").tagName === "UL")
      navList.style.display = "none";

    toggleElements(document.querySelector(".over-the-overlay"));
  }

  //Opening and closing of the nav-list
  if (menuBtn) {
    navList.style.display = "block";
    if (navList.classList.contains("hidden")) toggleElements(navList);
    else {
      overlay.classList.toggle("hidden");
      navList.classList.add("over-the-overlay");
    }
  }

  const iconDirections = ev.target.closest(".icon-directions");
  if (iconDirections) {
    const direction = ev.target.closest("img");

    if (!direction) return;
    let newSrc;
    if (direction.classList.contains("next")) {
      newSrc = `./images/image-product-${i === 4 ? (i = 1) : ++i}.jpg`;
      productImgs.forEach((img) => img.setAttribute("src", `${newSrc}`));
    } else {
      newSrc = `./images/image-product-${i === 1 ? (i = 4) : --i}.jpg`;
      productImgs.forEach((img) => img.setAttribute("src", `${newSrc}`));
    }

    state.product_no = 0;
    product_no.textContent = state.product_no;

    switchImg(`product-${i}`);
  }

  //Removing items from the cart
  const deleteBtn = ev.target.closest(".delete-btn");
  if (deleteBtn) {
    const li = ev.target.closest("li");

    const index = state.cart.findIndex(
      (cart) =>
        cart.product_img ===
        li.querySelector(".selected-cart-product").getAttribute("src"),
    );

    state.cart.splice(index, 1);
    cartItemsContainer.innerHTML = "";

    if (state.cart.length === 0) {
      const markup = "<p>Your cart is empty...</p>";
      cartItemsContainer.insertAdjacentHTML("afterbegin", markup);
    } else {
      state.cart.forEach((cart) => renderCart(cart));
    }
  }
});

//Switching the images
const switchImg = function (selPro) {
  document.querySelectorAll(".product").forEach((pr) => {
    pr.classList.remove("selected-product");
  });

  let productSrc;
  document.querySelectorAll(`.${selPro}`).forEach((sel) => {
    sel.classList.add("selected-product");
    productSrc = sel.getAttribute("src").replace("-thumbnail", "");
  });

  state.product_no = 0;
  product_no.textContent = state.product_no;

  return productSrc;
};

document.querySelectorAll(".products").forEach((product) => {
  // const product = ev.target.closest(".product");
  product.addEventListener("click", function (ev) {
    const selPro = ev.target.classList[1];

    if (!selPro) return;

    const productSrc = switchImg(selPro);

    productImgs.forEach((img) => img.setAttribute("src", `${productSrc}`));
  });
});

document.querySelector(".selected").addEventListener("click", function () {
  toggleElements(closerView);
});
