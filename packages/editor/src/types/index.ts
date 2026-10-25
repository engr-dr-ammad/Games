import { Vector3, Quaternion } from 'three';

export interface EditorEntity {
  id: string;
  name: string;
  type: string;
  parent?: string;
  children: string[];
  transform: {
    position: [number, number, number];
    rotation: [number, number, number];
    scale: [number, number, number];
  };
  rigidBody?: {
    mass: number;
    shape: 'box' | 'sphere' | 'capsule';
    size: [number, number, number];
    friction?: number;
    restitution?: number;
  };
  scripts: string[];
  visible: boolean;
  active: boolean;
}

export interface GameScript {
  id: string;
  name: string;
  code: string;
}

export interface GameProject {
  version: string;
  name: string;
  description: string;
  createdAt: string;
  lastModified: string;
  entities: EditorEntity[];
  scripts: GameScript[];
  settings: {
    gravity: [number, number, number];
    ambientLight: {
      color: number;
      intensity: number;
    };
  };
}

export interface EditorState {
  selectedEntityId?: string;
  playMode: boolean;
  modified: boolean;
  undoStack: GameProject[];
  redoStack: GameProject[];
}

export interface SelectionInfo {
  entityId: string;
  entity: EditorEntity;
}
