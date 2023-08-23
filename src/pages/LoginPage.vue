<template>
  <div id="q-app">
    <q-layout view="lHh Lpr fff">
      <q-page class="window-height window-width row justify-center items-center bg-primary">
        <div class="column q-pa-lg">
          <div class="row">
            <q-form class="q-px-sm q-pt-md" @submit="submit()">
              <q-card class="shadow-24" style="min-height: 340px">
              <q-card-section class="bg-primary">
                <h4 class="text-h5 text-weight-bold q-my-sm text-white text-center">
                  Авторизация
                </h4>
              </q-card-section>
              <q-card-section>
                  <q-input
                    ref="emailRef"
                    square
                    v-model="email"
                    type="email"
                    lazy-rules
                    :rules="[this.required, this.isEmail]"
                    label="Логин"
                  >
                    <template v-slot:prepend>
                      <q-icon name="email" />
                    </template>
                  </q-input>
                  <q-input
                    ref="passwordRef"
                    square
                    v-model="password"
                    type="password"
                    lazy-rules
                    :rules="[this.required]"
                    label="Пароль"
                  >
                    <template v-slot:prepend>
                      <q-icon name="lock" />
                    </template>
                  </q-input>
              </q-card-section>

              <q-card-actions class="q-px-lg">
                <q-btn
                  unelevated
                  :loading="loading"
                  size="md"
                  color="primary"
                  type="submit"
                  class="full-width text-white"
                  label="Войти"
                />
              </q-card-actions>
            </q-card>
            </q-form>
          </div>
        </div>
      </q-page>
    </q-layout>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";
import {useAuthStore} from "src/stores/auth.store";
import { useQuasar } from 'quasar'

export default defineComponent({
  name: "LoginPage",
  setup() {
    const emailRef = ref(null);
    const passwordRef = ref(null);
    const email = ref("test@test.ru");
    const password = ref("123123");
    const router = useRouter();
    const loading = ref(false);
    const store = useAuthStore()
    const $q = useQuasar()

    return {
      email,
      password,
      emailRef,
      passwordRef,
      loading,
      store,
      $q,

      required(val) {
        return (val && val.length > 0) || "Поле должно быть заполнено";
      },
      isEmail(val) {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val) || "Введите корректный email";
      },
      submit() {
        emailRef.value.validate();
        passwordRef.value.validate();
        if (!emailRef.value.hasError && !passwordRef.value.hasError) {
          loading.value = true;
          setTimeout(() => {
            store.login(email, password).then((response: boolean) => {
              if (response){
                $q.notify({
                  position: 'top',
                  type: 'positive',
                  message: 'Вы успешно вошли в систему',
                  timeout: 1000
                })
                router.push("/")
              } else {
                $q.notify({
                  position: 'top',
                  type: 'negative',
                  message: 'Неправильный логин или пароль',
                  timeout: 1000
                })
              }
            })
            loading.value = false;
          }, 1000);
        }
      },
    };
  },
});
</script>

<style lang="scss">
.q-card {
  width: 360px;
}
</style>
