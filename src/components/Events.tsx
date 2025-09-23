import { useCollection } from "@/hooks/useCollection";
import {Carousel, Card} from "./ui/apple-cards-carousel";
import collections from "@/firebase/collections";
import Event from "@/features/events/interfaces/Event";
import BouncingText from "./ui/BouncingText";

export default function Events() {
  const { documents: events } = useCollection<Event>(collections.eventsCollection,null, ["date", "asc"]);
  const cards = (events ?? []).map((event) => (
    <Card key={event.id} card={event} />
  ));

  return (
    <section id="events">
      <div className="min-h-screen flex flex-col items-start justify-center bg-[#090414] text-gray-800 dark:text-gray-200 p-6 rounded-[70px]">
        <h1 className="md:ms-12 text-3xl md:text-5xl font-bold mb-6 text-purple-300">
          <BouncingText text="Join us at our Events!" />
        </h1>
        {!cards.length && (
          <div className="text-red-500 mb-6 text-lg">
            Something went wrong, please reload.
          </div>
        )}
        <Carousel items={cards} />
      </div>
    </section>
  );
}
