import Navbar from "@/components/navbar";

describe('<Navbar />', () => {
    it('First test', () => {
        cy.mount(<Navbar />);
    });
});