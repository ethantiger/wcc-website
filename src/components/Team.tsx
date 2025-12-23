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
    <section id="team" className="min-h-screen bg-[#10091e] py-12 md:py-0">
      <div className="flex flex-col md:flex-row items-center justify-start text-gray-200">
        
        {/* Rotated Title */}
        <div className="flex justify-center items-center md:h-screen h-[200px] md:w-[250px] w-full md:mr-8">
          <h1
            className="transform md:-rotate-90 text-[4rem] md:text-[8rem] font-extrabold bg-gradient-to-r from-purple-300 via-pink-300 to-purple-400 bg-clip-text text-transparent"
            style={{ whiteSpace: "nowrap", fontFamily: 'BodoniFLF Bold, serif' }}
          >
            Our Team
          </h1>
        </div>

        <div className="flex-1 w-full px-4 md:px-8">
          {/* Header Section */}
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Dream Team</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-8">
              The passionate climbers behind Western's most exciting community
            </p>
          </div>

          {/* Postcard Container */}
          <div className="w-full max-w-4xl mx-auto mb-12">
            <div className="relative w-full max-w-3xl mx-auto" style={{ perspective: '1500px' }}>
              <div 
                className="postcard-container relative w-full h-[500px] md:h-[450px] cursor-pointer transition-all duration-700 group"
                style={{ 
                  transformStyle: 'preserve-3d',
                  transform: `${isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'}`,
                }}
                onClick={() => setIsFlipped((prev) => !prev)}
              >
                {/* Front of Postcard */}
                <div 
                  className="absolute inset-0 w-full h-full bg-gradient-to-br from-white to-gray-50 p-5 md:p-6 shadow-2xl group-hover:shadow-purple-500/30 transition-shadow duration-300"
                  style={{ 
                    backfaceVisibility: 'hidden',
                    borderRadius: '12px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.4), 0 10px 20px rgba(0,0,0,0.3)'
                  }}
                >
                  <div className="relative w-full h-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-lg overflow-hidden">
                    <img
                      src="/execs/team.jpg"
                      alt="Our Team"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                    
                    {/* Flip Indicator */}
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-2 rounded-lg shadow-lg">
                      <p className="text-xs font-semibold text-purple-600 flex items-center gap-2">
                        <span className="text-lg">↻</span>
                        Click to flip
                      </p>
                    </div>
                    
                    {/* Bottom Info */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                      <div className="text-center">
                        <p className="text-2xl md:text-3xl font-bold text-white mb-1">Western Climbing Club</p>
                        <p className="text-purple-300 font-semibold">2025-2026 Executive Team</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Back of Postcard */}
                <div 
                  className="absolute inset-0 w-full h-full bg-gradient-to-br from-purple-50 to-pink-50 p-5 md:p-6 shadow-2xl"
                  style={{ 
                    backfaceVisibility: 'hidden', 
                    transform: 'rotateY(180deg)',
                    borderRadius: '12px',
                    boxShadow: '0 25px 50px rgba(0,0,0,0.4), 0 10px 20px rgba(0,0,0,0.3)'
                  }}
                >
                  <div className="h-full bg-white/60 backdrop-blur-sm rounded-lg p-6 md:p-8 relative overflow-hidden">
                    {/* Decorative lines */}
                    <div className="absolute inset-8 opacity-10">
                      {[...Array(15)].map((_, i) => (
                        <div key={i} className="border-b-2 border-purple-300 mb-6"></div>
                      ))}
                    </div>
                    
                    {/* Header */}
                    <div className="text-center mb-6 relative z-10">
                      <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 p-3 rounded-lg shadow-lg mb-3">
                        <h3 className="text-xl md:text-2xl font-bold text-white">
                          Welcome to WCC!
                        </h3>
                      </div>
                      <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto rounded-full"></div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 text-gray-700 relative z-10 text-sm md:text-base">
                      <p className="leading-relaxed font-medium">
                        🧗 <strong>Hey Climbers!</strong> We're thrilled to welcome you to another amazing year with the Western Climbing Club!
                      </p>
                      <p className="leading-relaxed">
                        Since 2017, we've built an incredible community where passion meets adventure. Your energy and spirit make this club feel like home.
                      </p>
                      <p className="leading-relaxed">
                        Whether you're a seasoned climber or just starting out, we're here to support you as you challenge yourself and reach new heights! 🎯
                      </p>
                      
                      {/* Signature */}
                      <div className="pt-4 text-right">
                        <p className="text-lg font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          – The WCC Team
                        </p>
                      </div>
                    </div>

                    {/* Decorative stamp */}
                    <div className="absolute top-6 right-6 w-20 h-16 border-4 border-dashed border-purple-400 flex items-center justify-center transform rotate-12 bg-white shadow-lg">
                      <div className="text-center">
                        <span className="text-2xl">🧗</span>
                        <p className="text-xs font-bold text-purple-600">WCC</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Navigation */}
          <div className="mb-12">
            <div className="flex flex-wrap justify-center gap-3">
              {teams.map((team) => (
                <button
                  key={team.name}
                  className={`px-5 md:px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    selectedTeam === team.name 
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/50 scale-105" 
                      : "bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white hover:scale-105"
                  }`}
                  onClick={() => setSelectedTeam(team.name)}
                >
                  {team.name}
                </button>
              ))}
            </div>
          </div>

          {/* Team Display */}
          <div className="w-full max-w-6xl mx-auto pb-12">
            {teams
              .filter((team) => team.name === selectedTeam)
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
