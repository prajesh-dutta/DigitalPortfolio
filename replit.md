# Portfolio Website Project Guide

## Overview

This project is a personal portfolio website for Prajesh Dutta, built with a React frontend and Express backend. It uses a PostgreSQL database (via Drizzle ORM) for data storage. The application follows a modern architecture with a clean separation between client and server code.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a client-server architecture:

1. **Frontend**: React application using modern hooks and components
   - Located in `/client` directory
   - Built with Vite for optimal development experience
   - Uses TailwindCSS for styling with a customized theme
   - Incorporates shadcn/ui components library for UI elements
   - Uses Framer Motion for animations
   - Uses React Query for data fetching

2. **Backend**: Express.js server
   - Located in `/server` directory
   - RESTful API endpoints
   - Handles form submissions and data operations
   - Serves the built frontend in production

3. **Database**: PostgreSQL (via Drizzle ORM)
   - Schema defined in `/shared/schema.ts`
   - Connection configuration in `drizzle.config.ts`

4. **Shared code**: Typescript types and schemas shared between frontend and backend
   - Located in `/shared` directory

## Key Components

### Frontend

1. **Component Structure**
   - Organized in a modular fashion with reusable UI components
   - Sections for different parts of the portfolio (hero, about, skills, projects, etc.)
   - Uses shadcn/ui components for consistent design

2. **Routing**
   - Uses wouter for lightweight routing
   - Currently has basic routes: home and 404

3. **State Management**
   - Uses React Query for server state
   - Uses React hooks for local state

4. **Styling**
   - TailwindCSS with custom theme configuration
   - Custom CSS variables for theming
   - Responsive design for all screen sizes

### Backend

1. **API Routes**
   - Contact form submission endpoint
   - User authentication endpoints (prepared but not fully implemented)

2. **Storage**
   - Interface-based design with memory storage implementation
   - Prepared for database implementation via Drizzle ORM

3. **Middleware**
   - JSON parsing
   - Request logging
   - Error handling

### Database

1. **Schema**
   - User model with basic fields
   - Prepared for extension with more models

2. **ORM**
   - Uses Drizzle ORM for type-safe database operations
   - Schema defined with TypeScript for type safety

## Data Flow

1. **Form Submissions**
   - User fills out contact form
   - Client validates input using Zod schemas
   - Data is sent to server via POST request
   - Server validates data again and processes
   - Response sent back with success/error

2. **Page Loading**
   - Static content is rendered from React components
   - Any dynamic data would be fetched using React Query
   - Animations handled by Framer Motion

## External Dependencies

### Frontend
- React and React DOM for UI
- Wouter for routing
- TailwindCSS for styling
- shadcn/ui for UI components
- Framer Motion for animations
- React Query for data fetching
- Zod for schema validation
- Font Awesome for icons

### Backend
- Express for server framework
- Drizzle ORM for database operations
- Zod for validation

## Deployment Strategy

The application is configured for deployment on Replit:

1. **Development**
   - `npm run dev` starts both server and client in development mode
   - Vite provides hot module replacement

2. **Production Build**
   - `npm run build` creates optimized production build
   - Frontend assets are built to `dist/public`
   - Server is bundled using esbuild

3. **Production Start**
   - `npm run start` runs the built application
   - Server serves static assets from build directory

## Database Setup

The project is configured to use PostgreSQL with Drizzle ORM:

1. **Connection**
   - Uses `DATABASE_URL` environment variable
   - For Replit, PostgreSQL is available as a module

2. **Schema Management**
   - `npm run db:push` applies schema changes to the database
   - Schema is defined in `shared/schema.ts`

## Getting Started

1. Ensure PostgreSQL module is enabled in the Replit configuration
2. Set the `DATABASE_URL` environment variable
3. Run `npm run db:push` to initialize the database schema
4. Run `npm run dev` to start the development server
5. Make changes to the codebase as needed
6. Use `npm run build` and `npm run start` for production

## Future Enhancements

The application is set up to easily add:

1. User authentication
2. More portfolio sections
3. Blog capabilities
4. Admin dashboard
5. Project management features