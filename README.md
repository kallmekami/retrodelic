# Retrodelic 🕹️

A retro, CRT/pixel-styled personal portfolio & resume site — built with Flask, pixel fonts, scanlines, an old-TV power on/off transition, terminal-style typing, retro sound effects, and a hidden Konami code easter egg.

![Made with Flask](https://img.shields.io/badge/Flask-3.x-black?logo=flask)
![Python](https://img.shields.io/badge/Python-3.8%2B-blue?logo=python)

---

## ✨ Features

- **CRT power on/off transition** between pages (old TV style)
- **Pixel UI** — Press Start 2P + VT323 fonts, scanlines, retro device frame
- **"PRESS START" boot screen** on load
- **Terminal-style typing animation** on the Skills/Stack page
- **Retro loading bar** between page transitions
- **8-bit sound effects** — generated live with the Web Audio API (no audio files)
- **Glitch effect** on the logo (random RGB-split flicker)
- **Konami code easter egg** (`↑ ↑ ↓ ↓ ← → ← → B A`, or swipe the same pattern on mobile)
- Fully responsive (mobile-first)

---

## 🚀 Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/USERNAME/retrodelic.git
cd retrodelic
```

### 2. (Recommended) Create a virtual environment

```bash
python3 -m venv venv
source venv/bin/activate      # Linux / macOS
venv\Scripts\activate         # Windows
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Run the app

```bash
python app.py
```

### 5. Open in your browser

```
http://localhost:5000
```

To stop the server, press `Ctrl+C`.

---

## 🛠️ Use This as Your Own Template

This project is built so you can fork it and make it yours **without touching any HTML, CSS, or JS**. Everything personal lives in one file: **`app.py`**.

### Project structure

```
retrodelic/
├── app.py              ← ALL your content goes here
├── requirements.txt
├── templates/
│   └── index.html      ← page structure (Jinja template)
└── static/
    ├── css/style.css   ← styling, animations, CRT effects
    └── js/main.js       ← sounds, transitions, terminal typing, easter egg
```

### What to edit in `app.py`

Open `app.py` and update the following Python variables with your own info:

#### 1. Work Experience

```python
EXPERIENCE = [
    {
        "company": "YOUR COMPANY",
        "role": "Your Job Title",
        "period": "Jan 2024 — Present",
        "desc": "Short description of what you did, written in plain prose.",
        "tags": ["Tag1", "Tag2", "Tag3"],
    },
    # add more entries — they render in the order you list them,
    # so put your most recent job first
]
```

#### 2. Education

```python
EDUCATION = [
    {
        "school": "YOUR UNIVERSITY",
        "degree": "Your Degree",
        "period": "2021 — Present",
        "desc": "Short description.",
        "tags": ["Tag1", "Tag2"],
    },
]
```

#### 3. Languages

```python
LANGUAGES = "English — Native&nbsp;&nbsp;|&nbsp;&nbsp;Spanish — Professional"
```

> Note: `&nbsp;` is just HTML for a non-breaking space — keep the format if you want the same spacing, or simplify it to plain text.

#### 4. Contact Info

```python
CONTACT = {
    "email": "you@example.com",
    "linkedin_url": "https://linkedin.com/in/your-handle",
    "linkedin_label": "your name",
    "phone_href": "+10000000000",       # used in tel: link, no spaces/dashes
    "phone_display": "+1 000 000 0000", # shown to the user
    "location": "Your City, Country",
}
```

#### 5. Skills (Terminal page)

This powers the typed-out terminal animation on the Skills page. Each block is a fake `cat` command and its "output":

```python
SKILL_DATA = [
    {
        "cmd": "cat /etc/skills/containers",
        "out": ["Docker", "Kubernetes", "Helm"],
    },
    {
        "cmd": "cat /etc/skills/your-category",
        "out": ["Skill A", "Skill B", "Skill C"],
    },
    # add as many categories as you like
]
```

That's it — save `app.py`, restart the server (`python app.py`), and refresh your browser.

---

## 🎨 Customizing the Look (optional)

If you want to go further:

- **Colors / fonts / animations** → `static/css/style.css`
  Look for the `:root { --bg: ...; --dark: ...; }` block at the top — these CSS variables control the main color palette.
- **Page layout / sections** → `templates/index.html`
- **Sound effects, CRT transition timing, easter egg** → `static/js/main.js`

Each file has comments marking the major sections.

---

## 📦 Deploying

This is a standard Flask app, so it works with any Python host (Render, Railway, PythonAnywhere, Fly.io, etc.).

For production, don't use the built-in dev server — run with `gunicorn`:

```bash
pip install gunicorn
gunicorn app:app
```

---

## 📄 License

Feel free to fork, modify, and use this as your own portfolio template.
