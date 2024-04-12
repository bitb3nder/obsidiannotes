//boring
var tp = window.app.plugins.getPlugin("templater-obsidian").templater.current_functions_object;
var gitPlugin = window.app.plugins.getPlugin("obsidian-git");

//define branch checker function
async function doesBranchExist(branchName) {
    try {
        // Get the array of branches
        const branchInfo = await window.app.plugins.getPlugin("obsidian-git").gitManager.branchInfo();
        const branches = branchInfo.branches;

        // Check if the branchName exists in the array of branches
        return branches.includes(branchName);
    } catch (error) {
        console.error('Error checking branch existence:',
         error);
        return false; // Return false if an error occurs
    }
}

//update git repository
async function saveToRemoteBranch(branchName) {
    try {
        //initialize git plugin
        await gitPlugin.gitManager.init();
        
        //determine if the branch above already exists or if it should be created
        const branchExists = await doesBranchExist(branchName);

        //checkout branchName by any means 
        if (branchExists) {
            console.log('Branch exists! Checking it out.');
            //checkout
            await gitPlugin.gitManager.checkout(branchName);
            await gitPlugin.gitManager.git.pull(['origin', 'main']);
            //resolve conflict logic
        } else {
            console.log('Branch does not exist! Creating it now.');
            await gitPlugin.gitManager.createBranch(branchName);
            await gitPlugin.gitManager.git.pull(['origin', 'main']);
            //resolve conflict logic
        }

        //Setup output handling for the git module
        const git = gitPlugin.gitManager.git.outputHandler((_command, stdout, stderr) => {
            stdout.pipe(process.stdout);
            stderr.pipe(process.stderr);
        });
        //add all changes
        await git.add("-A");
        console.log('Changed files added to branch (' + branchName + ")");
        //commit changes with message
        let commitMessage;
        commitMessage = await tp.system.prompt("Commit Message:", "Some important changes...");
        await git.commit(commitMessage);
        console.log('Commit made with message: ' + commitMessage);
        //push changes to branch
        let resp = await git.push(['-u', 'origin', branchName], () => console.log('done'));
        console.log('Commit pushed to branch:' + branchName);
        console.log('Push response: ' + resp.remoteMessages.all[0]);
        console.log('Push response: ' + resp.remoteMessages.all[1]);
        await tp.system.prompt("Here's the PR link for this:", resp.remoteMessages.all[1]);
    } catch (error) {
        console.error('Error updating Git repository:', error);
    }
}

// Call the function to update the Git repository
module.exports = async function gitupdate(params) {
    let branchName;

    if (window.navigator.userAgent.includes('Windows')) {
        console.log('Windows OS Username: ' + process.env.USERNAME);
        branchName = process.env.USERNAME + '_' + Date.now();
    } else if (window.navigator.userAgent.includes('Macintosh') || window.navigator.userAgent.includes('Linux')) {
        console.log('Mac OS User: ' + process.env.USER);
        branchName = process.env.USER + '_' + Date.now();
    } else {
        console.log('Unknown OS');
        branchName = 'unknownOS_' + Date.now();
    }

    await saveToRemoteBranch(branchName);
};
