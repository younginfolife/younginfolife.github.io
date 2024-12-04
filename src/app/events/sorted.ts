import { allEvents } from "content-collections";

export const allEventsSortedByDate = allEvents.toSorted((a, b) =>
  a.dateStart.localeCompare(b.dateStart),
);
