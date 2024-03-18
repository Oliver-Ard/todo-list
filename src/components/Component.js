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
		todoTitle.dataset.button = "edit-task";
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
		const editBtn = Element.createButton("edit-task", "edit-item");
		const editIcon = Element.createIcon("pen-to-square");
		editBtn.append(editIcon);
		listItem.append(editBtn);

		// --Remove Todo Button--
		const deleteBtn = Element.createButton("delete-task", "delete-item");
		const deleteIcon = Element.createIcon("trash");
		deleteBtn.append(deleteIcon);

		listItem.append(deleteBtn);
		return listItem;
	}

	static createNoteItem(title, description) {
		// --List Item--
		const listItem = document.createElement("li");
		listItem.classList.add("note-item");
		listItem.dataset.element = "note-item";

		// --Wrapper--
		const wrapper = document.createElement("div");
		wrapper.classList.add("wrapper");
		// Note Title
		const noteTitle = Element.createLabel(title, "#", "note-item-title");
		noteTitle.dataset.button = "edit-note";
		wrapper.append(noteTitle);
		// Note Description
		const noteDescription = document.createElement("p");
		noteDescription.classList.add("note-item-description");
		noteDescription.textContent = description;
		wrapper.append(noteDescription);
		listItem.append(wrapper);

		// --Edit Note Button--
		const editBtn = Element.createButton("edit-note", "edit-item");
		const editIcon = Element.createIcon("pen-to-square");
		editBtn.append(editIcon);
		listItem.append(editBtn);

		// --Remove Note Button--
		const deleteBtn = Element.createButton("delete-note", "delete-item");
		const deleteIcon = Element.createIcon("trash");
		deleteBtn.append(deleteIcon);

		listItem.append(deleteBtn);
		return listItem;
	}

	static createTaskModal(modalType) {
		const taskModal = Element.createModal(`${modalType}-task`);
		// --Close Modal Btn--
		taskModal.append(this.createCloseModalBtn());

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
		// Label for Due Date
		const labelDueDate = Element.createLabel(
			"Due Date:",
			"due-date",
			"due-date-label"
		);
		wrapper.append(labelDueDate);
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

		taskModal.append(form);
		return taskModal;
	}

	static createNoteModal(modalType) {
		const noteModal = Element.createModal(`${modalType}-note`);
		// --Close Modal Btn--
		noteModal.append(this.createCloseModalBtn());

		// --Form--
		const form = Element.createForm(`${modalType}-note`);
		// Title Input
		const titleInput = Element.createInput("text", "note-name");
		titleInput.classList.add("title-input");
		titleInput.setAttribute("placeholder", "Note name");
		titleInput.setAttribute("maxlength", "100");
		titleInput.setAttribute("required", "");
		titleInput.setAttribute("autofocus", "");
		form.append(titleInput);
		// Description Input
		const descriptionInput = Element.createTextArea("note-description");
		descriptionInput.classList.add("description-input");
		descriptionInput.setAttribute("placeholder", "Description");
		descriptionInput.setAttribute("maxlength", "1000");
		form.append(descriptionInput);
		// Submit Button
		const submitBtn = Element.createButton("submit", "submit");
		submitBtn.setAttribute("formmethod", "dialog");
		submitBtn.textContent = `${
			modalType[0].toUpperCase() + modalType.slice(1)
		}`;
		form.append(submitBtn);

		noteModal.append(form);
		return noteModal;
	}

	static createProjectModal(modalType) {
		const addProjectModal = Element.createModal(`${modalType}-project`);
		// --Close Modal Btn--
		addProjectModal.append(this.createCloseModalBtn());

		// --Form--
		const form = Element.createForm(`${modalType}-project`);
		// Project Name
		const titleInput = Element.createInput("text", "project-name");
		titleInput.classList.add("title-input");
		titleInput.setAttribute("placeholder", "Project name");
		titleInput.setAttribute("maxlength", "50");
		titleInput.setAttribute("required", "");
		titleInput.setAttribute("autofocus", "");
		form.append(titleInput);
		// Submit Button
		const submitBtn = Element.createButton("submit", "submit");
		submitBtn.setAttribute("formmethod", "dialog");
		submitBtn.textContent = `${
			modalType[0].toUpperCase() + modalType.slice(1)
		}`;
		form.append(submitBtn);

		addProjectModal.append(form);
		return addProjectModal;
	}

	static createDeleteModal(objToDelete) {
		const deleteModal = Element.createModal(`delete-${objToDelete}`);
		// --Close Modal Btn--
		deleteModal.append(this.createCloseModalBtn());
		// --Question--
		const question = Element.createSectionTitle(
			`Are you sure you want to delete this ${objToDelete}? This action cannot be undone.`
		);
		question.classList.add("confirm-msg");
		deleteModal.append(question);
		// Confirm Button
		const confirmBtn = Element.createButton("confirm", "confirm");
		confirmBtn.textContent = "Confirm Deletion";

		deleteModal.append(confirmBtn);
		return deleteModal;
	}

	static createProjectTitle(projectName) {
		const wrapper = document.createElement("div");
		wrapper.classList.add("title-wrapper");
		// --Title--
		const title = Element.createSectionTitle(projectName);
		title.classList.add("edit-title");
		title.dataset.button = "edit-project";
		wrapper.append(title);
		// --Delete Button--
		const deleteBtn = Element.createButton("delete-project", "delete-item");
		const deleteIcon = Element.createIcon("trash");
		deleteBtn.append(deleteIcon);

		wrapper.append(deleteBtn);
		return wrapper;
	}

	static createAddBtn(btnName, btnType) {
		const button = Element.createButton(`${btnType}`, "add");
		button.textContent = `Add ${btnName}`;
		const plusIcon = Element.createIcon("plus");

		button.prepend(plusIcon);
		return button;
	}

	static createCloseModalBtn() {
		const closeBtn = Element.createButton("close-modal", "close-modal");
		const closeIcon = Element.createIcon("xmark");

		closeBtn.append(closeIcon);
		return closeBtn;
	}

	static createProjectBtn(btnName) {
		const listEl = document.createElement("li");
		const button = Element.createButton("project", "project");
		button.classList.add("sidebar-btn");
		button.textContent = btnName;

		listEl.append(button);
		return listEl;
	}
}

export default Component;
