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
		const addTaskBtn = Component.createAddBtn("task");
		inbox.append(addTaskBtn);

		Display.#content.append(inbox);
	}

	static renderProject(projectName) {
		Display.#content.textContent = "";

		const project = Element.createSection("project");
		// --Title--
		const title = Component.createProjectTitle(projectName);
		project.append(title);
		// --List--
		const todosList = Element.createList("todos");
		project.append(todosList);
		// --Add Task Button--
		const addTaskBtn = Component.createAddBtn("task");
		project.append(addTaskBtn);

		Display.#content.append(project);
	}

	static renderModal(modalType, parentElement) {
		switch (modalType) {
			case "add-modal": {
				const addTaskModal = Component.createTaskModal("add");
				parentElement.append(addTaskModal);
				break;
			}
			case "edit-modal": {
				const editTaskModal = Component.createTaskModal("edit");
				parentElement.append(editTaskModal);
				break;
			}
			case "add-project-modal": {
				const addProjectModal = Component.createProjectModal("add");
				parentElement.append(addProjectModal);
				break;
			}
		}
	}

	static renderTodo(title, description, date, priorityStatus) {
		return Component.createTodoItem(title, description, date, priorityStatus);
	}

	static addProjectBtn(btnName) {
		return Component.createProjectBtn(btnName);
	}
}

export default Display;
