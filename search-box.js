export default class Search {
  constructor() {
    this.update();
  }
  getTemplate() {
    return `
    <div class="input-container">
        <input type="text" class="input-part" placeholder="Search">

        <label class="bi bi-search input-icon"></label>
    </div>
    `;
  }

  update(data = {}) {
    const wrapper = document.createElement("div");
    wrapper.innerHTML = this.getTemplate();

    this.element = wrapper.firstElementChild;
  }
}
