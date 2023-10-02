<template>
  <q-list bordered class="rounded-borders q-ma-md" v-if="getById.length > 0">
    <div v-for="(student, index) in getById" :key="index">
      <q-separator inset v-if="index !== 0" />
      <q-item>
        <q-item-section avatar>
          <q-avatar>
            <img :src="student.avatar" />
          </q-avatar>
        </q-item-section>

        <q-item-section class="col-2 gt-sm">
          <q-item-label class="q-mt-sm">{{ student.name }}</q-item-label>
        </q-item-section>

        <q-item-section>
          <q-item-label lines="1">
            <span class="text-weight-medium">{{ student.Q }}</span>
          </q-item-label>
          <q-item-label caption lines="1">
            {{ student.A }}
          </q-item-label>
        </q-item-section>
        <q-item-section>
          <q-item-label lines="1">
            <span class="text-grey-8"> {{ student.time }}</span>
          </q-item-label>
        </q-item-section>
        <q-item-section side>
          <div class="text-grey-8 q-gutter-xs">
            <q-btn class="gt-xs" size="12px" flat dense round icon="done" />
            <q-btn class="gt-xs" size="12px" flat dense round icon="delete" />
            <q-btn color="primary" size="12px" label="已回覆過" />
          </div>
        </q-item-section>
      </q-item></div
  ></q-list>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';
import { ref, computed } from 'vue';
const route = useRoute();
const id = route.params.id;
const QAs = ref([
  {
    name: '加薪',
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    Q: '聖言樓代號',
    A: 'Gpt',
    time: '5 min ago',
    id: '0',
  },
  {
    name: '加薪',
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    Q: '利瑪竇代號',
    A: 'Gpt',
    time: '5 hour ago',
    id: '1',
  },
  {
    name: '美樂蒂',
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
    Q: '輔大校長？',
    A: 'Gpt',
    time: '6 hour ago',
    id: '2',
  },
]);
const getById = computed(() => {
  return QAs.value.filter((x) => x.id === id);
});
</script>
