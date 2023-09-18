<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list
      bordered
      class="rounded-borders"
      v-for="(message, index) in messageList"
      :key="index"
    >
      <q-expansion-item
        expand-separator
        icon="perm_identity"
        label="Account settings???"
        caption="John Doe"
      >
        <q-card>
          <q-card-section>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quidem,
            eius reprehenderit eos corrupti commodi magni quaerat ex numquam,
            dolorum officiis modi facere maiores architecto suscipit iste
            eveniet doloribus ullam aliquid.
          </q-card-section>
        </q-card>
      </q-expansion-item>
    </q-list>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const messageList = ref([12, 32, 2]);
const message = ref('');
</script>
