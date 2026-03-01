export interface Event {
  _id: string;
  name: string;
  category: string;
  address: string;
  date: string;
  time: string;
  images: string[];
}

/* GET ALL */
export const fetchEvents = async (): Promise<Event[]> => {
  const res = await fetch("/api/event");
  const data = await res.json();

  if (!res.ok) throw new Error(data.message);
  return data.events;
};

/* GET ONE */
// export const fetchEventById = async (id: string): Promise<Event> => {
//   const res = await fetch(`/api/event/${id}`);
//   const data = await res.json();

//   if (!res.ok) throw new Error(data.message);
//   return data.event;
// };


/* UPDATE */
export const updateEvent = async ({
  id,
  event,
}: {
  id: string;
  event: Partial<Event>;
}): Promise<Event> => {
  const res = await fetch(`/api/event/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(event),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message);

  return data.event;
};

/* DELETE */
export const deleteEvent = async (id: string): Promise<void> => {
  const res = await fetch(`/api/event/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.message);
  }
};