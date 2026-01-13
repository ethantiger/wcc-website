import { IconBrandDiscord, IconBrandInstagram, IconMail, IconMessageCircle, IconHelp, IconPlus, IconMinus } from "@tabler/icons-react";
import BouncingText from "./ui/BouncingText";
import { useState } from "react";

export default function Contact() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "Where do climb nights happen?",
      answer: "Junction Climbing Centre or J2 Bouldering on Sunday's from 6:30pm - 9:15pm"
    },
    {
      question: "What is the club membership fee?",
      answer: "The Club Membership fee is $20. Everyone must purchase a club membership before attending our events! Memberships can be purchased online through the USC storefront."
    },
    {
      question: "What are the entrance fees?",
      answer: "$5 for Junction Members, $10 for non-junction members. Can be paid online or in-person. We encourage online payments as it will speed up the check-in process."
    },
    {
      question: "Do I need experience to join?",
      answer: "Nope! Most of our members start as beginners so we encourage everyone new or experienced to join. We also offer many beginner courses and workshops to learn."
    },
    {
      question: "Do I need gear?",
      answer: "Nope! You can rent everything at the gym"
    },
    {
      question: "What does the club offer?",
      answer: "Over 50% discount on entry fee, free harness rentals, group belay lessons, and space to meet people."
    },
    {
      question: "What events do you run?",
      answer: "We run events within the club such as dead hang and pull-up contests and in-house bouldering competitions where you can win climbing gear and club merch! We also participate in the University Bouldering Series (UBS) where Western competes with climbing teams from other Ontario universities!"
    },
    {
      question: "How do I get to Junction?",
      answer: "Address for Junction: 1030 Elias Street. Directions from campus: Take the #2 bus from Natural Sciences Centre and get off at Dundas at Kellogg Lane. Walk straight down Dundas St and you'll see the gym!"
    },
  ];

  return (
    <section id="contact" className="relative bg-[#0a0513] overflow-hidden">
      <div className="min-h-screen flex flex-col items-center justify-center text-gray-800 dark:text-gray-200 px-6 py-32 relative">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6 relative z-10">
          <div className="inline-block">
            <span className="text-xs md:text-sm font-bold text-blue-300 uppercase tracking-widest bg-blue-500/10 px-5 py-2.5 rounded-full border border-blue-500/20 shadow-lg shadow-blue-500/10">
              Get in Touch
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-fuchsia-300">
            <BouncingText text="Contact Us" />
          </h1>
          
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Have questions? We're here to help! Reach out through any of the channels below.
          </p>
        </div>
        
        {/* Contact Information */}
        <div className="max-w-5xl w-full space-y-6 relative z-10">
          {/* General Questions */}
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-md rounded-3xl p-8 border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 group hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/30 to-fuchsia-500/20 mr-4 group-hover:from-purple-500/40 group-hover:to-fuchsia-500/30 transition-all duration-300 shadow-lg">
                <IconMail className="text-purple-200" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-fuchsia-200">General Questions</h2>
            </div>
            <p className="text-gray-200 leading-relaxed text-lg">
              For general questions about the club, events, or membership, reach out to us at{" "}
              <a 
                href="mailto:climbing.club@westernusc.ca" 
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300 hover:from-fuchsia-300 hover:to-purple-300 transition-all duration-300 font-semibold underline decoration-purple-400/50 hover:decoration-purple-300 decoration-2"
              >
                climbing.club@westernusc.ca
              </a>
            </p>
          </div>

          {/* Instagram Contact */}
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-md rounded-3xl p-8 border border-blue-400/30 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/20 group hover:-translate-y-1">
            <div className="flex items-center mb-4">
              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/30 to-purple-500/20 mr-4 group-hover:from-blue-500/40 group-hover:to-purple-500/30 transition-all duration-300 shadow-lg">
                <IconMessageCircle className="text-blue-200" size={28} />
              </div>
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">Quick Contact</h2>
            </div>
            <p className="text-gray-200 leading-relaxed text-lg">
              For quick questions and updates, contact us through our Instagram DMs at{" "}
              <a 
                href="https://www.instagram.com/westernclimbingclub/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300 hover:from-purple-300 hover:to-blue-300 transition-all duration-300 font-semibold underline decoration-blue-400/50 hover:decoration-blue-300 decoration-2"
              >
                @westernclimbingclub
              </a>
            </p>
          </div>

          {/* FAQ Section */}
          <div className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-md rounded-3xl p-8 border border-fuchsia-400/30 hover:border-fuchsia-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-fuchsia-500/20">
            <div className="flex items-center mb-8">
              <div className="p-3 rounded-xl bg-gradient-to-br from-fuchsia-500/30 to-pink-500/20 mr-4 shadow-lg">
                <IconHelp className="text-fuchsia-200" size={28} />
              </div>
              <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-200 to-pink-200">Frequently Asked Questions</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-min">
              {faqData.map((item, index) => (
                <div key={index} className="bg-gradient-to-br from-gray-700/30 to-gray-800/30 backdrop-blur-sm rounded-2xl border border-purple-300/20 hover:border-purple-300/40 self-start transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 overflow-hidden">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-5 py-4 text-left flex items-center justify-between hover:bg-gray-600/30 transition-colors duration-200 group"
                  >
                    <span className="text-purple-100 font-semibold text-sm md:text-base group-hover:text-white transition-colors duration-200 pr-2">
                      {item.question}
                    </span>
                    <div className="ml-3 flex-shrink-0">
                      {openItems.includes(index) ? (
                        <IconMinus className="text-purple-300 group-hover:text-purple-200 transition-all duration-300 ease-in-out transform group-hover:scale-110" size={22} />
                      ) : (
                        <IconPlus className="text-purple-300 group-hover:text-purple-200 transition-all duration-300 ease-in-out transform group-hover:scale-110" size={22} />
                      )}
                    </div>
                  </button>
                  <div 
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      openItems.includes(index) 
                        ? 'max-h-96 opacity-100' 
                        : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="px-5 pb-5 pt-1">
                      <p className="text-gray-200 text-sm md:text-base leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media Links */}
          <div className="text-center pt-8">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 mb-10">Connect With Us</h2>
            <div className="flex flex-wrap justify-center gap-10">
              <a
                href="https://discord.com/invite/8vjZAzeECQ"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md hover:from-gray-700/60 hover:to-gray-800/60 rounded-3xl border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/30 min-w-[160px]"
                aria-label="Discord"
              >
                <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-[#5865F2] to-[#4752C4] rounded-2xl shadow-xl mb-4 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <IconBrandDiscord size={40} color="white" />
                </div>
                <span className="text-blue-200 font-semibold text-lg group-hover:text-white transition-colors duration-300">Discord</span>
              </a>
              
              <a
                href="https://www.instagram.com/westernclimbingclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-md hover:from-gray-700/60 hover:to-gray-800/60 rounded-3xl border border-pink-400/30 hover:border-pink-400/60 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/30 min-w-[160px]"
                aria-label="Instagram"
              >
                <div className="w-20 h-20 flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-2xl shadow-xl mb-4 group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300">
                  <IconBrandInstagram size={40} color="white" />
                </div>
                <span className="text-pink-200 font-semibold text-lg group-hover:text-white transition-colors duration-300">Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}