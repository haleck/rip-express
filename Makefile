build:
	sudo docker build . -t haleck/rip-express-index
run:
	sudo docker run -d -p 5000:5000 --rm --name rip-express-index haleck/rip-express-index
stop:
	sudo docker stop rip-express-index
start:
	sudo docker-compose up
