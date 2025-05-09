# NutriExplorer

**Live Demo:** [nutri-explorer.vercel.app](https://nutri-explorer.vercel.app)

NutriExplorer is a comprehensive web application designed to help users explore and manage food products by leveraging the OpenFoodFacts API. The platform offers features such as barcode scanning, product search, category filtering, sorting, favorites management, and a shopping cart, all within a responsive and user-friendly interface.

---

## 🚀 Features

- **Product Search:**  
  Search for food products by name with instant results.

- **Barcode Scanning:**  
  Scan barcodes using your device's camera or upload an image to retrieve product details.

- **Category Filtering:**  
  Filter products based on predefined categories for easier navigation.

- **Sorting Options:**  
  Sort products by name or nutrition grade to find the healthiest options.

- **Product Details Page:**  
  View detailed information about each product, including ingredients, nutrition facts, and more.

- **Favorites Management:**  
  Add or remove products from your favorites list, with data persisted in MongoDB.

- **Shopping Cart:**  
  Manage a shopping cart with add/remove functionality, also persisted in MongoDB.

- **Responsive Design:**  
  Optimized for desktops, tablets, and mobile devices with light/dark mode support.

- **User Feedback:**  
  Toast notifications provide real-time feedback for user actions.

---

## 🛠️ Tech Stack

### Frontend

- **Framework:** React.js
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Routing:** React Router
- **Barcode Scanning:** html5-qrcode
- **State Management:** React Context API

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB
- **ORM:** Mongoose

### Deployment

- **Frontend:** Vercel
- **Backend:** Render

---

## 🧠 Approach & Architecture

- **Modular Codebase:**  
  Components are organized into reusable and maintainable modules, enhancing readability and scalability.

- **Context API:**  
  Utilized for managing global states such as products, favorites, cart, and user preferences, reducing prop drilling.

- **API Integration:**  
  Abstracted API calls to OpenFoodFacts and MongoDB into separate utility files for cleaner code and easier maintenance.

- **Routing Structure:**  
  Implemented a clear and intuitive routing system using React Router for seamless navigation.

- **Responsive Design:**  
  Ensured the application is fully responsive, providing an optimal user experience across all devices.

---

## 📄 Assigned Tasks Completed

- [x] Implemented product search functionality.
- [x] Integrated barcode scanning using device camera and image upload.
- [x] Developed category filtering and sorting features.
- [x] Created detailed product pages with comprehensive information.
- [x] Built favorites and shopping cart systems with MongoDB integration.
- [x] Designed a responsive UI with dark/light mode support.
- [x] Ensured clean, readable, and modular code structure.

---

## 🎁 Bonus Features

- [x] Integrated camera icon within the search bar for intuitive barcode scanning access.
- [x] Implemented toast notifications for user actions.
- [x] Enhanced UI/UX with smooth animations using Framer Motion.

---

## 🧪 Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine.
- MongoDB instance running locally or in the cloud.

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Jeet-115/NutriExplorer.git
   cd NutriExplorer
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

   ```env
   MONGODB_URI=your_mongodb_connection_string
   ```

4. **Start the development server:**

   ```bash
   npm run dev
   ```

   The application will be available at `http://localhost:3000`.

---

## 📁 Folder Structure

```
NutriExplorer/
├── client/                 # Frontend React application
│   ├── public/
│   └── src/
│       ├── components/     # Reusable components
│       ├── context/        # Context API for global state
│       ├── pages/          # Page components
│       ├── utils/          # Utility functions and API calls
│       └── App.jsx         # Main application component
├── server/                 # Backend Express application
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   └── server.js           # Entry point for the backend
├── .env                    # Environment variables
├── package.json            # Project metadata and scripts
└── README.md               # Project documentation
```

---

## 📬 Contact

For any inquiries or feedback, please reach out to [Jeet-115](https://github.com/Jeet-115).
