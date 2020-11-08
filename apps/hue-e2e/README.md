# e2e Tests
Written in Cucumber, executed in cypress.


This project was generated using [Nx](https://nx.dev).
So use the global scripts `npm run e2e` in the package.json to run the integration tests headless.
Use `npm run e2e:dev` if you want to inspect the tests, run a specific browser or a single feature.
After a test run you can generate the Allure report using `npm run e2e:report`.

Used frameworks/ technologies:

- [Cypress](https://docs.cypress.io/api/api/table-of-contents.html)
  - test execution with local installed browsers (Chrome, Firefox, Edge)
- [Cucumber](https://github.com/TheBrainFamily/cypress-cucumber-preprocessor)
  - test description in a human readable way (Gherkin Syntax)
  - phrase grammar [examples](https://www.picklejs.com/docs/phrases)
- [Allure](https://github.com/Shelex/cypress-allure-plugin)
  - test reporting with user story mapping
  - tag [examples](https://github.com/Shelex/cypress-allure-plugin#api)
- [Image Snapshot](https://github.com/palmerhq/cypress-image-snapshot)
  - visual regression by screenshot comparison

>Do yourself a favor and use a cucumber plugin for your IDE (IntelliJ: Cucumber.js, CypressSupport).

## Settings

To adapt the configuration of cypress or its plugins have a look at:

```
cypress.json
```

## Structure

To write a new test (scenario) you should be aware of the necessary files and naming conventions.
A **feature** is a collection of similar tests regarding a specific context.
A scenario is written and documented in Cucumber/Gherkin language (.feature files).
This language is natural and not executable, so there are .step.ts files mapping the expression to cypress.

> The .feature file (cucumber) needs a .step.ts file (cypress) with the feature name, within a folder named like the feature.

```
/src
    /integration
        /featureX
            featureX.step.ts    <- Cypress test steps
        featureX.feature        <- Cucumber
```

## Cucumber

Writing a cucumber feature (test suite) with one or many scenarios (tests) should be self-explanatory.

> Use as many words as necessary but as few as possible!

> Just like .yaml files spacing (`tabs`) are important for execution.

```gherkin
# Comment
@tag
Feature: Eating cucumbers

    Eating too many cucumbers may not be good for you.
    Eating too much of anything may not be good for you too.

    Background:
        Given is an empty stomach

    Scenario: Eating a few cucumbers is no problem
        Given I am able to access the fridge
        When  I eat 3 cucumbers
        And   I drink a glass of water
        Then  I will be full
```

## Allure

To get a report you have to run the tests first.
This will generate some not readable json files to the `dist/cypress/apps/hue-e2e/report`.
Just run `npm run e2e:report:serve` to generate a local website with the results.

To get the most of your test reporting, using tags is a useful tool.
These tags have no influence on the test execution, except we run only tests with a specific tag,
but they improve the report readability.

Everything can used as a tag (with @ as prefix),
but there are special tags translated by Allure, like `@issue("Link name","HUE-1234")` to add a Jira link.

```gherkin
@epic("Summarise multiple features/scenarios by an epic")
@owner("Alice the PO")
Feature: Dashboard

  @HUE-1234
  @issue("#1234","HUE-1234")
  @severity("critical")
  Scenario: Visit impressum
    As a Customer
    I want to visit the impressum
    To check the phone number of customer support
```

## Global Expressions

Cucumber expressions should be structured in a way that they are reusable.
So not every cucumber expression like `I click on the "Button" containing "Next"` have to be mapped manually in their own feature.step.ts file.
Therefore, we use helper functions and fixture files for name to tech name mapping ("Button" -> css selector for buttons).

```
/fixtures
    collectionX.json <- mapped collection of readable words to technical stuff
/integration
    /common
        helper.ts <- general/global used Cucumber expressions with placeholders (maybe within fixtures)
```

# Cucumber expressions

Hint: Every expression ("I do something") can be used with every classification (`Given`,`When`,`Then`).
In the following they are arranged as usually used.

```gherkin
Feature: Pattern

    Scenario: Bad Example
      # everything is possible but this is a bad pattern - so do not use Do step as Then expectation!
      Then  I open "Dashboard"

    Scenario: Much better
      When I open "Dashboard"
      Then I see "Impressum" on the page
```

## Given

> Given ... initialise the test setup

Navigate:

- is an opened "Dashboard"

## When

> When ... do some steps you want to test

Click

- I click on "Next" (clickable element that contains NEXT)
- I click into "email" (input field chosen by a selector)
- I check "AGBs"
- I chose "bananas"

Hover

- I hover over "Hint" icon

Type

- I type "Alice" into "login"

Replace

- I replace the content of "login" with "Ben"

Scroll

- I scroll to the top of the page
- I scroll to the bottom of the page

Wait

- I wait for "login" results

## Then

> Then ... expect some results

Location

- I should be on "Dashboard"

Element exist/ contains

- I should see "A simple hint"
- I should see a "Title" inside the "Error Modal"
- I should see a "Ok" button inside the "Error Modal"
- I should see "Press Me" on the "Button" inside the "Modal"

States

- the "next" button is active
- the "accept AGB" checkbox is checked
- the "bananas" radio button is selected

Visual Comparison

- snapshot is identical
- snapshot is identical up to "95" (percent)


