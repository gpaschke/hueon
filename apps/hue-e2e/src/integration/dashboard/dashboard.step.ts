import { Then, When } from 'cypress-cucumber-preprocessor/steps';
import { getGreeting } from '../../support/app.po';

When(`I do something specific`, () => {
  // cy.anything specific can be done here
});

Then(`I see something specific`, () => {
  // Function helper example, see `../support/app.po.ts` file
  getGreeting().contains('Welcome to hue!');
});
