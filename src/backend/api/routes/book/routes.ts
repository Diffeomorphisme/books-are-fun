import { BookParam, UpdateBookBody, CreateBookBody } from "./schema";
import { 
  createBook, 
  deleteBookById, 
  updateBookById, 
  getAllBooks, 
  getBookById 
} from "../../../db/src"
import { Hono } from "hono"
import { zValidator } from "@hono/zod-validator";
import { HTTPException } from "hono/http-exception";

const bookRouter = new Hono()
.get("/:id", zValidator("param", BookParam), async (c) => {
  const bookId = c.req.param("id");
  const book = await getBookById(bookId);

  if (!book) {
    throw new HTTPException(404, { message: "Not found" });
  }
  return c.json({
    title: book.title
  });
})
.get("/", async (c) => {
  const books = await getAllBooks()
  return c.json(
    books.map((book) => {
      return book
    })
  );
})
.post("/", zValidator("json", CreateBookBody), async (c) => {
  const { bookTitle } = c.req.valid("json");
  const createdBook = await createBook(bookTitle)

  return c.json(createdBook, 201);
})
.put("/:id", zValidator("json", UpdateBookBody), async (c) => {
  const bookId = c.req.param("id");
  const { bookTitle } = c.req.valid("json");
  const book = await getBookById(bookId);

  if (!book) {
    throw new HTTPException(404, { message: "Not found" });
  }
  await updateBookById(bookId, bookTitle)
  return c.json({ message: "Book updated" });
})
.delete("/:id", async (c) => {
  const bookId = c.req.param("id");
  const book = await getBookById(bookId);

  if (!book) {
    throw new HTTPException(404, { message: "Not found" });
  }
  await deleteBookById(bookId);
  return c.json({ message: "Book deleted" });
})

export default bookRouter;
