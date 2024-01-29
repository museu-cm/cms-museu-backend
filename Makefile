setup:
	npm install -g yarn
	yarn install
	yarn prisma generate
	make build-database
	make build-backend

build-database:
	docker-compose -f ./dev.docker-compose.yml up -d --build cms-museu-database
	yarn prisma db push
	yarn prisma db seed

build-backend:
	docker-compose -f ./dev.docker-compose.yml up -d cms-museu-database
	yarn prisma db push
	docker-compose -f ./dev.docker-compose.yml up --build cms-museu-backend
	
start:
	docker-compose -f ./dev.docker-compose.yml up -d cms-museu-database
	yarn prisma db push
	docker-compose -f ./dev.docker-compose.yml up cms-museu-backend
	
stop:
	docker-compose -f ./dev.docker-compose.yml stop cms-museu-backend cms-museu-database