# Kael's Birthday Greeting

A simple React + Vite single-page app built to celebrate Kael's birthday.

## Local development

From the project folder:

```bash
npm install
npm run dev
```

Then open the local URL displayed by Vite, usually `http://localhost:5173`.

## Production build

To verify the production bundle:

```bash
npm run build
```

If the command succeeds, the production-ready files are generated in `dist/`.

## Deploy to Vercel

### Option A: GitHub + Vercel

1. Create a GitHub repository and push the project.
2. Sign in to [Vercel](https://vercel.com).
3. Click `New Project` and import your GitHub repo.
4. Accept the default settings for framework detection. Vercel should detect React / Vite automatically.
5. Deploy and open the live site.

### Option B: Vercel CLI

From the project folder:

```bash
npm install -g vercel
vercel
```

Follow the prompts to link or create a project. Use `vercel --prod` to deploy the production site.

## Project files

- `src/App.jsx` — birthday greeting page content
- `src/App.css` — custom celebration styling
- `src/index.css` — global page styles
- `index.html` — page title and app shell
- `package.json` — scripts and dependencies

## Notes

- The page is built with React and client-side rendering.
- No backend is required.
- After deployment, share the Vercel URL to show Kael the greeting.
