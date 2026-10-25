<template>
  <div class="entity-node">
    <div
      class="node-content"
      :class="{ selected: isSelected }"
      @click="selectNode"
    >
      <button v-if="hasChildren" @click.stop="toggleExpanded" class="expand-btn">
        {{ expanded ? '▼' : '▶' }}
      </button>
      <span v-else class="expand-placeholder"></span>
      <span class="entity-icon">📦</span>
      <span class="entity-name">{{ entity.name }}</span>
      <button @click.stop="deleteNode" class="btn-delete" title="Delete">
        🗑️
      </button>
    </div>

    <div v-show="expanded" v-if="hasChildren" class="children">
      <EntityTreeNode v-for="child in children" :key="child.id" :entity="child" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { EditorEntity } from '../types';
import { editorStore } from '../stores/editorStore';

const props = defineProps<{
  entity: EditorEntity;
}>();

const expanded = ref(false);

const isSelected = computed(() => editorStore.editorState.selectedEntityId === props.entity.id);

const hasChildren = computed(() => props.entity.children.length > 0);

const children = computed(() =>
  props.entity.children.map((id) => editorStore.getEntity(id)!).filter(Boolean)
);

const toggleExpanded = () => {
  expanded.value = !expanded.value;
};

const selectNode = () => {
  editorStore.selectEntity(props.entity.id);
};

const deleteNode = () => {
  if (confirm(`Delete ${props.entity.name}?`)) {
    editorStore.deleteEntity(props.entity.id);
  }
};
</script>

<style scoped>
.entity-node {
  user-select: none;
}

.node-content {
  display: flex;
  align-items: center;
  padding: 4px 8px;
  cursor: pointer;
  gap: 4px;
  border-left: 3px solid transparent;
  transition: all 0.2s;
}

.node-content:hover {
  background: rgba(74, 144, 226, 0.1);
}

.node-content.selected {
  background: rgba(74, 144, 226, 0.3);
  border-left-color: #4a90e2;
}

.expand-btn {
  width: 20px;
  height: 20px;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  color: #aaa;
  font-size: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.expand-btn:hover {
  color: #4a90e2;
}

.expand-placeholder {
  width: 20px;
}

.entity-icon {
  font-size: 12px;
}

.entity-name {
  flex: 1;
  font-size: 12px;
  color: #ddd;
}

.btn-delete {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  color: #888;
  font-size: 12px;
  opacity: 0;
  transition: opacity 0.2s;
}

.node-content:hover .btn-delete {
  opacity: 1;
}

.btn-delete:hover {
  color: #e74c3c;
}

.children {
  padding-left: 8px;
  border-left: 1px solid #0f3460;
  margin-left: 10px;
}
</style>
