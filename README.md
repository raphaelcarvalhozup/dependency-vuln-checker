<p align="center">
<a href="https://github.com/guilhermemarimzup/dependency-vuln-checker">
  <img src="./images/logo.png" width="300" />
</a>

<h1 align="center">Dependency Vuln Checker</h1>

[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

This action checks if your application uses dependencies with know vulnerabilites. Actually it supports applications that use Maven, Gradle and npm as package manager. Under the hood, it uses [OWASP Dependency-Check](https://owasp.org/www-project-dependency-check/) and [npm audit](https://docs.npmjs.com/cli/v7/commands/npm-audit) to check the dependencies.

---

<h2>
    <img src="./images/usage.svg" alt="Usage icon" width="40px"/> Usage
</h2>

```yaml
- name: Dependency Vuln Checker
  uses: guilhermemarimzup/dependency-vuln-checker@v1
```

<h3>
    <img src="./images/pre-requisites.svg" alt="Pre-requisites icon" width="40px"/> Pre-requisites
</h3>

If you are using [Maven](https://maven.apache.org/) or [Gradle](https://gradle.org/) as your package manager, you must have to add [OWASP dependency-check plugin](https://jeremylong.github.io/DependencyCheck/modules.html) in your dependency manager file because the results will be much more accurate.

#### Maven Plugin Example - `pom.xml`

```xml
<plugin>
    <groupId>org.owasp</groupId>
    <artifactId>dependency-check-maven</artifactId>
    <version>6.1.2</version>
    <configuration>
        <formats>
            <format>HTML</format>
            <format>JSON</format>
        </formats>
    </configuration>
    <executions>
        <execution>
            <goals>
                <goal>check</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```

#### Gradle Plugin Example - `build.gradle`

```gradle
plugins {
	id 'org.owasp.dependencycheck' version '6.1.2'
}

dependencyCheck {
    formats = ['HTML', 'JSON']
}
```

Take care with your `.gitignore` file, because this action needs `gradlew` file to execute dependency-check plugin, if your `.gitignore` file is ignoring `gradle-wrapper.jar` and `gradle-wrapper.properties`, this action will not run as expected.

---

<h2>
    <img src="./images/github-actions-logo.svg" alt="GitHub Actions icon" width="40px"/> Workflow Example
</h2>
 

```yaml
name: Dependency Vuln Checker

on: push

jobs:
  dependency-vuln-checker:
    runs-on: ubuntu-latest

    steps:
    - name: Checkout
      uses: actions/checkout@v2

    - name: Dependency-Vuln-Checker
      uses: guilhermemarimzup/dependency-vuln-checker@v1
```
---

<h2>
    <img src="./images/licenses.svg" alt="Licenses icon" width="40px"/> Licenses
</h2>

[Dependency Vuln Checker](https://github.com/guilhermemarimzup/dependency-vuln-checker) project icons made by [Freepik](https://www.flaticon.com/authors/freepik), [Dave Gandy](https://www.flaticon.com/authors/dave-gandy) and [Darius Dan](https://www.flaticon.com/authors/darius-dan) from [Flaticon](https://www.flaticon.com/). The source code is licensed under [Apache-2.0](https://opensource.org/licenses/Apache-2.0).