# Mini Project — The Flying Penguin

---

### The Project

"The Flying Penguin" is my reinterpretation of the classic Flappy Bird game. 
The concept started with a simple question. What if a bird that cannot fly decided to fly?

Inspired by the idea of a "first penguin", one that takes the first leap despite uncertainty, I turned the original Flappy Bird scaffold into a game about a penguin attempting to fly through the sky.

I implemented the core gameplay logic, including player controls, pipe creation, collision detection, scoring, game-over and restart states. I also redesigned the game with custom visuals, a flying penguin character, and background music to create a more cohesive theme.

---

### Output

![screenshot](readme-assets/screenshot-01.png)

<!-- Drop a screenshot or GIF of your finished project.
     Save it to a readme-assets/ folder inside this project folder.
     Got more than one good screenshot? Add them. -->

[Watch Online](https://your-link-here)

<!-- Replace the link above with a URL to a screen recording or video of your project.
     ⚠️ Make sure the file or page is set to public before submitting. -->

---

### ✍️ Reflection

I chose to work with the Flappy Bird scaffold. I wanted to keep its simple flying mechanic while giving the game a different meaning and visual identity. My concept was inspired by the idea of a "flightless bird" trying to fly. I was also interested in the "first penguin" metaphor which is the first individual to take a risk and step into the unknown. This led me to create "The Flying Penguin", where a penguin attempts to fly through the sky.

Starting from the provided scaffold, I completed the main gameplay logic by implementing keyboard controls, continuous pipe creation, collision detection, scoring, game-over behavior, and a restart system. The player uses the space bar or up arrow to make the penguin flap. The score increases by one whenever the penguin successfully passes an obstacle, and it resets to zero when the game restarts.

For the aesthetic direction, I replaced the original bird with a custom penguin image and added a new background to establish the world of the game. I also added background music that begins when the player first moves and stops when the game ends.

One challenge was making the different game states work together reliably, especially resetting the character's position, velocity, obstacles, score, and music after game over. 

If I had more time, I would add more detailed feedback such as sound effects, animated obstacles, particles, and different stages as the penguin flies further.

---

### ✨ What I Changed
- Implemented keyboard controls using the space bar and up arrow
- Added continuous obstacle creation
- Implemented collision detection and game-over behavior
- Added a scoring system
- Added a restart button and reset logic
- Replaced the original bird with a custom flying penguin image
- Added a custom background
- Added background music that responds to the game state
- Redesigned the score and game-over UI

### 🔍 Code Structure
- `sketch.js`: main game loop, game states, scoring, and restart behavior
- `bird.js` — contains the `Bird` class
- `pipe.js` — contains the `Pipe` class
- `assets/` — contains the penguin image, background image, and background music

### 🧩 Something I'm Proud Of


### 🔗 References
- BBC Flying Penguins: https://www.youtube.com/watch?v=9dfWzp7rYR4
- 