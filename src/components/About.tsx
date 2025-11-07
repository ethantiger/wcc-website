import { useState } from "react";
import BouncingText from "./ui/BouncingText";
import { IconCaretUp, IconCaretDown } from "@tabler/icons-react";
import AnimatedTestimonials from "./ui/Animated-testimonials";


export default function About() {
  const [storyOpen, setStoryOpen] = useState(true);
  const [selectedTeam, setSelectedTeam] = useState<string>("President");

  const teams = [
    {
      name: "President",
      members: [
        { name: "Brittney Chong", role: "Prez", img: "/execs/Brittney.jpg", 
          bio: "My name is Brittney and I love to climb with my cat. I love making new friends let’s climb together (lead, boulder and even toprope)!" },
      ]
    },
    {
      name: "Communications",
      members: [
        { name: "Caleb Chen", role: "VP", img: "/execs/comms/Caleb.jpg", 
          bio: "Hey everyone! I'm Caleb, I've been climbing for almost 2 years now. I love slopers, but slabs always humble me. Can't wait to see you all on climb nights!"},
        { name: "Carina Chan", role: "", img: "/execs/comms/Carina.jpg", 
          bio: "Hi! I'm Carina and I'm in fourth year studying Psych and MIT. I love being outdoors, whether I'm climbing or sk8ing. I'm all about capturing fun moments and turning them into creativer photos and designs to share the club's best adventures!" },
        { name: "Jiajun Chen", role: "", img: "/execs/comms/Jiajun.jpg", 
          bio: "Hi, I’m Jiajun — a third-year Medical Sciences student specializing in Physiology and Pharmacology. I’ve been climbing for a little over a year, mostly bouldering. Outside the gym, I’m into photography. Currently working on making it through a session without getting injured." },
        { name: "Kayleigh Gerritsen", role: "", img: "/execs/comms/Kayleigh.jpg", 
          bio: "Hi WCC! I'm a third year student specializing in biology. I love anything outdoorsy, going on hikes, and of course climbing! Bouldering specifically helps me release stress while also exercising both my body and mind. Aside from that I also love formula one, concerts, and exploring new countires :)" },
      ]
    },
    {
      name: "Events",
      members: [
        { name: "Sophie DiCiacca", role: "VP", img: "/execs/events/Sophie.jpg", 
          bio: "Hey, my name is Sophie and I'm a second year in accounting. I used to be a competitive climber and coach!" },
        { name: "Luna Olin", role: "", img: "/execs/events/Luna.jpg", 
          bio: "Hi! My name is Luna Olin. I am currently a second year student studying Geography and Environment. I love spending time outdoors, going to concerts, and hanging out with my friends!" },
        { name: "Charlie Song", role: "", img: "/execs/events/Charlie.jpg", 
          bio: "Hey! I'm Charlie, I'm a 2nd year student studying finance. I've been bouldering for about 2 years now and I love crimps and dynos. I love spending time with friends, going outside, and snowboarding. I can't wait to meet you all at Junction!" },
      ]
    },
    {
      name: "Finance",
      members: [
        { name: "Isa Dahya", role: "VP", img: "/execs/finance/Isa.jpg", bio: "Hi! I'm Isa and I'm in 4th year HSP physharm. Surprisingly I also like climbing especially indoor bouldering. I got 2 pet cats and I also enjoy biking. If you ever need any med sci advice feel free to contact :)" },
        { name: "Noah Medland", role: "VP", img: "/execs/finance/Noah.jpg", 
          bio: "Hey guys, I'm a third-year finance student with a passion for adventure. Outside the classroom, I thrive on mountain climbing, skydiving, and bungee jumping - activities that fuel my drive for challenge, focus, and resilience." },
        { name: "Jason Too", role: "VP", img: "/execs/finance/Jason.jpg",
          bio: "Hi, my name is Jason and I’m a 2nd year finance student. I have been climbing for a year and I now live for it. I also play volleyball and a bit of soccer. My home is the climbing gym and if you see me say hi!"
        }
      ]
    },
    {
      name: "Sponsorship",
      members: [
        { name: "Marshall Howard", role: "", img: "/execs/sponsor/Marshall.jpg", 
          bio: "Hi! I'm Marshall and I'm a second year psychology major with a minor in ethics! I've been climbing for about 3-ish years now, and it's one of my fav ways to pass the time! Aside from climbing, I also like to train triathalon, read, and binge watch shows!" },
        { name: "Jeremy Dai", role: "", img: "/execs/sponsor/Jeremy.jpg", 
          bio: "Hey! I'm Jeremy, a second year in med sci. I'm relatively new to climbing, having just over a year under my belt, but I'm already hooked. Apart from climbing, I enjoy folding origami and sharing what I make on my Instagram account. Hope to see you on the wall!" },
      ]
    },
    {
      name: "Web Devs",
      members: [
        { name: "Ethan Wakefield", role: "VP", img: "/execs/web/Ethan.jpg", 
          bio: "Hey! I’m Ethan, a 4th year computer science student and the VP of web development. I’ve been climbing consistently for a few months and I’m completely hooked. I also enjoy going to the gym, playing games, watching movies, and sleeping. Looking forward to meeting new faces and climbing with yall!" },
        { name: "Jenni Shi", role: "", img: "/execs/web/Jen.jpg", 
          bio: "Hey guys! I'm Jen, a 4th-year Software Engineering student. I've been bouldering for around 2 years, but I dabble in top rope occasionally. You’ll probably catch me eating, thrifting, or crimping some wall on campus >:)" },
        { name: "Ryhana Williams", role: "", img: "/execs/web/Ryhana.jpg", 
          bio: "Hi! My name is Ryhana. I'm in my 2nd year of cs and I love to go thrifting, stay active and try new cafes." },
      ]
    },
  ];

  return (
    <section id="about">
      <div className="mb-12 flex flex-col items-center justify-start bg-[#10091e] text-gray-200 p-6">
        
        <h1 className="md:ms-4 text-3xl md:text-5xl font-bold mb-6 text-purple-300 text-center md:pt-30"> <BouncingText text="About Us" /> </h1>

        {/* Mission */}
        <h2
          className="text-2xl font-semibold text-purple-200 mb-3 cursor-pointer flex items-center"
          onClick={() => setStoryOpen(!storyOpen)}
        >
          Our Story 
          {storyOpen ? (
            <IconCaretUp className="ml-2" size={20} />
          ) : (
            <IconCaretDown className="ml-2" size={20} />
          )}
        </h2>

   {storyOpen && (
    <div className="mt-6 w-full flex flex-col md:flex-row items-center md:items-start md:space-x-8 max-w-5xl mx-auto px-4">
      {/* Text */}
      <div className="flex-1">
        <p className="max-w-2xl mb-4 text-sm">
          Hey Climbers! We’re so excited to welcome you to another incredible year with the Western Climbing Club! 
          Since our very first meet-up in 2017, this community has grown into something truly special — all because of you. 
          Your passion, your encouragement, and your adventurous spirit are what make this club feel like home. 
        </p>
        <p className="max-w-2xl mb-4 text-sm">
          Over the past months, our exec team has been busy behind the scenes making this year the most unforgettable one yet. 
          From friendly competitions and outdoor trips to skill-building sessions and late-night bouldering hangs, 
          everything we’ve planned is here to support you — to help you push your limits, grow your skills, and connect with others who share your love for climbing. 
        </p>
        <p className="max-w-2xl mb-4 text-sm">
          Whether you’ve been with us since our first rope nights or you’re just stepping onto the wall for the first time, 
          we want this to be a place where you feel encouraged to challenge yourself, try new things, and share in the joy of reaching new heights. 
          We can’t wait to see the memories we’ll make together this year. 
          Here’s to another season of climbing, laughter, and adventure. 
        </p>
        <p className="max-w-2xl mb-4 text-sm">
          – Western Climbing Club Team
        </p>
      </div>

      {/* Team Photo */}
      <div className="flex-1 flex justify-center mt-6 md:mt-0">
        <img
          src="/execs/team.jpg"
          alt="Our Team"
          className="rounded-2xl shadow-lg max-w-full h-auto"
        />
      </div>
    </div>
  )}

        {/*Nav*/}
        <div className="mt-6 w-full">
          <div className="flex flex-wrap justify-center gap-2 md:space-x-4">
            {teams.map((team) => (
              <button
          key={team.name}
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            selectedTeam === team.name ? "bg-purple-300 text-white" : "bg-gray-700 text-gray-200"
          }`}
          onClick={() => setSelectedTeam(team.name)}
              >
          {team.name}
              </button>
            ))}
          </div>
        </div>

        {/* Team display */}
        <div className="space-y-12 w-full max-w-6xl">
          {teams
            .filter((team) => team.name === selectedTeam) // show selected team
            .map((team) => (
              <div key={team.name} className="flex flex-col items-center">

                <AnimatedTestimonials
                  testimonials={team.members.map((member) => ({
                    quote: member.bio,
                    name: member.name,
                    designation: member.role,
                    src: member.img,
                  }))}
                />
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
