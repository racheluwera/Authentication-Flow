# TaskManager

A modern, full-stack task management application built with Next.js 16, Firebase, and TypeScript. Features secure authentication, real-time updates, and an intuitive user interface.

## Features

- **User Authentication** - Secure email/password authentication with Firebase Auth
- **Task Management** - Create, edit, delete, and mark tasks as complete
- **Real-time Updates** - Instant synchronization across all devices using Firestore
- **Priority Levels** - Organize tasks by Low, Medium, or High priority
- **Due Dates** - Set and track task deadlines
- **Responsive Design** - Fully responsive UI built with Tailwind CSS
- **Protected Routes** - Secure dashboard with authentication gates

## Tech Stack

- **Framework:** Next.js 16.0.7 (App Router)
- **Language:** TypeScript
- **Authentication:** Firebase Authentication
- **Database:** Cloud Firestore
- **Styling:** Tailwind CSS 4
- **Runtime:** Node.js 22+

## Prerequisites

- Node.js 22.20.0 or higher
- npm 10.9.3 or higher
- Firebase project with Authentication and Firestore enabled

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Authentication
```

2. Install dependencies:
```bash
npm install
```

3. Configure Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Email/Password authentication
   - Create a Firestore database
   - Update `app/lib/firebase.ts` with your Firebase configuration

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
Authentication/
├── app/
│   ├── (auth)/
│   │   ├── login/          # Login page
│   │   └── register/       # Registration page
│   ├── api/
│   │   └── task/           # Task API routes
│   ├── components/
│   │   ├── AuthGate.tsx    # Protected route wrapper
│   │   ├── authProvider.tsx # Auth context provider
│   │   ├── dashboardPage.tsx
│   │   ├── TaskForm.tsx    # Task creation/editing form
│   │   └── TaskList.tsx    # Task list display
│   ├── dashboard/          # Dashboard page
│   ├── lib/
│   │   └── firebase.ts     # Firebase configuration
│   ├── types/
│   │   └── task.ts         # TypeScript types
│   └── page.tsx            # Home page
├── public/                 # Static assets
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Deployment

### Vercel (Recommended)


1. Deployment link:https://authentication-flow-ohqp.vercel.app/

## Security

- Firebase Authentication for secure user management
- Protected API routes with user validation
- Environment variables for sensitive configuration
- Regular dependency updates for security patches


## Support

For issues and questions, please open an issue in the repository.
