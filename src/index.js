import "./main.css";

class App {
	constructor() {
		this.#loadEventListeners();
	}

	#toggleSidebar() {
		const sidebar = document.querySelector("[data-element = 'sidebar']");
		sidebar.classList.toggle("active");
	}

	#loadEventListeners() {
		const sliderBtn = document.querySelector("[data-element = 'slider-btn']");

		sliderBtn.addEventListener("click", this.#toggleSidebar);
	}
}

const app = new App();
