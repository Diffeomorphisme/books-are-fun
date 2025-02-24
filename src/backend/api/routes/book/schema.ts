import { z } from '@hono/zod-openapi';

export const GetBookPathParam = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: '88ae4afd-8b92-403e-832a-d7644aa72313'
    })
});

export const UpdateBookPathParam = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: '88ae4afd-8b92-403e-832a-d7644aa72313'
    })
});

export const DeleteBookPathParam = z.object({
  id: z
    .string()
    .min(3)
    .openapi({
      param: {
        name: 'id',
        in: 'path',
      },
      example: '88ae4afd-8b92-403e-832a-d7644aa72313'
    })
});

export const GetAllBooksResponse = z.array(
  z.object({
    id: z.string(),
    title: z.string()
  })
);

export const UpdateBookBody = z.object({
  title: z.string(),
});

export const CreateBookBody = z.object({
  title: z.string(),
});

export const GetBookResponse = z.object({
  id: z.string(),
  title: z.string()
})

