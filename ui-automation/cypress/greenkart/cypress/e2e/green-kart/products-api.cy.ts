// cy.request: API test with no browser UI involved.

interface Product {
  id: number;
  name: string;
  price: number;
}

describe('GreenKart products API', () => {
  const url = 'https://rahulshettyacademy.com/seleniumPractise/data/products.json'; confirm

  it('returns 200 and a non-empty product list', () => {
    cy.request<Product[]>(url).then((res) => {
      expect(res.status).to.eq(200);
      expect(res.body).to.be.an('array').and.not.be.empty;
    });
  });

  it('every product has an id, a name and a positive price', () => {
    cy.request<Product[]>(url).its('body').each((p: Product) => {
      expect(p).to.have.all.keys('id', 'name', 'price', 'image', 'category'); 
      expect(p.price).to.be.greaterThan(0);
    });
  });
});
