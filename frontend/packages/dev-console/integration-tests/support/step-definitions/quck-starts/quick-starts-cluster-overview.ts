import { Given, When, Then } from 'cypress-cucumber-preprocessor/steps';
import { adminNavigationBar, devNavigationMenu, switchPerspective } from '../../constants/global';
import { addPagePO, quickStartSidebarPO, quickStartLeaveModalPO } from '../../pageObjects';
import { navigateTo, navigateToAdminMenu, perspective } from '../../pages';

let firstQuickStartLink: string;

Given('user is at Cluster Overview page', () => {
  perspective.switchTo(switchPerspective.Administrator);
  navigateToAdminMenu(adminNavigationBar.Home);
});

Given('user is in administrator perspective', () => {
  perspective.switchTo(switchPerspective.Administrator);
});

When('user switches to administrator perspective', () => {
  perspective.switchTo(switchPerspective.Administrator);
});

When('user goes to Cluster Overview page', () => {
  navigateToAdminMenu(adminNavigationBar.Home);
});

Then('user can see Build with guided documentation card', () => {
  cy.get(addPagePO.buildWithGuidedDocumentation).should('be.visible');
});

Then('user can see two Quick Starts link present on it', () => {
  cy.get(addPagePO.buildWithGuidedDocumentationItems).should('have.length', 2 + 1); // +1 represents View all quick start link displaying with the quick start links
});

Then('user can see the "View all quick starts"', () => {
  cy.get(addPagePO.viewAllQuickStarts).should('be.visible');
});

Given('user is at Cluster Overview page', () => {
  navigateToAdminMenu(adminNavigationBar.Home);
});

When('user clicks on first Quick Starts link on the Build with guided documentation card', () => {
  cy.get(addPagePO.buildWithGuidedDocumentationItems)
    .first()
    .then(($link) => {
      firstQuickStartLink = $link.get(0).innerText;
    });
  cy.get(addPagePO.buildWithGuidedDocumentationItems).first().click();
  cy.get(quickStartSidebarPO.quickStartSidebarBody).should('be.visible');
});

When('user clicks on the Start button', () => {
  cy.get(quickStartSidebarPO.quickStartSidebarBody).find(quickStartSidebarPO.startButton).click();
});

When('user clicks on close button', () => {
  cy.get(quickStartSidebarPO.closePanel).should('be.visible').click();
});

When('user clicks on Leave button in Leave quick start modal box', () => {
  cy.get(quickStartLeaveModalPO.leaveModal).should('be.visible');
  cy.get(quickStartLeaveModalPO.leaveButton).click();
});

Then('user can see the first Quick Start link present', () => {
  cy.get(addPagePO.buildWithGuidedDocumentationItems)
    .first()
    .then(($link) => {
      return $link.get(0).innerText === firstQuickStartLink;
    });
});

When('user completes first Quick Starts from the card', () => {
  firstQuickStartLink = Cypress.$(addPagePO.buildWithGuidedDocumentationItems).get(0).innerText;
  cy.get(addPagePO.buildWithGuidedDocumentationItems).first().click();
  cy.get(quickStartSidebarPO.restartSideNoteAction).click();

  cy.get('[class*="quick-start-task-header__title"]').then(($elements) => {
    const quickStartSteps: number = $elements.length;
    cy.log(quickStartSteps.toString());
    cy.get(quickStartSidebarPO.startButton).click();
    const quickStartsCompleteStatus = (noOfStep: number) => {
      if (!noOfStep) {
        cy.get(quickStartSidebarPO.closeButton).click();
      } else {
        cy.get('[data-testid="qs-drawer-check-yes"]').click();
        cy.get(quickStartSidebarPO.nextButton).click();
        quickStartsCompleteStatus(noOfStep - 1);
      }
    };
    quickStartsCompleteStatus(quickStartSteps);
  });
});

Then(
  'user can see completed Quick Starts link is replaced with another quick start link in the card',
  () => {
    cy.get(addPagePO.buildWithGuidedDocumentationItems)
      .first()
      .then(($link) => {
        return $link.get(0).innerText !== firstQuickStartLink;
      });
  },
);

When('user clicks on the kebab menu at the Getting Started resources card', () => {
  cy.get(addPagePO.kebabMenuGettingStarted).should('be.visible');
  cy.get(addPagePO.kebabMenuGettingStarted).click();
});

When('user clicks on Hide from the view', () => {
  cy.get(addPagePO.hideGettingStarted).should('be.visible');
  cy.get(addPagePO.hideGettingStarted).click();
});

Then('Build with guided documentation card will be removed from Cluster Overview page', () => {
  cy.get(addPagePO.buildWithGuidedDocumentation).should('not.exist');
});

Given('user removed Build with guided documentation card from Cluster Overview page', () => {
  cy.byLegacyTestID('dashboard')
    .find(addPagePO.buildWithGuidedDocumentation)
    .then(($elements) => {
      if ($elements.length) {
        cy.get(addPagePO.kebabMenuGettingStarted).click();
        cy.get(addPagePO.hideGettingStarted).click();
      }
    });
});

When('user goes to developer perspective', () => {
  perspective.switchTo(switchPerspective.Developer);
});

When('user goes to Add page', () => {
  navigateTo(devNavigationMenu.Add);
});

Then('Build with guided documentation card will be displayed in Add page', () => {
  cy.get(addPagePO.buildWithGuidedDocumentation).should('be.visible');
});
