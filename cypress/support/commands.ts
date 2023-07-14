declare global {
    namespace Cypress {
        interface Chainable {
            /**
            * Custom query to select the first DOM element with a tagName that matches the tagNameToFind parameter
            * (whether it be itself or one of its children).
            * @example searchButtonComponent.closestChildrenByTagName('button').click();
            */
            closestChildrenByTagName<T extends HTMLElement>(tagNameToFind: string): Chainable<JQuery<T>>
        }
    }
}


Cypress.Commands.addQuery("closestChildrenByTagName", (tagNameToFind: string) => {
    return ( (subject: JQuery<any>) => {
        if (!subject) {
            return cy.get(tagNameToFind);
        }
        const tagName = subject[0].tagName.toLowerCase();
        console.log(tagName);
        if (tagName === tagNameToFind) {
            return subject;
        } else {
            return subject.find(tagNameToFind);
        }
    });
});

// Prevent TypeScript from reading file as legacy script
export {};