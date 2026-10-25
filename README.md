# 🎮 Games Platform

An open-source game creation platform for kids - like Roblox but standalone, open-source, and fully customizable.

## 🌟 Vision

Create a collaborative game creation environment where kids can:
- Build 3D and 2D games with an intuitive visual editor
- Learn programming with a kid-friendly scripting language
- Share games with friends
- Explore creative game design

## 🏗️ Project Structure

```
games-platform/
├── packages/
│   ├── engine/                ✅ Phase 1 - Core game engine
│   ├── editor/                ✅ Phase 2 - Web-based game editor
│   └── templates/
│       └── platformer/        ✅ Phase 3 - Complete 3D platformer game
├── turbo.json                 Monorepo configuration
├── README.md
└── package.json
```

## 📦 Packages

### [@games/engine](./packages/engine/)

Core game engine featuring:
- **3D Rendering** with Three.js
- **Physics** simulation with gravity and collisions
- **Entity System** for game objects
- **Scripting** with JavaScript VM
- **Asset Management** for models and textures
- 207 MCP tools through REA integration

**Status**: ✅ Phase 1 - Core Engine Complete

### [@games/editor](./packages/editor/)

Web-based game editor with:
- **Visual 3D Viewport** - Real-time rendering
- **Scene Hierarchy** - Entity tree with parent-child relationships
- **Property Inspector** - Edit transforms and physics properties
- **Play Testing** - Test games directly in editor
- **Save/Load System** - Export/import games as JSON
- **Keyboard Shortcuts** - Quick access to tools (C, S, Space)

**Status**: ✅ Phase 2 - Web Editor Complete

### [@games/templates/platformer](./packages/templates/platformer/)

Complete 3D platformer game template featuring:
- **Player Controller** - WASD movement + jumping with physics
- **Training Level** - 8 platforms with increasing difficulty
- **Game Mechanics** - Coin collection, scoring, victory conditions
- **Fully Playable** - Load game.json in editor and play
- **Customizable** - Easy to modify difficulty and level design
- **Educational** - Learn game development by example

**Status**: ✅ Phase 3 - Platformer Template Complete

## 🚀 Quick Start

### Development

```bash
# Install dependencies
npm install

# Run development servers
npm run dev

# Build all packages
npm run build

# Run tests
npm run test
```

### Try the Engine Playground

```bash
cd packages/engine
open playground.html
```

## 🎯 Roadmap

### Phase 1: Core Engine ✅ Complete
- [x] 3D Rendering (Three.js)
- [x] Physics simulation with gravity & collisions
- [x] Entity system with hierarchy
- [x] Scripting VM with JavaScript
- [x] Game loop (60 FPS, fixed timestep)
- [x] Playground demo with live editing

### Phase 2: Web Editor ✅ Complete
- [x] Web-based editor UI (Vue 3)
- [x] Visual 3D scene viewport
- [x] Property inspector with real-time editing
- [x] Hierarchical scene tree
- [x] Play/test mode directly in editor
- [x] Save/load games as JSON
- [x] Keyboard shortcuts & asset library

### Phase 3: Game Template ✅ Complete
- [x] 3D platformer with full gameplay
- [x] Player controller (WASD + jumping)
- [x] Training level with 8 platforms
- [x] Coin collection system
- [x] Score tracking & victory condition
- [x] Fall detection & respawn
- [x] Fully playable and customizable

### Phase 4: Desktop App (Coming Soon)
- [ ] Electron wrapper for Windows/Mac/Linux
- [ ] Offline editor support
- [ ] Game packaging & distribution
- [ ] Plugin system for extensions
- [ ] Performance profiling tools

### Phase 5: Advanced Features (Future)
- [ ] 2D game support
- [ ] Asset importer (models, textures, audio)
- [ ] Animation system
- [ ] Multiplayer framework
- [ ] Cloud save & sharing
- [ ] Community game gallery

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Rendering | Three.js (3D) + Canvas (2D) |
| Physics | Custom JS implementation |
| Scripting | JavaScript VM |
| Editor UI | Vue 3 + TypeScript |
| Desktop | Electron |
| Build | Vite + TypeScript |
| Package Mgmt | npm workspaces |

## 📚 Contributing

This is an open-source project. Contributions welcome!

- Report bugs via GitHub issues
- Submit PRs for features/fixes
- Improve documentation
- Create example games

## 📖 Documentation

- [Engine API](./packages/engine/README.md)
- [Editor Guide](./packages/editor/README.md) (coming soon)
- [Game Development Tutorial](./docs/tutorial.md) (coming soon)

## ⚖️ License

MIT License - See LICENSE file

## 🤝 Community

- GitHub Discussions (coming soon)
- Discord Server (coming soon)
- Community Games Gallery (coming soon)

---

**Made with ❤️ for creative kids everywhere**
