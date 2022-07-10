export default class Cart {
  constructor(someProducts = []) {
    this.state = someProducts;
    this.render();
    console.log("f=", this.state);
  }

  getTemplate() {
    return `
     <div >
    <!-- Cart component -->
    <div class="main-cart-button" id="open-cart" >
    <i class="bi bi-cart-plus"></i>
    CART
    </div>
    <div class="modal" id = "modal">
    <div class="close-button" id="close-button"><i class="bi bi-x-lg"></i></div>
    <div class="cart-container">
      <div class="item-container" data-element="body">
      </div>
        <div class="total" id="total">Total: 0</div>
        <div class="button-order"><button class="order">ORDER</button></div>
    </div>

  </div>
  </div>
    `;
  }

  render() {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper;
  }

  getCards() {
    return this.state.map((product) => {
      const div = document.createElement("div");
      div.innerHTML = `<div class="item">
          <div class="image" style="background-image: url(https://content2.rozetka.com.ua/goods/images/big_tile/163399632.jpg);"></div>
            <p class="name-item">${product.title}</p>
        <i class="bi bi-dash-circle"></i>
        <div class="amount">${
          this.state.filter((item) => item.id === product.id).length
        }</div>
        <i class="bi bi-plus-circle"></i>
        <div class="price">${product.price}</div>
        </div>`;
      return div;
    });
  }

  update(products) {
    this.state = products;
    const body = this.element.querySelector('[data-element="body"]');
    console.log(body);
    const cards = this.getCards();
    document.getElementById("total").innerText = `Total: ${this.state.reduce(
      (acc, value) => acc + +value.price,
      0
    )}`;
    body.innerHTML = "";
    body.append(...cards);
  }
}
