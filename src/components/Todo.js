class Todo {
	#title;
	#description;
	#dueDate;
	#priorityStatus;
	#status;

	constructor(title, description, dueDate, priorityStatus) {
		this.#title = title;
		this.#description = description;
		this.#dueDate = dueDate;
		this.#priorityStatus = priorityStatus;
		this.#status = "unfinished";
	}

	get title() {
		return this.#title;
	}
	get description() {
		return this.#description;
	}
	get dueDate() {
		return this.#dueDate;
	}
	get priorityStatus() {
		return this.#priorityStatus;
	}
	get status() {
		return this.#status;
	}

	editTodo(newTitle, newDescription, newDueDate, newPriorityStatus) {
		this.#title = newTitle;
		this.#description = newDescription;
		this.#dueDate = newDueDate;
		this.#priorityStatus = newPriorityStatus;
	}

	updateTodoStatus(newState) {
		if (newState === "finished" || newState === "unfinished") {
			this.#status = newState;
		}
	}
}

class TodosList {
	#name;
	#todos;

	constructor(name) {
		this.#name = name;
		this.#todos = [];
	}

	get name() {
		return this.#name;
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
}

export { Todo, TodosList };
