# Demo Video

Watch the project demonstration here:

- YouTube: https://www.youtube.com/watch?v=wh5OwXCDl9o

---

# ecoBreathe — Smart Air Purification & AQI Monitoring System

ecoBreathe is an IoT-based smart air purification and monitoring system designed to make air quality awareness more accessible, practical, and actionable. The project combines real-time air quality monitoring, intelligent filtration insights, and a live web dashboard to help users understand environmental conditions and respond more effectively to poor air quality.

## Why this project matters

Air pollution continues to affect health, comfort, and productivity in homes, offices, and public spaces. ecoBreathe was developed to bridge the gap between environmental data and everyday decision-making by turning complex air quality information into a clear, real-time experience that users can understand and act on.

---

## STAR Summary: Situation, Task, Action, Result

### Situation

Air quality is a growing global concern, especially in urban areas where pollution levels can change quickly and unpredictably. Many people do not have access to reliable, real-time information about their surroundings, which makes it difficult to know when the air becomes unsafe or when protective action is needed.

### Task

The goal was to design and build a smart system that could:

- monitor air quality in real time,
- provide live AQI tracking,
- support intelligent air purification awareness,
- and present the data through an interactive dashboard.

The project also aimed to strengthen practical experience in IoT, embedded systems, database integration, and full-stack development while solving a real-world environmental challenge.

### Action

I developed ecoBreathe as a full-stack solution that connects sensing, data storage, and an intuitive user interface. The work included:

- Designing an IoT-based monitoring concept centered around ESP32 for connectivity and data handling.
- Integrating environmental sensing capabilities to capture air quality-related parameters and support real-time monitoring.
- Building a backend with Node.js and Express to process and manage data efficiently.
- Using MongoDB to store and retrieve monitoring data for future analysis.
- Creating a React-based dashboard for live AQI visualization, status monitoring, and a clean user experience.
- Focusing on making air quality information easier to interpret and more useful for everyday users.

### Result

The outcome is a functional smart air monitoring and purification platform that demonstrates how IoT, software, and data visualization can be combined to address an important real-world problem. This project significantly strengthened my skills in:

- IoT and embedded system development,
- ESP32-based application concepts,
- MongoDB-based data management,
- React and frontend development,
- full-stack development,
- and hands-on problem solving for environmental technology.

---

## Project Overview

ecoBreathe is more than just an air quality app. It is a connected environmental solution that brings together hardware-oriented monitoring concepts and modern web technologies to deliver a live experience for tracking air conditions and understanding air quality in a meaningful way.

The platform is designed to help users:

- monitor AQI in real time,
- understand pollution trends,
- access live air quality insights,
- and gain awareness about environmental conditions that affect health and comfort.

---

## Key Features

- Real-time AQI tracking and live dashboard monitoring
- Smart air purification and environmental awareness workflow
- Responsive web interface for desktop and mobile users
- Data persistence and management through MongoDB
- Interactive dashboard for visualizing air quality information
- Scalable architecture for future enhancements such as alerts, predictive analysis, and automation

---

## Technology Stack

### Frontend
- React
- Vite
- Tailwind CSS
- React Router
- Recharts
- Framer Motion

### Backend
- Node.js
- Express
- MongoDB
- Mongoose
- JWT-based authentication support

### IoT / Embedded Focus
- ESP32-based development concept
- Sensor-driven air monitoring integration

---

## Architecture Summary

The system is structured around three core layers:

1. Data Collection Layer
   - Sensor-based air quality monitoring and IoT communication

2. Backend Layer
   - API services, authentication, and database integration

3. Frontend Layer
   - Live dashboard, AQI visualization, and user interaction

This modular architecture makes the project easier to expand with features such as real-time alerts, automation, and advanced analytics.

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js 18+
- npm
- MongoDB instance or MongoDB Atlas connection

### Installation

```bash
git clone <your-repository-url>
cd ecoBreathe
npm install
cd server
npm install
```

### Environment Setup

Create a `.env` file inside the `server` folder and configure your MongoDB connection:

```env
MONGO_URL=your_mongodb_connection_string
```

### Run the Project

From the root directory:

```bash
npm run dev
```

This will start the frontend and server together for local development.

---

## Future Scope

The current version establishes a strong foundation for a smarter environmental monitoring solution. Future improvements could include:

- automatic purifier control based on AQI thresholds,
- AI-based air quality prediction,
- push notifications and alerts,
- mobile app support,
- and deeper analytics for indoor and outdoor air quality trends.

---

## Final Reflection

This project was a meaningful learning experience that combined technology, sustainability, and real-world problem solving. It helped strengthen both technical skills and the ability to build solutions that can positively impact everyday life.
