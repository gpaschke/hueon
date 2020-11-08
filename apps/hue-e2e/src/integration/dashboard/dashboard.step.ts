import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { getGreeting } from '../../support/app.po';

When(`I do something specific`, () => {
  // cy.anything specific can be done here

  // If you need some cy functions on multiple steps you can use custom commands/helper:
  // see `../support/commands.ts` file
  cy.login('my-email@something.com', 'myPassword');
});

Then(`I see something specific`, () => {
  // Function helper example, see `../support/app.po.ts` file
  getGreeting().contains('Welcome to hue!');
});
