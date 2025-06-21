# Step 1: Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of your backend source code
COPY . .

# Step 6: Expose the backend server port (e.g., Nest/Express typically runs on 3000)
EXPOSE 3000

# Step 7: Start the application (adjust as needed)
# For Express:
# CMD ["node", "index.js"]

# For NestJS (production):
CMD ["npm", "run", "start:prod"]

# For NestJS development:
# CMD ["npm", "run", "start:dev"]
