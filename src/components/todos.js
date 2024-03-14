class Todo {
	constructor(title, description, dueDate, priorityStatus) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priorityStatus = priorityStatus;
	}
}

class TodosList {
	#todos;

	constructor() {
		this.#todos = [];
	}

	get todos() {
		return this.#todos;
	}

	getTodo(index) {
		return this.#todos[index];
	}

	addTodo(todo) {
		return this.#todos.push(todo);
	}

	removeTodo(index) {
		return this.#todos.splice(index, 1);
	}

	editTodo(index, newTitle, newDescription, newDueDate, newPriorityStatus) {
		const todoToEdit = this.#todos[index];

		todoToEdit.title = newTitle;
		todoToEdit.description = newDescription;
		todoToEdit.dueDate = newDueDate;
		todoToEdit.priorityStatus = newPriorityStatus;

		return todoToEdit;
	}
}

export { Todo, TodosList };
