# Taskboard

A simple productivity app for managing tasks, built with **vanilla HTML, CSS, and JavaScript**. No frameworks, no build step, no dependencies. Your tasks are saved in the browser, so they are still there after a reload.

## Features

- **Full CRUD**: create, read, update (inline edit), and delete tasks
- **Categories**: Work, Personal, and Study, each with its own color
- **Due dates**: shows "Due today", "Due tomorrow", or the date, and flags overdue tasks
- **Mark complete**: animated checkmark and strike-through
- **Filter by status**: All, Active, and Completed, with live counts
- **Filter by category** and **search** by text
- **Drag and drop reordering** (mouse)
- **Clear completed** tasks in one click
- **Persistent storage** with the `localStorage` API
- **Light and dark mode** that follows your system setting
- **Responsive and accessible**: keyboard focus styles, ARIA labels, and reduced-motion support

## Getting Started

No installation needed.

```bash
git clone https://github.com/Hanine-Ghabri/<your-repo-name>.git
cd <your-repo-name>
```

Open `index.html` in your browser, or serve it locally:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Project Structure

```
.
├── index.html   # Page markup
├── style.css    # Styles, color tokens, light/dark themes, animations
└── script.js    # State, rendering, CRUD, filters, drag and drop, storage
```

## How It Works

- **State**: all tasks live in a `tasks` array. Each task is an object: `{ id, text, category, due, done }`.
- **Persistence**: `saveToLocalStorage()` writes the array to `localStorage` after every change, and `loadFromLocalStorage()` reads it back on startup. Both are wrapped in `try/catch`, so the app still works if storage is blocked.
- **Rendering**: `render()` rebuilds the list from the `tasks` array, applying the current status, category, and search filters. User text is escaped before it is inserted into the page.
- **Events**: one set of listeners on the list handles the complete, edit, delete, and drag actions for every task.
- **Animations**: CSS transitions handle the completion checkmark and strike-through, new task entrance, and delete slide-out.

## Tech Stack

- HTML5
- CSS3 (Grid, Flexbox, custom properties, transitions)
- JavaScript (ES6+), DOM manipulation, and the [localStorage API](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## Deploying with GitHub Pages

1. Push the files to a GitHub repository.
2. Go to **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

## Possible Improvements

- Touch support for reordering
- Due date sorting
- Custom categories
- Export and import tasks as JSON

## Author

Made by [Hanine Ghabri](https://github.com/Hanine-Ghabri).
