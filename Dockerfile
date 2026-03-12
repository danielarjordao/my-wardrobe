# Stage1: Build the application
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies cleanly
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the Angular application
RUN npm run build

# Stage2: Serve the application
FROM nginx:alpine

# Copy the built application from the build stage to the nginx html directory
COPY --from=build /app/dist/my-wardrobe/browser /usr/share/nginx/html

# Rename CSR fallback to index.html so nginx can serve it
RUN mv /usr/share/nginx/html/index.csr.html /usr/share/nginx/html/index.html

# Expose the port that nginx will run on
EXPOSE 80

