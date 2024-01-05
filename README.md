<h1 align="center">Gestor Web 2.0</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
<p align="center">
  <a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
</p>
<p align="center">
  <a href="https://docs.nestjs.com/" target="_blank">
    Documentação Oficial
  </a>
</p>


## Dev Setup

```bash
$ yarn install
$ make database
$ yarn prisma migrate reset
```

## Inicialização

```bash
# development
$ make db-start
$ yarn run start

# watch mode
$ make db-start
$ yarn run start:dev
```