<template>
  <div class="app">
    <header class="app-header">
      <div class="logo">🎮 Games Editor</div>
      <div class="title">{{ editorStore.project.name }}</div>
      <div class="header-controls">
        <button @click="newGame" class="btn-header">📄 New</button>
        <button @click="saveGame" class="btn-header">💾 Save</button>
        <button @click="loadGame" class="btn-header">📂 Load</button>
        <span v-if="editorStore.editorState.modified" class="modified-indicator">*</span>
      </div>
    </header>

    <div class="editor-layout">
      <div class="left-panel">
        <HierarchyPanel />
      </div>

      <div class="main-content">
        <SceneEditor />
      </div>

      <div class="right-panel">
        <PropertyPanel />
      </div>
    </div>

    <footer class="app-footer">
      <div class="status">
        <span>Entities: {{ entityCount }}</span>
        <span>|</span>
        <span v-if="editorStore.editorState.playMode" class="playing">▶ Playing</span>
        <span v-else>Ready</span>
      </div>
    </footer>

    <input
      ref="fileInput"
      type="file"
      accept=".json"
      style="display: none"
      @change="handleFileLoad"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { editorStore } from './stores/editorStore';
import SceneEditor from './components/SceneEditor.vue';
import HierarchyPanel from './components/HierarchyPanel.vue';
import PropertyPanel from './components/PropertyPanel.vue';

const fileInput = ref<HTMLInputElement | null>(null);

const entityCount = computed(() => editorStore.project.entities.length);

const newGame = () => {
  if (editorStore.editorState.modified) {
    if (!confirm('Unsaved changes. Create new game?')) return;
  }
  editorStore.newProject();
};

const saveGame = () => {
  const json = editorStore.saveProject(editorStore.project.name);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${editorStore.project.name}.json`;
  a.click();
  URL.revokeObjectURL(url);
};

const loadGame = () => {
  fileInput.value?.click();
};

const handleFileLoad = (e: Event) => {
  const target = e.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    const json = event.target?.result as string;
    if (editorStore.loadProject(json)) {
      console.log('Game loaded successfully');
    } else {
      alert('Failed to load game');
    }
  };
  reader.readAsText(file);

  // Reset input
  target.value = '';
};
</script>

<style scoped>
.app {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  background: #0f0f1e;
  color: #eee;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #1a1a2e;
  border-bottom: 1px solid #0f3460;
  padding: 12px 20px;
  gap: 20px;
  height: 60px;
}

.logo {
  font-size: 18px;
  font-weight: 700;
  color: #4a90e2;
  min-width: fit-content;
}

.title {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #aaa;
}

.header-controls {
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-header {
  background: #4a90e2;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
  transition: all 0.2s;
}

.btn-header:hover {
  background: #357abd;
  transform: translateY(-1px);
}

.btn-header:active {
  transform: translateY(0);
}

.modified-indicator {
  color: #f39c12;
  font-size: 16px;
}

.editor-layout {
  display: flex;
  flex: 1;
  overflow: hidden;
  gap: 0;
}

.left-panel {
  width: 280px;
  min-width: 200px;
  max-width: 400px;
  border-right: 1px solid #0f3460;
  overflow: hidden;
}

.main-content {
  flex: 1;
  display: flex;
  overflow: hidden;
}

.right-panel {
  width: 300px;
  min-width: 250px;
  max-width: 500px;
  border-left: 1px solid #0f3460;
  overflow: hidden;
}

.app-footer {
  background: #1a1a2e;
  border-top: 1px solid #0f3460;
  padding: 8px 20px;
  font-size: 12px;
  color: #888;
  display: flex;
  justify-content: space-between;
  height: 36px;
  align-items: center;
}

.status {
  display: flex;
  gap: 8px;
  align-items: center;
}

.playing {
  color: #27ae60;
  font-weight: 600;
}

/* Scrollbar styling */
:deep(::-webkit-scrollbar) {
  width: 8px;
  height: 8px;
}

:deep(::-webkit-scrollbar-track) {
  background: #16213e;
}

:deep(::-webkit-scrollbar-thumb) {
  background: #0f3460;
  border-radius: 4px;
}

:deep(::-webkit-scrollbar-thumb:hover) {
  background: #1a5db0;
}
</style>
