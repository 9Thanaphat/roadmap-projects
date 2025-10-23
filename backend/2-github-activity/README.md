# github-activity

A simple command-line tool to view recent GitHub activities of any user.
Built with Node.js.

This project is part of the [roadmap.sh](https://roadmap.sh/projects/github-user-activity) challenge.

## Feature
- Fetch and display latest GitHub activities of a user
- Show key events such as:
  - Repository creation
  - Branch creation
  - Push commits
  - Opened / Closed issues
  - Starred repositories

## Installation
Clone this repository and make sure you have Node.js installed.

```bash
git clone https://github.com/9Thanaphat/github-activity.git
cd github-activity
```

## Example Usage

### View recent GitHub activity
```bash
node github-activity.js 9Thanaphat
```

### Example Output
```bash
Create 1 branch in 9Thanaphat/roadmap-projects
Pushed 3 commits to 9Thanaphat/roadmap-projects
Pushed 26 commits to 9Thanaphat/9Thanaphat
```
