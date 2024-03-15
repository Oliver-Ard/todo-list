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

	updateTodoStatus(newState) {
		if (newState === "finished" || newState === "unfinished") {
			this.#status = newState;
		}
	}
}

class TodosList {
	#list;

	constructor() {
		this.#list = [
			new Todo(
				"Complete JavaScript Fundamentals",
				"Finish reading and practicing JavaScript basics, including variables, data types, and operators.",
				"March 20, 2024",
				"High"
			),
			new Todo(
				"Build Portfolio Website",
				"Develop a personal portfolio website showcasing projects and skills using HTML, CSS, and JavaScript.",
				"April 10, 2024",
				"Medium"
			),
			new Todo("Practice Algorithm Challenges", null, "March 25, 2024", "Low"),
			new Todo(
				"Study Node.js",
				" Learn Node.js by following tutorials and building small projects to understand server-side JavaScript development.",
				"May 5, 2024",
				"Medium"
			),
			new Todo(
				"Update GitHub Repositories",
				"Push recent code changes to GitHub repositories and ensure documentation is up to date.",
				"April 5, 2024",
				"Low"
			),
		];
	}

	get list() {
		return this.#list;
	}

	getTodo(index) {
		return this.#list[index];
	}

	addTodo(todo) {
		return this.#list.push(todo);
	}

	removeTodo(index) {
		return this.#list.splice(index, 1);
	}

	editTodo(index, newTitle, newDescription, newDueDate, newPriorityStatus) {
		const todo = this.#list[index];

		todo.title = newTitle;
		todo.description = newDescription;
		todo.dueDate = newDueDate;
		todo.priorityStatus = newPriorityStatus;

		return todo;
	}
}

export { Todo, TodosList };
