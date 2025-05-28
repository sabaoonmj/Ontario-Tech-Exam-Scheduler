# 🌐 OT-Exam Scheduler

> A web application for Ontario Tech University students to search, save, and manage exam schedules with calendar integration.
---

## 📋 Table of Contents
- [🔍 Overview](#-overview)
- [✨ Features](#-features)
- [🚀 Live Demo](#-live-demo)
- [⚙️ Installation](#️-installation)
- [🧪 Usage](#-usage)
- [🛠 Technologies Used](#-technologies-used)
- [🤝 Contributing](#-contributing)
- [📬 Contact](#-contact)
---

## 🔍 Overview
**OT-Exam Scheduler** is a responsive and feature-rich web application built for **Ontario Tech University** students.  

It enables users to:
- 🔍 Search for exam schedules by **course name** or **CRN**
- ⭐ Save selected exams for quick access
- 📆 Export exam schedules to **Google Calendar**
- 📱 Use the app seamlessly on desktop and mobile devices
---

## ✨ Features
- 🔍 **Dynamic Search Table**: Quickly filter exams by course or CRN
- 📱 **Responsive Design**: Works on desktops, tablets, and mobile devices
- 📆 **Google Calendar Integration**: Export saved exams directly to Google Calendar
- 🕷️ **Live Exam Data Scraping**: Uses Puppeteer to fetch real-time exam data
- 💬 **Interactive Frontend**: Built with Vue.js, Tailwind CSS, and D3.js
- 🌐 **Backend with Node.js & Express**: Efficient data handling and web services
---

## 🚀 Live Demo
👉 [View Live Demo](https://github.com/user-attachments/assets/e80cb36d-bf93-483f-a0f4-a702986a05d5)

---

## ⚙️ Installation

### Prerequisites
- Node.js (v16+ recommended)
- npm (Node Package Manager)
- A modern web browser (e.g., Chrome, Firefox)
- Optional: Google account for calendar integration

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/OT-Exam-Scheduler.git
```
```bash
cd OT-Exam-Scheduler
```

### 2️⃣ Backend Setup (Terminal 1)
1. Navigate to the Backend folder:
```bash
cd Backend
```
2. Install dependencies:
```bash
npm install
```
3. Start the backend server:
```bash
node server.js
```
4. You should see: 
```arduino
Scraping exam data...
Server running on http://localhost:8080
Successfully Scraped 881 Exams
```
### 3️⃣ Frontend Setup (Terminal 2)
1. Open a new terminal window/tab and navigate to the Frontend folder:
```bash
cd Frontend
```
2. Install dependencies:
```bash
npm install
```
3. Start the frontend development server:
```bash
npm run dev
```
4. Open your browser and navigate to:
```bash
http://localhost:5173
```
5. 🎉 Now you’re ready to use the OT-Exam Scheduler!
---

## 🧪 Usage
Once the backend and frontend are running:
1. Open your browser and navigate to `http://localhost:5173`.
2. Use the search bar to look up exams by **Course Code** or **CRN**.
3. Click the **Save** button next to any exam to add it to your personal calendar view.
4. Click **Export to Google Calendar** to add saved exams to your Google Calendar.
5. Enjoy the responsive layout whether on desktop, tablet, or mobile!

> **Note:** Google Calendar export requires logging into your Google account if not already authenticated.
---

## 🛠 Technologies Used
- **Frontend**:  
  - Vue.js (Client-side framework)  
  - Tailwind CSS (Styling)  
  - jQuery, D3.js (Interactive and dynamic content)  
- **Backend**:  
  - Node.js, Express.js (Web server and API)  
- **Web Scraping**:  
  - Puppeteer (Automated scraping of live exam data)  
  - Cheerio (HTML parsing and manipulation)  
- **Integration**:  
  - Google Calendar API (New technology)  
- **Other**:  
  - HTML5, CSS3, JavaScript, AJAX  
  - Responsive design for mobile and desktop
---

## 🤝 Contributing
We welcome contributions! To contribute:
1. Fork this repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature`).
5. Open a pull request.

> For major changes, please open an issue first to discuss your proposed modifications.
---

## 📬 Contact
**Group Members**:
- Yousaf Jan  
- Sabaoon Mohammad Jamil 
- Yoosuf Mohamed Kamal
- Rahil Haque 
- Aakash Harendran
- Abdul Wasay Aamir

Feel free to reach out if you have any questions or suggestions!
---
