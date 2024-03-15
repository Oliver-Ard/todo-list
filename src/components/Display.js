import { Element, Component } from "./Item.js";

class Display {
	#content;
	constructor() {
		this.#content = document.querySelector("#content");
	}

	renderInbox() {
		this.#content.textContent = "";

		const inbox = Element.createSection("inbox");
		const title = Element.createSectionTitle("Inbox");
		const titleIcon = Element.createIcon("inbox");
		title.prepend(titleIcon);
		inbox.append(title);
		const todosList = Element.createTodosList();
		inbox.append(todosList);
		this.#content.append(inbox);
	}

	renderTodo(title, description, date) {
		return Component.createTodoItem(title, description, date);
	}
}

export default Display;
