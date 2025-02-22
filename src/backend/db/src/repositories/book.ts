import { eq } from "drizzle-orm";
import { db } from "../db";
import { book } from "../schemas"


const getAllBooks = async () => {
  return await db
  .select()
  .from(book)
};

const getBookById = async (bookId: string) => {
  const result = await db
  .select()
  .from(book)
  .where(eq(book.id, bookId)) 

  return result[0];

};

const updateBookById = async (bookId: string, bookTitle: string) => {
  return await db
  .update(book)
  .set({title: bookTitle})
  .where(eq(book.id, bookId))
};

const createBook = async (bookTitle: string) => {
  const results = await db
  .insert(book)
  .values({
    title: bookTitle
  })
  .returning()

  return results[0]
};

const deleteBookById = async (bookId: string) => {
  return await db
  .delete(book)
  .where(eq(book.id, bookId))
};

export {
  getAllBooks,
  getBookById,
  updateBookById,
  createBook,
  deleteBookById
};