import Navbar from "@/components/navbar";

describe('<Logo />', () => {
    beforeEach(() => {
        cy.mount(<Navbar />);
    });

    it('Visible on every device', () => {
        cy.viewport('iphone-se2');
        let logo = cy.get("[data-test='logo']");
        logo.should('be.visible');

        cy.viewport('ipad-mini');
        logo = cy.get("[data-test='logo']");
        logo.should('be.visible');

        cy.viewport('macbook-13');
        logo = cy.get("[data-test='logo']");
        logo.should('be.visible');
    });

    it('Not visible on mobile, visible on tablet after clicking on <SearchButton />', () => {
        cy.viewport('iphone-se2');
        const searchButton = cy
            .get("[data-test='search-button']")
            .closestChildrenByTagName('button');
        searchButton.click();

        let logo = cy.get("[data-test='logo']");
        logo.should('not.be.visible');

        cy.viewport('ipad-mini');
        logo = cy.get("[data-test='logo']");
        logo.should('be.visible');
    });

    it('Contains/is an <a> tag with href "/"', () => {
        const logo = cy.get("[data-test='logo']");
        const links = logo.closestChildrenByTagName<HTMLAnchorElement>('a');
        links
            .should('have.length', 1)
            .should('have.attr', 'href')
            .should('eq', '/')
        ;
    });
});

describe('<NavButton />', () => {
    beforeEach(() => {
        cy.mount(<Navbar />);
    });

    it('Visible on mobile, not visible on tablet and desktop', () => {
        cy.viewport('iphone-se2');
        let navButton = cy.get("[data-test='nav-button']");
        navButton.should('be.visible');

        cy.viewport('ipad-mini');
        navButton = cy.get("[data-test='nav-button']");
        navButton.should('not.be.visible');

        cy.viewport('macbook-13');
        navButton = cy.get("[data-test='nav-button']");
        navButton.should('not.be.visible');
    });

    it('Not visible on mobile after clicking on <SearchButton />', () => {
        cy.viewport('iphone-se2');
        const searchButton = cy
            .get("[data-test='search-button']")
            .closestChildrenByTagName('button');
        searchButton.click();

        const navButton = cy.get("[data-test='nav-button']");
        navButton.should('not.be.visible');
    });
});

describe('<NavList />', () => {
    beforeEach(() => {
        cy.mount(<Navbar />);
    });

    it('Not visible on mobile, visible on tablet and desktop', () => {
        cy.viewport('iphone-se2');
        let navList = cy.get("[data-test='nav-list']");
        navList.should('not.be.visible');

        cy.viewport('ipad-mini');
        navList = cy.get("[data-test='nav-list']");
        navList.should('be.visible');

        cy.viewport('macbook-13');
        navList = cy.get("[data-test='nav-list']");
        navList.should('be.visible');
    });

    it('Visible on mobile after clicking on <NavButton />', () => {
        cy.viewport('iphone-se2');
        const navButton = cy
            .get("[data-test='nav-button']")
            .closestChildrenByTagName('button');
        navButton.click();

        const navList = cy.get("[data-test='nav-list']");
        navList.should('be.visible');
    });

    it('Contains 3 <a> tags with required hrefs', () => {
        const navList = cy.get("[data-test='nav-list']");

        const links = navList.find('a');
        links.should('have.length', 3);

        links.should(links => {
            const pathnames = links.map((i, link) => Cypress.$(link).attr('href'));
            const pathnamesArr = pathnames.get();
            expect(pathnamesArr).to.contain('/');
            expect(pathnamesArr).to.contain('/movies');
            expect(pathnamesArr).to.contain('/tv-shows');
        });
    });
});

describe('<SearchButton />', () => {
    beforeEach(() => {
        cy.mount(<Navbar />);
    });

    it('Visible on mobile and tablet, not visible on desktop', () => {
        cy.viewport('iphone-se2');
        let searchButton = cy.get("[data-test='search-button']");
        searchButton.should('be.visible');

        cy.viewport('ipad-mini');
        searchButton = cy.get("[data-test='search-button']");
        searchButton.should('be.visible');

        cy.viewport('macbook-13');
        searchButton = cy.get("[data-test='search-button']");
        searchButton.should('not.be.visible');
    });

    it('Not visible on mobile and tablet after click', () => {
        cy.viewport('iphone-se2');
        let searchButton = cy.get("[data-test='search-button']");
        searchButton.closestChildrenByTagName('button').click();

        searchButton.should('not.be.visible');
        cy.viewport('ipad-mini');
        searchButton = cy.get("[data-test='search-button']");
        searchButton.should('not.be.visible');
    });
});

describe('<SearchBar />', () => {
    beforeEach(() => {
        cy.mount(<Navbar />);
    });

    it('Not visible on mobile and tablet, visible on desktop', () => {
        cy.viewport('iphone-se2');
        let searchBar = cy.get("[data-test='search-bar']");
        searchBar.should('not.be.visible');

        cy.viewport('ipad-mini');
        searchBar = cy.get("[data-test='search-bar']");
        searchBar.should('not.be.visible');

        cy.viewport('macbook-13');
        searchBar = cy.get("[data-test='search-bar']");
        searchBar.should('be.visible');
    });

    it('Visible on mobile and tablet after clicking on <SearchButton />', () => {
        cy.viewport('iphone-se2');
        const searchButton = cy
            .get("[data-test='search-button']")
            .closestChildrenByTagName('button');
        searchButton.click();

        let searchBar = cy.get("[data-test='search-bar']");
        searchBar.should('be.visible');

        cy.viewport('ipad-mini');
        searchBar = cy.get("[data-test='search-bar']");
        searchBar.should('be.visible');
    });

    it('Not visible on mobile and tablet after clicking on <CancelSearchButton />', () => {
        cy.viewport('iphone-se2');
        const searchButton = cy
            .get("[data-test='search-button']")
            .closestChildrenByTagName('button');
        searchButton.click();

        const cancelSearchButton = cy
            .get("[data-test='cancel-search-button']")
            .closestChildrenByTagName('button');
        cancelSearchButton.click();

        let searchBar = cy.get("[data-test='search-bar']");
        searchBar.should('not.be.visible');

        cy.viewport('ipad-mini');
        searchBar = cy.get("[data-test='search-bar']");
        searchBar.should('not.be.visible');
    });

    it('Contains/is an <input> tag', () => {
        const searchBar = cy.get("[data-test='search-bar']");
        const input = searchBar.closestChildrenByTagName('input');
        input.should('have.length', 1);
    });
});

describe('<CancelSearchButton />', () => {
    beforeEach(() => cy.mount(<Navbar />));

    it('Not visible on either of the devices', () => {
        cy.viewport('iphone-se2');
        let cancelSearchButton = cy.get("[data-test='cancel-search-button']");
        cancelSearchButton.should('not.be.visible');

        cy.viewport('ipad-mini');
        cancelSearchButton = cy.get("[data-test='cancel-search-button']");
        cancelSearchButton.should('not.be.visible');

        cy.viewport('macbook-13');
        cancelSearchButton = cy.get("[data-test='cancel-search-button']");
        cancelSearchButton.should('not.be.visible');
    });

    it('Visible on mobile and tablet after clicking on <SearchButton />', () => {
        cy.viewport('iphone-se2');
        const searchButton = cy
            .get("[data-test='search-button']")
            .closestChildrenByTagName('button');
        searchButton.click();

        let cancelSearchButton = cy.get("[data-test='cancel-search-button']");
        cancelSearchButton.should('be.visible');

        cy.viewport('ipad-mini');
        cancelSearchButton = cy.get("[data-test='cancel-search-button']");
        cancelSearchButton.should('be.visible');
    });
});

describe('<ProfileButton />', () => {
    beforeEach(() => {
        cy.mount(<Navbar />);
    });

    it('Visible on every device', () => {
        cy.viewport('iphone-se2');
        let profileButton = cy.get("[data-test='profile-button']");
        profileButton.should('be.visible');

        cy.viewport('ipad-mini');
        profileButton = cy.get("[data-test='profile-button']");
        profileButton.should('be.visible');

        cy.viewport('macbook-13');
        profileButton = cy.get("[data-test='profile-button']");
        profileButton.should('be.visible');
    });

    it('Not visible on either of the devices after clicking on <SearchButton />', () => {
        cy.viewport('iphone-se2');
        const searchButton = cy
            .get("[data-test='search-button']")
            .closestChildrenByTagName('button');
        searchButton.click();

        let profileButton = cy.get("[data-test='profile-button']");
        profileButton.should('not.be.visible');

        cy.viewport('ipad-mini');
        profileButton = cy.get("[data-test='profile-button']");
        profileButton.should('not.be.visible');

        cy.viewport('macbook-13');
        profileButton = cy.get("[data-test='profile-button']");
        profileButton.should('not.be.visible');
    });
});

describe('<ProfileDropDown />', () => {
    beforeEach(() => {
        cy.mount(<Navbar />);
    });

    it('Not visible on either of the devices', () => {
        cy.viewport('iphone-se2');
        let profileDropDown = cy.get("[data-test='profile-dropdown']");
        profileDropDown.should('not.be.visible');

        cy.viewport('ipad-mini');
        profileDropDown = cy.get("[data-test='profile-dropdown']");
        profileDropDown.should('not.be.visible');

        cy.viewport('macbook-13');
        profileDropDown = cy.get("[data-test='profile-dropdown']");
        profileDropDown.should('not.be.visible');
    });

    it('Visible on every device after clicking on <ProfileButton />', () => {
        cy.viewport('iphone-se2');
        const profileButton = cy
            .get("[data-test='profile-button']")
            .closestChildrenByTagName('button');
        profileButton.click();

        let profileDropDown = cy.get("[data-test='profile-dropdown']");
        profileDropDown.should('be.visible');

        cy.viewport('ipad-mini');
        profileDropDown = cy.get("[data-test='profile-dropdown']");
        profileDropDown.should('be.visible');

        cy.viewport('macbook-13');
        profileDropDown = cy.get("[data-test='profile-dropdown']");
        profileDropDown.should('be.visible');
    });
});