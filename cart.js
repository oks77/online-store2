export default class Cart {
  constructor(someProducts = []) {
    this.state = someProducts;
    console.log("f=", this.state);
    this.update();
  }

  getTemplate() {
    return `
     <div id="root">
    <!-- Cart component -->
    <div class="main-cart-button" id="open-cart">
    <i class="bi bi-cart-plus"></i>
    CART
    </div>
    <div class="modal" id = "modal">
    <div class="close-button" id="close-button"><i class="bi bi-x-lg"></i></div>
    <div class="cart-container">
      <div class="item-container">
        <div class="item">
          <img class="image" src="https://content2.rozetka.com.ua/goods/images/big_tile/163399632.jpg"
               alt="Ноутбук Acer Aspire 3 A315-57G-336G (NX.HZREU.01S) Charcoal Black">
          <p class="name-item">Ноутбук Acer Aspire 3 A315-57G-336G (NX.HZREU.01S) Charcoal Black</p>
          <i class="bi bi-dash-circle"></i>
          <div class="amount">1</div>
          <i class="bi bi-plus-circle"></i>
          <div class="price">15999</div>
        </div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="item"></div>
        <div class="total">Total: 11997</div>
        <div class="button-order"><button class="order">ORDER</button></div>
      </div>

    </div>
  </div>
  </div>
    `;
  }

  update(data = {}) {
    this.state = data;
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
  }

  // getCategory(arr) {
  //   const result = arr.map((num) =>
  //     `<div class="item-container">
  //       <div class="item">
  //         <img class="image" src="${num.image}"
  //              alt="Ноутбук Acer Aspire 3 A315-57G-336G (NX.HZREU.01S) Charcoal Black">
  //         <p class="name-item">Ноутбук Acer Aspire 3 A315-57G-336G (NX.HZREU.01S) Charcoal Black</p>
  //         <i class="bi bi-dash-circle"></i>
  //         <div class="amount">1</div>
  //         <i class="bi bi-plus-circle"></i>
  //         <div class="price">${this.state.price}</div>
  //       </div>`).join('');
  //   return result;
  // }
}
