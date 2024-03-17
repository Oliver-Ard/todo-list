import Element from "./Element.js";

// Class for creating complex UI components
class Component {
	static createTodoItem(title, description, date, priorityStatus) {
		// --List Item--
		const listItem = document.createElement("li");
		listItem.classList.add("todo-item");
		listItem.dataset.element = "todo-item";

		// --Checkbox--
		const checkBox = Element.createInput("checkbox", "cross-todo");
		checkBox.classList.add("check-btn");
		checkBox.dataset.button = "check";
		listItem.append(checkBox);

		// --Wrapper--
		const wrapper = document.createElement("div");
		wrapper.classList.add("wrapper");
		// Todo Title
		const todoTitle = Element.createLabel(title, "#", "todo-item-title");
		todoTitle.dataset.button = "edit";
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
		// Priority Status Tag
		const priorityTag = document.createElement("span");
		priorityTag.classList.add("todo-priority-tag");
		priorityTag.textContent = priorityStatus;
		wrapper.append(priorityTag);

		listItem.append(wrapper);

		// --Edit Todo Button--
		const editBtn = Element.createButton("edit", "edit-todo");
		const editIcon = Element.createIcon("pen-to-square");
		editBtn.append(editIcon);
		listItem.append(editBtn);

		// --Edit Todo Button--
		const deleteBtn = Element.createButton("delete", "delete-todo");
		const deleteIcon = Element.createIcon("trash");
		deleteBtn.append(deleteIcon);
		listItem.append(deleteBtn);

		return listItem;
	}

	static createAddBtn(btnType) {
		const button = Element.createButton("add", "add");
		button.textContent = `Add ${btnType}`;
		const plusIcon = Element.createIcon("plus");
		button.prepend(plusIcon);

		return button;
	}

	static createTaskModal(modalType) {
		const addTaskModal = Element.createModal(`${modalType}-task`);
		// --Close Modal Btn--
		const closeBtn = Element.createButton("close-modal", "close-modal");
		const closeIcon = Element.createIcon("xmark");
		closeBtn.append(closeIcon);
		addTaskModal.append(closeBtn);

		// --Form--
		const form = Element.createForm(`${modalType}-task`);
		// Title Input
		const titleInput = Element.createInput("text", "task-name");
		titleInput.classList.add("title-input");
		titleInput.setAttribute("placeholder", "Task name");
		titleInput.setAttribute("maxlength", "50");
		titleInput.setAttribute("required", "");
		titleInput.setAttribute("autofocus", "");
		form.append(titleInput);
		// Description Input
		const descriptionInput = Element.createTextArea("task-description");
		descriptionInput.classList.add("description-input");
		descriptionInput.setAttribute("placeholder", "Description");
		descriptionInput.setAttribute("maxlength", "500");
		form.append(descriptionInput);
		// Wrapper
		const wrapper = document.createElement("div");
		//Date Input
		const dateInput = Element.createInput("date", "due-date");
		wrapper.append(dateInput);
		// Label for Priority Status
		const labelPriorityStatus = Element.createLabel(
			"Priority:",
			"priority-status",
			"priority-status-label"
		);
		wrapper.append(labelPriorityStatus);
		// Select Priority Status
		const selectPriorityStatus = document.createElement("select");
		selectPriorityStatus.setAttribute("name", "priority-status");
		selectPriorityStatus.setAttribute("id", "priority-status");
		for (let i = 0; i < 3; i++) {
			const optionEl = document.createElement("option");
			switch (i) {
				case 0: {
					optionEl.setAttribute("value", "Low");
					optionEl.setAttribute("selected", "");
					optionEl.textContent = "Low";
					break;
				}
				case 1: {
					optionEl.setAttribute("value", "Medium");
					optionEl.textContent = "Medium";
					break;
				}
				case 2: {
					optionEl.setAttribute("value", "High");
					optionEl.textContent = "High";
					break;
				}
			}
			selectPriorityStatus.append(optionEl);
		}

		wrapper.append(selectPriorityStatus);
		form.append(wrapper);
		// Submit Button
		const submitBtn = Element.createButton("submit", "submit");
		submitBtn.setAttribute("formmethod", "dialog");
		submitBtn.textContent = `${
			modalType[0].toUpperCase() + modalType.slice(1)
		}`;
		form.append(submitBtn);

		addTaskModal.append(form);
		return addTaskModal;
	}
}

export default Component;
