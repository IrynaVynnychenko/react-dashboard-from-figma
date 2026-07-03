# React Dashboard from Figma

Modern React dashboard with components and analytics, created based on a Figma design.

## Technologies

- **React** `18.2.0` - UI library
- **Tailwind CSS** `3.3.5` - CSS framework for styling
- **Vite** `4.5.0` - fast build tool and dev server
- **Recharts** `3.2.1` - charts and graphs library
- **Lucide React** `0.294.0` - icons
- **ESLint** - code linter

## Installation and Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## GitHub Pages

The site deploys automatically on every push to `main` via [GitHub Actions](.github/workflows/deploy.yml).

**One-time setup** in the repo on GitHub: **Settings → Pages → Build and deployment → Source → GitHub Actions**.

Live site: `https://irynavynnychenko.github.io/react-dashboard-from-figma/`

## Project Structure

```
src/
├── components/     # React components
├── data/           # Shared mock data & search index
├── pages/          # Pages
└── App.jsx         # Main component
```
