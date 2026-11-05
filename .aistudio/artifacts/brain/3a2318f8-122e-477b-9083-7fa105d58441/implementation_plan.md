# Implementation Plan: 3-Project Showcase & Minimal Problem/Solution Format

Remove the Teachable Machine project and trim verbose descriptions down to a clean, high-impact format focused strictly on **What was the Problem** and **How it Solves it**, arranged in an elegant 3-column grid.

---

## 1. User Decisions & Design Direction (Phase 1 Synthesis)

* **Curated 3 Projects Showcase**:
  1. **ZestFit: AI Health & Gym Management SaaS** (Full-Stack SaaS — Next.js, FastAPI, PostgreSQL, Stripe)
  2. **MediScan AI: Document Q&A & Clinical Intelligence** (Document AI — OCR, LLM, FastAPI, React)
  3. **Executive BI & Ecommerce Sales Intelligence Dashboard** (Data Analytics — Python, Pandas, Power BI / Recharts, SQL)
* **Removed**:
  * Completely remove `teachable-machine-vision` project item and its classifier component from the featured section.
* **Layout Structure**:
  * Balanced 3-column grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7`) allowing viewers to inspect all 3 solutions side-by-side.
* **Streamlined Card Format (Problem + Solution + Tech Tags)**:
  * Remove long feature bullet lists, extra filler text, and heavy paragraphs.
  * Keep only:
    - **Title & Category**: Clear editorial title with status badge (`Live App` / `Live Demo`).
    - **Problem**: 1 clear, punchy sentence explaining the business pain point.
    - **Solution**: 1 clear sentence explaining how the application solves it.
    - **Tech Tags**: Clean unboxed technology stack with separator dots (`·`).
    - **Action Buttons**: `Live Demo`, `Code`, and `Case Study`.

---

## 2. Technical Architecture & Component Flow

```
┌──────────────────────────────────────────────────────────────────────────────┐
│                    Muhammad Anas Khan (Berghan Font Hero)                    │
│             "I Help Businesses Turn Data Into AI Solutions"                  │
└──────────────────────────────────────┬───────────────────────────────────────┘
                                       │
┌──────────────────────────────────────▼───────────────────────────────────────┐
│        Featured Projects Section: Balanced 3-Column Responsive Grid          │
│                                                                              │
│ ┌─────────────────────────┐ ┌─────────────────────────┐ ┌──────────────────┐ │
│ │ 01. ZestFit SaaS        │ │ 02. MediScan AI         │ │ 03. Executive BI │ │
│ │ Next.js & FastAPI       │ │ OCR & LLMs              │ │ Python & Pandas  │ │
│ │                         │ │                         │ │                  │ │
│ │ Problem: Fragmented     │ │ Problem: Manual medical │ │ Problem: Raw     │ │
│ │ gym tools & manual logs │ │ report review is slow   │ │ transactions hide│ │
│ │                         │ │                         │ │ retention trends │ │
│ │ Solution: Multi-tenant  │ │ Solution: OCR biomarker │ │ Solution: Instant│ │
│ │ SaaS with AI routines   │ │ parsing & document Q&A  │ │ KPI curves & RFM │ │
│ │                         │ │                         │ │ customer cohorts │ │
│ │ Stack: Next.js · Stripe │ │ Stack: Python · LLMs    │ │ Stack: SQL · BI  │ │
│ │ [Live Demo] [Code]      │ │ [Live Demo] [Code]      │ │ [Live Demo][Code]│ │
│ └─────────────────────────┘ └─────────────────────────┘ └──────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Step-by-Step Implementation Roadmap

### Step 1: Update Project Data Schema (`src/data/projectsData.ts`)
* Remove `teachable-machine-vision` from `FEATURED_PROJECTS`.
* Retain the 3 core projects: `zestfit-saas`, `mediscan-document-qa`, and `ecommerce-bi-dashboard`.
* Streamline `problem` and `solution` fields into crisp, punchy sentences.

### Step 2: Redesign Projects Grid & Card Layout (`src/components/ProjectsSection.tsx`)
* Change grid container to 3-column layout: `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7`.
* Strip out large filler bullet point lists and unnecessary text layers.
* Render clean:
  - **Header preview**: Compact workspace metrics for ZestFit, clinical extraction preview for MediScan AI, and KPI metrics for Ecommerce BI.
  - **Problem & Solution box**:
    - `Problem`: What friction existed.
    - `Solution`: How this AI/Data solution solves it.
  - **Stack**: Single-line tech badges with `·` separators.
  - **Direct links**: Live Demo, GitHub, and Case Study.

### Step 3: Sync Chatbot System Instructions (`src/App.tsx`)
* Update chatbot knowledge base from 4 projects to the 3 featured projects.

### Step 4: Verification & Build Inspection
* Run `lint_applet` (`tsc --noEmit`) to verify strict type safety.
* Run `compile_applet` to test production Vite build.
* Verify clean responsive layout across desktop, tablet, and mobile.
