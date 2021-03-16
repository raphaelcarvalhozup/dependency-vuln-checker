const core = require('@actions/core');
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

        if (stdout !== null) {

            exec("curl -fsSL https://github.com/jeremylong/DependencyCheck/releases/download/v6.1.2/dependency-check-6.1.2-release.zip -o dependency-check.zip &&\
            unzip -q dependency-check.zip &&\
            ./dependency-check/bin/dependency-check.sh -s pom.xml &&\
            ls -la" , (error, stdout, stderr) => {
                
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
                const file = ['./dependency-check-report.html'];
                const options = {
                    continueOnError: true
                }
                artifactClient.uploadArtifact(report, file, rootDirectory, options);
            })
        
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

        if (stdout !== null) {

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
        }
    });

} catch (error) {
    core.setFailed(error.message);
}