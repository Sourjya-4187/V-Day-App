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
├── vite.config.js   # Base path set for GitHub Pages
└── README.md
```

## Local development

```bash
npm install
npm run dev
```

Dev server: http://localhost:5173

Preview production build locally:

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

### 1. Set the base path

In `vite.config.js`, set `base` to **your repo name** with leading and trailing slashes:

- Repo `V-Day-App` → site at `https://<user>.github.io/V-Day-App/` → `base: '/V-Day-App/'`
- Repo `my-valentine` → `base: '/my-valentine/'`
- User/org site at `https://<user>.github.io/` → `base: '/'`

### 2. Deploy (three steps)

```bash
npm install
npm run build
npm run deploy
```

`npm run deploy` uses **gh-pages** to push the `dist/` folder to the `gh-pages` branch.

### 3. Turn on GitHub Pages

1. Open your repo on GitHub → **Settings** → **Pages**.
2. Under **Build and deployment** → **Source**, choose **Deploy from a branch**.
3. **Branch**: select `gh-pages` and **/ (root)**.
4. Save. After a minute, the app will be at `https://<username>.github.io/<repo-name>/`.

### If the app doesn’t load correctly

- **Blank or 404:** Check that `base` in `vite.config.js` matches your repo name (e.g. `'/V-Day-App/'` for repo `V-Day-App`).
- After changing `base`, run `npm run build` and `npm run deploy` again.

## License

MIT
