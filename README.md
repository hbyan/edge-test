# EDGE Fixtures App

This Next.js application allows users to upload a CSV file of sports fixtures and search for teams dynamically from a MongoDB Atlas database.

## Getting Started

### 1. Clone the repository

bash
git clone https://github.com/your-username/edge-test.git
cd edge-test


### 2. Install dependencies

bash
npm install

### 3. Create .env.local
Create a .env.local file in the root directory and add the following line:

MONGODB_URI=<your MongoDB connection string here>

* Note: You will receive the MongoDB connection string via email upon your request.

### 4. Run the development server
npm run dev
Open http://localhost:3000 in your browser to view the app, starting with the file uploader.

Open http://localhost:3000/search in your browser to search and view the teams with details.

### 5. Public access
You can access the deployed version of the app hosted on Vercel here:
- Home Page (upload csv):https://edge-test-five.vercel.app/
- Search Page: https://edge-test-five.vercel.app/search (for example: you can type "high" to see the listings)
