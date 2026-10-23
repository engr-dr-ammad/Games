import { Scene } from 'three';
import { Entity } from './Entity';
import { EntityConfig } from '../types';

export class EntityManager {
  private entities: Map<string, Entity>;
  private scene: Scene;
  private rootEntities: Entity[] = [];

  constructor(scene: Scene) {
    this.entities = new Map();
    this.scene = scene;
  }

  public createEntity(name: string, type: string = 'model', config?: EntityConfig): Entity {
    const entityConfig: EntityConfig = config || { name, type };
    const mesh = Entity.createMesh(entityConfig);
    const entity = new Entity(name, type, mesh);

    this.entities.set(entity.id, entity);
    this.rootEntities.push(entity);
    this.scene.add(mesh);

    return entity;
  }

  public getEntity(id: string): Entity | undefined {
    return this.entities.get(id);
  }

  public getEntitiesByName(name: string): Entity[] {
    return Array.from(this.entities.values()).filter((e) => e.name === name);
  }

  public getEntitiesByType(type: string): Entity[] {
    return Array.from(this.entities.values()).filter((e) => e.type === type);
  }

  public deleteEntity(id: string): void {
    const entity = this.entities.get(id);
    if (!entity) return;

    // Remove from parent
    if (entity.parent) {
      entity.parent.removeChild(entity);
    } else {
      const index = this.rootEntities.indexOf(entity);
      if (index > -1) {
        this.rootEntities.splice(index, 1);
      }
    }

    // Remove from scene
    this.scene.remove(entity.object3d);

    // Remove children
    entity.children.forEach((child) => {
      this.deleteEntity(child.id);
    });

    // Cleanup
    entity.dispose();
    this.entities.delete(id);
  }

  public update(dt: number): void {
    this.entities.forEach((entity) => {
      if (!entity.active) return;

      // Update from physics if has rigidbody
      if (entity.rigidBody) {
        entity.object3d.position.copy(entity.rigidBody.position);
      }
    });
  }

  public syncPhysics(): void {
    // Sync Three.js objects with physics
    this.entities.forEach((entity) => {
      if (entity.rigidBody) {
        entity.rigidBody.position.copy(entity.object3d.position);
      }
    });
  }

  public getAllEntities(): Entity[] {
    return Array.from(this.entities.values());
  }

  public getRootEntities(): Entity[] {
    return [...this.rootEntities];
  }

  public clear(): void {
    this.entities.forEach((entity) => {
      this.scene.remove(entity.object3d);
      entity.dispose();
    });
    this.entities.clear();
    this.rootEntities = [];
  }

  public dispose(): void {
    this.clear();
  }
}
