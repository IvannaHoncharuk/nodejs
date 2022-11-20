const fs = require('fs/promises');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, "./contacts.json");

const listContacts = async () => {
    try {
        const contacts = await fs.readFile(contactsPath, "utf-8");
        const parsedContacts = JSON.parse(contacts);
        return parsedContacts;
    } catch (error) {
        console.log(error);
    }
};

const getContactById = async (contactId) => {
    try {
        const contacts = await listContacts();
        const contact = contacts.find((contact) => contact.id === contactId);
        return contact;
    } catch (error) {
        console.log(error);
    }
};

const removeContact = async (contactId) => {
    try {
        const contacts = await listContacts();
        const contact = contacts.findIndex((contact) => contact.id === contactId);
        if (contact === -1)
            return false;
        contact.splice(contact, 1);

        await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
        return true;
    } catch (error) {
        console.log(error);
    }
};

const addContact = async (name, email, phone) => {
    try {
        const contacts = await listContacts();
        const id = uuid();
        const newContact = { name, email, phone, id };
        contacts.push(newContact);

        await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
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