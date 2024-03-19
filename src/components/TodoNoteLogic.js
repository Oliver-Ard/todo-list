// --Todos Logic--
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

// --Notes Logic--
class Note {
	constructor(title, description) {
		this.title = title;
		this.description = description;
	}

	editNote(newTitle, newDescription) {
		this.title = newTitle;
		this.description = newDescription;
	}
}

class NotesList {
	constructor() {
		this.list = [];
	}

	addNote(note) {
		return this.list.push(note);
	}

	removeNote(index) {
		return this.list.splice(index, 1);
	}
}

// --Projects List Logic--
class ProjectsList {
	list;
	constructor() {
		this.list = [];
	}

	addProject(project) {
		return this.list.push(project);
	}

	removeProject(index) {
		return this.list.splice(index, 1);
	}
}

export { Todo, TodosList, Note, NotesList, ProjectsList };
