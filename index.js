const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const { exec } = require('child_process');
const artifact = require('@actions/artifact');

try {

    exec("find . -name 'pom.xml'", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
    });

    exec("find . -name 'package.json' ! -path './node_modules/*'", (error, stdout, stderr) => {
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }
        if (stderr) {
            console.log(`stderr: ${stderr}`);
            return;
        }
        exec("sudo npm install -g npm-audit-html && npm audit --json | npm-audit-html --output dependency-report.html", (error, stdout, stderr) => {
            if (error) {
                console.log(`error: ${error.message}`);
                return;
            }
            if (stderr) {
                console.log(`stderr: ${stderr}`);
                return;
            }

            const artifactClient = artifact.create();
            const report = 'dependency-check-report';
            const rootDirectory = './'
            const file = ['./dependency-report.html'];
            const options = {
                continueOnError: true
            }
            artifactClient.uploadArtifact(report, file, rootDirectory, options);
        })
    });

} catch (error) {
    core.setFailed(error.message);
}