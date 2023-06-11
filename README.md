# Golf Matcher

Golf Matcher is a web application that helps golf enthusiasts find golf partners for their games. It provides features for user authentication, profile management, chat functionality, and more.

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/golf-matcher.git
```

2. Navigate to the project directory:
```bash
cd golf-matcher
```
3. Install the dependencies:
```bash
npm install
```
## Usage

1. Start the development server:
```bash
npm run dev
```

2. Open your web browser and access the application at `http://localhost:8080`.

## Features

- User authentication: Users can log in or register using their Google accounts.
- Profile management: Users can edit their profile information, including display name, birth date, description, and skill level.
- Chat functionality: Users can communicate with other users through the chat feature.
- Navigation: Users can navigate between different sections of the application, such as Home, Chat, Booking, and Profile.

## Technologies Used

- Vue.js: JavaScript framework for building user interfaces.
- Vue Router: Routing library for Vue.js.
- Node.js: JavaScript runtime environment.
- Express.js: Web application framework for Node.js.
- MongoDB: NoSQL database for storing user data.

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License.

```docker
# Specify the base image
FROM node:14

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the necessary port
EXPOSE 8080

# Start the server
CMD [ "npm", "start" ]
```
