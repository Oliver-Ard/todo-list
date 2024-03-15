import { Todo, TodosList } from "./components/Todo.js";
import Display from "./components/Display.js";

import "./main.css";

class App {
	#display;
	#sidebar;

	constructor() {
		this.todos = new TodosList();
		this.#display = new Display();
		this.#sidebar = document.querySelector("#sidebar");

		this.#loadEventListeners();
	}

	#toggleSidebar() {
		this.#sidebar.classList.toggle("active");
	}

	#showSection(sectionName) {
		// Select Section to show
		switch (sectionName) {
			case "inbox": {
				this.#display.renderInbox();
				break;
			}
		}
		// Show Todo List
		const todosListEl = document.querySelector("[data-element = 'todos-list']");
		todosListEl.textContent = "";

		for (let todo of this.todos.list) {
			const todoEl = this.#display.renderTodo(
				todo.title,
				todo.description,
				todo.dueDate,
				todo.priorityStatus
			);

			todosListEl.append(todoEl);
		}
	}

	#toggleModal(modalName) {
		switch (modalName) {
			case "add-task": {
				const addTaskModal = document.querySelector("#add-task-modal");
				const titleInput = document.querySelector("#task-name");
				if (!addTaskModal.open) {
					addTaskModal.showModal();
					titleInput.focus();
				} else {
					addTaskModal.close();
				}
			}
		}
	}

	// --Sidebar Buttons Handler--
	#clickSidebarBtn(e) {
		const target = e.target;
		const targetParent = e.target.parentNode;

		switch (target.dataset.button || targetParent.dataset.button) {
			case "slider": {
				this.#toggleSidebar();
				break;
			}
			case "inbox": {
				this.#showSection("inbox");
				break;
			}
		}
	}

	// --Main Content Buttons Handler--
	#clickMainContentBtn(e) {
		const target = e.target;
		const targetParent = e.target.parentNode;

		switch (target.dataset.button || targetParent.dataset.button) {
			case "add": {
				this.#toggleModal("add-task");
				break;
			}
			case "close-modal": {
				this.#toggleModal("add-task");
				break;
			}
		}
	}

	#loadEventListeners() {
		window.addEventListener("DOMContentLoaded", () => {
			this.#showSection("inbox");
		});

		this.#sidebar.addEventListener("click", this.#clickSidebarBtn.bind(this));

		this.#display.content.addEventListener(
			"click",
			this.#clickMainContentBtn.bind(this)
		);
	}
}
const app = new App();
