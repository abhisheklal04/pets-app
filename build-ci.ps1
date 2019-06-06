docker build -t pets-app:dev .

docker run -it -v ${PWD}:/app -v /app/node_modules -p 4201:4200 --rm --name pets-app-dev pets-app:dev
