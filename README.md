# DNAAnalyzer

### Unified Genomic Data Analysis & Interpretation.

---

## 🚀 Overview

**DNAAnalyzer** is a high-performance, industry-standard landing page for a cutting-edge Genomic SaaS platform. It is designed to bridge the gap between complex bioinformatic data and clinical interpretation, providing researchers and physicians with a unified, browser-based environment for genetic analysis.

### The Problem It Solves
Genomic analysis is traditionally fragmented, requiring multiple disconnected tools, command-line expertise, and significant manual curation. DNAAnalyzer consolidates these workflows into a single, intuitive interface.

### Who It Is For
- **Clinical Researchers**: To automate variant curation and cohort analysis.
- **Geneticists**: To simulate mutations and predict pathogenicity in real-time.
- **Bioinformatics Students**: To learn genomic analysis through guided, interactive workflows.

---

## ✨ Key Features

- **🧠 AI-Powered Pathogenicity Simulation**: Instantly predict whether a variant is harmful or benign using cloud-accelerated neural networks.
- **📊 Unified Genomic Dashboard**: Visualize AI predictions, clinical data, and gene sequences in one structured UI.
- **💉 Clinical Validation (ClinVar Sync)**: Real-time comparison of simulated mutations against global clinical registries.
- **🧬 Gene Exploration**: Seamlessly search genes and navigate raw DNA sequences (GRCh38/hg38 supported).
- **☁️ Zero-Install Browser Access**: A powerful no-code environment accessible from any modern web browser.

---

## 🛠️ Tech Stack

- **Frontend**: [React 18](https://reactjs.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Routing**: [React Router Dom](https://reactrouter.com/)
- **Deployment**: [Vercel](https://vercel.com/)

---

## 🏗️ Architecture & System Flow

The project follows a modular, component-based React architecture optimized for scalability and performance:

1.  **Entry Point**: `main.jsx` initializes the React application and injects it into the DOM.
2.  **Routing Layer**: `app.jsx` manages the multi-page navigation system using `react-router-dom`.
3.  **UI Layer**: Atomic components located in `src/components` are assembled into functional pages in `src/pages`.
4.  **Simulation Engine**: Interactive logic (states and effects) handles real-time data modeling for pathogenicity scores.

---

## ⚙️ Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Steps
1.  **Clone the repository**:
    ```bash
    git clone <repository-url>
    cd dna-analyzer-landing
    ```
2.  **Install dependencies**:
    ```bash
    npm install
    ```
3.  **Run the development server**:
    ```bash
    npm run dev
    ```
4.  **Build for production**:
    ```bash
    npm run build
    ```

---

## 📂 Folder Structure

```text
├── public/                 # Static assets (favicons, manifest)
├── src/
│   ├── components/         # Reusable UI sections (Hero, Navigation, etc.)
│   ├── pages/              # Top-level page components
│   ├── app.jsx             # Main router configuration
│   ├── main.jsx            # Application entry point
│   └── index.css           # Global styles and Tailwind directives
├── pixel-perfect-capture/  # Internal utility tool for UI snapshots
├── tailwind.config.js      # Custom theme and design tokens
└── vercel.json             # Deployment configuration
```

---

## 💅 Refactoring & Professional Improvements

As part of the project evolution, the codebase was refactored to meet industry naming standards (kebab-case):

| Original Name | Refactored Name | Improvement Made |
| :--- | :--- | :--- |
| `src/components/CTA.jsx` | `src/components/call-to-action.jsx` | Clear, descriptive naming. |
| `src/components/Navigation.jsx` | `src/components/navigation-bar.jsx` | Component-specific naming. |
| `src/components/Hero.jsx` | `src/components/hero-section.jsx` | Section-based suffixing. |
| `src/pages/Auth.jsx` | `src/pages/authentication-page.jsx` | Avoided vague abbreviations. |
| `src/pages/Home.jsx` | `src/pages/home-page.jsx` | Consistent landing page naming. |
| `src/App.jsx` | `src/app.jsx` | Kebab-case filenames. |
| `pixel-perfect-capture-main/` | `pixel-perfect-capture/` | Removed ZIP branch artifacts. |

---

## 🛣️ Future Roadmap

- [ ] **Data Export**: Support for exporting reports in PDF and ACMG formats.
- [ ] **Multi-Genome Support**: Extend support to GRCh37 and non-human genomes.
- [ ] **User Accounts**: Persist analysis history via Supabase integration.
- [ ] **API Access**: Public REST API for high-throughput automated scoring.

---

## 📄 License

This project is licensed under the **MIT License**.
