<template>
  <div class="q-pa-md q-gutter-sm">
    <q-table
      flat
      bordered
      separatored
      :rows="contacts"
      :columns="columns"
      row-key="id"
      :visible-columns="visibleColumns"
      :pagination="initialPagination"
      :filter="filter"
    >
      <template v-slot:top>
        <h5 class="no-margin q-py-xs text-weight-bold">
          Список всех контактов
        </h5>
        <q-space />
        <q-input
          filled
          dense
          debounce="300"
          color="primary"
          v-model="filter"
          label="Поиск по всем полям"
          class="q-mr-lg"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <q-btn
          color="primary"
          icon="add"
          label="Добавить контакт"
          :to="{name: 'add'}"
        />
      </template>
      <template v-slot:body-cell-avatar="props">
        <q-td :props="props">
          <q-icon name="account_circle" size="lg" color="primary" />
        </q-td>
      </template>
      <template v-slot:body-cell-tags="props">
        <q-td :props="props">
          <div>
            <q-chip dense square size="10" color="secondary" text-color="white">
              {{props.row.tags}}
            </q-chip>
          </div>
        </q-td>
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            size="md"
            dense
            color="orange"
            icon="visibility"
            :to="{name: 'info', params: { id: props.row.id }}"
            class="q-mr-xs"
          >
            <q-tooltip content-class="bg-secondary"> Посмотреть </q-tooltip>
          </q-btn>
          <q-btn
            size="md"
            dense
            color="primary"
            icon="edit"
            class="q-mr-xs"
            :to="{name: 'edit', params: { id: props.row.id }}"
          >
            <q-tooltip content-class="bg-secondary"> Изменить </q-tooltip>
          </q-btn>
          <q-btn
            size="md"
            dense
            color="negative"
            icon="delete"
            @click="removeContact(props.row.id)"
            class="q-mr-sm"
          >
            <q-tooltip content-class="bg-negative"> Удалить </q-tooltip>
          </q-btn>
        </q-td>
      </template>
      <template v-slot:no-data="{ icon, message, filter }">
        <div class="full-width row flex-center q-gutter-sm q-pa-xl">
          <q-icon size="2em" name="sentiment_dissatisfied" />
          <span>
            Пусто
          </span>
        </div>
      </template>
    </q-table>
  </div>
</template>

<script lang='ts'>
import type {ComputedRef, Ref} from 'vue'
import {defineComponent, ref} from 'vue'
import useContacts from 'src/hooks/useContacts'

interface SetupData {
  contacts: ComputedRef;
  removeContact: (id: number) => void;
  columns: Ref;
  visibleColumns: Ref;
  initialPagination: Ref;
  filter: Ref;
}
const columns = [
  {
    label: 'ID',
    field: 'id',
    name: 'id',
    align: 'left',
    sortable: true,
    style: 'width: 1rem',
  },
  {
    name: 'avatar',
    align: 'center',
    label: 'Фото',
  },
  {
    label: 'ФИО',
    field: 'name',
    name: 'name',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Номер телефона',
    field: 'phone_number',
    name: 'phone_number',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Email адрес',
    field: 'email',
    name: 'email',
    align: 'left',
    sortable: true,
  },
  {
    label: 'Теги',
    field: 'tags',
    name: 'tags',
    align: 'left',
    sortable: true
  },
  {
    name: 'actions',
    align: 'center',
    label: 'Действии',
    style: 'width: 1rem',
  },
];

export default defineComponent({
  name: 'ContactsList',
  setup(): SetupData {
    const filter = ref("");
    const {contacts, removeContact} = useContacts()
    return {
      visibleColumns: [
        'id',
        'avatar',
        'name',
        'phone_number',
        'email',
        'tags',
        'actions'
      ],
      initialPagination: {
        descending: false,
        page: 1,
        rowsPerPage: 10,
      },
      contacts,
      removeContact,
      columns,
      filter
    }
  }
})
</script>
