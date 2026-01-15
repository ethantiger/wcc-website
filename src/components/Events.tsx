import { useState, useMemo } from "react";
import { useCollection } from "@/hooks/useCollection";
import {Carousel, Card} from "./ui/apple-cards-carousel";
import collections from "@/firebase/collections";
import Event from "@/features/events/interfaces/Event";
import BouncingText from "./ui/BouncingText";

export default function Events() {
  const [showUpcoming, setShowUpcoming] = useState(true);
  const { documents: events } = useCollection<Event>(collections.eventsCollection,null, ["date", "asc"],false, true);
  
  const filteredEvents = useMemo(() => {
    if (!events) return [];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    return events.filter(event => {
      const eventDate = event.date.toDate();
      return showUpcoming ? eventDate >= yesterday : eventDate < yesterday;
    });
  }, [events, showUpcoming]);

  const cards = filteredEvents.map((event) => (
    <Card key={event.id} card={event} upcoming={showUpcoming} />
  ));

  return (
    <section id="events" className="relative">
      <div className="min-h-screen flex flex-col items-start justify-center text-gray-800 dark:text-gray-200 p-6 rounded-[70px]">
        <div className="md:ms-12 w-full max-w-7xl">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 text-purple-300">
            <BouncingText text="Join us at our Events!" />
          </h1>
          
          <div className="flex items-center gap-3 mb-6">
            <span className={`text-sm font-medium ${!showUpcoming ? 'text-purple-300' : 'text-gray-400'}`}>
              Past Events
            </span>
            <button
              onClick={() => setShowUpcoming(!showUpcoming)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 ${
                showUpcoming ? 'bg-purple-500' : 'bg-gray-600'
              }`}
              role="switch"
              aria-checked={showUpcoming}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  showUpcoming ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-sm font-medium ${showUpcoming ? 'text-purple-300' : 'text-gray-400'}`}>
              Upcoming Events
            </span>
          </div>
        </div>

        {(cards.length === 0) && (
          <div className="text-red-500 mb-6 text-lg md:ms-12">
            {events ? `No ${showUpcoming ? 'upcoming' : 'past'} events found.` : 'Something went wrong, please reload.'}
          </div>
        )}
        <Carousel items={cards} />
      </div>
    </section>
  );
}
