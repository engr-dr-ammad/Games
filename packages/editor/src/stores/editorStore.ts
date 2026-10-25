import { reactive, ref } from 'vue';
import { GameProject, EditorEntity, GameScript, EditorState } from '../types';

const generateId = () => Math.random().toString(36).substr(2, 9);

export const createEmptyProject = (): GameProject => ({
  version: '0.1.0',
  name: 'New Game',
  description: '',
  createdAt: new Date().toISOString(),
  lastModified: new Date().toISOString(),
  entities: [],
  scripts: [],
  settings: {
    gravity: [0, -9.81, 0],
    ambientLight: {
      color: 0xffffff,
      intensity: 0.6,
    },
  },
});

export const createEmptyEntity = (name: string, type: string = 'model'): EditorEntity => ({
  id: generateId(),
  name,
  type,
  children: [],
  transform: {
    position: [0, 1, 0],
    rotation: [0, 0, 0],
    scale: [1, 1, 1],
  },
  rigidBody: {
    mass: 1,
    shape: 'box',
    size: [1, 1, 1],
    friction: 0.5,
    restitution: 0.3,
  },
  scripts: [],
  visible: true,
  active: true,
});

export const createEmptyScript = (name: string): GameScript => ({
  id: generateId(),
  name,
  code: `-- ${name} script
print("Hello from ${name}!")`,
});

class EditorStore {
  project = reactive<GameProject>(createEmptyProject());
  editorState = reactive<EditorState>({
    selectedEntityId: undefined,
    playMode: false,
    modified: false,
    undoStack: [],
    redoStack: [],
  });

  selectedEntity = ref<EditorEntity | null>(null);

  constructor() {
    // Add default ground plane
    this.addEntity('Ground', 'model');
  }

  addEntity(name: string, type: string, parentId?: string): EditorEntity {
    const entity = createEmptyEntity(name, type);

    if (parentId) {
      const parent = this.getEntity(parentId);
      if (parent) {
        parent.children.push(entity.id);
        entity.parent = parentId;
      }
    }

    this.project.entities.push(entity);
    this.markModified();
    return entity;
  }

  deleteEntity(id: string): void {
    const entity = this.getEntity(id);
    if (!entity) return;

    // Delete children
    entity.children.forEach((childId) => this.deleteEntity(childId));

    // Remove from parent
    if (entity.parent) {
      const parent = this.getEntity(entity.parent);
      if (parent) {
        parent.children = parent.children.filter((cid) => cid !== id);
      }
    }

    // Remove from project
    this.project.entities = this.project.entities.filter((e) => e.id !== id);

    // Deselect if it was selected
    if (this.editorState.selectedEntityId === id) {
      this.selectEntity(undefined);
    }

    this.markModified();
  }

  getEntity(id: string): EditorEntity | undefined {
    return this.project.entities.find((e) => e.id === id);
  }

  selectEntity(id?: string): void {
    this.editorState.selectedEntityId = id;
    this.selectedEntity.value = id ? this.getEntity(id) || null : null;
  }

  updateEntity(id: string, updates: Partial<EditorEntity>): void {
    const entity = this.getEntity(id);
    if (!entity) return;

    Object.assign(entity, updates);
    this.markModified();
  }

  updateTransform(
    id: string,
    transform: Partial<EditorEntity['transform']>
  ): void {
    const entity = this.getEntity(id);
    if (!entity) return;

    Object.assign(entity.transform, transform);
    this.markModified();
  }

  addScript(name: string): GameScript {
    const script = createEmptyScript(name);
    this.project.scripts.push(script);
    this.markModified();
    return script;
  }

  deleteScript(id: string): void {
    this.project.scripts = this.project.scripts.filter((s) => s.id !== id);

    // Remove from entities
    this.project.entities.forEach((entity) => {
      entity.scripts = entity.scripts.filter((sid) => sid !== id);
    });

    this.markModified();
  }

  getScript(id: string): GameScript | undefined {
    return this.project.scripts.find((s) => s.id === id);
  }

  updateScript(id: string, code: string): void {
    const script = this.getScript(id);
    if (!script) return;

    script.code = code;
    this.markModified();
  }

  attachScriptToEntity(entityId: string, scriptId: string): void {
    const entity = this.getEntity(entityId);
    if (!entity || entity.scripts.includes(scriptId)) return;

    entity.scripts.push(scriptId);
    this.markModified();
  }

  detachScriptFromEntity(entityId: string, scriptId: string): void {
    const entity = this.getEntity(entityId);
    if (!entity) return;

    entity.scripts = entity.scripts.filter((sid) => sid !== scriptId);
    this.markModified();
  }

  getRootEntities(): EditorEntity[] {
    return this.project.entities.filter((e) => !e.parent);
  }

  getEntityChildren(parentId: string): EditorEntity[] {
    return this.project.entities.filter((e) => e.parent === parentId);
  }

  saveProject(name: string): string {
    this.project.name = name;
    this.project.lastModified = new Date().toISOString();
    const json = JSON.stringify(this.project, null, 2);
    return json;
  }

  loadProject(json: string): boolean {
    try {
      const loaded = JSON.parse(json);
      Object.assign(this.project, loaded);
      this.editorState.modified = false;
      return true;
    } catch (error) {
      console.error('Failed to load project:', error);
      return false;
    }
  }

  newProject(): void {
    this.project = reactive(createEmptyProject());
    this.editorState.selectedEntityId = undefined;
    this.selectedEntity.value = null;
    this.editorState.modified = false;
    this.addEntity('Ground', 'model');
  }

  markModified(): void {
    this.editorState.modified = true;
    this.project.lastModified = new Date().toISOString();
  }

  setPlayMode(playing: boolean): void {
    this.editorState.playMode = playing;
  }
}

export const editorStore = new EditorStore();
