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

	#showSection(sectionName) {
		// Select Section to show
		switch (sectionName) {
			case "inbox": {
				this.#display.renderInbox();
				this.#addTask();
				this.#showTodosList();
				break;
			}
		}
	}

	#showTodosList() {
		const todosListEl = document.querySelector("[data-element = 'todos-list']");
		todosListEl.textContent = "";

		for (let todo of this.todos.list) {
			const todoEl = this.#display.renderTodo(
				todo.title,
				todo.description,
				todo.dueDate,
				todo.priorityStatus
			);
			// Add index for each todo
			todoEl.setAttribute("data-index", `${this.todos.list.indexOf(todo)}`);

			todosListEl.append(todoEl);
		}
	}

	#addTask() {
		const addTaskForm = document.querySelector("[data-form = 'add-task']");

		addTaskForm.addEventListener("submit", () => {
			// Get Elements
			const taskName = document.querySelector("#task-name").value;
			const taskDescription = document.querySelector("#task-description").value;
			const dueDate = document.querySelector("#due-date").value;
			const priorityStatus = document.querySelector("#priority-status").value;
			// Add Task
			const task = new Todo(taskName, taskDescription, dueDate, priorityStatus);

			this.todos.addTodo(task);
			addTaskForm.reset();

			this.#showTodosList();
		});
	}

	#deleteTask(targetItem) {
		const taskToDelete = targetItem.parentNode.dataset.index;
		this.todos.removeTodo(taskToDelete);

		this.#showTodosList();
	}

	// HELPER METHODS
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
			case "delete-todo": {
				this.#deleteTask(targetParent);
				break;
			}
			case "close-modal": {
				this.#toggleModal("add-task");
				break;
			}
		}
	}

	#toggleModal(modalName) {
		switch (modalName) {
			case "add-task": {
				const addTaskModal = document.querySelector("#add-task-modal");
				if (!addTaskModal.open) {
					addTaskModal.showModal();
				} else {
					addTaskModal.close();
				}
			}
		}
	}

	#toggleSidebar() {
		this.#sidebar.classList.toggle("active");
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
