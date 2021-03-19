const { exec } = require('child_process');
const artifact = require('@actions/artifact');

try {

    exec("find . -name 'pom.xml'", (error, stdout, stderr) => {
        
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }

        if (`${stdout}`.length != 0) {

            console.log("> Found pom.xml!");
            console.log("> Actually we are not analysing Maven projects.");

        }

    });

    exec("find . -name 'build.gradle'", (error, stdout, stderr) => {
        
        if (error) {
            console.log(`error: ${error.message}`);
            return;
        }

        if (`${stdout}`.length != 0) {

            console.log("> Found gradle.build!");
            console.log("> Analysing your Gradle project...")

            exec("sudo chmod +x gradlew && ./gradlew dependencyCheckAnalyze" , (error, stdout, stderr) => {
                
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }

                console.log("> Generating your report...");

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

        if (`${stdout}`.length != 0) {

            console.log("> Found package.json!");
            console.log("> Analysing your NPM project...")

            exec("sudo npm i --package-lock-only && sudo npm i -g npm-audit-html && npm audit --json | npm-audit-html --output dependency-report.html", (error, stdout, stderr) => {
                
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }

                console.log("> Generating your report...");

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