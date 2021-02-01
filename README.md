# Catálogo de dragões

Essa aplicação foi desenvolvida para completar o teste técnico proposto para a vaga de desenvolvedor front-end. Você pode visualizar a aplicação funcionando em [https://softdesign-catalogo-dragoes.web.app/dragoes](https://softdesign-catalogo-dragoes.web.app/dragoes). Você também pode visualizar o estado das builds e deploys de cada commit visualizando o histórico de commits [aqui](https://github.com/nstseek/catalogo-dragoes/commits/master) ou vendo o estado dos workflows do repositório [aqui](https://github.com/nstseek/catalogo-dragoes/actions).

## Tecnologias

Esse projeto foi desenvolvido utilizando algumas das mais recentes tecnologias como React (com Hooks e Context API), TypeScript, Jest, Enzyme, SCSS, Axios e algumas outras bibliotecas de minha autoria, como [@nstseek/react-forms](https://www.npmjs.com/package/@nstseek/react-forms) e [@nstseek/react-ui](https://www.npmjs.com/package/@nstseek/react-ui).

## Continuous Integration and Continuous Deployment (CI/CD)

Um [processo de CI/CD simples](https://github.com/nstseek/catalogo-dragoes/actions?query=workflow%3A%22Deploy+to+Firebase+Hosting+on+merge%22) foi implementado nesse projeto utilizando as Actions do GitHub. Toda vez que algum commit é adicionado a master, o projeto passa por sua bateria de testes, é buildado e deployado no firebase, podendo ser visualizado no [endereço mencionado acima](https://github.com/nstseek/catalogo-dragoes/actions).

## Testes

A cobertura de testes unitários está bem precária por falta de tempo, o único componente que possui alguns casos de teste reais apenas para exemplificar e comprovar conhecimento é o componente de [Login](https://github.com/nstseek/catalogo-dragoes/blob/master/src/pages/Login/Login.test.tsx). Como é um projeto de teste apenas, não vejo necessidade de cobrir o projeto inteiro com testes unitários pois demandaria tempo que não tenho disponível.

O resultado dos testes de cada commit é publicado utilizando o GitHub Actions logo após rodarem, como você pode ver [aqui](https://github.com/nstseek/catalogo-dragoes/runs/1804083211).

## Flow de trabalho

O projeto possui uma série de filtros para garantir a qualidade do código criado, como [linters](https://eslint.org/), [formatters](https://prettier.io/) e [testes unitários](https://jestjs.io/en/) com [framework específico](https://enzymejs.github.io/enzyme/) que rodam toda vez que o desenvolvedor tenta realizar o push para o repositório através dos git hooks. Esse projeto utiliza o pacote [husky](https://www.npmjs.com/package/husky) que torna muito simples a configuração de git hooks em qualquer repositório Git. Toda vez que o desenvolvedor tenta realizar o push, o script [npm run check](https://github.com/nstseek/catalogo-dragoes/blob/5e0b1780bf86f23bad5d54f915c2e5c147a49bde/package.json#L44) [roda antes que o push seja efetuado](https://github.com/nstseek/catalogo-dragoes/blob/5e0b1780bf86f23bad5d54f915c2e5c147a49bde/package.json#L92), garantindo que o código que está sendo enviado passa em todos os testes e builda corretamente.

## Scripts disponíveis

### npm start

Inicia o projeto na sua máquina local.

### npm run build

Cria um build do projeto para ser servido.

### npm run eject

Ejeta toda a articulação do create-react-app que não é totalmente visível/manipulável para o desenvolvedor final.

### npm test

Executa todos os testes unitários do projeto.

### npm run test:watch

Executa todos os testes unitários do projeto em modo de observação.


### npm run test:report

Executa todos os testes unitários do projeto e gera um report para ser publicado com o GitHub Actions.

### npm run prettier

Executa o [formatter](https://prettier.io/) instalado no projeto para verificar os arquivos existentes.

### npm run prettier:fix

Executa o [formatter](https://prettier.io/) instalado no projeto para corrigir os erros nos arquivos existentes.

### npm run lint

Executa o [linter](https://eslint.org/) instalado no projeto para verificar os arquivos existentes.

### npm run lint:fix

Executa o [linter](https://eslint.org/) instalado no projeto para corrigir os  erros nos arquivos existentes.

### npm run check

Executa uma verificação completa no projeto, incluindo o linter, formatter, os testes unitários e o build.

### npm run check:ci

Executa uma verificação completa no projeto destinada para um ambiente CI, incluindo o linter, formatter, os testes unitários (gerando um report para publicação) e o build.

### npm run check:fix

Executa uma verificação completa no projeto, incluindo o linter, formatter, os testes unitários e o build, corrigindo os erros passíveis de correção automática com o linter e o formatter.
