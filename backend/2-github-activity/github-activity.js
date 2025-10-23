const args = process.argv.slice(2);
const username = args[0];

if (!username) {
  console.log("Usage: node github-activity.js <github-username>");
  process.exit(1);
}

const response = await fetch(`https://api.github.com/users/${username}/events`);

if (!response.ok) {
  console.error(`Failed to fetch data. Status: ${response.status} ${response.statusText}`);
  process.exit(1);
}

const datas = await response.json();

const repoStats = {};

datas.forEach(data => {
	if (!repoStats[data.repo.name])
		repoStats[data.repo.name] = { push: 0, createRepo: false, createBranch: 0, issuesOpened: false, issuesClosed: false, starred: false};

	switch(data.type) {
		case 'PushEvent':
			repoStats[data.repo.name].push++;
			break;
		case 'CreateEvent':
			if (data.payload.ref_type === 'repository')
				repoStats[data.repo.name].createRepo = true;
			else if (data.payload.ref_type === 'branch')
				repoStats[data.repo.name].createBranch++;
			break;
		case 'IssuesEvent':
			if (data.payload.action === 'opened')
				repoStats[data.repo.name].issuesOpened = true;
			else if (data.payload.action === 'closed')
				repoStats[data.repo.name].issuesClosed = true;
			break;
		case 'WatchEvent':
			repoStats[data.repo.name].starred = true;
			break;
		default:
			break;
	};
});

Object.entries(repoStats).forEach(([repoName, stats]) => {
	if (stats.createRepo)
		console.log(`Created new repository ${repoName}`);
	if (stats.createBranch)
		console.log(`Create ${stats.createBranch} branch in ${repoName}`);
	if (stats.push > 0)
		console.log(`Pushed ${stats.push} commits to ${repoName}`);
	if (stats.issuesOpened)
		console.log(`Opened a new issue in ${repoName}`);
	if (stats.issuesClosed)
		console.log(`Closed issue in ${repoName}`);
	if (stats.starred)
		console.log(`Starred ${repoName}`);
});



