<template>
  <q-list bordered class="rounded-borders q-ma-md" v-if="QAs.length > 0">
    <div v-for="(student, index) in QAs" :key="index">
      <q-separator inset v-if="index !== 0" />
      <router-link
        :to="`/Secretary/${index}`"
        style="text-decoration: none; color: black"
        ><q-item clickable v-ripple>
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
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="done"
                @click="popUp('done', student.Q, student.A, index)"
              />
              <q-btn
                class="gt-xs"
                size="12px"
                flat
                dense
                round
                icon="delete"
                @click="popUp('Delete', student.Q, student.A, index)"
              />
              <q-btn
                color="primary"
                size="12px"
                label="已回覆過"
                @click="
                  () => {
                    confirmAlready = !confirmAlready;
                    i = index;
                  }
                "
              />
            </div>
          </q-item-section> </q-item
      ></router-link>

      <q-dialog v-model="confirmCheck" persistent>
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">
              <strong>確定{{ popContent }}以下內容?</strong>
            </div>
            <q-space />
            <q-btn icon="close" flat round dense v-close-popup />
          </q-card-section>
          <q-card-section class="row items-center q-pb-none">
            Q: {{ popBody.Q }}</q-card-section
          >
          <q-card-section class="row items-center q-pb-none">
            A:{{ popBody.A }}</q-card-section
          >
          <q-card-actions align="center">
            <q-btn flat label="Cancel" color="primary" v-close-popup />
            <q-btn
              flat
              :label="popContent"
              color="primary"
              @click="popContent == '新增' ? done(i) : Delete(i)"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
        <!-- 已回覆popup -->
      </q-dialog>
      <q-dialog v-model="confirmAlready" persistent>
        <q-card>
          <q-card-section class="row items-center q-pb-none">
            <p class="text-h6">
              <strong>正解:</strong>
            </p>

            <q-space />
            <q-btn
              icon="close"
              flat
              round
              dense
              v-close-popup
              @click="confirmAlreadyCorrect = '請選取正解~'"
            />
          </q-card-section>
          <q-list
            ><q-item>
              <q-item-section>
                <q-item-label lines="1">
                  <span class="text-weight-medium">{{
                    confirmAlreadyCorrect.Q
                  }}</span>
                </q-item-label>
                <q-item-label caption lines="1">
                  {{ confirmAlreadyCorrect.A }}
                </q-item-label>
              </q-item-section>
            </q-item></q-list
          >
          <q-card-section class="row items-center q-pb-none">
            <div class="text-h6">
              <strong><p>推薦選項:</p></strong>
            </div>
          </q-card-section>
          <q-list v-for="(correct, index) in QAsCorrect" :key="index">
            <q-separator inset v-if="index > 0" />
            <q-item clickable v-ripple @click="confirmAlreadyCorrect = correct">
              <q-item-section>
                <q-item-label lines="1">
                  <span class="text-weight-medium">{{ correct.Q }}</span>
                </q-item-label>
                <q-item-label caption lines="1">
                  {{ correct.A }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-card-actions align="center">
            <q-btn
              flat
              label="Cancel"
              color="primary"
              v-close-popup
              @click="confirmAlreadyCorrect = '請選取正解~'"
            />
            <q-btn
              v-if="confirmAlreadyCorrect !== '請選取正解~'"
              flat
              label="確定"
              color="primary"
              @click="already(i)"
              v-close-popup
            />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </div>
  </q-list>
  <h3 v-else align="center">目前沒有待確認的問題~</h3>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const i = ref(-1);
const confirmAlready = ref(false);
const confirmAlreadyCorrect: any = ref('請選取正解~');
const confirmCheck = ref(false);
const popContent = ref('');
const popBody = ref({ Q: '', A: '' });
const QAs = ref([
  {
    name: '加薪',
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    Q: '聖言樓代號',
    A: 'Gpt',
    time: '5 min ago',
  },
  {
    name: '加薪',
    avatar: 'https://cdn.quasar.dev/img/avatar2.jpg',
    Q: '利瑪竇代號',
    A: 'Gpt',
    time: '5 hour ago',
  },
  {
    name: '美樂蒂',
    avatar: 'https://cdn.quasar.dev/img/avatar3.jpg',
    Q: '輔大校長？',
    A: 'Gpt',
    time: '6 hour ago',
  },
]);
const QAsCorrect = ref([
  { Q: '正解 聖言樓代號', A: 'SF', time: '5 min ago' },
  { Q: '利瑪竇代號', A: 'LM', time: '5 hour ago' },
  { Q: '輔大校長？', A: '藍易振', time: '6 hour ago' },
]);
const done = (index: number) => {
  QAs.value.splice(index, 1);
  confirmCheck.value = false;
  //要加進資料庫
};
const Delete = (index: number) => {
  QAs.value.splice(index, 1);
  confirmCheck.value = false;

  //要刪
};
const already = (index: number) => {
  QAs.value.splice(index, 1);
  confirmAlready.value = false;
  confirmAlreadyCorrect.value = '請選取正解~';
};
const popUp = (content: string, q: string, a: string, index: number) => {
  i.value = index;
  popBody.value.Q = q;
  popBody.value.A = a;
  content === 'done'
    ? (popContent.value = '新增')
    : (popContent.value = '刪除');
  confirmCheck.value = !confirmCheck.value;
};
</script>
