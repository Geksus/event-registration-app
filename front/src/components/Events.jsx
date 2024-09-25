import { useDispatch, useSelector } from "react-redux";
import { fetchAllEvents, selectEvents } from "../redux/slices/eventsSlice";
import { useEffect } from "react";

export default function Events() {
  const { events } = useSelector(selectEvents); // Get 'events' from the state
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllEvents());
  }, [dispatch]);

  return (
    <div>
      {events && events.length > 0 ? (
        events.map((event) => <div key={event.id}>{event.title}</div>) // Render events properly
      ) : (
        <p>No events available</p> // Handle empty or undefined state
      )}
    </div>
  );
}
