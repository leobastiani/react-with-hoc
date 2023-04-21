describe('form reset', () => {
  it('should be able to re-populate the form while reset', () => {
    cy.visit('http://localhost:3000/');

    cy.contains('Hello world');
  });
});
