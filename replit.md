# Admin Panel Application

## Overview

This is a modern admin panel application built with React, JavaScript (converted from TypeScript), and Express.js. The application features a shipping/logistics management system with orders, shipments, and customer management capabilities. The frontend uses shadcn/ui components with Tailwind CSS for styling, while the backend is a REST API built with Express.js and uses Drizzle ORM with PostgreSQL for data persistence.

## Recent Changes (January 2025)

### Enhanced UI Features
✓ Added collapsible sidebar with submenu support
✓ Implemented comprehensive theme customization panel
✓ Added navbar color customization options
✓ Created theme presets (Ocean, Forest, Sunset, Lavender)
✓ Reduced navbar padding for more compact design
✓ Added smaller, more compact UI elements throughout

### Sidebar Improvements
✓ Added hierarchical navigation with expandable submenus
✓ Implemented proper sidebar color theming
✓ Added compact mode toggle
✓ Enhanced animations and transitions

### Theme System
✓ Extended theme context with navbar color support
✓ Added theme presets with color combinations
✓ Implemented compact toggle switches
✓ Added font size and border radius customization
✓ Created responsive theme panel with smaller controls

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Styling**: Tailwind CSS with shadcn/ui component library
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Validation**: Zod for request/response validation
- **Session Management**: Connect-pg-simple for PostgreSQL session storage
- **Development**: tsx for TypeScript execution in development

### Project Structure
```
/
├── client/          # Frontend React application
├── server/          # Backend Express.js API
├── shared/          # Shared types, schemas, and utilities
├── migrations/      # Database migrations
└── dist/           # Production build output
```

## Key Components

### Database Schema
- **Users Table**: Basic user authentication with username/password
- **Orders Table**: Comprehensive order management with customer details, product info, shipping addresses, and status tracking
- **Schema Validation**: Drizzle-zod integration for type-safe database operations

### API Endpoints
- **Orders CRUD**: Full create, read, update, delete operations for orders
- **Filtering & Pagination**: Support for status filtering, search, and pagination
- **Error Handling**: Comprehensive error handling with proper HTTP status codes

### UI Components
- **Admin Layout**: Responsive sidebar navigation with mobile support
- **Data Tables**: Sortable and filterable tables for order management
- **Forms**: Dynamic forms with validation for order creation/editing
- **Theme Support**: Light/dark theme toggle capability

### Authentication System
- Session-based authentication (infrastructure in place)
- User management with secure password handling
- Protected routes and API endpoints

## Data Flow

1. **Client Requests**: Frontend makes API calls using TanStack Query
2. **Server Processing**: Express.js routes handle requests with validation
3. **Database Operations**: Drizzle ORM manages PostgreSQL interactions
4. **Response Handling**: JSON responses with proper error handling
5. **UI Updates**: React Query manages cache invalidation and UI updates

## External Dependencies

### Frontend Dependencies
- **UI Components**: Comprehensive shadcn/ui component library
- **Icons**: Lucide React for consistent iconography
- **Date Handling**: date-fns for date formatting and manipulation
- **Form Validation**: React Hook Form with Hookform resolvers

### Backend Dependencies
- **Database**: Neon Database (serverless PostgreSQL)
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Session Store**: connect-pg-simple for session persistence
- **Development Tools**: tsx for TypeScript execution

### Development Tools
- **Build**: Vite with React plugin and TypeScript support
- **Code Quality**: TypeScript for static type checking
- **Styling**: PostCSS with Tailwind CSS and Autoprefixer
- **Development**: Hot module replacement and error overlay

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds optimized React application to `dist/public`
2. **Backend Build**: esbuild bundles server code to `dist/index.js`
3. **Database Setup**: Drizzle migrations manage schema changes

### Production Configuration
- **Environment Variables**: Database URL and other config via environment
- **Static Files**: Express serves built frontend from `dist/public`
- **Database**: PostgreSQL (configured for Neon Database)
- **Session Storage**: PostgreSQL-backed sessions for production

### Development vs Production
- **Development**: Vite dev server with HMR, tsx for server execution
- **Production**: Static file serving, bundled server code, optimized builds
- **Database**: Same PostgreSQL setup for both environments

### Key Features
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Real-time Updates**: TanStack Query provides optimistic updates
- **Type Safety**: End-to-end TypeScript for reduced runtime errors
- **Modern UI**: Professional admin interface with consistent design system
- **Scalable Architecture**: Clean separation of concerns and modular structure