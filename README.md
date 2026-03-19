# Sonica-Svelte
Front-end web app for music education. Built on Svelte and SvelteKit!

Hand crafted music engraving engine using Bravura and the SMuFL spec.

## Developing

After editing your files, make sure to run `npm shake-smufl-meta` to re-generate the `data.ts`.

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```sh
docker build .
```

You can preview the production build with `docker compose up`.
