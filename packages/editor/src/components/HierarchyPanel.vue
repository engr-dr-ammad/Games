<template>
  <div class="hierarchy-panel">
    <div class="panel-header">
      <h3>🌳 Scene Hierarchy</h3>
      <div class="header-buttons">
        <button @click="addEntity" title="Add Entity" class="btn-sm">+</button>
      </div>
    </div>

    <div class="entity-tree">
      <div v-for="entity in rootEntities" :key="entity.id">
        <EntityTreeNode :entity="entity" />
      </div>
    </div>

    <div v-if="rootEntities.length === 0" class="empty">
      <p>No entities in scene</p>
      <button @click="addEntity" class="btn-primary">Add Entity</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { editorStore } from '../stores/editorStore';
import EntityTreeNode from './EntityTreeNode.vue';

const rootEntities = computed(() => editorStore.getRootEntities());

const addEntity = () => {
  const entity = editorStore.addEntity('New Entity', 'model');
  editorStore.selectEntity(entity.id);
};
</script>

<style scoped>
.hierarchy-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #16213e;
  border-right: 1px solid #0f3460;
  color: #eee;
  font-size: 13px;
  overflow: hidden;
}

.panel-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border-bottom: 1px solid #0f3460;
  background: #1a1a2e;
}

.panel-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.header-buttons {
  display: flex;
  gap: 4px;
}

.btn-sm {
  background: #4a90e2;
  color: white;
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.btn-sm:hover {
  background: #357abd;
}

.entity-tree {
  flex: 1;
  overflow-y: auto;
  padding: 4px 0;
}

.empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #888;
  gap: 12px;
}

.empty p {
  margin: 0;
  font-size: 12px;
}

.btn-primary {
  background: #4a90e2;
  color: white;
  border: none;
  padding: 6px 12px;
  border-radius: 3px;
  cursor: pointer;
  font-size: 12px;
}

.btn-primary:hover {
  background: #357abd;
}
</style>
