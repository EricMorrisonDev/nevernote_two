## 1. Foundation

- **Repo & tooling:** Initialize the repo (e.g. monorepo or separate frontend/backend), set up Git, add a README.
- **Database:** Define the schema (users, notebooks, notes) and set up PostgreSQL locally (Docker or native).
- **Prisma:** Add Prisma, point it at Postgres, create initial schema and migrations.


---

## 2. Authentication

- **Auth strategy:** Choose an approach (e.g. sessions + cookies, or JWT).
- **User model:** Add a `User` (or equivalent) in Prisma; add sign-up/sign-in endpoints and protect them with Zod validation.
- **Frontend auth:** Login/signup pages and a way to store/send the auth token or session (e.g. httpOnly cookie or token in memory/localStorage).
- **Guarding routes:** Ensure note/notebook APIs and pages require a logged-in user.

---

## 3. Notebooks

- **Backend:** Notebook CRUD APIs (create, read, update, delete) tied to the authenticated user; validate with Zod.
- **Frontend:** List notebooks, create/edit/delete a notebook, and navigate into a notebook to see its notes.

---

## 4. Notes (CRUD + Markdown)

- **Backend:** Note model linked to User and Notebook; CRUD APIs with Zod validation; store note body as markdown (text).
- **Frontend:** List notes in a notebook, create/edit/delete a note; use a markdown editor and a markdown renderer for viewing.

---