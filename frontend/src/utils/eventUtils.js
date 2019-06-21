export function convertEvents(events) {
  let newEvents = [];
  for (let event of events) {
    newEvents.push({
      ...event,
      start: new Date(event.start),
      end: new Date(event.end)
    });
  }

  return newEvents;
}