export function convertEvents(events) {
  let newEvents = [];
  for (let event of events) {
    newEvents.push({
      id: event._id,
      title: event.title,
      user: event.user,
      from: new Date(event.start),
      to: new Date(event.end),
      color: "#517bc8",
    });
  }

  return newEvents;
}

export function toSwedishTime(event) {
  return {
    ...event,
    from: new Date(event?.from?.getTime() + 2 * 60 * 60 * 1000),
    to: new Date(event?.to?.getTime() + 2 * 60 * 60 * 1000),
  };
}
