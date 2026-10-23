# @games/engine

Core game engine for the Games platform - a Roblox-like game creation environment.

## Features

- **3D Rendering** - Three.js-based WebGL rendering
- **2D Rendering** - Canvas-based 2D graphics (coming soon)
- **Physics** - Custom physics engine with gravity, collisions, and forces
- **Scripting** - JavaScript-based scripting for game logic
- **Entity System** - Hierarchical entity/component system
- **Asset Management** - Built-in model, texture, and sound loading
- **Game Loop** - 60 FPS game loop with fixed timestep

## Installation

```bash
npm install @games/engine three
```

## Quick Start

```typescript
import { GameEngine } from '@games/engine';

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
const engine = new GameEngine(canvas, {
  width: 1024,
  height: 768,
  gravity: new Vector3(0, -9.81, 0),
});

// Create an entity
const entity = engine.createEntity('Box', 'model');
entity.setPosition(0, 1, 0);

// Start the engine
engine.start();
```

## API

### GameEngine

Main engine class that manages the game loop, rendering, and simulation.

#### Methods

- `start()` - Start the game loop
- `stop()` - Stop the game loop
- `createEntity(name, type)` - Create a new entity
- `getScene()` - Get the Three.js scene
- `getPhysics()` - Get the physics world
- `getScriptVM()` - Get the script virtual machine
- `resize(width, height)` - Resize the viewport
- `dispose()` - Clean up resources

### Entity

Represents a game object in the world.

#### Methods

- `setPosition(x, y, z)` - Set entity position
- `setRotation(x, y, z)` - Set entity rotation (in radians)
- `setScale(x, y, z)` - Set entity scale
- `addChild(entity)` - Add child entity
- `removeChild(entity)` - Remove child entity
- `addScript(scriptId)` - Attach a script
- `setActive(active)` - Show/hide entity

### PhysicsWorld

Manages physics simulation.

#### Methods

- `createRigidBody(config)` - Create a physical body
- `removeRigidBody(id)` - Remove a body
- `step(deltaTime)` - Step the physics simulation
- `raycast(origin, direction, maxDistance)` - Cast a ray

### ScriptVM

Virtual machine for running game scripts.

#### Methods

- `createScript(name, code)` - Create a script
- `executeScript(scriptId, context)` - Execute a script
- `registerHook(eventName, callback)` - Register an event hook
- `fireHook(eventName, ...args)` - Fire an event

## Project Structure

```
src/
├── core/           # Core engine
├── renderer/       # Three.js rendering
├── physics/        # Physics simulation
├── scripting/      # Script VM
├── entities/       # Entity system
└── types.ts        # Type definitions
```

## Development

```bash
# Build
npm run build

# Watch for changes
npm run dev

# Run tests
npm run test

# Open playground
open playground.html
```

## Playground

Open `playground.html` in a browser to see a demo of the engine.

## License

MIT
