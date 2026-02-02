# Will You Be My Valentine 💖

A small React web app built with Vite. Mobile-first, responsive, and ready to deploy on GitHub Pages.

## Tech stack

- **Vite** – build tool
- **React 18** – UI (JavaScript, no TypeScript)
- **Plain CSS** – no Tailwind or external UI libraries

## Project structure

```
V-Day-App/
├── public/
├── src/
│   ├── App.jsx      # Main app component
│   ├── main.jsx     # Entry point
│   └── index.css    # Global styles (mobile-first)
├── index.html
├── package.json
├── vite.config.js   # Configured for GitHub Pages base path
└── README.md
```

## Local development

```bash
# Install dependencies
npm install

# Start dev server (http://localhost:5173)
npm run dev

# Preview production build locally
npm run build && npm run preview
```

## Deploy to GitHub Pages

### 1. Set the correct base path

In `vite.config.js`, set `base` to your repo name with leading and trailing slashes:

```js
base: '/V-Day-App/',   // Use your actual repo name
```

If your site will live at `https://username.github.io/V-Day-App/`, the base is `'/V-Day-App/'`.  
If it will be at `https://username.github.io/` (user/org site), use `base: '/'`.

### 2. Build

```bash
npm run build
```

Output goes to the `dist/` folder.

### 3. Deploy the `dist` folder

**Option A – GitHub Actions (recommended)**

1. Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: true

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

2. In the repo: **Settings → Pages → Build and deployment → Source**: choose **GitHub Actions**.
3. Push to `main`; the workflow will build and deploy.

**Option B – Manual deploy**

1. In repo **Settings → Pages**, set source to **Deploy from a branch**.
2. Choose the branch that contains `dist/` (e.g. `main` or `gh-pages`) and `/ (root)` or `/docs` if you put `dist` in `docs`.
3. Commit the contents of `dist/` (e.g. copy `dist` into `docs` and commit, then set Pages to deploy from `docs`).

### 4. After first deploy

- Wait a minute, then open `https://<username>.github.io/<repo-name>/`.
- If assets 404, double-check `base` in `vite.config.js` matches your repo (and that you rebuilt after changing it).

## License

MIT
