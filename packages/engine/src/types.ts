import { Vector3, Quaternion } from 'three';

export interface GameConfig {
  width?: number;
  height?: number;
  pixelRatio?: number;
  antialias?: boolean;
  gravity?: Vector3;
  physics?: {
    enabled: boolean;
    timeStep?: number;
  };
}

export interface GameState {
  isRunning: boolean;
  isPaused: boolean;
  isEditor: boolean;
}

export interface Transform {
  position: Vector3;
  rotation: Quaternion;
  scale: Vector3;
}

export interface RigidBodyConfig {
  mass: number;
  shape: 'box' | 'sphere' | 'capsule';
  size?: Vector3;
  friction?: number;
  restitution?: number;
}

export interface EntityConfig {
  name: string;
  type: string;
  transform?: Partial<Transform>;
  rigidBody?: RigidBodyConfig;
  script?: string;
}

export interface RaycastResult {
  hit: boolean;
  point?: Vector3;
  normal?: Vector3;
  distance?: number;
  entity?: any;
}
