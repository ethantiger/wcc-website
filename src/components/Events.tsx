import {Carousel, Card} from "./ui/apple-cards-carousel";

export default function Events() {
  const cards = data.map((card) => (
    <Card key={card.src} card={card} />
  ));

  return (
    <section id="events">
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#10091e] text-gray-800 dark:text-gray-200 p-6">
        <h1 className="text-4xl font-bold mb-6">Events</h1>
        <Carousel items={cards} />
      </div>
    </section>
  );
}

const DummyContent = () => {
  return (
    <>
      {[...new Array(3).fill(1)].map((_, index) => {
        return (
          <div
            key={"dummy-content" + index}
            className="bg-[#F5F5F7] dark:bg-neutral-800 p-8 md:p-14 rounded-3xl mb-4"
          >
            <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-2xl font-sans max-w-3xl mx-auto">
              <span className="font-bold text-neutral-700 dark:text-neutral-200">
                The first rule of Apple club is that you boast about Apple club.
              </span>{" "}
              Keep a journal, quickly jot down a grocery list, and take amazing
              class notes. Want to convert those notes to text? No problem.
              Langotiya jeetu ka mara hua yaar is ready to capture every
              thought.
            </p>
            <img
              src="https://assets.aceternity.com/macbook.png"
              alt="Macbook mockup from Aceternity UI"
              height="500"
              width="500"
              className="md:w-1/2 md:h-1/2 h-full w-full mx-auto object-contain"
            />
          </div>
        );
      })}
    </>
  );
};
 
const data = [
  {
    category: "Upcoming",
    title: "Niagara Glen Climbing Trip",
    src: "https://niagaraglenclimbing.ca/images/gallery/170429-zack_on_sabishii.webp",
    content: <DummyContent />,
  },
  {
    category: "August 17, 2025",
    title: "Junction Climb Nights",
    src: "https://images.squarespace-cdn.com/content/v1/61df2c7d4f6f0b3f0cb28707/433f31d8-f715-4a56-acbb-c5caf66a0a42/junctionEvanExportsEZ403930.jpg",
    content: <DummyContent />,
  },
  {
    category: "Upcoming",
    title: "Guelph Grotto Competition",
    src: "https://static.wixstatic.com/media/98f2ba_9df96cb1a6ff4ca688c124eeda4b2768~mv2.png/v1/fill/w_970,h_644,al_c,q_90,enc_avif,quality_auto/bouldering%20img.png",
    content: <DummyContent />,
  }
];