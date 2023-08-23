<template>
  <q-layout view="hHh Lpr fFf">
    <q-page-container class="login-page">
      <transition
        appear
        enter-active-class="animated bounceInLeft"
        leave-active-class="animated bounceOutRight"
        :duration="300"
      >
        <router-view v-slot="{ Component }">
          <transition>
            <component :is="Component" />
          </transition>
        </router-view>
      </transition>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'EmptyLayout',
}
</script>
