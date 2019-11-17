const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const carOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

let cart = [];

let buttonsDOM = [];

class Products {
  async getProducts() {
    try {
      //TODO: change it to get it from backend
      let result = await fetch("./furniture-shop-app/products.json");
      let data = await result.json();
      let products = data.items;
      products = products.map(product => {
        const { title, price } = product.fields;
        const { id } = product.sys;
        const image = product.fields.image.fields.file.url;
        return { title, price, id, image };
      });

      return products;
    } catch (error) {
      console.log(error);
    }
  }
}

class UI {
  displayProducts(products) {
    let result = '';

    products.forEach(product => {
      result += `<article class="product">
            <div class="img-container">
                <img src="${product.image}" alt="${product.title}"  />
                <button class="bag-btn" data-id="${product.id}">
                    <i class="fas fa-shopping-cart">Add to cart</i>
                </button>
                <h3>${product.title}</h3>
                <h4>$${product.price}</h4>
            </div>
        </article>`;
    });
    productsDOM.innerHTML = result;
  }

  getBagButtons() {
    const buttons = [...document.querySelectorAll(".bag-btn")];

    buttonsDOM = buttons;
    buttons.forEach(button => {
      let id = button.dataset.id;

      let inCart = cart.find(product => product.id === id);

      if (inCart) {
        button.innerText = 'In Cart';
        button.disabled = true;
      } else {
        button.addEventListener("click", event => {
          event.target.innerText = "In Cart";
          event.target.disabled = true;

          //get product from products
          let cartItem = { ...FurnitureStorage.getProduct(id), amount: 1 };

          //add product to cart
          cart = [...cart, cartItem];

          //save cart in local FurnitureStorage
          FurnitureStorage.saveCart(cart);

          //set cart values
          this.setCartValues(cart);

          //display cart item
          this.addCartItem(cartItem);

          //show cart
          this.showCart();
        });
      }
    });
  }

  setCartValues(cart) {
    let tempTotal = 0;
    let productsTotal = 0;

    cart.map(cartItem => {
      tempTotal += cartItem.price * cartItem.amount;
      productsTotal += cartItem.amount;
    });
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = parseInt(productsTotal);
  }

  addCartItem(cartItem) {
    const div = document.createElement("div");
    div.classList.add("cart-item");
    div.innerHTML = `<div class="cart-item">
                <img src="${cartItem.image}" alt="" >
                <div>
                    <h4>${cartItem.title}</h4>
                    <h5>${cartItem.price}</h5>
                    <span class="remove-item" data-id="${cartItem.id}">Remove</span>
                </div>
                <div>
                    <i class="fas fa-chevron-up" data-id="${cartItem.id}"></i>
                    <p class="item-amount">${cartItem.amount}</p>
                    <i class="fas fa-chevron-down" data-id="${cartItem.id}"></i>
                </div>
            </div>`;

    cartContent.appendChild(div);
  }

  showCart() {
    carOverlay.classList.add("tranparentBcg");
    cartDOM.classList.add("showCart");
  }

  hideCart() {
    carOverlay.classList.remove("tranparentBcg");
    cartDOM.classList.remove("showCart");
  }

  setupAPP() {
    cart = FurnitureStorage.getCart() || [];
    this.setCartValues(cart);
    this.populate(cart);
    cartBtn.addEventListener("click", this.showCart);
    closeCartBtn.addEventListener("click", this.hideCart);
    this.cartLogic();
  }

  populate(cart) {
    cart.forEach(cartItem => this.addCartItem(cartItem));
  }

  cartLogic() {
    clearCartBtn.addEventListener("click", event => {
      this.clearCart();
    });

    cartBtn.addEventListener("click", event => {
      if (event.target.classList.contains("remove-item")) {
        let removeItem = event.target;
        let id = removeItem.dataset.id;
        cartContent.removeChild(removeItem.parentElement.parentElement);
        this.removeItem(id);
      } else if (event.target.classList.contains("fa-cheveron-up")) {
        let id = event.target.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount += 1;
        FurnitureStorage.saveCart(cart);
        this.setCartValues(cart);
        event.target.nextElementSibling.innerText = tempItem.amount;
      } else if (event.target.classList.contains("fa-cheveron-down")) {
        let id = event.target.dataset.id;
        let tempItem = cart.find(item => item.id === id);
        tempItem.amount -= 1;
        if (tempItem.amount < 0) {
          this.removeItem(tempItem);
          cartContent.removeChild(event.target.parentElement.parentElement);
        } else {
          FurnitureStorage.saveCart(cart);
          this.setCartValues(cart);
          event.target.previousElementSibling.innerText = tempItem.amount;
        }
      }
    });
  }

  clearCart() {
    let cartItems = cart.map(item => item.id);
    cartItems.forEach(id => this.removeItem(id));
    cartContent.innerHTML = "";
  }

  removeItem(id) {
    cart = cart.filter(item => item.id !== id);
    this.setCartValues(cart);
    FurnitureStorage.saveCart(cart);
    let button = this.getSingleButton(id);
    button.disabled = false;
    button.innerHTML = '<i class="fas fa-shopping-cart></i>Add to cart';
  }

  getSingleButton(id) {
    return buttonsDOM.find(button => button.dataset.id === id);
  }
}

class FurnitureStorage {
  static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
  }

  static getProduct(id) {
    const products = JSON.parse(localStorage.getItem("products"));
    return products.find(product => product.id === id);
  }

  static saveCart(cart) {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  static getCart(cart) {
    return JSON.parse( localStorage.getItem("cart") );
  }
}

function init() {
  const ui = new UI();
  const products = new Products();
  ui.setupAPP();

  products
    .getProducts()
    .then(products => {
      ui.displayProducts(products);
      FurnitureStorage.saveProducts(products);
    })
    .then(() => {
      ui.getBagButtons();
    });
}

init()
