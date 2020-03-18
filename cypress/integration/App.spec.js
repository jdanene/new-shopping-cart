describe ('Test App', () => {

  it ('launches', () => {
    cy.visit ('/');
  });

    it ('correct price on first item', () => {
    cy.visit ('/');
    cy.get('[data-cy=firstItemPrice]').should('contain', '$10.90');
  });

    it ('click a item in stock make sure cart opens and cost is correct',()=>{
        cy.visit ('/');
        cy.get('[data-cy=12064273040195392-dropdown]').click();
        cy.get('[data-cy=12064273040195392-L]').click();
        cy.get('[data-cy=12064273040195392-addToCart]').click();
        cy.get('[data-cy=shoppingCart-cost]').should('contain' ,'$10.90');

    })

});



