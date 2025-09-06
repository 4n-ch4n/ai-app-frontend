# AngularAI

An advanced AI-powered assistant built with Angular 20+, featuring tools for orthography correction, pros & cons comparison, translation, text/audio conversion, and image generation. The project uses Tailwind CSS for modern styling and a modular component architecture.

## Features
- Orthography correction
- Pros & Cons comparison
- Streamed message mode
- Language translation
- Text-to-audio and audio-to-text conversion
- Image generation and editing
- Chat interface with AI and user message bubbles
- Sidebar navigation for quick tool access

## Technologies
- Angular 20+
- Tailwind CSS
- TypeScript

## Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- npm

### Installation
1. Clone the repository:
   
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the development server:
   ```sh
   npm start
   ```
   The app will be available at `http://localhost:4200`.

## Project Structure
```
angularGpt/
├── angular.json
├── package.json
├── src/
│   ├── index.html
│   ├── main.ts
│   ├── styles.css
│   ├── app/
│   │   ├── app.component.*
│   │   ├── core/
│   │   ├── interfaces/
│   │   ├── presentation/
│   │   │   ├── components/
│   │   │   ├── layouts/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   ├── template/
│   ├── environments/
```

- **components/**: Reusable UI elements (chat bubbles, text boxes, loaders)
- **layouts/**: Page layouts (dashboard, etc.)
- **pages/**: Feature pages (orthography, translation, image generation, etc.)
- **services/**: Business logic and API calls
- **interfaces/**: TypeScript interfaces
- **template/**: Chat templates

## Customization
- Modify styles in `src/styles.css` using Tailwind CSS utilities.
- Add new features by creating components in `src/app/presentation/components/` and pages in `src/app/presentation/pages/`.
