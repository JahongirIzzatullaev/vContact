<template>
  <div class="q-ma-lg">
    <q-card class="bg-white full-width">
      <q-card-actions class="q-mx-sm q-pt-lg">
        <q-icon name="account_circle" size="lg" color="grey"/>
        <div class="text-h6 q-px-sm">{{contact.name}}</div>
      </q-card-actions>
      <q-card-section>
        <q-form @submit="appendContact()">
        <q-input
          type="text"
          filled
          v-model="contact.name"
          label="ФИО*"
          :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
        />
        <q-input
          class="q-mt-sm"
          filled
          type="text"
          v-model="contact.phone_number"
          label="Номер телефон*"
          :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
        />
        <q-input
          class="q-mt-sm"
          filled
          type="email"
          v-model="contact.email"
          label="Email адрес*"
          :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
        />
        <q-select
          class="q-mt-sm"
          label="Тег*"
          filled
          v-model="contact.tags"
          :options="tags"
          :rules="[(val) => (val && val.length > 0) || 'Заполните поле']"
        />

        <div class="text-left q-mt-lg flex justify-between">
          <q-btn label="Назад" outline color="primary" @click="$router.go(-1)" />
          <q-btn label="Сохранить" type="submit" color="primary" :loading="loading"/>
        </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>

</template>

<script lang='ts'>
import {defineComponent, ref} from 'vue'
import useContacts from 'src/hooks/useContacts'
import {useRouter} from 'vue-router'
import {ContactModel} from "src/models/contacts.model";

export default defineComponent({
  name: 'CreateTodoItem',
  setup() {
    const router = useRouter()
    const loading = ref(false)
    const contact = ref<ContactModel>({});

    const { addContact, tags } = useContacts()

    const appendContact = (): void => {
      loading.value = true;
      setTimeout(() => {
        addContact(contact).th
        loading.value = false;
        router.push({name: 'list'})
      }, 500);
    }
    return {
      appendContact,
      tags,
      loading,
      contact,
    }
  }
})

</script>
