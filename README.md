# React Testing Course Project

This project is part of the [Testing React Apps with React Testing Library](https://codewithmosh.com/p/complete-react-testing-course) course by Code with Mosh. It demonstrates comprehensive testing practices for React applications using modern testing tools and methodologies.

## 🚀 Features

- Modern React application with TypeScript
- Comprehensive test suite using React Testing Library
- Mock Service Worker (MSW) for API mocking
- Authentication testing with Auth0
- State management testing with Redux Toolkit
- Form testing with React Hook Form and Zod
- Routing testing with React Router
- UI testing with Tailwind CSS and Radix UI
- API testing with Axios
- Test coverage reporting

## 🛠️ Tech Stack

- **Framework:** React 18
- **Language:** TypeScript
- **Testing:** 
  - Vitest
  - React Testing Library
  - Jest DOM
  - MSW (Mock Service Worker)
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI
- **State Management:** Redux Toolkit
- **Form Handling:** React Hook Form + Zod
- **Routing:** React Router
- **HTTP Client:** Axios
- **Development Tools:** Vite

## 📦 Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd react-testing
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
VITE_AUTH0_DOMAIN=your-auth0-domain
VITE_AUTH0_CLIENT_ID=your-auth0-client-id
```

## 🚀 Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the production version
- `npm run preview` - Preview the production build
- `npm run test` - Run tests
- `npm run test:ui` - Run tests with UI interface
- `npm run coverage` - Generate test coverage report
- `npm run server` - Start the JSON server for API mocking
- `npm start` - Start both the development server and JSON server concurrently

## 🧪 Testing

This project includes comprehensive tests covering:

- Component rendering
- User interactions
- Form submissions
- API calls
- Authentication flows
- State management
- Routing
- Error handling

### Running Tests

```bash
# Run tests in watch mode
npm run test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run coverage
```

## 📚 Course Content

This project is part of a comprehensive course that covers:

1. Getting Started with React Testing
2. Testing React Components
3. Mocking APIs
4. Testing Forms
5. Testing State Management
6. Testing Authentication
7. Testing Routing