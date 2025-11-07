import { useState } from "react";
import AnimatedTestimonials from "./ui/Animated-testimonials";


export default function About() {
  const [selectedTeam, setSelectedTeam] = useState<string>("President");
  const [isFlipped, setIsFlipped] = useState(false);

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
    <section id="team">
      <div className="flex flex-col md:flex-row items-center justify-start bg-[#10091e] text-gray-200">
        
        <div className="flex justify-center items-center md:h-screen h-[200px] md:w-[250px] w-full md:mr-8">
          <h1
            className="transform md:-rotate-90 text-[4rem] md:text-[8rem] font-extrabold text-purple-300"
            style={{ whiteSpace: "nowrap", fontFamily: 'BodoniFLF Bold, serif' }}
          >
            Our Team
          </h1>
        </div>

        <div className="flex-1">
          <div className="w-full max-w-4xl mx-auto px-4 mb-8">
            {/* Postcard Container */}
            <div className="relative w-full max-w-3xl mx-auto" style={{ perspective: '1000px' }}>
              <div 
                className="postcard-container relative w-full h-96 transition-transform duration-700 hover:scale-105 transform rotate-3 hover:rotate-1"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: `${isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'} rotate(3deg)`,
                }}
                onClick={() => setIsFlipped((prev) => !prev)}
              >
                {/* Front of Postcard - Image with Polaroid styling */}
                <div 
                  className="absolute inset-0 w-full h-full bg-white p-4 shadow-2xl transform hover:shadow-3xl"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    borderRadius: '8px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2)'
                  }}
                >
                  <div className="relative w-full h-4/5 bg-gray-100">
                    <img
                      src="/execs/team.jpg"
                      alt="Our Team"
                      className="w-full h-full object-cover"
                      style={{ borderRadius: '4px' }}
                    />
                    {/* Postcard styling overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" style={{ borderRadius: '4px' }}></div>
                    {/* Vintage postcard corner */}
                    <div className="absolute top-2 right-2 text-white opacity-75">
                      <p className="text-xs font-mono">POST CARD</p>
                    </div>
                    {/* Flip indicator */}
                    <div className="absolute top-4 left-4 text-white/90 text-center">
                      <p className="text-xs font-medium bg-black/50 px-2 py-1 rounded backdrop-blur-sm">
                        Click to flip
                      </p>
                    </div>
                  </div>
                  
                  {/* Polaroid white bottom section */}
                  <div className="h-1/5 flex items-center justify-center bg-white">
                    <div className="text-center">
                      <p className="text-lg font-bold text-gray-800 font-serif">Western Climbing Club</p>
                      <p className="text-sm text-gray-600">2025-2026</p>
                    </div>
                  </div>
                </div>

                {/* Back of Postcard - Text with Polaroid styling */}
                <div 
                  className="absolute inset-0 w-full h-full bg-white p-4 shadow-2xl"
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    transform: 'rotateY(180deg)',
                    borderRadius: '8px',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 8px 16px rgba(0,0,0,0.2)'
                  }}
                >
                  <div className="h-full bg-gradient-to-br from-gray-50 to-gray-100 p-4" style={{ borderRadius: '4px' }}>
                    {/* Postcard lines */}
                    <div className="absolute inset-8 opacity-20">
                      {[...Array(20)].map((_, i) => (
                        <div key={i} className="border-b border-blue-300 mb-4"></div>
                      ))}
                    </div>
                    
                    {/* Vintage postcard header */}
                    <div className="text-center mb-4 relative z-10">
                      <h3 className="text-xl font-bold text-purple-600 font-serif">
                        Welcome back!
                      </h3>
                      <div className="w-16 h-0.5 bg-purple-400 mx-auto mt-1"></div>
                    </div>

                    {/* Text content */}
                    <div className="space-y-3 text-gray-700 relative z-10 font-mono text-sm">
                      <p className="leading-relaxed">
                        Hey Climbers! We're so excited to welcome you to another incredible year with the Western Climbing Club! 
                        Since our very first meet-up in 2017, this community has grown into something truly special.
                      </p>
                      <p className="leading-relaxed">
                        Your passion, encouragement, and adventurous spirit make this club feel like home. 
                        Our exec team has been busy making this year unforgettable!
                      </p>
                      <p className="leading-relaxed">
                        Whether you're a veteran or stepping onto the wall for the first time, 
                        we want this to be where you challenge yourself and reach new heights.
                      </p>
                      
                      {/* Signature */}
                      <div className="pt-2 text-right">
                        <p className="text-sm italic text-purple-600">
                          – Western Climbing Club Team
                        </p>
                      </div>
                    </div>

                    {/* Vintage stamp */}
                    <div className="absolute top-6 right-6 w-16 h-12 border-2 border-dashed border-purple-500 flex items-center justify-center transform rotate-12 bg-white">
                      <span className="text-xs text-purple-600 font-bold">
                        WCC
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

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
      </div>
    </section>
  );
}
