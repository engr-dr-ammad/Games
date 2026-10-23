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
│   ├── engine/        # Core game engine (3D/2D rendering, physics, scripting)
│   ├── editor/        # Game editor UI (Web + Desktop)
│   └── templates/     # Game templates & examples
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

**Status**: ✅ Phase 1 - Core Engine Complete

### [@games/editor](./packages/editor/)

Game editor with:
- Visual scene editor (drag-drop)
- Property inspector
- Script editor
- Play/test mode
- Asset library

**Status**: 📋 Phase 2 - In Progress

### [@games/templates](./packages/templates/)

Pre-built game templates:
- 3D Platformer
- 2D Platformer
- Puzzle Game

**Status**: 📋 Phase 3 - Planned

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

### Phase 1: Core Engine ✅
- [x] 3D Rendering (Three.js)
- [x] Physics simulation
- [x] Entity system
- [x] Scripting VM
- [x] Game loop

### Phase 2: Editor (In Progress)
- [ ] Web-based editor UI
- [ ] Visual scene builder
- [ ] Property editor
- [ ] Script editor
- [ ] Play/test mode

### Phase 3: Templates
- [ ] 3D platformer template
- [ ] 2D platformer template
- [ ] Puzzle template

### Phase 4: Desktop App
- [ ] Electron wrapper
- [ ] Offline support
- [ ] Game packaging

### Phase 5: Storage & Sharing
- [ ] Game file format
- [ ] Local storage
- [ ] Game library
- [ ] Share & publish

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
