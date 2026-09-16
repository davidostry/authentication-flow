import { db } from '../config/db.js';

const users = db.collection("users");

export async function createUser(userName, email, hash) {

    const { insertedId } = await users.insertOne({ userName, email, hash })
    return insertedId
}

export async function findUser(email) {
  const normalizedEmail = email.toLowerCase();
  const currUser = await users.findOne({ email: normalizedEmail });
  console.log(currUser);
  
  return currUser;
}