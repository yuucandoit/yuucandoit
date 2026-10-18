# Wahyu Sanjaya - Engineering Portfolio & Technical Case-Notes

A focused, utilitarian engineering portfolio for Wahyu Sanjaya (Software Engineer & Quality Assurance Engineer). Built with pure HTML5, Tailwind CSS utility styling, and vanilla JavaScript, adhering strictly to anti-slop design principles and 100% grounded facts from official CV credentials.

## Overview

- **Engineer**: Wahyu Sanjaya
- **Role**: Software Engineer / Quality Assurance Engineer
- **Current Position**: PT Solusi Intek Indonesia (May 2022 - Present)
- **Location**: Jakarta, Indonesia
- **Education**: B.Sc. in Informatics Engineering, Universitas Indraprasta PGRI
- **Contact**: wahyusnjy@gmail.com
- **Profiles**: [GitHub](https://github.com/wahyusnjy) | [LinkedIn](https://linkedin.com/in/wahyu-sanjaya-a747ba223) | [Portfolio Site](https://wahyusnjy.github.io)

## Technical Capabilities

- **Back-End Engineering**: PHP (Laravel), Go, Python (FastAPI), RESTful API design.
- **Front-End & Mobile**: Vue.js, Angular, Ionic Framework, Tailwind CSS, Vanilla JS.
- **Database & Storage**: PostgreSQL, MySQL, query optimization, data integrity constraints.
- **Infrastructure & Deployment**: Nginx (Reverse Proxy), Docker, Git, Linux server administration.
- **QA & Testing Automation**: Postman, ADB, scrcpy, functional testing workflows.

## Featured Projects (Documented Case-Notes)

### 1. Finansia
- **Domain**: Personal Financial Management Architecture
- **Timeline**: January 2025 - Present
- **Stack**: PHP (Laravel), MySQL, Tailwind CSS, Chart.js
- **Summary**: Financial tracking platform featuring income/expense analytics, budget threshold monitoring, and transactional auditing with real application screenshot evidence.

### 2. E-Procurement Platform (v2.3.6)
- **Domain**: Enterprise Bidding & Multi-Vendor Supply Chain System
- **Timeline**: April 2025
- **Stack**: PHP (Laravel), PostgreSQL, Tailwind CSS, Docker
- **Summary**: Corporate procurement system designed for transparent vendor bidding, automated stage validations, and concurrent evaluation integrity.

## Design Architecture & Anti-Slop Principles

This codebase is engineered to reject generic AI-generated aesthetics and marketing fluff:
- **No Banned AI Buzzwords**: Free from terms like "seamless", "robust", "revolutionary", or "cutting-edge".
- **Zero Em/En Dash Policy**: Uses clear hyphens, commas, colons, or slashes to prevent typography artifacts.
- **Utilitarian Engineering Palette**: Soft Dark (`#0f1115`) default with warm light mode toggle (`#f3f2ee`), zero pure black (`#000000`) or pure white (`#ffffff`).
- **WCAG AA Compliance**: High-contrast ratios verified across all interactive controls and text elements.
- **Grounded Verification**: All credentials, job histories, and project metrics are extracted directly from `cv/Resume.pdf`.

## Project Structure

```
├── index.html          # Semantic HTML5 layout and accessibility markup
├── styles.css          # Design tokens, typography, and contrast rules
├── app.js              # State machine, project filtering, and modal handlers
├── cv/
│   └── Resume.pdf      # Single source of truth credentials document
├── photo-profile/
│   └── me.jpeg         # Authentic engineer portrait
├── app-ss/
│   ├── finansia.png    # Application evidence for Finansia
│   └── eprocurement.png# Application evidence for E-Procurement Platform
├── .gitignore          # Repository ignore rules (excludes internal Rule/ guides)
└── README.md           # Engineering documentation
```

## Running Locally

Because this project requires no compiler or heavy build tools, you can serve it with any local HTTP server:

Using Python 3:
```bash
python3 -m http.server 8000
```

Using Node.js (`npx serve`):
```bash
npx serve .
```

Then visit `http://localhost:8000` in your browser.

