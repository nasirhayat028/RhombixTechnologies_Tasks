# Jenkins CI Demo App

A small React (Vite) app used as the build/test target for the Jenkins pipeline in
[Project 2 — Jenkins CI](../README.md). See the parent README for the full write-up,
app preview, and Jenkins pipeline details.

## Stack

- [Vite](https://vite.dev) + [React](https://react.dev)
- [Vitest](https://vitest.dev) + [React Testing Library](https://testing-library.com/react)
- [Oxlint](https://oxc.rs) for linting

## Scripts

```bash
npm install
npm run dev         # start the dev server
npm run test        # run the test suite once
npm run test:watch  # run tests in watch mode
npm run lint        # lint the source
npm run build       # production build (output in dist/)
npm run preview     # preview the production build
```
