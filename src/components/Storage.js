import { TodosList, Todo } from "./Todo.js";
import { NotesList, Note } from "./Note.js";
import ProjectsList from "./ProjectsList.js";

class Storage {
	// --Inbox--
	static getInbox() {
		let inbox;
		const inboxData = localStorage.getItem("inbox");

		// Check if the inbox already exists in local storage
		if (!inboxData) {
			inbox = new TodosList("inbox");
		} else {
			const inboxObj = JSON.parse(inboxData);
			// Reconstruct the object instance
			inbox = new TodosList(inboxObj.name);

			inboxObj.todos.forEach((todoData) => {
				const todo = new Todo(
					todoData.title,
					todoData.description,
					todoData.dueDate,
					todoData.priorityStatus
				);
				todo.updateTodoStatus(todoData.status);
				inbox.addTodo(todo);
			});
		}
		return inbox;
	}

	static saveInbox(inbox) {
		localStorage.setItem("inbox", JSON.stringify(inbox));
	}

	// --Notes--
	static getNotes() {
		let notes;
		const notesData = localStorage.getItem("notes");

		// Check if the notes already exists in local storage
		if (!notesData) {
			notes = new NotesList();
		} else {
			const notesObj = JSON.parse(notesData);
			// Reconstruct the object instance
			notes = new NotesList();

			notesObj.list.forEach((noteData) => {
				const note = new Note(noteData.title, noteData.description);
				notes.addNote(note);
			});
		}
		return notes;
	}

	static saveNotes(notes) {
		localStorage.setItem("notes", JSON.stringify(notes));
	}

	// --Projects--
	static getProjects() {
		let projects;
		const projectsData = localStorage.getItem("projects");

		// Check if the projects already exists in local storage
		if (!projectsData) {
			projects = new ProjectsList();
		} else {
			const projectsObj = JSON.parse(projectsData);
			// Reconstruct the object instance
			projects = new ProjectsList();

			projectsObj.list.forEach((projectData) => {
				const todosList = new TodosList(projectData.name);

				projectData.todos.forEach((todoData) => {
					const todo = new Todo(
						todoData.title,
						todoData.description,
						todoData.dueDate,
						todoData.priorityStatus
					);
					todo.updateTodoStatus(todoData.status);
					todosList.addTodo(todo);
				});
				// Add the reconstructed TodosList instance to the projects list
				projects.addProject(todosList);
			});
		}
		return projects;
	}

	static saveProjects(projects) {
		localStorage.setItem("projects", JSON.stringify(projects));
	}
}

export default Storage;
