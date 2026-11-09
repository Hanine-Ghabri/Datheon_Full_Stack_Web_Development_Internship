# Hanine's Portfolio

A responsive personal portfolio website built with plain **HTML, CSS, and JavaScript**: no frameworks, no build step, no dependencies.

It showcases my projects, skills, and certifications as an IT student at ISETN looking for a summer internship.

## Features

- **Light / dark theme toggle**: the choice is saved in `localStorage` and restored on your next visit
- **Responsive layout**: the nav collapses into a hamburger menu on phones (700px and below)
- **Project details modal**: each project card opens a pop-up with its description, tools, and links. It closes with the × button, a click outside, or the `Esc` key, and returns focus to the button you used
- **Cursor glow**: a soft colored glow follows the mouse (desktop only)
- **Scroll fade**: content fades out and drifts up as it leaves the top of the screen
- **Accessibility**: ARIA labels, `aria-expanded` on the menu, a dialog role on the modal, and keyboard support. The cursor glow and scroll fade are turned off for users who prefer reduced motion
- **Contact section** with email, phone, LinkedIn, and location

## Sections

| Section | What's in it |
| --- | --- |
| **About me** | Short intro and what I'm looking for |
| **Projects** | Card grid with descriptions, tools, and links to the code |
| **Skills** | Programming languages, spoken languages, and other skills |
| **Certifications** | Courses from Sololearn, freeCodeCamp, Cisco Networking Academy, IBM SkillsBuild, HP LIFE, and EF SET |
| **Contact** | Ways to reach me |

## Featured Projects

- **[Drummies](https://github.com/Hanine-Ghabri/Drummies)**: a browser drum kit with 12 pads and a 16-step beat sequencer. All sounds are generated with the Web Audio API, so no audio files are needed. *(HTML, CSS, JavaScript)*
- **[Pixel Art Maker](https://github.com/Hanine-Ghabri/pixel-art-maker)**: draw 16×16 pixel art in the browser and save it as a PNG. *(HTML, CSS, JavaScript)*
- **[Budget App](https://github.com/Hanine-Ghabri/Budget-App)**: a `Category` class that tracks deposits, withdrawals, and transfers, plus `create_spend_chart`, which draws a text bar chart of spending percentages. *(Python)*
- **[Excuse Generator](https://github.com/Hanine-Ghabri/Excuse-Generator)**: random, ridiculous excuses for any situation, with over 18,000 possible combinations. *(HTML, CSS, JavaScript)*

## Tech Stack

- **HTML5**: semantic structure
- **CSS3**: Grid, Flexbox, custom dark theme via `[data-theme]`, media queries, transitions
- **Vanilla JavaScript**: DOM manipulation, `localStorage`, `requestAnimationFrame`, `matchMedia`

## Project Structure

```
.
├── portfolio.html   # Page markup and styles
├── portfolio.js     # Theme toggle, mobile menu, and project modal
└── profile.png      # Profile picture shown in the header
```

> The cursor glow and scroll fade scripts are inline at the bottom of `portfolio.html`.

## Getting Started

No installation needed.

1. **Clone the repository**
   ```bash
   git clone https://github.com/Hanine-Ghabri/<your-repo-name>.git
   cd <your-repo-name>
   ```
2. **Open it in a browser**: double-click `portfolio.html`, or serve it locally:
   ```bash
   # Python 3
   python -m http.server 8000
   ```
   Then visit `http://localhost:8000/portfolio.html`.

## Customizing

- **Colors**: edit the hex values in the `<style>` block of `portfolio.html`. The dark theme overrides live under `[data-theme="dark"]`.
- **Projects**: copy a `.project-card` block inside `.project-grid`. Keep the structure (`h3`, description `<p>` starting with ✨, `.tools` paragraph, links, and a `.details-btn`) so the modal picks it up automatically.
- **Certifications**: copy a `.cert-card` block inside `.cert-grid`.
- **Profile picture**: replace `profile.png` with your own image.

## Deploying with GitHub Pages

1. Rename `portfolio.html` to `index.html` (and update the script tag if you rename `portfolio.js`).
2. Go to **Settings → Pages** in your repository.
3. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then save.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

## Contact

I'm open to **internship opportunities** this summer.

- Email: [hanineghabri@gmail.com](mailto:hanineghabri@gmail.com)
- GitHub: [@Hanine-Ghabri](https://github.com/Hanine-Ghabri)
- Location: Nabeul, Tunisia

---

© 2026 Hanine. All rights reserved.
