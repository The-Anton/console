@add-flow @smoke
Feature: Create the different workloads from Add page
              As a user, I should be able to create an Application, component or service from one of the options provided on Add page


        Background:
            Given user is at developer perspective
              And user has created or selected namespace "ci-addflow"
              And user is at Add page

        Scenario: Getting started resources on Developer perspective
             Then user will see Create Application using Samples, Build with guided documentation and Explore new developer features under Getting started resources section
              And user will see All services, Database, Operator Backed and Helm Chart options under Developer Catalog section
              And user will see Import from Git card under Git Repository section
              And user will see "Container images" option
              And user will see "Samples" option
              And user will see Import YAML, Upload JAR file under From Local Machine section

        Scenario Outline: Deploy Application using Catalog Template "<template_category>": A-01-TC02
            Given user is at Developer Catalog page
              And user is at Templates page
             When user selects Template category "<template_category>"
              And user searches and selects Template card "<card_name>" from catalog page
              And user clicks Instantiate Template button on side bar
              And user clicks create button on Instantiate Template page
             Then user will be redirected to Topology page
              And user is able to see workload "<workload_name>" in topology page

        Examples:
                  | template_category | card_name                             | workload_name             |
                  | CI/CD             | Jenkins                               | jenkins                   |
                  | Databases         | MariaDB                               | mariadb                   |
                  | Languages         | Node.js + PostgreSQL (Ephemeral)      | nodejs-postgresql-example |
                  | Middleware        | Apache HTTP Server                    | httpd-example             |
                  | Other             | Nginx HTTP server and a reverse proxy | nginx-example             |

        Scenario Outline: Deploy <image> image with Runtime icon from external registry: A-02-TC02
            Given user is at Deploy Image page
             When user enters Image name from external registry as "<image_name>"
              And user selects the "<runtime_icon>" from Runtime Icon dropdown
              And user selects the application "sample-app" from Application dropdown
              And user enters Name as "<name>"
              And user selects resource type as "deployment"
              And user clicks Create button on Add page
             Then user will be redirected to Topology page
              And user will see the deployed image "<name>" with "<runtime_icon>" icon

        Examples:
                  | image  | image_name                | runtime_icon | name         |
                  | secure | openshift/hello-openshift | fedora       | hello-secure |

        Scenario Outline: Deploy image with Runtime icon from internal registry: A-02-TC03
            Given user is at Deploy Image page
             When user selects Image stream tag from internal registry
              And user selects Project as "openshift" from internal registry
              And user selects Image Stream as "<image_stream>" from internal registry
              And user selects tag as "latest" from internal registry
              And user selects the "<runtime_icon>" from Runtime Icon dropdown
              And user selects the application "sample-app" from Application dropdown
              And user enters Name as "<name>"
              And user selects resource type as "deployment"
              And user clicks Create button on Add page
             Then user will be redirected to Topology page
              And user will see the deployed image "<name>" with "<runtime_icon>" icon

        Examples:
                  | image_stream | runtime_icon | name           |
                  | golang       | fedora       | hello-internal |

        Scenario: Edit Runtime Icon while Editing Image: A-02-TC05
            Given user has deployed container Image "openshift/hello-openshift" from external registry
              And user is at Topology page
              And topology page has a deployed image "hello-openshift" with Runtime Icon "fedora"
             When user right clicks on the node "hello-openshift" to open context menu
              And user selects Edit imagename "hello-openshift" option
              And user updates the Runtime icon to "ansible"
              And user clicks on Save button
             Then user will be redirected to Topology page
              And user will see the deployment image "hello-openshift" icon updated to "ansible" Icon