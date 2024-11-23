import { persisted } from 'svelte-persisted-store'
import Dexie, { type EntityTable } from "dexie";
// First param `preferences` is the local storage key.
// Second param is the initial value.
export const preferences = persisted('preferences', {
  theme: 'dark',
  pane: '50%',
  
});

export interface Note {
    id: string,
    title: string,
    data: string,
    dateCreated: number,
    dateModified: number,
}

const db = new Dexie('NoteDB') as Dexie & {
  notes: EntityTable<Note, "id">
}

db.version(1).stores({
  notes: "id, title, data, dateCreated, dateModified"
})
db.open().then(function (db) {
  // Database opened successfully
}).catch (function (err) {
  // Error occurred
});

export {db}
