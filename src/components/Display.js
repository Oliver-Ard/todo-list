import Component from "./Component.js";
import Element from "./Element.js";

// Class for rendering sections
class Display {
	static #content = document.querySelector("#content");

	static get content() {
		return Display.#content;
	}

	static renderInbox() {
		Display.#content.textContent = "";

		const inbox = Element.createSection("inbox");
		// --Title--
		const title = Element.createSectionTitle("Inbox");
		const titleIcon = Element.createIcon("inbox");
		title.prepend(titleIcon);
		inbox.append(title);
		// --List--
		const todosList = Element.createList("todos");
		inbox.append(todosList);
		// --Add Task Button--
		const addTaskBtn = Component.createAddBtn("task", "add-task");
		inbox.append(addTaskBtn);

		Display.#content.append(inbox);
	}

	static renderNotes() {
		Display.#content.textContent = "";

		const notes = Element.createSection("notes");
		// --Title--
		const title = Element.createSectionTitle("Notes");
		const titleIcon = Element.createIcon("note-sticky", "regular");
		title.prepend(titleIcon);
		notes.append(title);
		// --List--
		const notesList = Element.createList("notes");
		notes.append(notesList);
		// --Add Note Button--
		const addNoteBtn = Component.createAddBtn("note", "add-note");
		notes.append(addNoteBtn);

		Display.#content.append(notes);
	}

	static renderProject(projectName) {
		Display.#content.textContent = "";

		const project = Element.createSection("project");
		// --Title--
		const title = Component.createProjectTitle(`# ${projectName}`);
		project.append(title);
		// --List--
		const todosList = Element.createList("todos");
		project.append(todosList);
		// --Add Task Button--
		const addTaskBtn = Component.createAddBtn("task", "add-task");
		project.append(addTaskBtn);

		Display.#content.append(project);
	}

	static renderModal(modalType, parentElement) {
		switch (modalType) {
			case "add-task-modal": {
				const modal = Component.createTaskModal("add");
				parentElement.append(modal);
				break;
			}
			case "add-note-modal": {
				const modal = Component.createNoteModal("add");
				parentElement.append(modal);
				break;
			}
			case "edit-task-modal": {
				const modal = Component.createTaskModal("edit");
				parentElement.append(modal);
				break;
			}
			case "edit-note-modal": {
				const modal = Component.createNoteModal("edit");
				parentElement.append(modal);
				break;
			}
			case "add-project-modal": {
				const modal = Component.createProjectModal("add");
				parentElement.append(modal);
				break;
			}
			case "edit-project-modal": {
				const modal = Component.createProjectModal("edit");
				parentElement.append(modal);
				break;
			}
			case "delete-project-modal": {
				const modal = Component.createDeleteModal("project");
				parentElement.append(modal);
				break;
			}
		}
	}

	static renderTodo(title, description, date, priorityStatus) {
		return Component.createTodoItem(title, description, date, priorityStatus);
	}

	static renderNote(title, description) {
		return Component.createNoteItem(title, description);
	}

	static renderProjectBtn(btnName) {
		return Component.createProjectBtn(btnName);
	}
}

export default Display;
