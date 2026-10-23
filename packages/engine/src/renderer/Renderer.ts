import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  CanvasTexture,
  Color,
} from 'three';

export class Renderer {
  private renderer: WebGLRenderer;
  private scene: Scene;
  private camera: PerspectiveCamera;
  private canvas: HTMLCanvasElement;
  private width: number;
  private height: number;

  constructor(canvas: HTMLCanvasElement, scene: Scene) {
    this.canvas = canvas;
    this.scene = scene;
    this.width = canvas.clientWidth || 1024;
    this.height = canvas.clientHeight || 768;

    // Initialize Three.js renderer
    this.renderer = new WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setClearColor(new Color(0x1a1a2e));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = 1; // PCFShadowMap

    // Initialize camera
    this.camera = new PerspectiveCamera(
      75,
      this.width / this.height,
      0.1,
      1000
    );
    this.camera.position.set(0, 5, 10);
    this.camera.lookAt(0, 0, 0);

    // Handle window resize
    this.setupResizeListener();
  }

  private setupResizeListener(): void {
    window.addEventListener('resize', () => {
      const width = this.canvas.clientWidth;
      const height = this.canvas.clientHeight;
      if (width > 0 && height > 0) {
        this.resize(width, height);
      }
    });
  }

  public render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  public resize(width: number, height: number): void {
    this.width = width;
    this.height = height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  public getCamera(): PerspectiveCamera {
    return this.camera;
  }

  public getRenderer(): WebGLRenderer {
    return this.renderer;
  }

  public getScene(): Scene {
    return this.scene;
  }

  public dispose(): void {
    this.renderer.dispose();
  }

  public takeScreenshot(): string {
    return this.canvas.toDataURL('image/png');
  }
}
