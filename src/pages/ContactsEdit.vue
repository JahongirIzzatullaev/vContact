<template>
  <div class="q-ma-lg">
    <q-card class="bg-white full-width">
      <q-card-actions class="q-mx-sm q-pt-lg">
        <q-icon name="account_circle" size="lg" color="grey"/>
        <div class="text-h6 q-px-sm">{{contact.name}}</div>
      </q-card-actions>
      <q-card-section>
        <q-form @submit="editContact()">
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
            <q-btn label="Сохранить" color="primary" type="submit" :loading="loading"
            />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>

</template>

<script lang='ts'>
import {defineComponent, ref} from 'vue'
import {ContactModel} from 'src/models/contacts.model'
import useContacts from 'src/hooks/useContacts'
import {useRoute, useRouter} from 'vue-router'

interface SetupData {
  contact: ContactModel;
  editContact: () => void;
  tags: string[];
  loading: boolean
}

export default defineComponent({
  name: 'ContactsEdit',
  setup(): SetupData {
    const route = useRoute()
    const router = useRouter()
    const loading = ref(false);

    const {getContactById, updateContact, tags} = useContacts()
    const contact = getContactById(Number(route.params['id']))

    const editContact = (): void => {
      loading.value = true;
      setTimeout(() => {
        updateContact(contact)
        loading.value = false;
        router.push({name: 'list'})
      }, 500);
    }

    return {
      contact,
      tags,
      editContact,
      loading
    }
  }
})
</script>
