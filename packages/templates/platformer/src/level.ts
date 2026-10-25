/**
 * Level Definition for Platformer Template
 * Defines all entities, platforms, and collectibles
 */

import { EditorEntity } from '@games/editor/src/types';

export interface LevelDefinition {
  name: string;
  description: string;
  spawnPoint: [number, number, number];
  entities: EditorEntity[];
}

const createPlatform = (
  name: string,
  x: number,
  y: number,
  z: number,
  scaleX: number = 1,
  scaleY: number = 0.5,
  scaleZ: number = 1
): EditorEntity => ({
  id: Math.random().toString(36).substr(2, 9),
  name,
  type: 'model',
  transform: {
    position: [x, y, z],
    rotation: [0, 0, 0],
    scale: [scaleX, scaleY, scaleZ],
  },
  rigidBody: {
    mass: 0, // Static
    shape: 'box',
    size: [scaleX * 2, scaleY * 2, scaleZ * 2],
    friction: 0.6,
  },
  scripts: [],
  visible: true,
  active: true,
  children: [],
});

const createCoin = (
  name: string,
  x: number,
  y: number,
  z: number
): EditorEntity => ({
  id: Math.random().toString(36).substr(2, 9),
  name,
  type: 'collectible',
  transform: {
    position: [x, y, z],
    rotation: [0, 0, 0],
    scale: [0.3, 0.3, 0.3],
  },
  rigidBody: {
    mass: 0,
    shape: 'sphere',
    size: [0.3, 0.3, 0.3],
  },
  scripts: [],
  visible: true,
  active: true,
  children: [],
});

const createGoal = (
  name: string,
  x: number,
  y: number,
  z: number
): EditorEntity => ({
  id: Math.random().toString(36).substr(2, 9),
  name,
  type: 'goal',
  transform: {
    position: [x, y, z],
    rotation: [0, 0, 0],
    scale: [1, 2, 1],
  },
  rigidBody: {
    mass: 0,
    shape: 'box',
    size: [2, 4, 2],
  },
  scripts: [],
  visible: true,
  active: true,
  children: [],
});

const createPlayer = (): EditorEntity => ({
  id: 'player-001',
  name: 'Player',
  type: 'player',
  transform: {
    position: [0, 2, 0],
    rotation: [0, 0, 0],
    scale: [0.5, 1, 0.5],
  },
  rigidBody: {
    mass: 1,
    shape: 'box',
    size: [1, 2, 1],
    friction: 0.5,
    restitution: 0,
  },
  scripts: ['player-controller'],
  visible: true,
  active: true,
  children: [],
});

export const PlatformerLevel: LevelDefinition = {
  name: 'Training Course',
  description: 'A simple platformer level to learn the basics',
  spawnPoint: [0, 2, 0],
  entities: [
    // Ground/Start platform
    createPlatform('StartPlatform', 0, 0, 0, 4, 0.5, 4),

    // Jumping puzzle
    createPlatform('Platform1', 5, 1, 0, 2, 0.5, 2),
    createCoin('Coin1', 5, 2.5, 0),

    createPlatform('Platform2', 10, 2, 0, 2, 0.5, 2),
    createCoin('Coin2', 10, 3.5, 0),

    createPlatform('Platform3', 15, 3, 0, 2, 0.5, 2),
    createCoin('Coin3', 15, 4.5, 0),

    createPlatform('Platform4', 20, 2, 0, 2, 0.5, 2),

    // Side path
    createPlatform('SidePlatform1', 20, 2, 5, 2, 0.5, 2),
    createCoin('CoinSide1', 20, 3.5, 5),

    createPlatform('SidePlatform2', 20, 2, 10, 2, 0.5, 2),
    createCoin('CoinSide2', 20, 3.5, 10),

    createPlatform('SidePlatform3', 15, 2, 10, 2, 0.5, 2),
    createCoin('CoinSide3', 15, 3.5, 10),

    // Return to main path
    createPlatform('Platform5', 10, 1, 10, 2, 0.5, 2),
    createCoin('Coin4', 10, 2.5, 10),

    createPlatform('Platform6', 5, 0, 10, 2, 0.5, 2),
    createCoin('Coin5', 5, 1.5, 10),

    // Moving platform concept (static for now)
    createPlatform('AdvancedPlatform', 0, -1, 15, 2, 0.5, 2),

    // Goal
    createGoal('Goal', 0, 1, 25),

    // Player
    createPlayer(),
  ],
};

export const generateLevelJson = (): string => {
  return JSON.stringify(
    {
      version: '0.1.0',
      name: PlatformerLevel.name,
      description: PlatformerLevel.description,
      entities: PlatformerLevel.entities,
      scripts: [
        {
          id: 'player-controller',
          name: 'PlayerController',
          code: `
-- Player Controller Script
local moveSpeed = 6
local jumpForce = 7
local isGrounded = false
local jumpCount = 0
local maxJumps = 1

function update(dt)
  -- This is a placeholder
  -- Full implementation in editor
  print("Player update: " .. tostring(dt))
end
          `.trim(),
        },
      ],
      settings: {
        gravity: [0, -9.81, 0],
        ambientLight: {
          color: 0xffffff,
          intensity: 0.8,
        },
      },
    },
    null,
    2
  );
};
