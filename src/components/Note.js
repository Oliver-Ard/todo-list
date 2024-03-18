class Note {
	#title;
	#description;

	constructor(title, description) {
		this.#title = title;
		this.#description = description;
	}

	get title() {
		return this.#title;
	}

	get description() {
		return this.#description;
	}

	editNote(newTitle, newDescription) {
		this.#title = newTitle;
		this.#description = newDescription;
	}
}

class NotesList {
	#list;

	constructor() {
		this.#list = [];
	}

	get list() {
		return this.#list;
	}

	addNote(notes) {
		return this.#list.push(notes);
	}

	removeNote(index) {
		return this.#list.splice(index, 1);
	}
}

export { Note, NotesList };
