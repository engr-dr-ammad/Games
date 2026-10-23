// Simple Lua-like script VM for kid-friendly scripting
// This is a simplified implementation - in production, integrate a proper Lua VM

export interface GameScript {
  id: string;
  name: string;
  code: string;
  instance: any;
}

export class ScriptVM {
  private scripts: Map<string, GameScript>;
  private globalContext: Record<string, any>;
  private hooks: Map<string, Function[]>;

  constructor() {
    this.scripts = new Map();
    this.hooks = new Map();
    this.globalContext = {};
    this.setupGlobalFunctions();
  }

  private setupGlobalFunctions(): void {
    // Print function
    this.globalContext.print = (...args: any[]) => {
      console.log('[Script]', ...args);
    };

    // Math functions
    this.globalContext.math = {
      sin: Math.sin,
      cos: Math.cos,
      tan: Math.tan,
      sqrt: Math.sqrt,
      abs: Math.abs,
      floor: Math.floor,
      ceil: Math.ceil,
      random: Math.random,
      pi: Math.PI,
    };

    // Wait function
    this.globalContext.wait = (ms: number) => {
      return new Promise((resolve) => setTimeout(resolve, ms));
    };
  }

  public createScript(name: string, code: string): GameScript {
    const script: GameScript = {
      id: Math.random().toString(36).substr(2, 9),
      name,
      code,
      instance: null,
    };

    this.scripts.set(script.id, script);
    return script;
  }

  public executeScript(scriptId: string, context: Record<string, any> = {}): void {
    const script = this.scripts.get(scriptId);
    if (!script) {
      console.warn(`Script ${scriptId} not found`);
      return;
    }

    const mergedContext = { ...this.globalContext, ...context };

    try {
      // Create a function from the script code
      const fn = new Function(...Object.keys(mergedContext), script.code);
      script.instance = fn(...Object.values(mergedContext));
    } catch (error) {
      console.error(`Error executing script ${script.name}:`, error);
    }
  }

  public registerHook(eventName: string, callback: Function): void {
    if (!this.hooks.has(eventName)) {
      this.hooks.set(eventName, []);
    }
    this.hooks.get(eventName)!.push(callback);
  }

  public fireHook(eventName: string, ...args: any[]): void {
    const callbacks = this.hooks.get(eventName);
    if (callbacks) {
      callbacks.forEach((cb) => {
        try {
          cb(...args);
        } catch (error) {
          console.error(`Error in hook ${eventName}:`, error);
        }
      });
    }
  }

  public update(deltaTime: number): void {
    this.fireHook('update', deltaTime);
  }

  public dispose(): void {
    this.scripts.clear();
    this.hooks.clear();
  }
}
