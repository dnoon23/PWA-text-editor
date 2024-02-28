import { openDB } from 'idb';

const DB_NAME = "jate"
//Creates a new database
const initdb = async () =>
  openDB(DB_NAME, 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains(DB_NAME)) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore(DB_NAME, { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

//Export function to POST
export const putDb = async (content) => {

  const jateDB = await openDB(DB_NAME, 1);

  const tx = jateDB.transaction(DB_NAME, 'readwrite');

  const store = tx.objectStore(DB_NAME);

  const request = store.put({ id: 1, value: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result.value);
};

//Export function to GET
export const getDb = async () => {
  
  const jateDB = await openDB(DB_NAME, 1);

  const tx = jateDB.transaction(DB_NAME, 'readonly');

  const store = tx.objectStore(DB_NAME);

  const request = store.get(1);
  const result = await request;
  result
    ? console.log('🚀 - data retrieved from the database', result.value)
    : console.log('🚀 - data not found in the database');

  return result?.value;
};

initdb();
