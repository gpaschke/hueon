/**
 * Helper functions
 * (provided globally for all scenarios)
 * Some functions use fixtures(json) to map words to selectors etc
 * Configure these keywords in the fixtures folder
 */
import { Given, Then, When } from 'cypress-cucumber-preprocessor/steps';

// global fixture variables
let pages;
let selectors;
let api;

/**
 * Once before all, load fixtures to provide them as vars
 */
before(() => {
  cy.fixture('pages').then((json) => {
    pages = json;
  });

  cy.fixture('selectors').then((json) => {
    selectors = json;
  });

  cy.fixture('api').then((json) => {
    api = json;
  });
});

// ----------------------------------------------------------------------------
// TEST SETUP

Given(`is an opened {string}`, (name) => {
  cy.visit(pages[name]);
  // cy.location('pathname').should('include', pages[name]);
});

Given(`is an opened {string} requesting {string}`, (name, endpoint) => {
  cy.server();
  cy.route('GET', api['GET'][endpoint]).as(endpoint);
  cy.visit(pages[name]);
  cy.location('pathname').should('include', pages[name]);
  cy.wait(`@${endpoint}`, { responseTimeout: 15000 });
});

// -----------------------------------
// ACTION

When(`I click on {string}`, (caption) => {
  cy.contains(caption).click(); // if something does not work -> { force: true }
});

When(`I click into {string}`, (element) => {
  cy.get(selectors[element]).click();
});

When(`I type {string} into {string}`, (value, field) => {
  cy.get(selectors[field]).type(value);
});

When(`I check {string}`, (checkbox) => {
  cy.get('[type="checkbox"]' + selectors[checkbox]).check();
});

// -----------------------------------
// EXPECTATION


Then(`I should be on {string}`, (page) => {
  cy.location('pathname', { timeout: 20000 }).should('include', pages[page]);
});

Then(`I see {string}`, (text) => {
  cy.contains(text).should('be.visible');
});

Then(`I see {string} in {string}`, (value, field) => {
  cy.get(selectors[field]).should('have.value', value);
});

Then(`the {string} checkbox is selected`, (element) => {
  cy.get(selectors[element]).should('be.checked');
});

Then(`the {string} button is active`, (element) => {
  cy.get(selectors[element]).should('not.be.disabled');
});
