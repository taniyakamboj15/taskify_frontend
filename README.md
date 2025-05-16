# Taskify Frontend

**Live URL:** [taskify.taniyakamboj.me](https://taskify.taniyakamboj.me)
**Backend Repository:** [GitHub - taskify\_backend](https://github.com/taniyakamboj15/taskify_backend)

## 📌 Overview

**Taskify** is a sleek, feature-rich task and project management app built with the **MERN** stack. It helps users organize projects, create and manage tasks, set due dates, and collaborate in a minimal and efficient UI. This is the **frontend** repository built using **React**, **Tailwind CSS**, and **Redux**.

---

## 🚀 Features

* 🔐 **Authentication** (Signup/Login with OTP Verification using Firebase)
* 📁 **Project Management** (Create, update, delete projects)
* ✅ **Task Tracking** (CRUD tasks under projects)
* 📆 **Due Date Picker** with clear/reset functionality
* 🌗 **Theme Toggle** (Light & Dark mode)
* 📊 **Dashboard with filters** (e.g., by project, date)
* 🔄 **Real-Time UI Updates** using Redux store

---

## 🛠️ Tech Stack

### 🌐 Frontend

* **React.js** – Functional components and hooks
* **Vite** – Fast bundler and dev server
* **Redux Toolkit** – State management
* **Tailwind CSS** – Utility-first responsive styling
* **Lucide Icons** – Modern SVG icon pack

### 🔐 Authentication

* **Firebase** – OTP-based authentication

### 🌍 Backend

* **Node.js + Express** – REST APIs
* **MongoDB** – Database
* **Deployed on** –  [Vercel](https://vercel.com)

---

## 🧩 Folder Structure

```
📦 taskify_frontend
├─ .gitignore
├─ index.html
├─ package.json
├─ vite.config.js
├─ vercel.json
├─ src
│  ├─ app.jsx               // Entry point
│  ├─ global.css            // Tailwind global styles
│  ├─ assets/               // Images and media
│  ├─ components/           // Reusable components (UI + Pages)
│  ├─ config/firebase.js    // Firebase setup
│  ├─ hooks/                // Custom React hooks
│  ├─ layout/Layout.jsx     // App layout component
│  ├─ redux/                // Redux slices and store
│  └─ utils/                // Utility functions
```

---

## 📷 Screenshots

> Add UI screenshots here showing the dashboard, task view, project view, and dark/light themes.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/taniyakamboj15/taskify_frontend.git
cd taskify_frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment (optional)

If using Firebase, ensure you configure it properly in `src/config/firebase.js`.

### 4. Run the development server

```bash
npm run dev
```

### 5. Build for production

```bash
npm run build
```

---

## ⚙️ Deployment

The project is deployed using **Vercel**.

To avoid `404 errors` on page refreshes with React Router, the project includes a `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

---

## 🙋‍♀️ Author

**Taniya Kamboj**
[GitHub Profile](https://github.com/taniyakamboj15)

---


---

## 🌟 Show Your Support

If you like this project, consider giving it a ⭐️ on GitHub and sharing it!

---

## 🤝 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Happy Coding 💻✨
