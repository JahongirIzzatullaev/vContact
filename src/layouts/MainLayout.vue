<template>
  <q-layout view="hHh lpR fFf">
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

        <q-toolbar-title> vContact </q-toolbar-title>

        <q-btn
          :loading="loading"
          class="q-mr-sm"
          color="white"
          text-color="black"
          icon="logout"
          size="sm"
          @click="logout"
        />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      class="bg-primary"
    >
      <q-list dark>
        <q-item-label header> Страницы </q-item-label>

        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view v-slot="{ Component }">
        <transition>
          <component :is="Component" />
        </transition>
      </router-view>
    </q-page-container>
  </q-layout>
</template>

<script lang='ts'>
import { defineComponent, ref } from 'vue';
import {useRouter} from "vue-router";
import EssentialLink from 'components/EssentialLink.vue';
import {useAuthStore} from "stores/auth.store";

const linksList = [
  {
    title: 'Контакты',
    icon: 'contacts',
    link: '/',
  },
];

export default defineComponent({
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  setup () {
    const leftDrawerOpen = ref(false)
    const router = useRouter();
    const loading = ref(false);
    const store = useAuthStore()

    return {
      essentialLinks: linksList,
      leftDrawerOpen,
      loading,
      store,
      toggleLeftDrawer () {
        leftDrawerOpen.value = !leftDrawerOpen.value
      },
      logout() {
        loading.value = true;
        setTimeout(() => {
          store.logout()
          router.push({name: 'login'});
          loading.value = false;
        }, 500);
      },
    };
  }
});
</script>
