
# 🎒 FindNITT - Lost & Found Hub | NIT Trichy

A centralized platform designed to streamline the **lost & found** process for students at **NIT Trichy**, replacing cluttered WhatsApp groups with a structured, secure, and user-friendly web application.

## 🌐 Live Prototype
* **Figma Design:** https://lostfoundnitt.netlify.app/
* **Figma Design:** [View Design](https://www.figma.com/design/5ZnwVWdP4aX8dSxWHXHS1j/TC_SOFTWARE_TASK?node-id=0-1&t=GONP7c7e3uxxXvMm-1)
* **Figma Prototype:** [View Prototype](https://www.figma.com/proto/5ZnwVWdP4aX8dSxWHXHS1j/TC_SOFTWARE_TASK?page-id=0%3A1&node-id=5-3&p=f&viewport=-39%2C197%2C0.32&t=H6HeVEKFxs91cObd-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=5%3A3)

---

## 🚀 Features

* 📥 **Post Lost or Found Items**
  Submit details such as title, description, image, date, time, and location.

* 🔐 **Security Question for Claims**
  Found item posters can set a question only the real owner would know, preventing false claims.

* 👤 **Light Login**
  Users log in using their **Roll Number, Department, and Year** — no formal authentication needed.

* ⚡ **Real-Time Updates**
  Firebase enables immediate syncing of lost/found posts across all users.

* 🔍 **Search & Filter**
  Easily search items by keyword, category, or date for quicker retrieval.

* 🧠 **Ownership Verification**
  Basic validation through security questions ensures legitimate claims.

---

## 🛠 Tech Stack

| Frontend | Backend            | Database           | Hosting          |
| -------- | ------------------ | ------------------ | ---------------- |
| React.js | Firebase Functions | Firebase Firestore | Firebase Hosting |

---

## 📦 Installation Guide

### 1. Clone the repository

```bash
git clone https://github.com/KKN-mkk/lost-and-found-nitt
```

### 2. Install dependencies

```bash
npm install
```

### 3. Firebase Configuration

Create a Firebase project and replace the config in your `firebaseConfig.js` file:

```js
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT_ID.appspot.com",
  messagingSenderId: "XXXXXX",
  appId: "XXXXXX"
};
```

### 4. Run the app locally

```bash
npm start
```

---

## 📌 Future Enhancements

* ✅ **Image Upload via Firebase Storage**
* ✅ **Advanced Filters by Category/Tags**
* 🔒 **OTP-based or LDAP Authentication (optional)**
* 📲 **PWA or Mobile App Version**
* 📧 **Email Notification System**

---


## 👨‍💻 Developed By

**Manasa K Krishnan**
Sophomore @ NIT Trichy

