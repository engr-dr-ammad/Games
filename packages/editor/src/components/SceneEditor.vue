<template>
  <div class="scene-editor">
    <canvas ref="canvas" class="viewport"></canvas>
    <div class="toolbar">
      <button @click="addCube" class="btn-icon" title="Add Cube (C)">
        📦
      </button>
      <button @click="addSphere" class="btn-icon" title="Add Sphere (S)">
        ⚽
      </button>
      <button @click="playTest" class="btn-play" :class="{ playing: isPlaying }">
        {{ isPlaying ? '⏸ Stop' : '▶ Play' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { GameEngine, Entity } from '@games/engine';
import { Vector3 } from 'three';
import { editorStore } from '../stores/editorStore';

const canvas = ref<HTMLCanvasElement | null>(null);
let engine: GameEngine | null = null;
const isPlaying = ref(false);
const entities = new Map<string, Entity>();

const initEngine = () => {
  if (!canvas.value) return;

  engine = new GameEngine(canvas.value, {
    width: canvas.value.clientWidth,
    height: canvas.value.clientHeight,
    gravity: new Vector3(...editorStore.project.settings.gravity),
  });

  // Load entities from project
  editorStore.project.entities.forEach((editorEntity) => {
    const gameEntity = engine!.createEntity(editorEntity.name, editorEntity.type);
    gameEntity.setPosition(
      editorEntity.transform.position[0],
      editorEntity.transform.position[1],
      editorEntity.transform.position[2]
    );
    gameEntity.setRotation(
      editorEntity.transform.rotation[0],
      editorEntity.transform.rotation[1],
      editorEntity.transform.rotation[2]
    );
    gameEntity.setScale(
      editorEntity.transform.scale[0],
      editorEntity.transform.scale[1],
      editorEntity.transform.scale[2]
    );

    entities.set(editorEntity.id, gameEntity);

    // Add click selection
    gameEntity.object3d.userData.editorEntityId = editorEntity.id;
  });

  engine.start();
};

const addCube = () => {
  const entity = editorStore.addEntity('Cube', 'model');
  if (engine) {
    const gameEntity = engine.createEntity(entity.name, entity.type);
    gameEntity.setPosition(
      entity.transform.position[0],
      entity.transform.position[1],
      entity.transform.position[2]
    );
    entities.set(entity.id, gameEntity);
  }
};

const addSphere = () => {
  const entity = editorStore.addEntity('Sphere', 'model');
  entity.rigidBody!.shape = 'sphere';
  if (engine) {
    const gameEntity = engine.createEntity(entity.name, 'model');
    gameEntity.setPosition(
      entity.transform.position[0],
      entity.transform.position[1],
      entity.transform.position[2]
    );
    entities.set(entity.id, gameEntity);
  }
};

const playTest = () => {
  if (!engine) return;

  if (isPlaying.value) {
    engine.stop();
    isPlaying.value = false;
    editorStore.setPlayMode(false);
  } else {
    engine.start();
    isPlaying.value = true;
    editorStore.setPlayMode(true);
  }
};

const handleKeydown = (e: KeyboardEvent) => {
  if (e.key === 'c' || e.key === 'C') addCube();
  if (e.key === 's' || e.key === 'S') addSphere();
  if (e.key === ' ') {
    e.preventDefault();
    playTest();
  }
};

const handleResize = () => {
  if (!canvas.value || !engine) return;
  engine.resize(canvas.value.clientWidth, canvas.value.clientHeight);
};

onMounted(() => {
  initEngine();
  window.addEventListener('keydown', handleKeydown);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown);
  window.removeEventListener('resize', handleResize);
  if (engine) {
    engine.dispose();
  }
});
</script>

<style scoped>
.scene-editor {
  position: relative;
  width: 100%;
  height: 100%;
  background: #1a1a2e;
  overflow: hidden;
}

.viewport {
  display: block;
  width: 100%;
  height: 100%;
}

.toolbar {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  gap: 8px;
  background: rgba(0, 0, 0, 0.5);
  padding: 8px;
  border-radius: 6px;
}

.btn-icon,
.btn-play {
  background: #4a90e2;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.2s;
}

.btn-icon:hover,
.btn-play:hover {
  background: #357abd;
  transform: scale(1.05);
}

.btn-play.playing {
  background: #e74c3c;
}

.btn-icon:active,
.btn-play:active {
  transform: scale(0.95);
}
</style>
