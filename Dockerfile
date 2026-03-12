# Specify the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy dependency files from host to image
COPY . .

# Execute commands during the build process
RUN npm install

# Define the default command to run when the container starts
CMD ["sh"]

