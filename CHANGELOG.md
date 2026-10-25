# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.3.0] - 2026-10-25

### Phase 3: Platformer Template & Engine Improvements

#### Added
- **3D Platformer Game Template** - Complete, playable platformer example
  - Player controller with WASD movement and jumping
  - Physics-based movement with gravity and damping
  - Training level with 8 platforms of increasing difficulty
  - Coin collection system and score tracking
  - Victory condition and respawn mechanics
  - Fully customizable in Game Editor
  - Comprehensive tutorial documentation

- **Game Logic System** - Score, collision, and event handling
  - Coin collection tracking
  - Victory/goal detection
  - Fall detection and respawn
  - Event callback system
  - Time tracking for speedruns

- **Level Design Tools** - Entity creation helpers
  - Platform, coin, and goal creation utilities
  - Pre-configured physics settings
  - Level layout templates

#### Changed
- Updated main README with Phase 3 completion
- Enhanced project structure documentation
- Added platformer-specific documentation

#### Fixed
- Entity ID generation improved
- Physics raycast implementation

---

## [0.2.0] - 2026-10-25

### Phase 2: Web Game Editor UI

#### Added
- **Web-based Game Editor** - Full Vue 3 application
  - Real-time 3D viewport with scene rendering
  - Scene hierarchy panel with tree view
  - Property inspector for entity editing
  - Play/test mode directly in editor
  - Save/load games as JSON files
  - Keyboard shortcuts (C, S, Space, Delete)

- **Editor Components**
  - SceneEditor - 3D viewport with game engine integration
  - HierarchyPanel - Scene entity tree management
  - EntityTreeNode - Recursive tree node component
  - PropertyPanel - Transform and physics property editor
  - App Layout - Professional editor interface

- **State Management**
  - EditorStore - Reactive game state with Pinia-like API
  - Entity CRUD operations
  - Project save/load system
  - Script attachment system
  - Undo/redo scaffolding

- **Game File Format** - JSON-based game persistence
  - Entity data with transforms and physics
  - Script attachments
  - Global settings (gravity, lighting)
  - Version and metadata

#### Changed
- Enhanced engine types with editor-specific fields
- Improved entity serialization

#### UI/UX
- Dark professional theme optimized for game development
- Resizable panels with flexible layout
- Real-time property editing with immediate viewport feedback
- Visual selection highlighting in hierarchy

---

## [0.1.0] - 2026-10-23

### Phase 1: Core Game Engine

#### Added
- **GameEngine** - Main engine class
  - 60 FPS game loop with fixed timestep
  - Delta time management
  - Game lifecycle (start/stop/dispose)
  - Scene management

- **3D Rendering** - Three.js integration
  - WebGL renderer with shadows and antialiasing
  - PerspectiveCamera with configurable FOV
  - Lighting system (ambient and directional)
  - Material and mesh support
  - Screenshot capture

- **Physics System** - Custom JavaScript physics engine
  - Gravity and acceleration
  - Velocity-based movement
  - Rigid body creation and management
  - Basic collision detection (AABB)
  - Raycast support
  - Force and impulse application
  - Friction and restitution

- **Entity System** - Hierarchical game objects
  - Entity creation and deletion
  - Parent-child relationships
  - Transform (position, rotation, scale)
  - Attached rigid bodies
  - Script attachments
  - Visibility and active state toggles

- **Scripting System** - JavaScript-based game logic
  - Script VM with sandboxed execution
  - Global context with safe functions
  - Event hook system (update, collision, etc.)
  - Math library access

- **Playground Demo** - Interactive demo HTML file
  - Real-time 3D viewport
  - Create cubes and spheres
  - Physics simulation visualization
  - FPS counter
  - Responsive canvas resizing

#### Project Setup
- TypeScript configuration with strict mode
- Vite build system
- Monorepo structure with Turbo
- Three.js integration

---

## Roadmap

### Upcoming (Phase 4)
- Desktop app (Electron wrapper)
- Offline editor support
- Game packaging

### Future (Phase 5+)
- 2D game support
- Asset importer (models, textures, audio)
- Animation system
- Multiplayer framework
- Cloud features and social sharing

---

## Links
- [GitHub](https://github.com/engr-dr-ammad/Games)
- [Contributing Guide](CONTRIBUTING.md)
- [Engine Docs](packages/engine/README.md)
- [Editor Docs](packages/editor/README.md)
- [Platformer Docs](packages/templates/platformer/README.md)
