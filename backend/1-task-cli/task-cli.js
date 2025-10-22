const fs = require('fs');
const file = 'tasks.json';

const args = process.argv.slice(2);
const command = args[0];
const input = args.slice(1);

function readTasks(){
	if (!fs.existsSync(file))
		return [];
	const data = fs.readFileSync(file, 'utf8');
  	return data ? JSON.parse(data) : [];
}

function saveTasks(tasks){
	fs.writeFileSync(file, JSON.stringify(tasks, null, 2));
}

function addTasks(description)  {
	const tasks = readTasks();
	const newTasks = {
		id: tasks.length ? tasks[tasks.length - 1].id + 1 : 1,
		description,
		status: 'todo',
		createdAt: new Date().toISOString(),
		updatedAt: new Date().toISOString()
	};
	tasks.push(newTasks);
	saveTasks(tasks);
	console.log(`Task added successfully (ID: ${newTasks.id})`);
}

function listTasks(filter = null) {
	const tasks = readTasks();

	if (tasks.length === 0) {
    	console.log("no tasks found");
    	return;
  	}

	const filterTasks = filter ? tasks.filter(t => t.status === filter) : tasks;

	if (filterTasks.length === 0) {
    	console.log(`no tasks with status (${filter}) found.`);
    	return;
  	}

	console.log("--------------------------------------------------------");
	filterTasks.forEach(task => {
		console.log(`id : 			${task.id}`);
		console.log(`description :		${task.description}`);
		console.log(`status : 		${task.status}`);
		console.log("--------------------------------------------------------");
	});
}

function updateStatus(id, newStatus){
	const tasks = readTasks();

	const task = tasks.find(t => t.id === id);
	if (!task) {
		console.log(`task ${id} not found.`);
		return;
	}

	task.status = newStatus;
	task.updatedAt = new Date().toISOString();
	saveTasks(tasks);
	console.log(`task ${id} marked as ${newStatus}.`)
}

function updateDescription(id, newDescription){
	const tasks = readTasks();

	const task = tasks.find(t => t.id === id);
	if (!task) {
		console.log(`task ${id} not found.`);
		return;
	}

	task.description = newDescription;
	task.updatedAt = new Date().toISOString();
	saveTasks(tasks);
	console.log(`updated task ${id} description.`)
}

function deleteTask(id){
	const tasks = readTasks();

	const task = tasks.find(t => t.id === id);
	if (!task) {
		console.log(`task ${id} not found.`);
		return;
	}

	const newTasks = tasks.filter(t => t.id !== id);

	saveTasks(newTasks);

	console.log(`task ${id} deleted successfully.`);
}

switch (command) {
	case 'add':
		addTasks(input.join(' '));
		break;
	case 'list':
		const status = input[0] || null;
		listTasks(status);
		break;
	case 'mark-in-progress':
		if (!input[0])
			return console.log("please specify task id.")
		updateStatus(parseInt(input[0]), 'in-progress')
		break;
	case 'mark-done':
		if (!input[0])
			return console.log("please specify task id.")
		updateStatus(parseInt(input[0]), 'done')
		break;
	case 'delete':
		if (!input[0])
			return console.log("please specify task id.")
		deleteTask(parseInt(input[0]))
		break;
	case 'update':
		if (!input[0])
			return console.log("please specify task id.")
		updateDescription(parseInt(input[0]), input.slice(1).join(' '));
		break;
	case 'help':
		console.log('add <description>		: add a new task');
		console.log('list [status]			: list all tasks');
		console.log('mark-in-progress <id>		: mark task as in progress');
		console.log('mark-done <id> 			: mark task as done');
		console.log('update <id> <description> 	: update task description');
		console.log('delete <id>  			: delete task');
		break;
	default:
		console.log("unknow command!");
}
