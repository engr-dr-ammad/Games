<template>
  <div class="property-panel">
    <div class="panel-header">
      <h3>⚙️ Properties</h3>
    </div>

    <div v-if="selectedEntity" class="properties">
      <!-- Entity Name -->
      <div class="property-group">
        <label>Name</label>
        <input v-model="selectedEntity.name" type="text" class="input" />
      </div>

      <!-- Transform -->
      <div class="property-section">
        <h4>Transform</h4>

        <!-- Position -->
        <div class="property-group">
          <label>Position</label>
          <div class="vector-input">
            <div class="vec-field">
              <label class="vec-label">X</label>
              <input
                v-model.number="selectedEntity.transform.position[0]"
                type="number"
                step="0.1"
                class="input-small"
              />
            </div>
            <div class="vec-field">
              <label class="vec-label">Y</label>
              <input
                v-model.number="selectedEntity.transform.position[1]"
                type="number"
                step="0.1"
                class="input-small"
              />
            </div>
            <div class="vec-field">
              <label class="vec-label">Z</label>
              <input
                v-model.number="selectedEntity.transform.position[2]"
                type="number"
                step="0.1"
                class="input-small"
              />
            </div>
          </div>
        </div>

        <!-- Rotation -->
        <div class="property-group">
          <label>Rotation</label>
          <div class="vector-input">
            <div class="vec-field">
              <label class="vec-label">X</label>
              <input
                v-model.number="selectedEntity.transform.rotation[0]"
                type="number"
                step="0.05"
                class="input-small"
              />
            </div>
            <div class="vec-field">
              <label class="vec-label">Y</label>
              <input
                v-model.number="selectedEntity.transform.rotation[1]"
                type="number"
                step="0.05"
                class="input-small"
              />
            </div>
            <div class="vec-field">
              <label class="vec-label">Z</label>
              <input
                v-model.number="selectedEntity.transform.rotation[2]"
                type="number"
                step="0.05"
                class="input-small"
              />
            </div>
          </div>
        </div>

        <!-- Scale -->
        <div class="property-group">
          <label>Scale</label>
          <div class="vector-input">
            <div class="vec-field">
              <label class="vec-label">X</label>
              <input
                v-model.number="selectedEntity.transform.scale[0]"
                type="number"
                step="0.1"
                class="input-small"
              />
            </div>
            <div class="vec-field">
              <label class="vec-label">Y</label>
              <input
                v-model.number="selectedEntity.transform.scale[1]"
                type="number"
                step="0.1"
                class="input-small"
              />
            </div>
            <div class="vec-field">
              <label class="vec-label">Z</label>
              <input
                v-model.number="selectedEntity.transform.scale[2]"
                type="number"
                step="0.1"
                class="input-small"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Physics -->
      <div v-if="selectedEntity.rigidBody" class="property-section">
        <h4>Physics</h4>

        <div class="property-group">
          <label>Mass</label>
          <input
            v-model.number="selectedEntity.rigidBody.mass"
            type="number"
            step="0.1"
            class="input"
          />
        </div>

        <div class="property-group">
          <label>Shape</label>
          <select v-model="selectedEntity.rigidBody.shape" class="input">
            <option value="box">Box</option>
            <option value="sphere">Sphere</option>
            <option value="capsule">Capsule</option>
          </select>
        </div>

        <div class="property-group">
          <label>Friction</label>
          <input
            v-model.number="selectedEntity.rigidBody.friction"
            type="number"
            min="0"
            max="1"
            step="0.1"
            class="input"
          />
        </div>

        <div class="property-group">
          <label>Restitution</label>
          <input
            v-model.number="selectedEntity.rigidBody.restitution"
            type="number"
            min="0"
            max="1"
            step="0.1"
            class="input"
          />
        </div>
      </div>

      <!-- Other -->
      <div class="property-section">
        <h4>Other</h4>

        <div class="property-group">
          <label>
            <input v-model="selectedEntity.visible" type="checkbox" />
            Visible
          </label>
        </div>

        <div class="property-group">
          <label>
            <input v-model="selectedEntity.active" type="checkbox" />
            Active
          </label>
        </div>
      </div>
    </div>

    <div v-else class="empty">
      <p>Select an entity to edit properties</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { editorStore } from '../stores/editorStore';

const selectedEntity = computed(() => editorStore.selectedEntity.value);
</script>

<style scoped>
.property-panel {
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #16213e;
  border-left: 1px solid #0f3460;
  color: #eee;
  font-size: 12px;
  overflow: hidden;
}

.panel-header {
  padding: 12px;
  border-bottom: 1px solid #0f3460;
  background: #1a1a2e;
}

.panel-header h3 {
  margin: 0;
  font-size: 14px;
  font-weight: 600;
}

.properties {
  flex: 1;
  overflow-y: auto;
  padding: 12px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
}

.property-section {
  border-top: 1px solid #0f3460;
  padding-top: 12px;
}

.property-section h4 {
  margin: 0 0 8px 0;
  font-size: 11px;
  font-weight: 600;
  color: #4a90e2;
  text-transform: uppercase;
}

.property-group {
  display: flex;
  flex-direction: column;
  gap: 4px;
  margin-bottom: 8px;
}

.property-group label {
  font-size: 11px;
  font-weight: 500;
  color: #aaa;
}

.input,
.input-small {
  background: #0f3460;
  border: 1px solid #16213e;
  color: #ddd;
  padding: 6px 8px;
  border-radius: 3px;
  font-size: 11px;
  font-family: inherit;
}

.input-small {
  padding: 4px 6px;
  font-size: 10px;
}

.input:focus,
.input-small:focus {
  outline: none;
  border-color: #4a90e2;
  background: #1a1a2e;
}

.vector-input {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 4px;
}

.vec-field {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.vec-label {
  font-size: 10px;
  color: #888;
  font-weight: 600;
}

select {
  background: #0f3460;
  border: 1px solid #16213e;
  color: #ddd;
  padding: 6px 8px;
  border-radius: 3px;
  font-size: 11px;
}

select:focus {
  outline: none;
  border-color: #4a90e2;
}

input[type='checkbox'] {
  margin-right: 6px;
  cursor: pointer;
}
</style>
