import { schema } from "normalizr";

/* eslint-disable */
export const bookSchema = new schema.Entity(
  "books",
  {},
  { idAttribute: "_id" }
);
