import { Todo, TodosList } from "./components/Todo.js";
import { Note, NotesList } from "./components/Note.js";
import ProjectsList from "./components/ProjectsList.js";
import Display from "./components/Display.js";

import "./main.css";

class App {
	#currentSection;
	constructor() {
		this.inbox = new TodosList("inbox");
		this.notes = new NotesList();
		this.projects = new ProjectsList();
		this.#currentSection = document.querySelector("[data-button = 'inbox']");

		this.#loadEventListeners();
	}

	#showSection(sectionName, targetSection = this.#currentSection) {
		switch (sectionName) {
			case "inbox": {
				// Get current section
				this.#currentSection = targetSection;
				this.#toggleInboxBtnState("active");
				this.#toggleNotesBtnState("inactive");

				Display.renderInbox();
				this.#showList(this.inbox.todos);
				break;
			}
			case "notes": {
				// Get current section
				this.#currentSection = targetSection;
				this.#toggleInboxBtnState("inactive");
				this.#toggleNotesBtnState("active");

				Display.renderNotes();
				this.#showList(this.notes.list, "notes");
				break;
			}
			case "project": {
				// Get current section
				this.#currentSection = targetSection;
				this.#toggleInboxBtnState("inactive");
				this.#toggleNotesBtnState("inactive");

				Display.renderProject(this.#currentSection.textContent);
				const projectIndex = this.#currentSection.parentNode.dataset.index;
				this.#showList(this.projects.list[projectIndex].todos);
				break;
			}
		}
		this.#showProjectsList();
		this.#countItems("project");
		this.#countItems("notes");
	}

	// --TASKS--
	#showList(listTarget, type = "todos") {
		const todosListEl = document.querySelector(
			`[data-element = '${type}-list']`
		);
		todosListEl.textContent = "";

		for (let item of listTarget) {
			switch (type) {
				case "todos": {
					const todoEl = Display.renderTodo(
						item.title,
						item.description,
						item.dueDate,
						item.priorityStatus
					);
					// Add index for the item to be able to manipulate it
					todoEl.setAttribute("data-index", `${listTarget.indexOf(item)}`);
					// Change the state of the checkbox button depending on the status of the item
					const checkBox = todoEl.children[0];
					if (item.status === "unfinished") {
						checkBox.checked = false;
					} else {
						checkBox.checked = true;
					}

					todosListEl.append(todoEl);
					break;
				}
				case "notes": {
					const noteEl = Display.renderNote(item.title, item.description);
					// Add index for the item to be able to manipulate it
					noteEl.setAttribute("data-index", `${listTarget.indexOf(item)}`);

					todosListEl.append(noteEl);
					break;
				}
			}
		}
		this.#countItems("inbox");
		this.#countItems("notes");
		this.#countItems("project");
	}

	#addTask(sectionBtn) {
		const addTaskForm = document.querySelector("[data-form = 'add-task']");

		addTaskForm.addEventListener("submit", (e) => {
			e.preventDefault();
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
			// Check the current section, add the task of the current section and render the correct list
			const section = sectionBtn.dataset.button;
			switch (section) {
				case "inbox": {
					this.inbox.addTodo(task);
					this.#showList(this.inbox.todos);
					break;
				}
				case "project": {
					const projectIndex = sectionBtn.parentNode.dataset.index;
					const currentProject = this.projects.list[projectIndex];
					currentProject.addTodo(task);
					this.#showList(currentProject.todos);
				}
			}

			this.#removeModal();
		});
	}

	#getButton(targetBtn) {
		return document.querySelector(`button[data-button = '${targetBtn}']`);
	}

	#editTask(targetItem) {
		// Get Todo Item
		const todoIndex = targetItem.parentNode.dataset.index;
		const section = this.#currentSection.dataset.button;
		let todoToEdit;
		let projectIndex;

		switch (section) {
			case "inbox":
				todoToEdit = this.inbox.todos[todoIndex];
				break;
			case "project":
				projectIndex = this.#currentSection.parentNode.dataset.index;
				todoToEdit = this.projects.list[projectIndex].todos[todoIndex];
				break;
		}

		// Get Form
		const editTaskForm = document.querySelector("[data-form='edit-task']");
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

		editTaskForm.addEventListener("submit", (e) => {
			e.preventDefault();
			// Update with new values
			todoToEdit.editTodo(
				taskName.value,
				taskDescription.value,
				dueDate.value,
				priorityStatus.value
			);

			switch (section) {
				case "inbox": {
					this.#showList(this.inbox.todos);
					break;
				}
				case "project": {
					this.#showList(this.projects.list[projectIndex].todos);
				}
			}
			this.#removeModal();
		});
	}

	#deleteTask(targetItem) {
		const section = this.#currentSection.dataset.button;
		const taskIndex = targetItem.parentNode.dataset.index;

		switch (section) {
			case "inbox": {
				this.inbox.removeTodo(taskIndex);
				this.#showList(this.inbox.todos);
				break;
			}
			case "project": {
				const projectIndex = this.#currentSection.parentNode.dataset.index;
				this.projects.list[projectIndex].removeTodo(taskIndex);
				this.#showList(this.projects.list[projectIndex].todos);
				break;
			}
		}
	}

	// --NOTES--
	#addNote() {
		const addNoteForm = document.querySelector("[data-form = 'add-note']");

		addNoteForm.addEventListener("submit", (e) => {
			e.preventDefault();
			// Get Inputs
			const noteName = document.querySelector("#note-name");
			const noteDescription = document.querySelector("#note-description");
			// Add Note
			const note = new Note(noteName.value, noteDescription.value);

			this.notes.addNote(note);
			this.#showList(this.notes.list, "notes");

			this.#removeModal();
		});
	}

	#editNote(targetItem) {
		// Get Note Item
		const noteIndex = targetItem.parentNode.dataset.index;
		const noteToEdit = this.notes.list[noteIndex];
		// Get Form
		const editNoteForm = document.querySelector("[data-form='edit-note']");
		// Get Inputs
		const noteName = document.querySelector("#note-name");
		const noteDescription = document.querySelector("#note-description");
		// Get Current Value Inputs
		noteName.value = noteToEdit.title;
		noteDescription.value = noteToEdit.description;

		editNoteForm.addEventListener("submit", (e) => {
			e.preventDefault();
			// Update with new values
			noteToEdit.editNote(noteName.value, noteDescription.value);

			this.#showList(this.notes.list, "notes");

			this.#removeModal();
		});
	}

	#deleteNote(targetItem) {
		const noteIndex = targetItem.parentNode.dataset.index;

		this.notes.removeNote(noteIndex);
		this.#showList(this.notes.list, "notes");
	}

	// --PROJECTS--
	#showProjectsList() {
		const projectsListEl = document.querySelector("[data-element='projects']");
		projectsListEl.textContent = "";

		for (let project of this.projects.list) {
			const projectBtn = Display.renderProjectBtn(project.name);
			const projectIndex = this.projects.list.indexOf(project);

			// Check if this project is the current active project
			if (projectIndex === +this.#currentSection.parentNode.dataset.index) {
				projectBtn.children[0].classList.add("active");
			}

			// Add index for the todo to be able to manipulate it
			projectBtn.setAttribute("data-index", projectIndex);
			projectsListEl.append(projectBtn);
		}
	}

	#addProject() {
		const addProjectForm = document.querySelector(
			"[data-form = 'add-project']"
		);

		addProjectForm.addEventListener("submit", (e) => {
			e.preventDefault();
			// Get Input
			const projectName = document.querySelector("#project-name");

			const project = new TodosList(projectName.value);
			this.projects.addProject(project);

			this.#showProjectsList();
			this.#countItems("project");
			this.#removeModal();
		});
	}

	#editProjectName() {
		const projectIndex = this.#currentSection.parentNode.dataset.index;
		const currentProject = this.projects.list[projectIndex];
		// Get Form and Input
		const editProjectForm = document.querySelector(
			"[data-form = 'edit-project']"
		);
		const projectName = document.querySelector("#project-name");
		projectName.value = currentProject.name;

		editProjectForm.addEventListener("submit", (e) => {
			e.preventDefault();
			// Update with new value
			currentProject.editList(projectName.value);

			// Show the project section
			Display.renderProject(projectName.value);
			this.#showList(this.projects.list[projectIndex].todos);
			this.#showProjectsList();
		});
	}

	#deleteProject() {
		const projectIndex = this.#currentSection.parentNode.dataset.index;
		this.projects.removeProject(projectIndex);
		// Update the current section to be the inbox, to remove the 'active' class of a project element
		this.#currentSection = document.querySelector("[data-button='inbox']");
		this.#showProjectsList();
		this.#showSection("inbox");
	}

	#countItems(itemName) {
		switch (itemName) {
			case "inbox": {
				const listLength = this.inbox.todos.length;
				const button = document.querySelector("[data-button = 'inbox']");
				button.dataset.content = listLength;
				break;
			}
			case "notes": {
				const listLength = this.notes.list.length;
				const button = document.querySelector("[data-button = 'notes']");
				button.dataset.content = listLength;
				break;
			}
			case "project": {
				const buttons = Array.from(
					document.querySelectorAll("[data-button = project]")
				);
				buttons.forEach((button, index) => {
					const listLength = this.projects.list[index].todos.length;
					button.dataset.content = listLength;
				});
				break;
			}
		}
	}

	#toggleTaskStatus(targetItem) {
		// Check if a task is crossed or not
		const section = this.#currentSection.dataset.button;
		const taskIndex = targetItem.parentNode.dataset.index;

		switch (section) {
			case "inbox": {
				this.inbox.todos[taskIndex].updateTodoStatus(
					targetItem.checked ? "finished" : "unfinished"
				);
				break;
			}
			case "project": {
				const projectIndex = this.#currentSection.parentNode.dataset.index;
				this.projects.list[projectIndex].todos[taskIndex].updateTodoStatus(
					targetItem.checked ? "finished" : "unfinished"
				);
				break;
			}
		}
	}

	#toggleInboxBtnState(state) {
		const inboxBtn = document.querySelector("[data-button='inbox']");

		if (state === "active") {
			inboxBtn.classList.add("active");
		} else {
			inboxBtn.classList.remove("active");
		}
	}

	#toggleNotesBtnState(state) {
		const notesBtn = document.querySelector("[data-button='notes']");
		if (state === "active") {
			notesBtn.classList.add("active");
		} else {
			notesBtn.classList.remove("active");
		}
	}

	// HELPER METHODS
	// --Buttons Handler--
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
				this.#showSection("inbox", target);
				break;
			}
			case "notes": {
				this.#showSection("notes", target);
				break;
			}
			case "project": {
				this.#showSection("project", target);
				break;
			}
			case "add-project": {
				Display.renderModal("add-project-modal", Display.content);
				this.#addProject();
				this.#openModal();
				break;
			}
			// Main Content Buttons
			case "add-task": {
				Display.renderModal("add-task-modal", Display.content);
				this.#addTask(this.#currentSection);
				this.#openModal();
				break;
			}
			case "add-note": {
				Display.renderModal("add-note-modal", Display.content);
				this.#addNote();
				this.#openModal();
				break;
			}
			case "edit-task": {
				// Check if the target element has a valid index in its parent's dataset
				if (!targetParent.parentNode.dataset.index) {
					return;
				}
				Display.renderModal("edit-task-modal", Display.content);
				this.#editTask(targetParent);
				this.#openModal();
				break;
			}
			case "edit-note": {
				if (!targetParent.parentNode.dataset.index) {
					return;
				}
				Display.renderModal("edit-note-modal", Display.content);
				this.#editNote(targetParent);
				this.#openModal();
				break;
			}
			case "edit-project": {
				Display.renderModal("edit-project-modal", Display.content);
				this.#editProjectName();
				this.#openModal();
				break;
			}
			case "delete-task": {
				if (!targetParent.parentNode.dataset.index) {
					return;
				}
				this.#deleteTask(targetParent);
				break;
			}
			case "delete-note": {
				if (!targetParent.parentNode.dataset.index) {
					return;
				}
				this.#deleteNote(targetParent);
				break;
			}
			case "delete-project": {
				Display.renderModal("delete-project-modal", Display.content);
				this.#openModal();
				break;
			}
			case "confirm": {
				this.#deleteProject();
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
	new Todo(
		"Practice Algorithm Challenges",
		"They rushed out the door, grabbing anything and everything they could think of they might need. There was no time to double-check to make sure they weren't leaving something important behind. Everything was thrown into the car and they sped off. Thirty minutes later they were safe and that was when it dawned on them that they had forgotten the most important thing of all. The song came from the bathroom belting over the sound of the shower's running water. It was the same way each day began since he could remember. It listened intently and concluded that the singing today was as terrible as it had ever been.",
		"2024-08-09",
		"Low"
	)
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
app.projects.list[0].addTodo(new Todo("test"));
app.projects.addProject(new TodosList("Health"));
app.projects.list[1].addTodo(new Todo("test"));

app.notes.addNote(new Note("Note Test", "Random Description"));
app.notes.addNote(new Note("Noteeeeeee Test", "Random Description Part 2"));
app.notes.addNote(
	new Note(
		"Maybe I will to something today",
		"They rushed out the door, grabbing anything and everything they could think of they might need. There was no time to double-check to make sure they weren't leaving something important behind. Everything was thrown into the car and they sped off. Thirty minutes later they were safe and that was when it dawned on them that they had forgotten the most important thing of all. The song came from the bathroom belting over the sound of the shower's running water. It was the same way each day began since he could remember. It listened intently and concluded that the singing today was as terrible as it had ever been."
	)
);
