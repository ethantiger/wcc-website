import { useState } from "react";
import BouncingText from "./ui/BouncingText";
import ExecCard from "./ui/execCards"; 

export default function About() {
  const [selectedTeam, setSelectedTeam] = useState<string>("President");

  const teams = [
    {
      name: "President",
      members: [
        { name: "Brittney Chong", role: "Prez", img: "/execs/Brittney.jpg", 
          bio: "My name is Brittney and I love to climb with my cat. I love making new friends let’s climb together (lead, boulder and even toprope!)" },
      ]
    },
    {
      name: "Communications",
      members: [
        { name: "Carina Chan", role: "", img: "/execs/comms/Carina.jpg", 
          bio: "Hi! I'm Carina and I'm in fourth year studying Psych and MIT. I love being outdoors, whether I'm climbing or sk8ing. I'm all about capturing fun moments and turning them into creativer photos and designs to share the club's best adventures!" },
        { name: "Caleb Chen", role: "VP", img: "/execs/comms/Caleb.jpg", 
          bio: "Hey everyone! I'm Caleb, I've been climbing for almost 2 years now. I love slopers, but slabs always humble me. Can't wait to see you all on climb nights!"},
        { name: "Jiajun Chen", role: "", img: "/execs/comms/Jiajun.jpg", 
          bio: "Hi, I’m Jiajun — a third-year Medical Sciences student specializing in Physiology and Pharmacology. I’ve been climbing for a little over a year, mostly bouldering. Outside the gym, I’m into photography. Currently working on making it through a session without getting injured." },
        { name: "Kayleigh Gerritsen", role: "", img: "/execs/comms/Kayleigh.jpg", 
          bio: "Hi WCC! I'm a third year student specializing in biology. I love anything outdoorsy, going on hikes, and of course climbing! Bouldering specifically helps me release stress while also exercising both my body and mind. Aside from that I also love formula one, concerts, and exploring new countires :)" },
      ]
    },
    {
      name: "Events",
      members: [
        { name: "Luna Olin", role: "", img: "/execs/events/Luna.jpg", 
          bio: "Hi! My name is Luna Olin. I am currently a second year student studying Geography and Environment. I love spending time outdoors, going to concerts, and hanging out with my friends!" },
        { name: "Sophie DiCiacca", role: "VP", img: "WCC_Logo_White_-_No_Background.png", 
          bio: "Hey, my name is Sophie and I'm a second year in accounting. I used to be a competitive climber and coach!" },
        { name: "Amanda Papic", role: "VP", img: "WCC_Logo_White_-_No_Background.png", bio: "" },
        { name: "Charlie Song", role: "", img: "WCC_Logo_White_-_No_Background.png", bio: "" },
      ]
    },
    {
      name: "Finance",
      members: [
        { name: "Isa Dahya", role: "", img: "/WCC_Logo_White_-_No_Background.png", bio: "" },
        { name: "Robert Shen", role: "VP", img: "/WCC_Logo_White_-_No_Background.png", bio: "" },
        { name: "Noah Medland", role: "", img: "/execs/finance/Noah.jpg", 
          bio: "I'm a third-year finance student with a passion for adventure. Outside the classroom, I thrive on mountain climbing, skydiving, and bungee jumping - activities that fuel my drive for challenge, focus, and resilience." },
      ]
    },
    {
      name: "Sponsorship",
      members: [
        { name: "Jeremy Dai", role: "", img: "/execs/sponsor/Jeremy.jpg", 
          bio: "Hey! I'm Jeremy, a second year in med sci. I'm relatively new to climbing, having just over a year under my belt, but I'm already hooked. Apart from climbing, I enjoy folding origami and sharing what I make on my Instagram account. Hope to see you on the wall!" },
        { name: "Marshall Howard", role: "", img: "/execs/sponsor/Marshall.jpg", 
          bio: "Hi! I'm Marshall and I'm a second year psychology major with a minor in ethics! I've been climbing for about 3-ish years now, and it's one of my fav ways to pass the time! Aside from climbing, I also like to train triathalon, read, and binge watch shows!" },
      ]
    },
    {
      name: "Web Devs",
      members: [
        { name: "Jenni Shi", role: "", img: "/execs/web/Jen.jpg", 
          bio: "Hey guys! I'm Jen, a 4th-year Software Engineering student. I've been bouldering for around 2 years, but I dabble in top rope occasionally. You’ll probably catch me eating, thrifting, or crimping some wall on campus >:)" },
        { name: "Ethan Wakefield", role: "VP", img: "/execs/web/Ethan.jpg", 
          bio: "Hey! I’m Ethan, a 4th year computer science student and the VP of web development. I’ve been climbing consistently for a few months and I’m completely hooked. I also enjoy going to the gym, playing games, watching movies, and sleeping. Looking forward to meeting new faces and climbing with yall!" },
        { name: "Ryhana Williams", role: "", img: "/execs/web/Ryhana.jpg", 
          bio: "Hi! My name is Ryhana. I'm in my 2nd year of cs and I love to go thrifting, stay active and try new cafes." },
      ]
    },
  ];

  return (
    <section id="about">
      <div className="min-h-screen flex flex-col items-center justify-start bg-[#10091e] text-gray-800 dark:text-gray-200 p-6">
        
        <h1 className="md:ms-4 text-3xl md:text-5xl font-bold mb-6 text-purple-300 text-center md:pt-30"> <BouncingText text="About Us" /> </h1>

        {/* Mission */}
        <h2 className="text-2xl font-semibold text-purple-200 mb-3">Our Story</h2>
        <p className="max-w-2xl text-center mb-4">
          Hey Climbers! We’re so excited to welcome you to another incredible year with the Western Climbing Club! 
          Since our very first meet-up in 2017, this community has grown into something truly special — all because of you. 
          Your passion, your encouragement, and your adventurous spirit are what make this club feel like home. 
        </p>
        <p className="max-w-2xl text-center mb-4">
          Over the past months, our exec team has been busy behind the scenes making this year the most unforgettable one yet. 
          From friendly competitions and outdoor trips to skill-building sessions and late-night bouldering hangs, 
          everything we’ve planned is here to support you — to help you push your limits, grow your skills, and connect with others who share your love for climbing. 
        </p>
        <p className="max-w-2xl text-center mb-4">
          Whether you’ve been with us since our first rope nights or you’re just stepping onto the wall for the first time, 
          we want this to be a place where you feel encouraged to challenge yourself, try new things, and share in the joy of reaching new heights. 
          We can’t wait to see the memories we’ll make together this year. 
          Here’s to another season of climbing, laughter, and adventure.  – Western Climbing Club Team
        </p>

        {/*Nav */}
        <div className="mb-6 w-full">
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
              <div key={team.name} className="flex justify-center">
          <div className="text-center w-full">
            <h2 className="text-2xl font-semibold text-purple-200 mb-6">{team.name}</h2>
            <div className="flex flex-wrap justify-center items-stretch gap-4 md:gap-6">
              {team.members.map((member) => (
                <ExecCard
            key={member.name}
            name={member.name}
            role={member.role}
            img={member.img}
            bio={member.bio}
                />
              ))}
            </div>
          </div>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}
