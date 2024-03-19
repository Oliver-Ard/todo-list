class Todo {
	constructor(
		title,
		description,
		dueDate,
		priorityStatus,
		status = "unfinished"
	) {
		this.title = title;
		this.description = description;
		this.dueDate = dueDate;
		this.priorityStatus = priorityStatus;
		this.status = status;
	}

	editTodo(newTitle, newDescription, newDueDate, newPriorityStatus) {
		this.title = newTitle;
		this.description = newDescription;
		this.dueDate = newDueDate;
		this.priorityStatus = newPriorityStatus;
	}

	updateTodoStatus(newState) {
		if (newState === "finished" || newState === "unfinished") {
			this.status = newState;
		}
	}
}

class TodosList {
	constructor(name) {
		this.name = name;
		this.todos = [];
	}

	addTodo(todo) {
		return this.todos.push(todo);
	}

	removeTodo(index) {
		return this.todos.splice(index, 1);
	}

	editList(newName) {
		return (this.name = newName);
	}
}

export { Todo, TodosList };
