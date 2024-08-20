# Playwright-Veeam

Repository for technical task - e2e test using Playwright

## Test run conditions

This test assumes launch for desktop only. Resolution set to 1980 x 1920 in the configuration file.
Running the test with emulating mobile devices requires the creation of appropriate page object models, which was not required in the scope of the test assignment.

### Installation Playwright

```
    npm init playwright@latest
```

Run the install command and select the following to get started:

-   Choose between TypeScript or JavaScript (default is TypeScript)
-   Name of your Tests folder (default is tests or e2e if you already have a tests folder in your project)
-   Install Playwright browsers (default is true)

### Run the test

To run the test in all defined browsers, use the command:

```
    npx playwright test
```

To run the test in a specific browser, use the command:

```
    npx playwright test --project=Project_Name
```

Defined projects are:

-   Desktop_Chrome
-   Desktop_Firefox
-   Desktop_Edge
-   Desktop_Safari

For example, to run the test in Google Chrome, use the command:

```
    npx playwright test --project=Desktop_Chrome
```
