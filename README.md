# Node.js Sales Data Processing Application

This application processes sales data from a CSV file, provides revenue reports, and allows data refresh via API or a scheduled cron job.

## Prerequisites
- Node.js (>=14.x)
- MySQL database (configured in `.env`)
- Sequelize ORM

## Setup Instructions

### 1. Install Dependencies
```sh
npm install
```

### 2. Copy Environment Variables
Create a `.env` file and copy the contents from `.env.example`. Update the database credentials and configurations.
```sh
cp .env.example .env
```

### 3. Run Database Migrations
```sh
npx sequelize-cli db:migrate
```

### 4. Start the Server
```sh
node src/server.js
```

## Running the Data Import Script
To manually import data from the CSV file, run:
```sh
node scripts/importCsv.js
```

## API Endpoints
### 1. Refresh Data Manually
**GET** `/api/refresh`
- Triggers the data import process in the background.

### 2. Get Revenue Reports
**GET** `/api/revenue/total?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&groupBy=product|category|region`
- Fetches total revenue, optionally grouped by product, category, or region.



