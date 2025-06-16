import { allEvents } from "content-collections";

export const allEventsSortedByDate = allEvents.toSorted((a, b) =>
  b.dateStart.localeCompare(a.dateStart),
);
