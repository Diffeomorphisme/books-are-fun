import { z } from 'zod';

export const BookParam = z.object({
  bookTitle: z.string()
});

export const GetAllBooksResponse = z.object({
  bookTitles: z.array(z.string()),
});

export const AddBookBody = z.object({
  bookTitle: z.string(),
});

export const UpdateBookBody = z.object({
  bookTitle: z.string(),
});

export const CreateBookBody = z.object({
  bookTitle: z.string(),
});
