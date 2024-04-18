# ==== CONFIGURE ====
FROM node:latest
# Set the working directory to /app inside the container
WORKDIR /mypics
# Copy app files
COPY . .
# ==== BUILD =====
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN npm ci 
EXPOSE 3000
# Start the app
CMD [ "npm", "start" ]