# @games/editor

Web-based game editor for the Games platform. Create, edit, and test games visually.

## Features

- **3D Scene Viewport** - Real-time rendering with Three.js
- **Hierarchy Panel** - Entity tree with drag-drop hierarchy
- **Property Inspector** - Edit entity transforms and physics
- **Play Testing** - Test games directly in the editor
- **Save/Load** - Export and import game files
- **Keyboard Shortcuts** - Quick access to common tools
  - `C` - Add Cube
  - `S` - Add Sphere
  - `Space` - Play/Stop
  - `Delete` - Delete selected entity
  - `Ctrl+S` - Save game

## Architecture

```
src/
├── components/
│   ├── SceneEditor.vue      # 3D viewport
│   ├── HierarchyPanel.vue   # Entity tree
│   ├── EntityTreeNode.vue   # Tree node (recursive)
│   └── PropertyPanel.vue    # Property inspector
├── stores/
│   └── editorStore.ts       # State management
├── types/
│   └── index.ts             # TypeScript types
├── App.vue                  # Main app layout
└── main.ts                  # Entry point
```

## Game File Format

Games are saved as JSON with the following structure:

```json
{
  "version": "0.1.0",
  "name": "My Game",
  "description": "A cool game",
  "createdAt": "2026-10-25T...",
  "lastModified": "2026-10-25T...",
  "entities": [
    {
      "id": "abc123",
      "name": "Player",
      "type": "model",
      "transform": {
        "position": [0, 1, 0],
        "rotation": [0, 0, 0],
        "scale": [1, 1, 1]
      },
      "rigidBody": {
        "mass": 1,
        "shape": "box",
        "size": [1, 2, 1]
      },
      "scripts": [],
      "visible": true,
      "active": true
    }
  ],
  "scripts": [],
  "settings": {
    "gravity": [0, -9.81, 0],
    "ambientLight": {
      "color": 16777215,
      "intensity": 0.6
    }
  }
}
```

## Development

### Installation

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The editor will open at `http://localhost:5174`

### Build

```bash
npm run build
```

## Usage

1. **Create entities** - Click the + button in the toolbar or press `C`/`S`
2. **Edit properties** - Select an entity and edit values in the right panel
3. **Test gameplay** - Click Play button or press `Space`
4. **Save game** - Use Save button or `Ctrl+S`
5. **Load game** - Use Load button to open a saved game file

## Next Steps

- [ ] Script editor integration
- [ ] Asset import system
- [ ] Advanced gizmo controls
- [ ] Undo/redo system
- [ ] Real-time collaboration
- [ ] Performance profiler

## License

MIT
