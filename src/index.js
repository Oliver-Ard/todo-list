import { Todo, TodosList } from "./components/Todo.js";
import Display from "./components/Display.js";

import "./main.css";

class App {
	#todos;

	constructor() {
		this.#todos = new TodosList();

		this.#loadEventListeners();
	}

	#showSection(sectionName) {
		switch (sectionName) {
			case "inbox": {
				Display.renderInbox();
				this.#countTasks("inbox");
				this.#showTasksList();
				break;
			}
		}
	}

	#showTasksList() {
		const todosListEl = document.querySelector("[data-element = 'todos-list']");
		todosListEl.textContent = "";

		for (let todo of this.#todos.list) {
			const todoEl = Display.renderTodo(
				todo.title,
				todo.description,
				todo.dueDate,
				todo.priorityStatus
			);
			// Add index for the todo to be able to manipulate it
			todoEl.setAttribute("data-index", `${this.#todos.list.indexOf(todo)}`);

			// Change the state of the checkbox button depending on the status of the todo
			const checkBox = todoEl.children[0];
			if (todo.status === "unfinished") {
				checkBox.checked = false;
			} else {
				checkBox.checked = true;
			}
			todosListEl.append(todoEl);
		}
	}

	#addTask() {
		const addTaskForm = document.querySelector("[data-form = 'add-task']");

		addTaskForm.addEventListener("submit", () => {
			// Get Inputs
			const taskName = document.querySelector("#task-name");
			const taskDescription = document.querySelector("#task-description");
			const dueDate = document.querySelector("#due-date");
			const priorityStatus = document.querySelector("#priority-status");
			// Add Task
			const task = new Todo(
				taskName.value,
				taskDescription.value,
				dueDate.value,
				priorityStatus.value
			);

			this.#todos.addTodo(task);
			addTaskForm.reset();

			this.#showSection("inbox");
			this.#removeModal();
		});
	}

	#editTask(targetItem) {
		// Get Todo Item
		const todoIndex = targetItem.parentNode.dataset.index;
		const todoToEdit = this.#todos.list[todoIndex];
		// Get Form
		const editTaskForm = document.querySelector("[data-form = 'edit-task']");
		// Get Inputs
		const taskName = document.querySelector("#task-name");
		const taskDescription = document.querySelector("#task-description");
		const dueDate = document.querySelector("#due-date");
		const priorityStatus = document.querySelector("#priority-status");
		// Get Current Value Inputs
		taskName.value = todoToEdit.title;
		taskDescription.value = todoToEdit.description;
		dueDate.value = todoToEdit.dueDate;
		priorityStatus.value = todoToEdit.priorityStatus;

		editTaskForm.addEventListener("submit", () => {
			// Update with new values
			todoToEdit.editTodo(
				taskName.value,
				taskDescription.value,
				dueDate.value,
				priorityStatus.value
			);

			this.#showTasksList();
		});
	}

	#deleteTask(targetItem) {
		const taskIndex = targetItem.parentNode.dataset.index;
		this.#todos.removeTodo(taskIndex);

		this.#showSection("inbox");
	}

	#toggleTaskStatus(targetItem) {
		const taskIndex = targetItem.parentNode.dataset.index;
		if (!targetItem.checked) {
			this.#todos.list[taskIndex].updateTodoStatus("unfinished");
		} else {
			this.#todos.list[taskIndex].updateTodoStatus("finished");
		}
	}

	#countTasks(btnName) {
		const listLength = this.#todos.list.length;
		const button = document.querySelector(`[data-button = ${btnName}]`);
		button.dataset.content = listLength;
	}

	// HELPER METHODS
	// Buttons Handler
	#handleDocumentBtns(e) {
		const target = e.target;
		// We also target the parent because some buttons have icons, and the data attr is on the button
		const targetParent = e.target.parentNode;
		switch (target.dataset.button || targetParent.dataset.button) {
			// Sidebar Buttons
			case "slider": {
				this.#toggleSidebar();
				break;
			}
			case "inbox": {
				this.#showSection("inbox");
				break;
			}
			// Main Content Buttons
			case "add": {
				Display.renderModal("add-modal", this.#getSection("inbox"));
				this.#addTask();
				this.#openModal();
				break;
			}
			case "edit": {
				Display.renderModal("edit-modal", this.#getSection("inbox"));
				this.#editTask(targetParent);
				this.#openModal();
				break;
			}
			case "delete": {
				this.#deleteTask(targetParent);
				break;
			}
			case "check": {
				this.#toggleTaskStatus(target);
				break;
			}
			// Modal Buttons
			case "close-modal": {
				this.#removeModal();
				break;
			}
		}
	}

	#openModal() {
		const modal = document.querySelector("dialog");
		// Overwrite the default escape key behavior for the modal to delete the modal.
		modal.addEventListener("keydown", (e) => {
			if (e.key === `Escape`) {
				this.#removeModal();
			}
		});

		modal.showModal();
	}

	#removeModal() {
		const sectionToCheck = Display.content.childNodes[0];
		const modalToCheck = document.querySelector("dialog");

		if (sectionToCheck.contains(modalToCheck)) {
			sectionToCheck.removeChild(modalToCheck);
		}
	}

	#toggleSidebar() {
		const sidebar = document.querySelector("#sidebar");
		sidebar.classList.toggle("active");
	}

	#getSection(element) {
		return document.querySelector(`#${element}`);
	}

	#loadEventListeners() {
		window.addEventListener("DOMContentLoaded", () => {
			this.#showSection("inbox");
		});

		document.addEventListener("click", this.#handleDocumentBtns.bind(this));
	}
}
const app = new App();
