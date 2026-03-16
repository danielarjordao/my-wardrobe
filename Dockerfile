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

# Rename index.csr.html to index.html if it exists (some Angular builds may produce index.csr.html)
RUN cd /usr/share/nginx/html && \
    if [ -f index.csr.html ]; then mv index.csr.html index.html; fi
	
# Expose the port that nginx will run on
EXPOSE 80

