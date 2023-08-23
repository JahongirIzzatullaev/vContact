import {computed} from 'vue'
import {ContactModel} from 'src/models/contacts.model'
import {useContactsStore} from 'stores/contacts.store';

export default function useContacts() {
  const store = useContactsStore()
  const contacts = computed(() => store.getContacts)
  const tags = computed(() => store.getTags)

  const getNewId = (): number => {
    const contactsSlice = store.getContacts.slice(-1)
    if (contactsSlice.length > 0) {
      return store.getContacts.slice(-1)[0]['id'] + 1
    }

    return 1
  }

  const addContact = (contact: ContactModel): void => {
    const val = contact.value
    const name = val.name && val.name.trim()
    const phone_number = val.phone_number && val.phone_number.trim()
    const email = val.email && val.email.trim()
    const tags = val.tags && val.tags.trim()

    const payload = new ContactModel(getNewId(), name, phone_number, email, tags)

    store.addContact(payload)
  }

  const removeContact = (id: number): void => {
    store.removeContact(id)
  }

  const updateContact = (contact: ContactModel): void => {
    store.updateContact(contact)
  }

  const getContactById = (id: number): ContactModel => {
    store.getContactById(id)
    const contact: ContactModel | null = store.getContact
    if (contact === null) {
      throw Error('Id не может быть null')
    }

    return contact
  }

  return {
    contacts,
    tags,
    addContact,
    updateContact,
    removeContact,
    getContactById,
  }
}
