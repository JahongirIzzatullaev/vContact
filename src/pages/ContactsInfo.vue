<template>
  <div class="q-ma-lg">
    <q-card class="bg-white full-width">
      <q-card-actions class="q-mx-sm q-pt-lg">
        <q-icon name="account_circle" size="lg" color="grey"/>
        <div class="text-h6 q-px-sm">{{contact.name}}</div>
      </q-card-actions>
      <q-card-section>
        <q-input
          filled
          type="text"
          v-model="contact.name"
          label="ФИО"
          readonly
        />
        <q-input
          class="q-mt-sm"
          filled
          type="text"
          v-model="contact.phone_number"
          label="Номер телефон"
          readonly
        />
        <q-input
          class="q-mt-sm"
          filled
          type="email"
          v-model="contact.email"
          readonly
        />
        <q-input
          class="q-mt-sm"
          filled
          type="text"
          v-model="contact.tags"
          label="Тег"
          readonly
        />
        <div class="text-left q-mt-lg">
          <q-btn label="Назад" outline color="primary" @click="$router.go(-1)" />
        </div>
      </q-card-section>
    </q-card>
  </div>

</template>

<script lang='ts'>
import type {ContactModel} from 'src/models/contacts.model'
import {defineComponent} from 'vue'
import {useRoute} from "vue-router";
import useContacts from "../hooks/useContacts";

interface SetupData {
  contact: ContactModel | null;
}

export default defineComponent({
  name: 'ContactsInfo',
  setup(): SetupData {
    const route = useRoute()
    const {getContactById} = useContacts()

    const contact = getContactById(Number(route.params['id']))

    return {
      contact,
    }
  }
})
</script>
