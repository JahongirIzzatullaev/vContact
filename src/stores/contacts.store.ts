import {ContactModel} from '../models/contacts.model'
import {defineStore} from 'pinia'
import {computed, reactive} from 'vue'

export type ContactsState = {
  contact: ContactModel | null;
  contacts: ContactModel[];
  tags: string[];
}

export const useContactsStore = defineStore('contacts', () => {
  const state = reactive<ContactsState>({
    contact: null,
    contacts: [
      new ContactModel(100, 'Антон Чешов', '+998 99-111-11-01','chexov@mail.ru', 'Близкий друг'),
      new ContactModel(101, 'Умиджон Темиров', '+998 91-001-01-01','umid@mail.ru', 'Близкий друг'),
      new ContactModel(102, 'Алеся Бацман', '+998 91-345-01-98','alica@mail.ru', 'Работа'),
      new ContactModel(103, 'Ким Кардашьян', '+998 91-345-01-98','kim@mail.ru', 'Работа'),
      new ContactModel(104, 'Шамсиддинов Тохир', '+998 91-313-11-11','tohir@mail.ru', 'Семья'),
    ],
    tags: ['Семья', 'Работа', 'Близкий друг', 'Родственник']
  }) as ContactsState

  const getContact = computed((): ContactModel | null => state.contact)
  const getContacts = computed((): ContactModel[] => state.contacts)
  const getNewId = computed((): number => state.contacts.slice(-1)[0]['id'] + 1)

  const getTags = computed((): string[] | null => state.tags)

  const getContactById = (id: number): void => {
    const contact: ContactModel | undefined = state.contacts.find((t: ContactModel): boolean => t.id === id)
    if (!contact) {
      return
    }

    setContact(contact)
  }

  const addContact = (contact: ContactModel): void => {
    state.contacts = [...state.contacts, contact]
  }

  const setContact = (contact: ContactModel): void => {
    state.contact = contact
  }

  const removeContact = (id: number): void => {
    const index = state.contacts.findIndex(contact => contact.id === id)
    state.contacts.splice(index, 1)
  }

  const updateContact = (contact: ContactModel): void => {
    const index = state.contacts.findIndex(item => item.id === contact.id)
    state.contacts[index] = contact
  }

  return {
    getContact,
    getContacts,
    getNewId,
    getTags,
    getContactById,
    addContact,
    setContact,
    removeContact,
    updateContact,
  }
})
