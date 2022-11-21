const fs = require('fs/promises');
const path = require('path');
const { v4: uuid } = require('uuid');

const contactsPath = path.join(__dirname, "./contacts.json");

async function listContacts () {
    try {
        const contacts = await fs.readFile(contactsPath, "utf-8");
        const parsedContacts = JSON.parse(contacts);
        return parsedContacts;
    } catch (error) {
        console.log(error);
    }
};

async function getContactById (contactId) {
    try {
        const contacts = await fs.readFile(contactsPath, "utf-8");
        const parsedContacts = JSON.parse(contacts);

        const stringedContactId = contactId.toString();

        const contactById = parsedContacts.find(
            contact => contact.id === stringedContactId
        );

        return contactById || null;
    } catch (error) {
        console.log(error);
    }
};

async function removeContact (contactId) {
    try {
        const contacts = await fs.readFile(contactsPath, 'utf8');
        const parsedContacts = JSON.parse(contacts);

        const stringedContactId = contactId.toString();

        const indexRemovedContact = parsedContacts.findIndex(
            contact => contact.id === stringedContactId
        );

        if (indexRemovedContact === -1) {
            return null;
        }

        const [removedContact] = parsedContacts.splice(indexRemovedContact, 1);

        const stringedContactsList = JSON.stringify(parsedContacts);

        await fs.writeFile(contactsPath, stringedContactsList, 'utf8');

        return removedContact;
    } catch (error) {
        console.log(error);
    }
};

const addContact = async (name, email, phone) => {
    try {
        const contacts = await fs.readFile(contactsPath, 'utf8');
        const parsedContacts = JSON.parse(contacts);

        const newContact = { id: uuid(), name, email, phone };

        parsedContacts.push(newContact);

        const stringedContactsList = JSON.stringify(parsedContacts);

        await fs.writeFile(contactsPath, stringedContactsList, 'utf8');

        return newContact;
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact,
};