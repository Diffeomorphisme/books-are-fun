import { 
  GetBookPathParam,
  UpdateBookPathParam,
  DeleteBookPathParam,
  CreateBookBody,
  UpdateBookBody,
  GetBookResponse,
  GetAllBooksResponse
} from "./schema";
import { 
  createBook, 
  deleteBookById, 
  updateBookById, 
  getAllBooks, 
  getBookById 
} from "../../../db/src"
import { HTTPException } from "hono/http-exception";
import { OpenAPIHono, createRoute } from '@hono/zod-openapi'

const bookRouter = new OpenAPIHono()

// ==========GET SINGLE BOOK=========
const getBookRoute = createRoute({
  method: 'get',
  path: '/{id}',
  request: {
    params: GetBookPathParam,
  },
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetBookResponse,
        },
      },
      description: 'Retrieve the book',
    },
    404: {
      content: {},
      description: "Book not found"
    }
  },
})

bookRouter.openapi(getBookRoute, async (c) => {
  const bookId = c.req.param("id");
  const book = await getBookById(bookId);

  if (!book) {
    throw new HTTPException(404);
  }
  return c.json({
    id: book.id,
    title: book.title
  }, 200);
})

// ===========GET ALL BOOKS==========
const getAllBooksRoute = createRoute({
  method: 'get',
  path: '/',
  responses: {
    200: {
      content: {
        'application/json': {
          schema: GetAllBooksResponse,
        },
      },
      description: 'Retrieve all books',
    },
  },
})

bookRouter.openapi(getAllBooksRoute, async (c) => {
  const books = await getAllBooks()
  return c.json(
    books.map((book) => {
      return book
    })
  );
})

// =============ADD BOOK=============
const createBookRoute = createRoute({
  method: 'post',
  path: '/',
  request: {
    body: {
      content: {
        'application/json': {
          schema: CreateBookBody
        },
      },
    },
  },
  responses: {
    201: {
      description: 'Book created',
    },
  },
})

bookRouter.openapi(createBookRoute, async (c) => {
  const { title } = c.req.valid("json");
  await createBook(title);
  return c.json({message: 'Book created'}, 200);
});


// ============UDPATE BOOK===========
const updateBookRoute = createRoute({
  method: 'put',
  path: '/{id}',
  request: {
    params: UpdateBookPathParam,
    body: {
      content: {
        'application/json': {
          schema: UpdateBookBody
        },
      },
    },
  },
  responses: {
    200: {
      description: 'Book updated',
    },
    404: {
      content: {},
      description: "Book not found"
    }
  },
});

bookRouter.openapi(updateBookRoute, async (c) => {
  const bookId = c.req.param("id");
  const { title } = c.req.valid("json");
  const book = await getBookById(bookId);

  if (!book) {
    throw new HTTPException(404, { message: "Not found" });
  }
  console.log(book)
  await updateBookById(bookId, title)
  return c.json({message: 'Book updated'},200);
});

// ============DELETE BOOK===========
const removeBookRoute = createRoute({
  method: 'delete',
  path: '/{id}',
  request: {
    params: DeleteBookPathParam,
  },
  responses: {
    200: {
      description: 'Book deleted',
    },
    404: {
      content: {},
      description: "Book not found"
    }
  },
});

bookRouter.openapi(removeBookRoute, async (c) => {
  const bookId = c.req.param("id");
  const book = await getBookById(bookId);

  if (!book) {
    throw new HTTPException(404, { message: "Not found" });
  }
  await deleteBookById(bookId);
  return c.json({ message: "Book deleted" }, 200);
});

export default bookRouter;
