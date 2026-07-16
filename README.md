# gal_radia_helfy_task - Task Manager

A  full-stack task manager built for the Helfy SRE Home Assignment.

- **Backend:** Node.js + Express + TypeScript, port `4000`
- **Frontend:** React + TypeScript, plain CSS , port `3000`

## Setup

Requires Node.js and npm installed.

```bash
# from the repo root
npm install     # installs root, backend, and frontend dependencies
npm run dev     # runs backend (tsx watch) and frontend (react-scripts) together
```

The frontend will open at `http://localhost:3000`. The backend API listens at `http://localhost:4000`.

To run each side individually:

```bash
npm run dev --prefix backend     # backend only, http://localhost:4000
npm run start --prefix frontend  # frontend only, http://localhost:3000
```

## API Reference

Base URL: `http://localhost:4000/api/tasks`

All responses are JSON.

### Task object

```json
{
  "id": 1,
  "title": "string",
  "description": "string",
  "completed": false,
  "createdAt": "date string",
  "priority": "low" | "medium" | "high",
  "dueDate": "(optional)"
}
```

### Endpoints

| Method | Path                  | Description                     | Body                                             | Success | Errors |
|--------|-----------------------|----------------------------------|---------------------------------------------------|---------|--------|
| GET    | `/api/tasks`          | List all tasks                   | —                                                   | `200` `Task[]` | — |
| POST   | `/api/tasks`          | Create a task                    | `{ title, description?, priority?, dueDate? }`      | `201` `Task` | — |
| PUT    | `/api/tasks/:id`      | Update a task                    | Partial task fields                                 | `200` `Task` | `404` if id not found |
| DELETE | `/api/tasks/:id`      | Delete a task                    | —                                                   | `204` no content | `404` if id not found |
| PATCH  | `/api/tasks/:id/toggle` | Toggle a task's `completed` flag | —                                                 | `200` `Task` | `404` if id not found |

Any unmatched route returns `404 { "error": "not found" }`.

## Frontend Features

- Create, edit, delete, and toggle tasks
- Filter by all / completed / pending
- Search by title/description
- Sort by newest, oldest, priority, or title
- Task list rendered as an animated, custom-built carousel
- Light/dark theme toggle

## Assumptions

- `description` and `priority` are optional on create and default to `''` and `'medium'` respectively; `title` is required.
- Validation is minimal (matches the assignment's scope) — the API trusts well-formed input from the bundled frontend rather than implementing exhaustive server-side validation.

## Screenshots
<img width="1265" height="1055" alt="image" src="https://github.com/user-attachments/assets/f31d97e2-125d-4d46-a9be-7ed43bb2865b" />

<img width="1341" height="938" alt="image" src="https://github.com/user-attachments/assets/ac70cd74-7cde-47ec-a0de-2d1ea714d58f" />


