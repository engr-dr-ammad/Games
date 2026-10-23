import { Object3D, Mesh, BoxGeometry, SphereGeometry, MeshStandardMaterial, Vector3 } from 'three';
import { RigidBody } from '../physics/PhysicsWorld';
import { EntityConfig } from '../types';

export class Entity {
  public id: string;
  public name: string;
  public type: string;
  public object3d: Object3D;
  public rigidBody?: RigidBody;
  public scripts: string[] = [];
  public parent?: Entity;
  public children: Entity[] = [];
  public active: boolean = true;
  public visible: boolean = true;

  constructor(name: string, type: string, object3d: Object3D) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.name = name;
    this.type = type;
    this.object3d = object3d;
    object3d.userData.entity = this;
  }

  public static createMesh(config: EntityConfig): Mesh {
    let geometry;
    const size = config.rigidBody?.size || new Vector3(1, 1, 1);

    switch (config.rigidBody?.shape) {
      case 'sphere':
        geometry = new SphereGeometry(size.x, 32, 32);
        break;
      case 'box':
      default:
        geometry = new BoxGeometry(size.x, size.y, size.z);
    }

    const material = new MeshStandardMaterial({
      color: 0x4a90e2,
      metalness: 0.3,
      roughness: 0.7,
    });

    const mesh = new Mesh(geometry, material);
    mesh.castShadow = true;
    mesh.receiveShadow = true;

    if (config.transform?.position) {
      mesh.position.copy(config.transform.position);
    }
    if (config.transform?.scale) {
      mesh.scale.copy(config.transform.scale);
    }

    return mesh;
  }

  public addChild(entity: Entity): void {
    this.children.push(entity);
    entity.parent = this;
    this.object3d.add(entity.object3d);
  }

  public removeChild(entity: Entity): void {
    const index = this.children.indexOf(entity);
    if (index > -1) {
      this.children.splice(index, 1);
      entity.parent = undefined;
      this.object3d.remove(entity.object3d);
    }
  }

  public setPosition(x: number, y: number, z: number): void {
    this.object3d.position.set(x, y, z);
    if (this.rigidBody) {
      this.rigidBody.position.set(x, y, z);
    }
  }

  public setRotation(x: number, y: number, z: number): void {
    this.object3d.rotation.order = 'XYZ';
    this.object3d.rotation.set(x, y, z);
  }

  public setScale(x: number, y: number, z: number): void {
    this.object3d.scale.set(x, y, z);
  }

  public getPosition(): Vector3 {
    return this.object3d.position.clone();
  }

  public getRotation(): Vector3 {
    return new Vector3(
      this.object3d.rotation.x,
      this.object3d.rotation.y,
      this.object3d.rotation.z
    );
  }

  public getScale(): Vector3 {
    return this.object3d.scale.clone();
  }

  public addScript(scriptId: string): void {
    if (!this.scripts.includes(scriptId)) {
      this.scripts.push(scriptId);
    }
  }

  public removeScript(scriptId: string): void {
    const index = this.scripts.indexOf(scriptId);
    if (index > -1) {
      this.scripts.splice(index, 1);
    }
  }

  public setActive(active: boolean): void {
    this.active = active;
    this.visible = active;
    this.object3d.visible = active;
  }

  public dispose(): void {
    if (this.object3d instanceof Mesh) {
      if (this.object3d.geometry) this.object3d.geometry.dispose();
      if (this.object3d.material) {
        const materials = Array.isArray(this.object3d.material)
          ? this.object3d.material
          : [this.object3d.material];
        materials.forEach((mat) => mat.dispose());
      }
    }
  }
}
