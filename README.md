# Cloud Breaker

Cloud Breaker is a 2D browser brick-breaker style game with a weather theme.
You control a paddle, launch a ball, and clear cloud blocks while managing lives, score, and timing.

The project currently includes:
- Level 1: classic cloud-breaker gameplay
- Level 2: storm-themed gameplay with rain ambience, lightning hazard, and paddle stun effect

## Game Overview

Cloud Breaker is built with plain HTML, CSS, and JavaScript using an HTML5 canvas.
Each level has its own script folder for logic, rendering, input, sound, and UI alerts.

Core loop features:
- Paddle movement with keyboard arrows
- Ball launch using Space
- Collision with walls, paddle, and clouds
- Score updates and best score persistence via localStorage
- Lives system with heart icons
- Timer display during play
- Pause button that freezes paddle and ball movement

## Controls

- Left Arrow: move paddle left
- Right Arrow: move paddle right
- Space: launch ball
- Pause button: toggle PLAY/PAUSE
- Retry button: reload current level
- Help button: show rules popup

Notes:
- Space is dedicated to gameplay launch input.
- Default browser Space behavior on focused controls is prevented in the game input handler so pressing Space does not accidentally trigger the pause button.

## Level Design

### Level 1

- Bright sky/cloud theme
- Standard cloud destruction scoring
- Win state opens modal with retry or next-level navigation

### Level 2

- Rain and storm atmosphere
- Additional ambience (rain and wind loops)
- Dark cloud hits can trigger lightning
- Lightning can temporarily stun paddle movement
- Background darkness reduces as clouds are cleared

## Scoring, Lives, and Progression

- Destroying a cloud: +50 points
- Ball falling below paddle: -100 points and lose 1 life
- Starting lives: 3
- Best score is stored per level in localStorage:
	- Level 1 key: bestScore
	- Level 2 key: bestScore2

## Pause Behavior

Pause is intentionally simple:
- Freezes paddle horizontal movement
- Freezes ball movement and collision/physics updates
- Leaves the rest of the draw loop and UI rendering active

This keeps gameplay pause logic focused on the ball+paddle system without overcomplicating global game state.

## Project Structure

```text
.
|- index.html
|- html/
|  |- level1.html
|  |- level2.html
|- scripts/
|  |- level1/
|  |  |- drawing.js
|  |  |- initialization.js
|  |  |- input.js
|  |  |- main.js
|  |  |- sounds.js
|  |  |- sweetAlerts.js
|  |  |- timer.js
|  |- level2/
|     |- drawing.js
|     |- initialization.js
|     |- input.js
|     |- lightning.js
|     |- main.js
|     |- sounds.js
|     |- sweetAlerts.js
|     |- timer.js
|- styles/
|  |- style.css
|  |- level1style.css
|  |- level2style.css
|- images/
|- sounds/
```

## Running The Game

Because this project uses static assets (audio, images, scripts), it is best run through a local HTTP server.

Quick options:

1. VS Code Live Server extension
2. Python simple server:

```bash
python3 -m http.server 8000
```

Then open:

```text
http://localhost:8000/
```

Start from the main menu and click Play.

## Dependencies

External libraries loaded from CDN:
- SweetAlert2
- jQuery

No build tool or package manager is required for the current version.

## Known Notes

- Autoplay policies in some browsers may block audio until user interaction.
- Best scores are browser-local (per browser/profile/device).
- Level 2 rain and lightning visuals are intentionally tied to atmosphere and hazard readability rather than strict realism.

## Credits

### Music

- Waterflame - Glorious Morning (Level 1)
- Waterflame - Race Around the World (Level 2)

Full credit goes to Waterflame for the music used in this project.

### Rain Effect Code

Based on:

- CSS Rain Effect by Aaron Rickle
- CodePen: https://codepen.io/arickle/pen/XKjMZY

## Author

Gašper Levpušček

## License

MIT License. Free to use, modify, and distribute. 
See LICENSE file for more details.

