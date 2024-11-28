import { test, expect } from '@playwright/test';

type Book = {
  isbn: string;
  title: string;
  subTitle: string;
  author: string;
  publish_date: string;
  publisher: string;
  pages: number;
  description: string;
  website: string;
};

test('Fetch all books and verify specific book by ISBN', async ({ request }) => {
  const allBooksResponse = await request.get('/BookStore/v1/Books', {});

  expect(allBooksResponse.status()).toBe(200);

  const allBooksBody = await allBooksResponse.json();

  expect(allBooksBody.books).toBeDefined();
  expect(Array.isArray(allBooksBody.books)).toBe(true);

  const firstBook: Book = allBooksBody.books[0];

  expect(firstBook).toBeDefined();

  const specificBookResponse = await request.get(`/BookStore/v1/Book?ISBN=${firstBook.isbn}`,{});

  expect(specificBookResponse.status()).toBe(200);

  const specificBookBody = await specificBookResponse.json();

  expect(specificBookBody).toEqual(firstBook);
});