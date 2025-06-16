import { allPublications } from "content-collections";

export const allPublicationsSorted = allPublications.toSorted((a, b) =>
  b.Year.localeCompare(a.Year),
);
