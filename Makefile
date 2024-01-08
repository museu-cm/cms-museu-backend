setup:
	make build-database
	make build-backend

build-backend:
	docker-compose -f ./dev.docker-compose.yml up -d cms-museu-database
	yarn prisma db push
	docker-compose -f ./dev.docker-compose.yml up --build cms-museu-backend

build-database:
	docker-compose -f ./dev.docker-compose.yml up -d --build cms-museu-database
	yarn prisma db push
	yarn prisma db seed

start:
	docker-compose -f ./dev.docker-compose.yml up -d cms-museu-database
	yarn prisma db push
	docker-compose -f ./dev.docker-compose.yml up cms-museu-backend