# task-cli

A simple command-line task management tool built with Node.js.

This project is part of the [roadmap.sh](https://roadmap.sh/projects/task-tracker) challenge.

## Feature
- Add new tasks
- List all tasks (or filter by status)
- Mark tasks as **in-progress** or **done**
- Update task description
- Delete tasks
- Data saved in `tasks.json`

## Installation
Clone this repository and install Node.js (if you haven’t already).

```bash
git clone https://github.com/9Thanaphat/task-cli.git
cd task-cli
```
## Example Usage
### Add new task
```bash
node task-cli.js add "Finish roadmap.sh project"
```
### List all tasks
```bash
node task-cli.js list
```
### List only done tasks
```bash
node task-cli.js list done
```
### Show command
```bash
node task-cli.js help
add <description>               : add a new task
list [status]                   : list all tasks
mark-in-progress <id>           : mark task as in progress
mark-done <id>                  : mark task as done
update <id> <description>       : update task description
delete <id>                     : delete task
```
