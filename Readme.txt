OT-Exam Scheduler 
=================================

Overview
--------
OT-Exam Scheduler is a web application that allows students at Ontario Tech University 
to search for exam information by course or CRN, save exams, and view them in a calendar. 
It includes features such as a dynamic search table, responsive mobile layout, and 
Google Calendar integration.

This project demonstrates all core concepts from the course, including:

- HTML, SVG (with responsive design)
- CSS and CSS frameworks(Tailwind)
- JavaScript, jQuery, and D3
- Dynamic DOM manipulation
- AJAX and web service communication
- Node.js with Express for the backend
- Vue for the client-side framework
- Cheerios and Puppeteer (New Technology)
- Google calendar integration (New Technology)

How to Run the Application
--------------------------
To run the project locally, follow these steps. You will need to open **two terminals**.

### 1. Backend Setup (Terminal 1)

Navigate to the backend folder and run:

    cd Backend
    npm install
    node server.js

This will start the backend server on and you will see this message:
Scraping exam data...
Server running on http://localhost:8080
Successfully Scraped 881 Exams

### 2. Frontend Setup (Terminal 2)

In a separate terminal window, navigate to the frontend folder and run:

    cd Frontend
    npm install
    npm run dev

This will start the frontend client on:
http://localhost:5173 

Important Notes
---------------
- The backend uses Puppeteer to scrape live exam data.
- The Google Calendar feature opens a new tab with prefilled exam details. If not logged in will give you the option to log in.

Files Included
--------------
- group_members.html – Table of team members and Banner IDs
- contributions.txt – Description of each team member’s contributions
- readme.txt – This file with setup instructions
- intro.mp4 – A 3–5 minute video demo of the application
- ai-prompts.txt – Prompts used during development

Contact
-------
Group Members:

Yousaf Jan - 100865968
Sabaoon Mohammad Jamil  - 100878523 
Yoosuf Mohamed Kamal - 100876499
Rahil Haque - 100869542
Aakash Harendran - 100867839
Abdul Wasay Aamir - 100874520
"""