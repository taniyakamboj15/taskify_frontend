# 🌟 Taskify – Task & Project Manager

**🔗 Live Project:** [taskify.taniyakamboj.md](https://taskify.taniyakamboj.md)
**🔧 Backend Repository:** [GitHub - taskify\_backend](https://github.com/taniyakamboj15/taskify_backend)

Taskify is a sleek, modern task and project management tool crafted to help individuals and teams manage their productivity effortlessly.

---

## 📸 Demo Preview

> ![image](https://github.com/user-attachments/assets/4adcee98-3db1-4486-bb9b-41c9481cd313)


---

## ✨ Features

* 🔐 **Authentication** — Secure login and signup with OTP via Firebase.
* 📁 **Project Management** — Easily create, update, and delete projects.
* ✅ **Task Tracking** — Add, edit, complete, or delete tasks per project.
* 📆 **Due Date Picker** — Set task deadlines using an intuitive calendar.
* 🎯 **Filtering** — View tasks by date, project, and completion status.
* 🌗 **Theme Toggle** — Switch between light and dark themes.
* 🔔 **Notifications** — Get updates via Toast and SweetAlert.
* 📤 **Export to PDF** — Save tasks as PDFs using jsPDF & FileSaver.
* 📱 **Fully Responsive** — Works perfectly on all screen sizes.

---

## 🚀 Tech Stack

### 🖥️ Frontend

* **React 19**
* **Redux Toolkit**
* **React Router DOM**
* **Framer Motion**
* **Tailwind CSS + DaisyUI**
* **Lucide Icons, React Toastify, SweetAlert2**
* **Vite**

### 🗃️ Backend

* **Node.js & Express**
* **MongoDB**
* **Firebase (Auth & OTP)**

### 🧰 Utilities

* **Axios**
* **jsPDF & AutoTable**
* **FileSaver**

---

## 📁 Folder Structure

```
taskify_frontend/
├── public/
├── src/
│   ├── assets/         # Images, icons, etc.
│   ├── components/     # UI components
│   ├── config/         # Firebase config
│   ├── hooks/          # Custom hooks
│   ├── layout/         # Layout and page wrappers
│   ├── redux/          # Redux store and slices
│   ├── utils/          # Constants and helpers
│   ├── app.jsx         # App root
│   └── global.css      # Tailwind and global styles
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

---

## 🛠️ Installation & Setup

1. **Clone the repository**

```bash
git clone https://github.com/taniyakamboj15/taskify_frontend.git
cd taskify_frontend
```

2. **Install dependencies**

```bash
npm install
```

3. **Firebase Configuration**

* Go to `src/config/firebase.js`
* Add your Firebase project credentials

4. **Start development server**

```bash
npm run dev
```

5. **Build for production**

```bash
npm run build
```

---

## 🌐 Deployment Guide

### ✅ Vercel Configuration

Ensure smooth routing:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

### ⚙️ Vite Config

```javascript
export default defineConfig({
  plugins: [react()],
  base: './',
});
```

---

## 🧑‍💻 Author

**Taniya Kamboj**
GitHub: [@taniyakamboj15](https://github.com/taniyakamboj15)

---

## 📄 License

**ISC License** – Feel free to use and adapt with credit.

---

## 🤝 Contributing

Pull requests are welcome! Fork the repo and suggest improvements.

---

> Crafted with ❤️ using React, Firebase, Tailwind, and Vite
