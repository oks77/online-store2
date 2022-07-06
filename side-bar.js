const category = [
  {
    value: "monitors",
    text: "Monitors",
  },
  {
    value: "laptops",
    text: "Laptops",
  },
  {
    value: "video_cards",
    text: "Video cards",
  },
  {
    value: "gaming_keyboards",
    text: "Gaming keyboards",
  },
  {
    value: "computer_mouse",
    text: "Computer mouse",
  },
  {
    value: "ssd",
    text: "SSD",
  },
  {
    value: "sounds_cards",
    text: "Sounds cards",
  },
  {
    value: "ram",
    text: "RAM",
  },
];

const brand = [
  {
    value: "asus",
    text: "Asus",
  },
  {
    value: "acer",
    text: "Acer",
  },
  {
    value: "apple",
    text: "Apple",
  },
  {
    value: "dell",
    text: "Dell",
  },
  {
    value: "dynamode",
    text: "Dynamode",
  },
  {
    value: "gigabyte",
    text: "Gigabyte",
  },
  {
    value: "kingston",
    text: "Kingston",
  },
  {
    value: "lenovo",
    text: "Lenovo",
  },
  {
    value: "logitech",
    text: "Logitech",
  },
  {
    value: "msi",
    text: "MSI",
  },
  {
    value: "benq",
    text: "BenQ",
  },
  {
    value: "a4tech",
    text: "A4Tech",
  },
];
export default class SideBar {
  constructor(items = {}) {
    this.items = category;
    this.update();
    this.getCategory(category);
  }

  getTemplate() {
    return `
     <div class="side-bar">

      <div class="price-container">
        <p class="category-styles">Price</p>
      </div>
      <div class="range-slider">
        <span data-element="from">0 UAH</span>
        <div data-element="inner" class="range-slider__inner">
          <span data-element="progress" class="range-slider__progress" style="left: 0%; right: 0%;"></span>
          <span data-element="thumbLeft" class="range-slider__thumb-left" style="left: 0%;"></span>
          <span data-element="thumbRight" class="range-slider__thumb-right" style="right: 0%;"></span>
        </div>
        <span data-element="to">85000 UAH</span>
      </div>
      <div class="category-container">
        <p class="category-styles">Category</p>
      </div>
      <ul class="all-category">
      ${this.getCategory(category)}
      </ul>
      <div class="line-solid"></div>
      <p class="category-styles">Brand</p>
      <ul class="all-category">
       ${this.getBrand(brand)}
      </ul>
      <div class="line-solid"></div>
      <p class="category-styles">Rating</p>
      <div class="range-slider">
        <span data-element="from">0</span>
        <div data-element="inner" class="range-slider__inner">
          <span data-element="progress" class="range-slider__progress" style="left: 0%; right: 0%;"></span>
          <span data-element="thumbLeft" class="range-slider__thumb-left" style="left: 0%;"></span>
          <span data-element="thumbRight" class="range-slider__thumb-right" style="right: 0%;"></span>
        </div>
        <span data-element="to">5</span>
      </div>
    `;
  }
  update(data = {}) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
  }

  getCategory(arr) {
    const result = arr
      .map(
        (num) =>
          `<li class="name-category"><input class="box-form" type="checkbox" data-category="${num.value}">${num.text}</li>`
      )
      .join("");
    return result;
  }
  getBrand(arr) {
    const result = arr
      .map(
        (num) =>
          `<li class="name-category"><input class="box-form" type="checkbox" data-brand="${num.value}">${num.text}</li>`
      )
      .join("");
    return result;
  }
}
