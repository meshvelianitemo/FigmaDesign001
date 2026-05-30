const images = [
  "assets/image1.png",
  "assets/image2.png",
  "assets/image3.png",
  "assets/image4.png",
];

let currentIndex = 0;
let quantity = 0;
let cartQty = 0;

const mainImg = document.getElementById("main-img");
const thumbBtns = document.querySelectorAll(".thumb-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const qtyMinus = document.getElementById("qty-minus");
const qtyPlus = document.getElementById("qty-plus");
const qtyValue = document.getElementById("qty-value");
const addToCart = document.getElementById("add-to-cart");
const cartToggle = document.getElementById("cart-toggle");
const cartDropdown = document.getElementById("cart-dropdown");
const cartBody = document.getElementById("cart-body");
const cartCount = document.getElementById("cart-count");
const hamburger = document.querySelector(".hamburger");
const mobileMenu = document.querySelector(".mobile-menu");
const overlay = document.querySelector(".overlay");
const closeMenu = document.getElementById("close-menu");
const galleryMain = document.querySelector(".gallery-main");

const lightbox = document.getElementById("lightbox-overlay");
const lightboxMainImg = document.getElementById("lightbox-main-img");

const lightboxPrev = document.getElementById("lightbox-prev");
const lightboxNext = document.getElementById("lightbox-next");

const lightboxClose = document.getElementById("lightbox-close");

const lightboxThumbs =
  document.querySelectorAll(".lightbox-thumb");

  function setImage(index) {
    currentIndex = index;
  
    mainImg.src = images[index];
  
    thumbBtns.forEach((btn, i) => {
      btn.classList.toggle("active", i === index);
    });
  
    lightboxThumbs.forEach((thumb, i) => {
      thumb.classList.toggle("active", i === index);
    });
  }
thumbBtns.forEach((btn) => {
  btn.addEventListener("click", () => setImage(+btn.dataset.index));
});

qtyMinus.addEventListener("click", () => {
  if (quantity > 0) quantity--;
  qtyValue.textContent = quantity;
});

qtyPlus.addEventListener("click", () => {
  quantity++;
  qtyValue.textContent = quantity;
});

addToCart.addEventListener("click", () => {
  if (quantity === 0) return;
  cartQty += quantity;
  quantity = 0;
  qtyValue.textContent = 0;

  cartCount.textContent = cartQty;
  cartCount.style.display = "flex";

  cartBody.innerHTML = `
    <div class="cart-item">
      <img src="${images[0]}" alt="Fall Limited Edition Sneakers">
      <div class="cart-item-info">
        <p class="cart-item-name">Fall Limited Edition Sneakers</p>
        <p class="cart-item-price">$125.00 x ${cartQty} <strong>$${(125 * cartQty).toFixed(2)}</strong></p>
      </div>
      <button class="cart-delete" id="delete-item" aria-label="Remove item">
        <svg viewBox="0 0 14 16" xmlns="http://www.w3.org/2000/svg"><path d="M0 2.625V1.75C0 1.334.334 1 .75 1h3.5l.294-.584A.741.741 0 0 1 5.213 0h3.571a.75.75 0 0 1 .672.416L9.75 1h3.5c.416 0 .75.334.75.75v.875a.375.375 0 0 1-.375.375H.375A.375.375 0 0 1 0 2.625Zm13 1.75V14.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 1 14.5V4.375C1 4.169 1.169 4 1.375 4h11.25c.206 0 .375.169.375.375ZM4.5 6.5c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Zm3 0c0-.275-.225-.5-.5-.5s-.5.225-.5.5v7c0 .275.225.5.5.5s.5-.225.5-.5v-7Z" fill-rule="nonzero"/></svg>
      </button>
    </div>
    <button class="btn-checkout">Checkout</button>
  `;

  document.getElementById("delete-item").addEventListener("click", () => {
    cartQty = 0;
    cartCount.style.display = "none";
    cartBody.innerHTML =
      '<p style="color:var(--gray);font-size:0.9rem;text-align:center;padding:1rem 0;">Your cart is empty.</p>';
  });

  cartDropdown.classList.add("open");
});

cartToggle.addEventListener("click", (e) => {
  e.stopPropagation();
  cartDropdown.classList.toggle("open");
});

document.addEventListener("click", (e) => {
  if (!cartDropdown.contains(e.target) && e.target !== cartToggle) {
    cartDropdown.classList.remove("open");
  }
});


hamburger.addEventListener("click", () => {
  mobileMenu.classList.toggle("open");
  overlay.classList.toggle("open");
});

overlay.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
  overlay.classList.remove("open");
});

closeMenu.addEventListener("click", () => {
  mobileMenu.classList.remove("open");
  overlay.classList.remove("open");
});

galleryMain.addEventListener("click", (e) => {
  if (
    e.target.closest("#prev-btn") ||
    e.target.closest("#next-btn")
  ) {
    return;
  }

  if (window.innerWidth >= 768) {
    lightbox.classList.add("open");
    setLightboxImage(currentIndex);
  }
});

function setLightboxImage(index) {
  currentIndex = index;

  mainImg.src = images[index];
  lightboxMainImg.src = images[index];

  thumbBtns.forEach((btn, i) => {
    btn.classList.toggle("active", i === index);
  });

  lightboxThumbs.forEach((thumb, i) => {
    thumb.classList.toggle("active", i === index);
  });
}

lightboxPrev.addEventListener("click", () => {
  setLightboxImage(
    (currentIndex - 1 + images.length) % images.length
  );
});

lightboxNext.addEventListener("click", () => {
  setLightboxImage(
    (currentIndex + 1) % images.length
  );
});

lightboxThumbs.forEach((thumb) => {
  thumb.addEventListener("click", () => {
    setLightboxImage(+thumb.dataset.index);
  });
});


lightboxClose.addEventListener("click", () => {
  lightbox.classList.remove("open");
});

prevBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  setImage(
    (currentIndex - 1 + images.length) % images.length
  );
});

nextBtn.addEventListener("click", (e) => {
  e.stopPropagation();

  setImage(
    (currentIndex + 1) % images.length
  );
});