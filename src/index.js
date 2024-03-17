import { Todo, TodosList } from "./components/Todo.js";
import ProjectsList from "./components/ProjectsList.js";
import Display from "./components/Display.js";

import "./main.css";

class App {
	constructor() {
		this.inbox = new TodosList("inbox");
		this.projects = new ProjectsList();

		this.#loadEventListeners();
	}

	#showSection(sectionName) {
		this.#showProjectsList();
		this.#countProjectTasks("project");
		this.#countInboxTasks("inbox");
		console.log(this.projects.list[0].todos);
		switch (sectionName) {
			case "inbox": {
				Display.renderInbox();
				this.#showTasksList();
				break;
			}
		}
	}

	#showTasksList() {
		const todosListEl = document.querySelector("[data-element = 'todos-list']");
		todosListEl.textContent = "";

		for (let todo of this.inbox.todos) {
			const todoEl = Display.renderTodo(
				todo.title,
				todo.description,
				todo.dueDate,
				todo.priorityStatus
			);
			// Add index for the todo to be able to manipulate it
			todoEl.setAttribute("data-index", `${this.inbox.todos.indexOf(todo)}`);

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

	#showProjectsList() {
		const projectsListEl = document.querySelector(
			"[data-element = 'projects']"
		);
		projectsListEl.textContent = "";

		for (let project of this.projects.list) {
			const projectEl = Display.renderProject(project.name);
			// Add index for the todo to be able to manipulate it
			projectEl.setAttribute(
				"data-index",
				`${this.projects.list.indexOf(project)}`
			);

			projectsListEl.append(projectEl);
		}
	}

	#addProject() {
		const addProjectForm = document.querySelector(
			"[data-form = 'add-project']"
		);

		addProjectForm.addEventListener("submit", () => {
			// Get Input
			const projectName = document.querySelector("#project-name");

			const project = new TodosList(projectName.value);
			this.projects.addProject(project);
			this.#showSection("inbox");
		});
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

			this.inbox.addTodo(task);

			this.#showSection("inbox");
		});
	}

	#editTask(targetItem) {
		// Get Todo Item
		const todoIndex = targetItem.parentNode.dataset.index;
		const todoToEdit = this.inbox.todos[todoIndex];
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
		this.inbox.removeTodo(taskIndex);

		this.#showSection("inbox");
	}

	#toggleTaskStatus(targetItem) {
		const taskIndex = targetItem.parentNode.dataset.index;
		if (!targetItem.checked) {
			this.inbox.todos[taskIndex].updateTodoStatus("unfinished");
		} else {
			this.inbox.todos[taskIndex].updateTodoStatus("finished");
		}
	}

	#countInboxTasks(btnName) {
		const listLength = this.inbox.todos.length;
		const button = document.querySelector(`[data-button = ${btnName}]`);
		button.dataset.content = listLength;
	}

	#countProjectTasks(btnName) {
		const buttons = Array.from(
			document.querySelectorAll(`[data-button = ${btnName}]`)
		);

		buttons.forEach((button, index) => {
			const projectIndex = index;
			const projectTodos = this.projects.list[projectIndex].todos;
			const projectTodosNr = projectTodos.length;

			button.dataset.content = projectTodosNr;
		});
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
			case "add-project": {
				Display.renderModal("add-project-modal", Display.content);
				this.#addProject();
				this.#openModal();
				break;
			}
			// Main Content Buttons
			case "add": {
				Display.renderModal("add-modal", Display.content);
				this.#addTask();
				this.#openModal();
				break;
			}
			case "edit": {
				Display.renderModal("edit-modal", Display.content);
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
		const modal = document.querySelector("dialog");
		Display.content.removeChild(modal);
	}

	#toggleSidebar() {
		const sidebar = document.querySelector("#sidebar");
		sidebar.classList.toggle("active");
	}

	#loadEventListeners() {
		window.addEventListener("DOMContentLoaded", () => {
			this.#showSection("inbox");
		});

		document.addEventListener("click", this.#handleDocumentBtns.bind(this));
	}
}
const app = new App();

app.inbox.addTodo(
	new Todo(
		"Complete JavaScript Fundamentals",
		"Finish reading and practicing JavaScript basics, including variables, data types, and operators.",
		"2024-03-20",
		"High"
	)
);

app.inbox.addTodo(
	new Todo(
		"Build Portfolio Website",
		"Develop a personal portfolio website showcasing projects and skills using HTML, CSS, and JavaScript.",
		"2024-04-10",
		"Medium"
	)
);
app.inbox.addTodo(
	new Todo("Practice Algorithm Challenges", null, "2024-08-09", "Low")
);
app.inbox.addTodo(
	new Todo(
		"Study Node.js",
		" Learn Node.js by following tutorials and building small projects to understand server-side JavaScript development.",
		"2024-05-05",
		"Medium"
	)
);
app.inbox.addTodo(
	new Todo(
		"Update GitHub Repositories",
		"Push recent code changes to GitHub repositories and ensure documentation is up to date.",
		"2024-06-12",
		"Low"
	)
);

app.inbox.addTodo(
	new Todo(
		"Test 1",
		"Push recent code changes to GitHub repositories and ensure documentation is up to date.",
		"2024-06-12",
		"Low"
	)
);

app.projects.addProject(new TodosList("Bills"));
app.projects.list[0].addTodo(new Todo("test"));
