import Component from "./Component.js";
import Element from "./Element.js";

// Class for rendering sections
class Display {
	#content;
	constructor() {
		this.#content = document.querySelector("#content");
	}

	get content() {
		return this.#content;
	}

	renderInbox() {
		this.#content.textContent = "";

		const inbox = Element.createSection("inbox");
		const title = Element.createSectionTitle("Inbox");
		const titleIcon = Element.createIcon("inbox");
		title.prepend(titleIcon);
		inbox.append(title);
		const todosList = Element.createList("todos");
		inbox.append(todosList);
		const addTaskBtn = Component.createAddBtn("task");
		inbox.append(addTaskBtn);
		const addTaskModal = Component.createAddTaskModal();
		inbox.append(addTaskModal);
		this.#content.append(inbox);
	}

	renderTodo(title, description, date, priorityStatus) {
		return Component.createTodoItem(title, description, date, priorityStatus);
	}
}

export default Display;
