# 3D Platformer Template

A complete, playable 3D platformer game template for the Games platform. Perfect for learning game development!

## 🎮 How to Play

### Controls
- **WASD** or **Arrow Keys** - Move
- **Space** - Jump
- **Mouse** - Look around (future)

### Objective
1. Jump across platforms
2. Collect all coins
3. Reach the goal marker

## 📦 What's Included

### Game Features
✅ **Player Controller**
- Smooth movement with acceleration/damping
- Single and double jump (configurable)
- Ground detection for jumping
- Gravity and physics-based movement

✅ **Level Design**
- Training course with increasing difficulty
- Multiple platforms at different heights
- 5 collectible coins
- Goal/end zone
- Respawn on fall

✅ **Game Mechanics**
- Coin collection tracking
- Score system (coins collected + time)
- Victory condition (reach goal)
- Respawn system (fall detection)
- Basic audio feedback (placeholder)

### Scripts Included
- `playerController.ts` - Player movement and jumping
- `level.ts` - Level layout and entity definitions
- `gameLogic.ts` - Score, collisions, win/lose

### Game File
- `game.json` - Complete game save file (load in editor)

## 🚀 Getting Started

### 1. Load the Game

In the Games Editor:
1. Click "Load"
2. Select `game.json`
3. Click "Play" to test

### 2. Explore the Level

- Walk around the starting platform
- Jump to the first floating platform
- Collect coins as you go
- Reach the goal to win!

### 3. Customize

In the editor you can:
- Add more platforms
- Create new coins
- Adjust player properties
- Modify jump force/speed
- Build your own level!

## 📝 Script Reference

### Player Controller

**Input**
```typescript
input.forward    // W or Arrow Up
input.backward   // S or Arrow Down
input.left       // A or Arrow Left
input.right      // D or Arrow Right
input.jump       // Space
```

**Properties**
- `moveSpeed: 6` - Movement speed
- `jumpForce: 7` - Jump velocity
- `maxJumps: 1` - Max jumps in air

**Methods**
```typescript
update(deltaTime)  // Called every frame
onCollision(other) // Called on collision
```

### Game Logic

**Events**
- `onGameStart()` - Level starts
- `onCoinCollected(coinId)` - Coin picked up
- `onGoalReached()` - Player wins
- `onPlayerFell()` - Player falls off world

**Functions**
```lua
respawnPlayer()    -- Reset player to spawn
getScore()         -- Get current score
getProgress()      -- Get coin collection %
```

## 🎨 Level Structure

```
StartPlatform (4x4)
    ↓ [jump 5 units right]
Platform1 (2x2) + Coin1
    ↓ [jump 5 units right]
Platform2 (2x2) + Coin2
    ↓ [jump 5 units right]
Platform3 (2x2) + Coin3
    ↓ [jump 5 units right]
Platform4 (2x2)
    ↓ [jump 20 units forward]
Goal
```

## 🔧 Tweaking the Game

### Adjust Difficulty

Edit the platformer script:

```lua
-- Make easier
local moveSpeed = 8        -- Faster movement
local jumpForce = 9        -- Higher jump
local maxJumps = 2         -- Double jump

-- Make harder
local moveSpeed = 3        -- Slower
local jumpForce = 5        -- Lower jump
local maxJumps = 1         -- Single jump only
```

### Add a New Platform

In the editor:
1. Click "+" to add entity
2. Position it (X, Y, Z)
3. Set physics to Box with mass=0
4. Optional: Add coin above it

## 🎓 Learning Outcomes

After completing this template, you'll understand:
- ✅ How to build 3D games
- ✅ Physics and collision detection
- ✅ Player controllers and input
- ✅ Game state and scoring
- ✅ Level design principles
- ✅ Using the Games Editor effectively

## 📚 Next Steps

### Create Your Own Game

1. **Copy this template** as a starting point
2. **Design your level** - sketch it on paper first
3. **Add new mechanics** - moving platforms, enemies, etc.
4. **Test frequently** - use Play button often
5. **Polish & share** - save and share your creation!

### Advanced Features (Future)

- [ ] Moving platforms
- [ ] Enemy AI
- [ ] Power-ups
- [ ] Checkpoints
- [ ] Multiplayer
- [ ] Leaderboards

## 📞 Troubleshooting

**Player falls through platforms**
- Check platform physics (mass=0 for static)
- Verify collision detection is enabled
- Ensure player mass is > 0

**Jump too weak/strong**
- Adjust `jumpForce` in player script
- Default is 7 (good for 2m jump)

**Level too easy/hard**
- Add/remove platforms
- Adjust platform spacing
- Change jump force
- Increase/decrease level height

## 🎮 Gallery

### Completed Course
Total coins: 5
Target time: < 30 seconds
Victory text: "You did it!"

### Variations
- Speed run mode (minimize time)
- Pacifist mode (collect no coins)
- Blindfold mode (camera blocked)
- Parkour mode (no jumping restrictions)

## License

MIT - Feel free to modify and share!

---

**Happy platforming! 🎮**

For help, visit the Games platform documentation or ask in the community forum.
