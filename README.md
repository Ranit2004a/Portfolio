# Ranit Mondal • Developer Portfolio

A premium, interactive developer portfolio showcasing a full-stack technical ecosystem, professional milestone timelines, academic research publications, and interactive credentials.

**Live Project Image Bezels** • **Custom Bubble Physics Cloud** • **FormSubmit AJAX Messaging**

---

## 🚀 Key Features & Sections

### 1. Interactive Tech Ecosystem (Skills)
* Features a high-end, responsive **Sinusoidal Floating Bubble Physics Engine** built on Framer Motion. 
* Interactive bubbles react dynamically to real-time mouse cursor repulsion with orbital dashed trajectories.
* Side-by-side split grid presenting fully categorized skill indices:
  * **Languages**: Python, C++, Java, JavaScript
  * **Frontend**: React.js, HTML5, CSS3, Tailwind CSS
  * **Backend**: Node.js, Express.js, Flask, REST APIs, Microservices
  * **Databases**: MongoDB, MySQL, SQLite
  * **Cloud & DevOps**: AWS (EC2, ECS, ECR, Lambda, S3), Docker, Kubernetes, Terraform, GitHub Actions
  * **Tools**: Git, GitHub, Postman
  * **ML & Data**: TensorFlow, PyTorch, Scikit-learn, Pandas, NumPy, OpenCV

### 2. Selected Works (Projects)
* Grid showcasing projects framed inside widescreen 16:9 glassmorphic browser bezels (`collab-coding` and `resume-intelligence`).
* Supports contained scaling (`object-contain`) and top-aligned crops (`object-top`) to prevent website headers from cutting off.
* Smooth Spring-animated details modals with direct links to active GitHub repository codebases:
  * **Real-Time Collaborative Coding**: Synchronized multi-user coding platform built on React, Yjs, Node, and Docker.
  * **GenAI Resume Intelligence**: AI-powered ATS resume matching and preparation powered by Google Gemini API.

### 3. Academic Publications
* Custom featured card showcasing the accepted research paper: **"Advancing Lung Cancer Diagnosis and Prognosis"** (Accepted at **CICBA-2024**, Paper ID: 203).
* Focused on machine learning-based prediction and prognosis analysis for early detection.
* Direct action buttons to read the published chapter on **Springer** and inquire about the research.

### 4. Professional Credentials (Certifications)
* Sleek glassmorphic credential display containing:
  * **NVIDIA GenAI Practice Certification**: Hands-on generative model deployment, prompt engineering, and LLM workflows.
  * **IIT Bombay Spoken Tutorial Certifications**: National level examinations passed in HTML5, Java, Python, Drupal, and RDBMS.

### 5. Seamless Contact Integration
* Functional stateful contact form forwarding messages directly to `ranitmondal197@gmail.com` via silent FormSubmit.co AJAX.
* Animations transition inputs into a glassmorphic success badge containing a spring-based SVG self-drawing checkmark, preventing double-submits.

---

## 🛠️ Technology Stack

* **Core Framework**: React 19 (TypeScript) + Vite
* **Animations**: Framer Motion 12 + GSAP (ScrollTrigger)
* **Smooth Scrolling**: Lenis Scroll Engine
* **Styling**: Tailwind CSS + PostCSS
* **Icons**: Lucide React + React Icons

---

## 📥 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
# Install package dependencies
npm install
```

### 2. Development
Run the local Vite development server:
```bash
npm run dev
```

### 3. Production Build
Compile and bundle CSS/JS assets for production:
```bash
npm run build
```

---

## 📤 Customization & Deployment

### Updating the Resume (CV)
Simply overwrite the PDF file located in the public directory: `public/cv.pdf`. The "Download CV" link in the Hero section is dynamically mapped to this asset.

### Project Screenshot Bezels
To add screenshots for your projects, place your image files in the public directory (`public/collab-coding.png` and `public/resume-intelligence.png`). Widescreen aspect-video sizing handles the rest automatically!
