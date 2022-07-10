import CardsList from "./cards-list.js";
import Pagination from "./pagination.js";
import SideBar from "./side-bar.js";
import Search from "./search-box.js";
import Cart from "./cart.js";

export default class OnlineStorePage {
  constructor() {
    this.pageSize = 9;
    this.products = [];
    this.cartProducts = [];
    this.components = {};
    this.url = new URL(`https://online-store.bootcamp.place/api/products`);
    this.url.searchParams.set("_limit", this.pageSize);
    this.getProducts(0).then((res) => {
      this.products = res;
      this.initComponents(res);
      this.render();
      this.renderComponents();

      this.initEventListeners();
      this.checkedOneItem();
      this.searchName();
      this.showCart();
      this.addToCartInit();
    });
  }

  getTemplate() {
    return `
      <div class="main-container">
       <div class="top-part">
          <p class="online-store-name">Online Store</p>
          <div data-element="cart">
          <!-- Cart component -->
          </div>
       </div>
       <div class="content">
            <div data-element="side-bar">
                  <!-- Side Bar component -->
            </div>
        <div class="central-part">
            <div data-element="search">
          <!-- Search component -->
            </div>

        <div class="card-list" data-element="cardsList">
          <!-- Cards List component -->
        </div>
        <div class="bottom-part" data-element="pagination">
          <!-- Pagination component -->
        </div>
        </div>



</div>
      </div>
    `;
  }

  getProducts(activePageIndex) {
    this.url.searchParams.set("_page", activePageIndex);

    // console.log(this.url.href)
    return fetch(this.url.href).then((response) => response.json());
  }

  initComponents(products) {
    const totalPages = Math.ceil(100 / this.pageSize);

    const cardList = new CardsList(products);
    const pagination = new Pagination({
      activePageIndex: 0,
      totalPages,
    });
    const sideBar = new SideBar();
    const search = new Search();
    const cart = new Cart();

    this.components.cardList = cardList;
    this.components.pagination = pagination;
    this.components.sideBar = sideBar;
    this.components.search = search;
    this.components.cart = cart;
  }

  renderComponents() {
    const cardsContainer = this.element.querySelector(
      '[data-element="cardsList"]'
    );
    const paginationContainer = this.element.querySelector(
      '[data-element="pagination"]'
    );
    const sideBarContainer = this.element.querySelector(
      '[data-element="side-bar"]'
    );
    const searchContainer = this.element.querySelector(
      '[data-element="search"]'
    );
    const cartContainer = this.element.querySelector('[data-element="cart"]');

    cardsContainer.append(this.components.cardList.element);
    paginationContainer.append(this.components.pagination.element);
    sideBarContainer.append(this.components.sideBar.element);
    searchContainer.append(this.components.search.element);
    cartContainer.append(this.components.cart.element);
  }

  render() {
    const wrapper = document.createElement("div");

    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;

    const root = document.querySelector("#root");

    root.append(this.element);
  }

  initEventListeners() {
    this.components.pagination.element.addEventListener(
      "page-changed",
      (event) => {
        const pageIndex = event.detail;

        // [0, 1, 2] | pageIndex = 0 pageSize = 3
        // [3, 4, 5] | pageIndex = 1 pageSize = 3
        // [6, 7]    | pageIndex = 2 pageSize = 3

        // const start = pageIndex * this.pageSize;
        // const end = start + this.pageSize;
        //const data = this.products.slice(start, end);
        this.getProducts(pageIndex).then((data) => {
          this.products = data;
          this.components.cardList.update(data);
        });
      }
    );
  }

  checkedOneItem() {
    const inputsCollection = document.getElementsByClassName("box-form");
    console.log(inputsCollection);
    for (let item of inputsCollection) {
      item.addEventListener("click", (e) => {
        const valuesData = e.target.dataset;
        console.log(valuesData);
        if (e.target.checked) {
          this.url.searchParams.append(
            Object.keys(valuesData)[0],
            Object.values(valuesData)[0]
          );
        }
        if (!e.target.checked) {
          this.url.searchParams.delete(Object.keys(valuesData)[0]);
        }

        this.getCategories().then((data) => {
          this.products = data;
          this.components.cardList.update(data);
        });
      });
    }
  }

  getCategories() {
    return fetch(this.url.href).then((response) => response.json());
  }

  searchName() {
    const searchCollection = document.getElementsByClassName("input");
    for (let item of searchCollection) {
      item.addEventListener("change", (e) => {
        console.log(e.target.value);
        if (e.target.value) {
          this.url.searchParams.set("q", e.target.value);
          console.log(this.url.href);
        }

        this.getCategories().then((data) => {
          this.products = data;
          this.components.cardList.update(data);
          console.log(data);
        });
      });
    }
  }

  addToCartInit() {
    const buttonCollection = document.getElementsByClassName("addToCartButton");
    for (let item of buttonCollection) {
      item.addEventListener("click", (e) => {
        const item = this.products.find(
          (value) => value.id === e.target.dataset.id
        );
        this.cartProducts.push(item);
        console.log(this.cartProducts);
      });
    }
  }

  showCart() {
    const buttonCart = document.getElementById("open-cart");
    const modal = document.getElementById("modal");
    const closeCart = document.getElementById("close-button");
    buttonCart.addEventListener("click", (e) => {
      if (this.cartProducts.length) {
        modal.style.cssText = "display: flex";
        this.components.cart.update(this.cartProducts);
      }
    });
    closeCart.addEventListener("click", (e) => {
      modal.style.cssText = "display: none";
      this.components.cart.update([]);
    });
  }
}
