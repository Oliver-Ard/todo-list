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

export default ProjectsList;
