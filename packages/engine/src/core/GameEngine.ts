import { Scene } from 'three';
import { Renderer } from '../renderer/Renderer';
import { PhysicsWorld } from '../physics/PhysicsWorld';
import { ScriptVM } from '../scripting/ScriptVM';
import { EntityManager } from '../entities/EntityManager';
import { GameConfig, GameState } from '../types';

export class GameEngine {
  private renderer: Renderer;
  private physics: PhysicsWorld;
  private scriptVM: ScriptVM;
  private entityManager: EntityManager;
  private scene: Scene;
  private running: boolean = false;
  private frameRate: number = 60;
  private deltaTime: number = 0;
  private lastFrameTime: number = 0;
  private config: GameConfig;

  constructor(canvas: HTMLCanvasElement, config: GameConfig) {
    this.config = config;
    this.scene = new Scene();
    this.renderer = new Renderer(canvas, this.scene);
    this.physics = new PhysicsWorld();
    this.scriptVM = new ScriptVM();
    this.entityManager = new EntityManager(this.scene);

    this.setupDefaultScene();
  }

  private setupDefaultScene(): void {
    // Add default lighting
    const ambientLight = new (require('three').AmbientLight)(0xffffff, 0.6);
    this.scene.add(ambientLight);

    const directionalLight = new (require('three').DirectionalLight)(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    this.scene.add(directionalLight);

    // Add default camera
    const camera = this.renderer.getCamera();
    camera.position.set(0, 5, 10);
    camera.lookAt(0, 0, 0);
  }

  public start(): void {
    if (this.running) return;
    this.running = true;
    this.lastFrameTime = performance.now();
    this.gameLoop();
  }

  public stop(): void {
    this.running = false;
  }

  private gameLoop = (): void => {
    if (!this.running) return;

    const now = performance.now();
    this.deltaTime = Math.min((now - this.lastFrameTime) / 1000, 0.016); // Cap at ~60fps
    this.lastFrameTime = now;

    this.update(this.deltaTime);
    this.renderer.render();

    requestAnimationFrame(this.gameLoop);
  };

  private update(dt: number): void {
    // Update physics
    this.physics.step(dt);

    // Update entities
    this.entityManager.update(dt);

    // Update scripts
    this.scriptVM.update(dt);

    // Sync physics to entities
    this.entityManager.syncPhysics();
  }

  public createEntity(name: string, type: string = 'model') {
    return this.entityManager.createEntity(name, type);
  }

  public getScene(): Scene {
    return this.scene;
  }

  public getPhysics(): PhysicsWorld {
    return this.physics;
  }

  public getScriptVM(): ScriptVM {
    return this.scriptVM;
  }

  public getEntityManager(): EntityManager {
    return this.entityManager;
  }

  public getDeltaTime(): number {
    return this.deltaTime;
  }

  public resize(width: number, height: number): void {
    this.renderer.resize(width, height);
  }

  public dispose(): void {
    this.stop();
    this.renderer.dispose();
    this.physics.dispose();
    this.scriptVM.dispose();
  }
}
