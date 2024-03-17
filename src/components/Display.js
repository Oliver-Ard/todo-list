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
		const title = Element.createSectionTitle("Inbox");
		const titleIcon = Element.createIcon("inbox");
		title.prepend(titleIcon);
		inbox.append(title);
		const todosList = Element.createList("todos");
		inbox.append(todosList);
		const addTaskBtn = Component.createAddBtn("task");
		inbox.append(addTaskBtn);
		Display.#content.append(inbox);
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
		}
	}

	static renderTodo(title, description, date, priorityStatus) {
		return Component.createTodoItem(title, description, date, priorityStatus);
	}
}

export default Display;
