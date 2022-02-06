# Desafio Raro Labs

API desenvolvida em NodeJS para o desafio técnico do processo seletivo de Pessoa Desenvolvedora Nodejs na empresa Raro Labs.

Você pode acessar a API localmente através do clone do repositório, ou ainda através [deste link](https://kevin-ol-rarolabs.herokuapp.com/v1/pagination) 
onde foi feito um deploy no Heroku (note que a primeira vez que o site for acessado, pode demorar até 1 minuto para que máquina virtual do Heroku inicie a aplicação).

## Instruções para reproduzir o projeto localmente

1. Clone o repositório
  * `git clone git@github.com:Kevin-Ol/desafio-raro-labs.git`.
  * Entre na pasta do repositório que você acabou de clonar:
    * `cd desafio-raro-labs`

2. Instale as dependências
  * `npm install`

3. Inicie o projeto
  * `npm start`

4. Acesse as rotas através de softwares como Postman e Insomnia através do endereço:
  * `http://localhost:3000/v1`
  
5. Acesse a documentação localmente através do endereço:
  * `http://localhost:3000/api-docs`
---

## Rotas

### Endpoint GET `/pagination?current=2&total=10`

- A rota deve ser acessada enviando os parâmetros `current` e `total` na url, que devem ser números inteiros válidos, retornando um array de números de acordo 
com as regras de negócio;

- Para acessar detalhadamente os tipos de resposta que a requisição pode retornar, consulte a documentação swagger através do endpoint local 
`http://localhost:3000/api-docs` ou ainda [online](https://kevin-ol-rarolabs.herokuapp.com/api-docs/);

---

## Regras de negócio

O retorno da API segue regras de negócio indicadas no [desafio](https://git.rarolabs.com.br/-/snippets/308):

- A API deve receber dois parâmetros, a página atual e a quantidade de páginas.

- Se a quantidade de páginas for menor ou igual a 5, deve exibir todos os números no array.

- Se a quantidade for maior que 5, deverá:
  - exibir os números ao redor da página atual, compondo ao total 5 elementos exibidos;
  - se o primeiro valor dos cinco exibidos não for o valor 1, adicionar reticências (...) na primeira opção;
  - se o último valor dos cinco exibidos não for a última página, adicionar reticências (...) na última opção;


- O módulo deverá retornar um array de strings, com as seguintes regras:

  - a página atual deverá estar marcado em negrito, na sintaxe markdown (envolto por dois asteriscos **);
  - os demais números exibidos deverão ser apresentados como strings;
  - os valores não exibidos serão representados um uma string de reticências (...);

- O exemplo abaixo demonstra as páginas caminhando uma a uma, a partir da página 1 até a 10:

```js
  ['**1**', '2', '3', '4', '5', '...']
  ['1', '**2**', '3', '4', '5', '...']
  ['1', '2', '**3**', '4', '5', '...']
  ['...', '2', '3', '**4**', '5', '6', '...']
  ['...', '3', '4', '**5**', '6', '7', '...']
  ['...', '4', '5', '**6**', '7', '8', '...']
  ['...', '5', '6', '**7**', '8', '9', '...']
  ['...', '6', '7', '**8**', '9', '10']
  ['...', '6', '7', '8', '**9**', '10']
  ['...', '6', '7', '8', '9', '**10**']
```

## Scripts do projeto

- `npm start` inicia a aplicação localmente;
- `npm test` inicia os arquivos de teste da aplicação;
- `npm run test:coverage` realiza os testes da aplicação gerando um relatório de cobertura;

## Bibliotecas utilizadas

- `express` para criação e manipulação de rotas;
- `http-status-codes` para melhorar legibilidade dos códigos http;
- `swagger-ui-express` para criar documentação;
- `uuid` para gerar ids aleatórios;
- `chai`, `chai-http`, `chai-uuid`, `mocha` para criar arquivos de testes;
- `nyc` para gerar relatório de testes;


