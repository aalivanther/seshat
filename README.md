# Seshat

German and English courses from A1 to B2 in an interactive notebook, built around the official exams (Goethe, LanguageCert).
96 phases, 842 lessons and 9,324 exercises, with spaced review, mock exams and oral interviews; the course is taught in Spanish.
Demo: https://akyrion.tech/seshat/

## Run locally

1. Install Go 1.26 and Node 24.
2. `cd web && npm ci && cd ..`
3. `./start.sh` builds the app and starts the local engine.
4. Open http://localhost:8787. Progress stays in `backend/profiles/`.
5. Packaged app: `./build-app.sh <version> <drop>` writes the installers to `dist/`.
