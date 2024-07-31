This repository contains the solution for the receipt processor challenge by fetch.
Docker File is added to create an image and run a container. Docker command has also been added to the DockerFile.

Run the command to build an image -  docker build -t docker_user_name/image_name  
Run the command to run a container over the image - docker run --name image_name -p 80:8080 -d docker_user_name/image_name

After this, you can test the application with receipts in JSON format.
I have not added the example receipts to this repository. However, I have tested the service with the example receipts on Postman and I have obtained the desired result
