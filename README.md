# Stephen Antoni's Portfolio Website

This repository contains the source code for Stephen Antoni's personal portfolio website. It's a modern, responsive single-page application built with Next.js and React, showcasing Stephen's skills, experience, and projects as a Backend Engineer.

## Features

- Responsive design with mobile-friendly navigation
- Smooth scrolling between sections
- Dynamic project cards with sub-project navigation
- Contact form with server-side handling
- Skills and experience sections
- Integration with external services (GitHub, LinkedIn)

## Technologies Used

- Next.js
- React
- TypeScript
- Tailwind CSS
- Axios for API requests
- Lucide React for icons

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or later)
- npm or yarn

## Getting Started

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/stephen-antoni-portfolio.git
   cd stephen-antoni-portfolio
   ```

2. Install dependencies:
   ```
   npm install
   # or
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following variables:
   ```
   MAILGUN_API_KEY=your_mailgun_api_key
   MAILGUN_DOMAIN=your_mailgun_domain
   MAILGUN_FROM=your_sender_email
   CONTACT_EMAIL=your_contact_email
   ```

4. Run the development server:
   ```
   npm run dev
   # or
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Building for Production

To create a production-ready build:

```
npm run build
# or
yarn build
```

## Deployment

This project can be easily deployed to various platforms. Here are instructions for deploying locally:

### Local Deployment

1. Build the project:
   ```
   npm run build
   # or
   yarn build
   ```

2. Start the production server:
   ```
   npm start
   # or
   yarn start
   ```

3. Access the website at `http://localhost:3000`
