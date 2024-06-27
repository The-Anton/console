import { Given } from 'cypress-cucumber-preprocessor/steps';
import {
  installPipelinesOperatorUsingCLI,
  installKnativeOperatorUsingCLI,
  installShipwrightOperatorUsingCLI,
} from '@console/dev-console/integration-tests/support/pages';

Given('user has installed OpenShift Pipelines Operator', () => {
  installPipelinesOperatorUsingCLI();
});

Given('user has installed OpenShift Serverless Operator', () => {
  installKnativeOperatorUsingCLI();
});

Given('user has installed Shipwright Operator', () => {
  installShipwrightOperatorUsingCLI();
});
