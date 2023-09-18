<template>
  <div class="q-pa-md row justify-center">
    <div
      style="width: 100%; max-width: 1600px"
      v-for="(message, index) in messageList"
      :key="index"
    >
      <q-chat-message :text="[message]" sent />
      <q-chat-message :text="['GPT']" />
    </div>
    <q-input rounded outlined v-model="message">
      <template v-slot:append>
        <q-avatar @click="sendMessage">
          <q-icon name="send" />
        </q-avatar>
      </template>
    </q-input>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const messageList = ref([]);
const message = ref('');
const sendMessage = () => {
  messageList.value.push(message.value);
  message.value = '';
};
</script>
