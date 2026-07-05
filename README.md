# 🚀 DevLaunch AI

**DevLaunch AI** is an AI-powered startup planning platform that helps entrepreneurs, students, and developers transform ideas into structured, launch-ready business plans within minutes.

🌐 **Live Demo:** https://devlaunch-ai-six.vercel.app/
👨‍💻 **Developer:** Rayyan Ahmad
📂 **GitHub:** https://github.com/rayyanahmadz/devlaunch_ai

---

## 📌 Overview

DevLaunch AI acts as a virtual startup consultant by generating comprehensive software startup plans based on a user's idea. Instead of receiving a simple text response, users get a complete roadmap covering business strategy, technical architecture, development planning, and launch recommendations.

The platform is designed for founders, freelancers, students, hackathon participants, and anyone looking to validate and plan a software startup efficiently.

---

## ✨ Features

* 🤖 AI-powered startup idea generation
* 📊 Detailed business roadmap
* 🛠️ Recommended technology stack
* 👥 Target audience analysis
* 💰 Revenue model suggestions
* 📅 Development timeline estimation
* 🎯 MVP feature planning
* 📈 Scaling strategy recommendations
* 🔐 Secure user authentication
* ☁️ Cloud database integration using Supabase
* ⚡ Fast deployment with Vercel

---

## 🛠️ Tech Stack

### Frontend

* React
* TypeScript
* Tailwind CSS
* Vite

### Backend

* Vercel Serverless Functions
* Google Gemini API

### Database

* Supabase
* PostgreSQL

### Authentication

* Supabase Auth

### Deployment

* Vercel

---

## 📸 Screenshots

Add screenshots of your application here.

Example:

```text
assets/
├── home.png
├── dashboard.png
├── generator.png
└── roadmap.png
```

Then include them like:

```md
![Home](assets/home.png)
```

---

## 🚀 Getting Started

### Clone the repository

```bash
git clone https://github.com/rayyanahmadz/devlaunch_ai.git
cd devlaunch_ai
```

### Install dependencies

```bash
npm install
```

### Configure environment variables

Create a `.env` file and add:

```env
GEMINI_API_KEY=YOUR_GEMINI_API_KEY

VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=YOUR_SUPABASE_SERVICE_ROLE_KEY

JWT_SECRET=YOUR_RANDOM_SECRET
```

### Start the development server

```bash
npm run dev
```

---

## 🗄️ Database Setup

1. Create a Supabase project.
2. Run the provided SQL schema.
3. Configure the environment variables.
4. Enable Email Authentication.
5. Connect the application to your Supabase project.

---

## 📁 Project Structure

```text
devlaunch_ai/
│
├── api/
├── src/
├── public/
├── components/
├── hooks/
├── lib/
├── supabase/
├── package.json
├── vercel.json
└── README.md
```

---

## 🔒 Environment Variables

| Variable                  | Description                           |
| ------------------------- | ------------------------------------- |
| GEMINI_API_KEY            | Google Gemini API Key                 |
| VITE_SUPABASE_URL         | Supabase Project URL                  |
| VITE_SUPABASE_ANON_KEY    | Public Supabase Key                   |
| SUPABASE_SERVICE_ROLE_KEY | Server-side Supabase Secret           |
| JWT_SECRET                | Secret used for authentication tokens |

---

## 🎯 Future Improvements

* Phone authentication
* Team collaboration
* Export roadmap to PDF
* Investor pitch deck generation
* Financial forecasting
* AI competitor analysis
* Multi-language support
* SaaS subscription plans
* Project sharing
* Analytics dashboard

---

## 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License.

---

## 🙌 Acknowledgements

* Google Gemini API
* Supabase
* Vercel
* React
* Tailwind CSS

---

⭐ If you found this project useful, consider giving it a **Star** on GitHub!
