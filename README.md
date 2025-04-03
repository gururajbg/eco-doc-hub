# Eco-Doc Hub

A comprehensive document management system for e-waste and battery regulations, built with React, TypeScript, and Firebase.

## Features

- **Document Management**
  - Upload and manage PDF documents
  - Categorize documents by type (e-waste or battery)
  - View and download documents
  - Delete documents (admin only)

- **Authentication**
  - Google Sign-in
  - Email/Password Sign-in
  - Admin access control
  - Protected routes

- **Battery Regulations**
  - Detailed information about Battery (Management & Handling) Rules 2010
  - Status of units identified in Karnataka
  - Implementation steps and guidelines
  - Access to official documents

- **E-Waste Management**
  - Comprehensive e-waste management guidelines
  - Document repository
  - Best practices and regulations

- **Admin Dashboard**
  - Document upload interface
  - Document management
  - User access control

## Tech Stack

- **Frontend**
  - React
  - TypeScript
  - Tailwind CSS
  - Firebase Authentication
  - Firebase Firestore
  - IndexedDB for offline storage

- **Deployment**
  - Vercel

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/eco-doc-hub.git
cd eco-doc-hub
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

4. Start the development server
```bash
npm run dev
```

## Admin Access

The system includes two admin accounts:

1. Google Sign-in:
   - Email: gururajbg4@gmail.com

2. Email/Password:
   - Email: admin@example.com
   - Password: Admin@123

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Ministry of Environment and Forest, Government of India
- Karnataka State Pollution Control Board
- All contributors and maintainers
