const chai = require('chai');
const { expect } = require('chai');
const chaiHttp = require('chai-http');

const server = require('../api/app');

chai.use(chaiHttp);

describe('GET /pagination', () => {
  describe(('Quando os parâmetros corretos não são enviados'), () => {
    const expectedError1 = { message: 'Missing current or total parameters' };
    const expectedError2 = { message: 'Current and total pages must be numbers greater than zero' };
    const expectedError3 = { message: 'Total page must be greater or equal to current page' };

    describe(('Quando nenhum parâmetro é enviado'), () => {  
      let response = {};
      
      before(async () => {
        response = await chai.request(server)
          .get('/v1/pagination');
      });
  
      it('Retorna status 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('Retorna objeto com mensagem de erro "Missing current or total parameters"', () => {
        expect(response.body).to.be.deep.equal(expectedError1);
      });
    });


    describe(('Quando apenas "current" é enviado'), () => {  
      let response = {};
      
      before(async () => {
        response = await chai.request(server)
        .get('/v1/pagination')
        .query({ current: 5 });
      });
  
      it('Retorna status 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('Retorna objeto com mensagem de erro "Missing current or total parameters"', () => {
        expect(response.body).to.be.deep.equal(expectedError1);
      });
    });


    describe(('Quando apenas "total" é enviado'), () => {  
      let response = {};
      
      before(async () => {
        response = await chai.request(server)
          .get('/v1/pagination')
          .query({ total: 10 });
      });
  
      it('Retorna status 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('Retorna objeto com mensagem de erro "Missing current or total parameters"', () => {
        expect(response.body).to.be.deep.equal(expectedError1);
      });
    });

    describe(('Quando "current" não é número'), () => {  
      let response = {};
      
      before(async () => {
        response = await chai.request(server)
          .get('/v1/pagination')
          .query({ current: 'a', total: 10 });
      });
  
      it('Retorna status 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('Retorna objeto com mensagem de erro "Current and total pages must be numbers greater than zero"', () => {
        expect(response.body).to.be.deep.equal(expectedError2);
      });
    });

    describe(('Quando "total" não é número'), () => {  
      let response = {};
      
      before(async () => {
        response = await chai.request(server)
          .get('/v1/pagination')
          .query({ current: 3, total: 'a' });
      });
  
      it('Retorna status 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('Retorna objeto com mensagem de erro "Current and total pages must be numbers greater than zero"', () => {
        expect(response.body).to.be.deep.equal(expectedError2);
      });
    });

    describe(('Quando "current" é maior que "total"'), () => {  
      let response = {};
      
      before(async () => {
        response = await chai.request(server)
          .get('/v1/pagination')
          .query({ current: 3, total: 1 });
      });
  
      it('Retorna status 400', () => {
        expect(response).to.have.status(400);
      });
  
      it('Retorna objeto com mensagem de erro "Total page must be greater or equal to current page"', () => {
        expect(response.body).to.be.deep.equal(expectedError3);
      });
    });
  });

  describe(('Quando os parâmetros corretos são enviados'), () => {
    describe(('Quando "total" é menor ou igual a 5'), () => {
      const expectedResult = ['1', '2', '**3**', '4', '5'];

      let response = {};
      
      before(async () => {
        response = await chai.request(server)
          .get('/v1/pagination')
          .query({ current: 3, total: 5 });
      });
  
      it('Retorna status 200', () => {
        expect(response).to.have.status(200);
      });
  
      it('Para "current" = 3 e "total"= 5 retorna array correto', () => {
        expect(response.body).to.be.deep.equal({ pagination: expectedResult });
      });
    });

    describe(('Quando "total" é maior que 5'), () => {
      const expectedResults = [
        ['**1**', '2', '3', '4', '5', '...'],
        ['1', '**2**', '3', '4', '5', '...'],
        ['1', '2', '**3**', '4', '5', '...'],
        ['...', '2', '3', '**4**', '5', '6', '...'],
        ['...', '3', '4', '**5**', '6', '7', '...'],
        ['...', '4', '5', '**6**', '7', '8', '...'],
        ['...', '5', '6', '**7**', '8', '9', '...'],
        ['...', '6', '7', '**8**', '9', '10'],
        ['...', '6', '7', '8', '**9**', '10'],
        ['...', '6', '7', '8', '9', '**10**'],
      ];

      for (let counter = 1; counter <= 10; counter++) {
        describe((`Para "current" = ${counter} e "total"= 10`), () => {
          let response = {};
          
          before(async () => {
            response = await chai.request(server)
              .get('/v1/pagination')
              .query({ current: counter, total: 10 });
          });
      
          it('Retorna status 200', () => {
            expect(response).to.have.status(200);
          });
      
          it('Retorna array correto', () => {
            expect(response.body).to.be.deep.equal({ pagination: expectedResults[counter - 1] });
          });
        });
      };
    });
  });
});
