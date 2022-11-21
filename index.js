
const { getContactById, addContact, removeContact, listContacts } = require("./db/contacts");
const argv = require("yargs").argv;

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
          const contacts = await listContacts();
          console.table(contacts);
      break;

    case "get":
          const contact = await getContactById(id);
           if (!contact) {
                return `Contact with ${id} not found`;
            }
            console.log('Wanted contact:', contact);
      break;

    case "add":
          const addedContact = await addContact(name, email, phone);
          console.log('Added contact:', addedContact);
      break;

    case "remove":
          const removedContact = await removeContact(id);
          console.log('Removed contact:', removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);