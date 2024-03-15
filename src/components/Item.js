class Element {
	static createSection(name) {
		const sectionEl = document.createElement("section");
		sectionEl.setAttribute("id", `${name}`);
		sectionEl.classList.add("container");

		return sectionEl;
	}

	static createSectionTitle(title) {
		const h2 = document.createElement("h2");
		h2.classList.add("section-title");
		h2.textContent = ` ${title}`;

		return h2;
	}

	static createIcon(icon, outline = "solid") {
		const iconEl = document.createElement("i");
		iconEl.classList.add(`fa-${outline}`, `fa-${icon}`);

		return iconEl;
	}

	static createTodosList() {
		const ul = document.createElement("ul");
		ul.classList.add("todos-list");
		ul.dataset.element = "todos-list";

		return ul;
	}
}

class Component {
	static createTodoItem(title, description, date) {
		// --List Item--
		const listItem = document.createElement("li");
		listItem.classList.add("todo-item");
		listItem.dataset.element = "todo-item";

		// --Checkbox--
		const checkBox = document.createElement("input");
		checkBox.classList.add("check-btn");
		checkBox.setAttribute("type", "checkbox");
		checkBox.dataset.button = "check";
		listItem.append(checkBox);

		// --Wrapper--
		const wrapper = document.createElement("div");
		wrapper.classList.add("wrapper");
		// Todo Title
		const todoTitle = document.createElement("label");
		todoTitle.classList.add("todo-item-title");
		todoTitle.textContent = title;
		wrapper.append(todoTitle);
		// Todo Description
		const todoDescription = document.createElement("p");
		todoDescription.classList.add("todo-item-description");
		todoDescription.textContent = description;
		wrapper.append(todoDescription);
		// Todo Date
		const todoDate = document.createElement("p");
		todoDate.classList.add("todo-item-date");
		todoDate.textContent = date;
		const dateIcon = Element.createIcon("calendar", "regular");
		todoDate.prepend(dateIcon);
		wrapper.append(todoDate);
		listItem.append(wrapper);

		// --Edit Todo Button--
		const editBtn = document.createElement("button");
		editBtn.classList.add("edit-todo-btn");
		editBtn.dataset.button = "edit-todo";
		const editIcon = Element.createIcon("pen-to-square");
		editBtn.append(editIcon);
		listItem.append(editBtn);

		// --Edit Todo Button--
		const deleteBtn = document.createElement("button");
		deleteBtn.classList.add("delete-todo-btn");
		deleteBtn.dataset.button = "delete-todo";
		const deleteIcon = Element.createIcon("trash");
		deleteBtn.append(deleteIcon);
		listItem.append(deleteBtn);

		return listItem;
	}
}

export { Element, Component };
