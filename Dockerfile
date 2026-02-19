FROM mcr.microsoft.com/playwright:bionic

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the entire project
COPY . .

# Install Playwright browsers
RUN npx playwright install

# Set environment variables
ENV NODE_ENV=production
ENV HEADLESS=true

# Default command
CMD ["npm", "test"]
