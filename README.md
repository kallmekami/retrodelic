# KAMIOPS — Flask Edition

Retro CRT-style portfolio site, rebuilt as a Flask app.

## Structure

```
kamiops_flask/
├── app.py              # Flask app + resume data (edit here to update content)
├── requirements.txt
├── templates/
│   └── index.html      # Jinja template (HTML structure)
└── static/
    ├── css/style.css   # All styling (CRT, pixel fonts, animations)
    └── js/main.js      # Audio engine, CRT transitions, terminal typing,
                         # Konami code, glitch effects, retro loader
```

## Run locally

```bash
pip install -r requirements.txt
python app.py
```

Then open http://localhost:5000

## Editing content

All resume data (experience, education, contact info, skills) lives in
`app.py` as plain Python dictionaries/lists — edit those and refresh the
page, no template changes needed.

## Features

- CRT power-off/power-on transition between pages
- Pixel-art retro UI (Press Start 2P / VT323 fonts)
- Animated "Now Playing" status bar
- Terminal-style typing animation on the STACK page
- Web Audio API beep sounds (no audio files needed)
- Glitch effect on the logo
- Konami code easter egg (↑↑↓↓←→←→BA, or swipe the same pattern on mobile)
- Retro loading bar between page transitions
