# start:
# 	yarn prisma db push
# 	make back-start

# back-start:
# 	docker-compose -f ./dev.docker-compose.yml up gestor-2.0-backend

db-start:
	docker-compose -f ./dev.docker-compose.yml up -d gestor-2.0-database

database:
	docker-compose -f ./dev.docker-compose.yml stop gestor-2.0-database
	docker-compose -f ./dev.docker-compose.yml rm -f gestor-2.0-database
	docker-compose -f ./dev.docker-compose.yml up -d --build gestor-2.0-database
	docker-compose -f ./dev.docker-compose.yml start gestor-2.0-database

# backend:
# 	make push
# 	docker-compose -f ./dev.docker-compose.yml stop gestor-2.0-backend
# 	docker-compose -f ./dev.docker-compose.yml rm -f gestor-2.0-backend
# 	docker-compose -f ./dev.docker-compose.yml up --build gestor-2.0-backend
# 	docker-compose -f ./dev.docker-compose.yml start -d gestor-2.0-backend

push:
	yarn prisma db push