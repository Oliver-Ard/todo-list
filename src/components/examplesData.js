import { Todo, TodosList, Note } from "./TodoNoteLogic.js";

// --Inbox Todos--
const inboxExamples = [
	new Todo(
		"Buy groceries",
		"Purchase essential items such as fruits, vegetables, milk, and bread from the supermarket.",
		"2024-03-19",
		"Medium",
		"finished"
	),
	new Todo(
		"Pay utility bills",
		"Settle electricity, water, and internet bills for the month to avoid late fees.",
		"2024-03-20",
		"High"
	),
	new Todo(
		"Call Mom",
		"Check in with Mom to catch up and see how she's doing.",
		"2024-03-18",
		"Low",
		"finished"
	),
	new Todo(
		"Workout session",
		"Engage in physical activity for at least 30 minutes to stay fit and healthy.",
		"2024-03-17",
		"Medium"
	),
	new Todo(
		"The Power of Habit",
		"Spend some time reading chapters 5 and 6 of 'The Power of Habit' to gain insights into forming positive habits.",
		" 2024-05-19",
		"High"
	),
];

// --Notes--
const notesExamples = [
	new Note(
		"Recipe Ideas",
		"Note down potential recipes to try out for upcoming meals. Consider experimenting with new cuisines or incorporating seasonal ingredients. Possible ideas include a spicy Thai curry, a refreshing summer salad with citrus dressing, and a comforting homemade tomato soup with grilled cheese sandwiches."
	),
	new Note(
		"Travel Bucket List",
		"Compile a list of dream destinations and experiences to explore someday. Include places like the breathtaking beaches of Bali, the historic streets of Rome, and the serene landscapes of New Zealand. Research activities and attractions unique to each location to create unforgettable travel itineraries."
	),
	new Note(
		"Home Improvement Projects",
		"Brainstorm ideas for enhancing the living space and increasing comfort at home. Consider renovations such as updating the kitchen with modern appliances, creating a cozy reading nook by the window, or adding a fresh coat of paint to the walls in vibrant colors. Explore DIY tutorials and interior design inspiration for budget-friendly home improvements."
	),
];

// --Projects--
const projectsExamples = [
	new TodosList("Home Organization"),
	new TodosList("Fitness Routine"),
];

// --Todos for each project--
const homeOrganizationTodos = [
	new Todo(
		"Declutter the living room",
		"Remove unnecessary items and organize the space to create a tidy and comfortable environment.",
		"2024-03-25",
		"Medium",
		"finished"
	),
	new Todo(
		"Organize kitchen cabinets",
		"Sort through kitchen supplies, discard expired items, and arrange items neatly in cabinets and drawers.",
		"2024-03-27",
		"High"
	),
	new Todo(
		"Create Filing System",
		"Establish a filing system for important documents such as bills, receipts, and warranties to keep them organized and easily accessible.",
		"2024-03-30",
		"High"
	),
	new Todo(
		"Clean Garage",
		"Dedicate time to clean and organize the garage, including sweeping the floor, organizing tools, and clearing out unnecessary items.",
		"2024-04-15",
		"Low"
	),
	new Todo(
		"Tidy Living Room",
		"Declutter and organize the living room by arranging furniture, clearing surfaces, and finding proper storage solutions for toys, magazines, and remote controls.",
		"2024-04-10",
		"Medium"
	),
	new Todo(
		"Sort and Donate Books",
		"Go through bookshelves and select books to donate or pass on to friends, keeping only those that are frequently read or hold sentimental value.",
		"2024-04-01",
		"Medium",
		"finished"
	),
];

const fitnessRoutineTodos = [
	new Todo(
		"Morning jog",
		"Go for a 30-minute jog around the neighborhood to kickstart the day with physical activity.",
		"2024-03-26",
		"Medium"
	),
	new Todo(
		"Strength training",
		"Complete a full-body strength training workout focusing on major muscle groups like legs, arms, and core.",
		"2024-03-28",
		"High"
	),
	new Todo(
		"Yoga Session",
		"Include a yoga session to improve flexibility, balance, and relaxation, focusing on stretching and mindfulness.",
		"2024-03-27",
		"Low",
		"finished"
	),
	new Todo(
		"Weekly Meal Prep",
		"Plan and prepare healthy meals and snacks for the week ahead to support fitness goals and maintain a balanced diet.",
		"2024-03-25",
		"High"
	),
];

export {
	inboxExamples,
	notesExamples,
	projectsExamples,
	homeOrganizationTodos,
	fitnessRoutineTodos,
};
