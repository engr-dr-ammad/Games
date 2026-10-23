import { Vector3 } from 'three';
import { RaycastResult, RigidBodyConfig } from '../types';

export class RigidBody {
  public id: string;
  public mass: number;
  public velocity: Vector3;
  public angularVelocity: Vector3;
  public position: Vector3;
  public rotation: Vector3;
  public friction: number;
  public restitution: number;
  public shape: string;
  public size: Vector3;
  public isKinematic: boolean;

  constructor(config: RigidBodyConfig) {
    this.id = Math.random().toString(36).substr(2, 9);
    this.mass = config.mass;
    this.shape = config.shape;
    this.size = config.size || new Vector3(1, 1, 1);
    this.friction = config.friction ?? 0.5;
    this.restitution = config.restitution ?? 0.3;
    this.velocity = new Vector3();
    this.angularVelocity = new Vector3();
    this.position = new Vector3();
    this.rotation = new Vector3();
    this.isKinematic = this.mass === 0;
  }

  public applyForce(force: Vector3): void {
    if (this.isKinematic) return;
    this.velocity.add(force.multiplyScalar(1 / this.mass));
  }

  public applyImpulse(impulse: Vector3): void {
    if (this.isKinematic) return;
    this.velocity.add(impulse.multiplyScalar(1 / this.mass));
  }

  public setVelocity(velocity: Vector3): void {
    this.velocity.copy(velocity);
  }
}

export class PhysicsWorld {
  private rigidBodies: Map<string, RigidBody>;
  private gravity: Vector3;
  private timeStep: number;
  private damping: number;

  constructor(gravity: Vector3 = new Vector3(0, -9.81, 0)) {
    this.rigidBodies = new Map();
    this.gravity = gravity;
    this.timeStep = 1 / 60; // 60 FPS
    this.damping = 0.98;
  }

  public createRigidBody(config: RigidBodyConfig): RigidBody {
    const body = new RigidBody(config);
    this.rigidBodies.set(body.id, body);
    return body;
  }

  public removeRigidBody(id: string): void {
    this.rigidBodies.delete(id);
  }

  public getRigidBody(id: string): RigidBody | undefined {
    return this.rigidBodies.get(id);
  }

  public step(deltaTime: number): void {
    const dt = Math.min(deltaTime, this.timeStep);

    this.rigidBodies.forEach((body) => {
      if (body.isKinematic) return;

      // Apply gravity
      body.velocity.add(this.gravity.clone().multiplyScalar(dt));

      // Apply damping
      body.velocity.multiplyScalar(this.damping);

      // Update position
      body.position.add(body.velocity.clone().multiplyScalar(dt));

      // Simple ground collision
      if (body.position.y < -10) {
        body.position.y = -10;
        body.velocity.y = 0;
      }

      // Simple wall collisions
      const halfSize = body.size.clone().multiplyScalar(0.5);
      if (body.position.x < -50 + halfSize.x) {
        body.position.x = -50 + halfSize.x;
        body.velocity.x = 0;
      }
      if (body.position.x > 50 - halfSize.x) {
        body.position.x = 50 - halfSize.x;
        body.velocity.x = 0;
      }
      if (body.position.z < -50 + halfSize.z) {
        body.position.z = -50 + halfSize.z;
        body.velocity.z = 0;
      }
      if (body.position.z > 50 - halfSize.z) {
        body.position.z = 50 - halfSize.z;
        body.velocity.z = 0;
      }
    });
  }

  public raycast(
    origin: Vector3,
    direction: Vector3,
    maxDistance: number = 1000
  ): RaycastResult {
    // Simple raycast implementation
    let closest: RaycastResult = { hit: false };
    let minDistance = maxDistance;

    this.rigidBodies.forEach((body) => {
      const toBody = body.position.clone().sub(origin);
      const distanceToBody = toBody.length();

      if (distanceToBody < minDistance) {
        const bodyRadius = body.size.length() * 0.5;
        if (distanceToBody < bodyRadius) {
          closest = {
            hit: true,
            point: body.position.clone(),
            distance: distanceToBody,
            entity: body.id,
          };
          minDistance = distanceToBody;
        }
      }
    });

    return closest;
  }

  public setGravity(gravity: Vector3): void {
    this.gravity.copy(gravity);
  }

  public dispose(): void {
    this.rigidBodies.clear();
  }
}
