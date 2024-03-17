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
	#list;

	constructor() {
		this.#list = [
			new Todo(
				"Complete JavaScript Fundamentals",
				"Finish reading and practicing JavaScript basics, including variables, data types, and operators.",
				"2024-03-20",
				"High"
			),
			new Todo(
				"Build Portfolio Website",
				"Develop a personal portfolio website showcasing projects and skills using HTML, CSS, and JavaScript.",
				"2024-04-10",
				"Medium"
			),
			new Todo("Practice Algorithm Challenges", null, "2024-08-09", "Low"),
			new Todo(
				"Study Node.js",
				" Learn Node.js by following tutorials and building small projects to understand server-side JavaScript development.",
				"2024-05-05",
				"Medium"
			),
			new Todo(
				"Update GitHub Repositories",
				"Push recent code changes to GitHub repositories and ensure documentation is up to date.",
				"2024-06-12",
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
}

export { Todo, TodosList };
