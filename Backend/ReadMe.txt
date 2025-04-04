├── routes/          # Defines API endpoints
│   ├── exams.js     # Routes for exams API
│   ├── study.js     # Routes for study spots API
│   ├── users.js     # Routes for user authentication (if needed)
│
├── controllers/     # Business logic for API requests
│   ├── examsController.js
│   ├── studyController.js
│   ├── usersController.js
│
├── models/          # Database models/schema
│   ├── Exam.js
│   ├── StudySpot.js
│   ├── User.js
│
├── services/        # Helper functions (e.g., database queries, APIs)
│   ├── examService.js
│   ├── studyService.js
│
├── middleware/      # Authentication, logging, error handling
│   ├── authMiddleware.js
│   ├── errorHandler.js
│
├── config/          # Environment variables, database config
│   ├── db.js        # PostgreSQL/Firebase setup
│   ├── dotenv.js    # Loads `.env` file
│
├── app.js           # Express app setup
├── server.js        # Main server entry point
