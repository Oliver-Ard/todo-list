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

export { Note, NotesList };
