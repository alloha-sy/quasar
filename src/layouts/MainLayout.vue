<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> Qampus</q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>
      </q-list>
      <div v-if="logIn">
        <template v-for="menuItem in menuListFilter" :key="menuItem.label">
          <q-item :to="menuItem.label">
            <q-item-section avatar>
              <q-icon :name="menuItem.icon" />
            </q-item-section>
            <q-item-section>
              {{ menuItem.label }}
            </q-item-section>
          </q-item>
        </template>
      </div>
      <q-list>
        <q-item clickable @click="logIn = !logIn" v-if="logIn">
          <q-item-section avatar>
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section> logOut </q-item-section>
        </q-item>
        <q-item clickable @click="confirm = true" v-else>
          <q-item-section avatar>
            <q-icon name="login" />
          </q-item-section>
          <q-item-section> logIn </q-item-section>
        </q-item>
      </q-list>
      <button @click="logIn = !logIn">{{ logIn }}</button>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
  <!-- popup -->
  <q-dialog v-model="confirm" persistent>
    <q-card>
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6">LogIn</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>
      <q-card-section class="row items-center q-pb-none">
        <q-input
          filled
          v-model="account"
          label="Your account *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type your account',
          ]"
        />
      </q-card-section>
      <q-card-section class="row items-center q-pb-none q-pt-none">
        <q-input
          filled
          type="password"
          v-model="password"
          label="Your password *"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Please type your password',
          ]"
        />
      </q-card-section>
      <q-card-actions align="center">
        <q-btn flat label="Cancel" color="primary" v-close-popup />
        <q-btn
          flat
          label="LogIn"
          color="primary"
          @click="logInCheck"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed } from 'vue';

const account = ref('');
const password = ref('');
const confirm = ref(false);
const logIn = ref(false);
const user = ref('');
const menuList = ref([
  {
    icon: 'chat',
    label: 'ChatRoom',
  },
  {
    icon: 'public',
    label: 'QA',
  },
  {
    icon: 'record_voice_over',
    label: 'Secretary',
  },
]);
const users = ref([
  {
    account: '001',
    password: '111',
    access: 'user',
  },
  {
    account: '002',
    password: '222',
    access: 'Secretary',
  },
]);

const menuListFilter = computed(() => {
  return user.value.access !== 'Secretary'
    ? menuList.value.filter((menuItem) => menuItem.label !== 'Secretary')
    : menuList.value;
});

const logInCheck = () => {
  user.value = users.value.find((user) => user.account === account.value);
  account.value = '';
  if (!user.value) {
    password.value = '';
    window.alert('ACCOUNT NOT FOUND');
    return;
  } else if (user.value.password !== password.value) {
    password.value = '';
    window.alert('PASSWORD NOT FOUND');
    return;
  } else {
    password.value = '';
    logIn.value = true;
  }
};
const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
