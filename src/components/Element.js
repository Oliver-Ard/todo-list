// Class for creating basic elements
class Element {
	static createSection(name) {
		const sectionEl = document.createElement("section");
		sectionEl.setAttribute("id", `${name}`);
		sectionEl.classList.add("container");

		return sectionEl;
	}

	static createSectionTitle(title) {
		const h2 = document.createElement("h2");
		h2.classList.add("section-title");
		h2.textContent = ` ${title}`;

		return h2;
	}

	static createIcon(icon, outline = "solid") {
		const iconEl = document.createElement("i");
		iconEl.classList.add(`fa-${outline}`, `fa-${icon}`);

		return iconEl;
	}

	static createList(listName) {
		const ul = document.createElement("ul");
		ul.classList.add(`${listName}-list`);
		ul.dataset.element = `${listName}-list`;

		return ul;
	}

	static createButton(buttonName, buttonClass) {
		const button = document.createElement("button");
		button.classList.add(`${buttonClass}-btn`);
		button.dataset.button = buttonName;

		return button;
	}

	static createModal(modalType) {
		const modal = document.createElement("dialog");
		modal.setAttribute("id", `${modalType}-modal`);
		modal.classList.add("modal");

		return modal;
	}

	static createForm(formType) {
		const form = document.createElement("form");
		form.classList.add("form-modal");
		form.dataset.form = formType;
		form.setAttribute("action", "#");
		form.setAttribute("method", "POST");

		return form;
	}

	static createInput(inputType, inputName) {
		const input = document.createElement("input");
		input.setAttribute("type", inputType);
		input.setAttribute("id", inputName);
		input.setAttribute("name", inputName);

		return input;
	}

	static createLabel(name, forAttr, classAttr) {
		const label = document.createElement("label");
		label.classList.add(classAttr);
		label.setAttribute("for", forAttr);
		label.textContent = name;

		return label;
	}

	static createTextArea(areaName) {
		const textArea = document.createElement("textarea");
		textArea.setAttribute("id", areaName);
		textArea.setAttribute("name", areaName);

		return textArea;
	}
}

export default Element;
