<h1 align="center">Backend CMS</br>Museu Municipal Deolindo Mendes Pereira</h1>

<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>
<p align="center">
  <a href="https://docs.nestjs.com/v9/" target="_blank">
    Documentação Oficial
  </a>
</p>

# Project setup

### With docker

```bash
# Fist setup or restore
$ make setup

# Just run
$ make start
```

### Without docker

```bash
#-> start your MySQL database
#-> exec dev/init-database.sql (on first setup or restore only)
#-> set database env on .env

$ yarn start:dev
```

```bash
# API endpoint
localhost:8080

```

### Dev Login
 ```[POST]  {host}:8080/auth/login```
```json
{
  "email": "admin@admin.com",
  "password": "adminpassword"
}
```