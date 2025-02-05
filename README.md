# Movie Flix 🎥  


Welcome to **Movie Flix**, a modern movie website designed to provide users with a seamless experience to explore and interact with movies. Built with **MongoDB** as the backend, **Firebase** for authentication, and **React** for the frontend, this project showcases a robust and scalable architecture.  

🔗 **Live Site URL** - https://asm-movieflix-369.surge.sh/

---

## ✨ Features  
1. **CRUD Operations**:  
   - Users can create, read, update, and delete movies effortlessly through an intuitive interface.  

2. **Firebase Authentication**:  
   - Secure and reliable user authentication using Firebase for login and signup functionality.  

3. **Top-Rated Movies Display**:  
   - Home page highlights the highest-rated movies fetched dynamically from the backend.  

4. **Dark/Light Mode Toggle**:  
   - Theme switcher powered by DaisyUI for personalized user experience.  

5. **Responsive Design**:  
   - Fully optimized for all devices, from desktops to mobile phones.  

---

## 🛠️ Technologies Used  
- **Frontend**: React.js, Tailwind CSS, DaisyUI  
- **Backend**: Node.js, Express.js, MongoDB  
- **Authentication**: Firebase Authentication  

---

## 🏁 Guideline to Run Project in Local Machine:

### Installation
Run `npm install` to install project dependencies.

### Environment setup
Create a `.env` file and put your environment variable there. Save the following variables:
- `VITE_apiKey`
- `VITE_authDomain`
- `VITE_projectId`
- `VITE_storageBucket`
- `VITE_messagingSenderId`
- `VITE_appId`

### Usage
Run `npm run dev` to run the project locally.

---

### Dependencies
```json
"dependencies": {
  "@emotion/react": "^11.14.0",
  "@emotion/styled": "^11.14.0",
  "@fortawesome/free-regular-svg-icons": "^6.7.2",
  "@mui/icons-material": "^6.3.1",
  "@mui/material": "^6.3.1",
  "@radix-ui/react-dialog": "^1.1.4",
  "@radix-ui/react-icons": "^1.3.2",
  "@radix-ui/react-popover": "1.1.4",
  "axios": "^1.7.9",
  "date-fns": "^4.1.0",
  "firebase": "^11.1.0",
  "localforage": "^1.10.0",
  "match-sorter": "^8.0.0",
  "react": "^18.3.1",
  "react-countdown": "^2.3.6",
  "react-countdown-circle-timer": "^3.2.1",
  "react-datepicker": "^7.5.0",
  "react-dom": "^18.3.1",
  "react-helmet": "^6.1.0",
  "react-icons": "^5.4.0",
  "react-router-dom": "^7.1.0",
  "react-timer-hook": "^3.0.8",
  "react-toastify": "^11.0.2",
  "sort-by": "^1.2.0",
  "sweetalert2": "^11.15.3",
  "swiper": "^11.1.15"
},
"devDependencies": {
  "@eslint/js": "^9.17.0",
  "@types/react": "^18.3.17",
  "@types/react-dom": "^18.3.5",
  "@vitejs/plugin-react": "^4.3.4",
  "autoprefixer": "^10.4.20",
  "daisyui": "^4.12.22",
  "eslint": "^9.17.0",
  "eslint-plugin-react": "^7.37.2",
  "eslint-plugin-react-hooks": "^5.0.0",
  "eslint-plugin-react-refresh": "^0.4.16",
  "globals": "^15.13.0",
  "postcss": "^8.4.49",
  "tailwindcss": "^3.4.17",
  "vite": "^6.0.3"
}


