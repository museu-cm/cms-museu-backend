<h1 align="center">Backend Content Management System</br>Museu-CM</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
<p align="center">
  <a href="https://docs.nestjs.com/v9/" target="_blank">
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