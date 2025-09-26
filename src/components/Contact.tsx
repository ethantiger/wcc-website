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
    <section id="contact">
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-bl from-[#10091e] via-[#1a0d2e] to-[#0f0820] text-gray-800 dark:text-gray-200 p-6 relative overflow-hidden">
        <h1 className="text-center text-3xl md:text-5xl font-bold mb-6 text-purple-300">
          <BouncingText text="Contact Us" />
        </h1>
        
        {/* Contact Information */}
        <div className="max-w-4xl w-full space-y-8 relative z-10">
          {/* General Questions */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-300/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 group">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-purple-500/20 mr-4 group-hover:bg-purple-500/30 transition-colors duration-300">
                <IconMail className="text-purple-300" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-fuchsia-200">General Questions</h2>
            </div>
            <p className="text-gray-200 leading-relaxed">
              For general questions about the club, events, or membership, reach out to us at{" "}
              <a 
                href="mailto:climbing.club@westernusc.ca" 
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300 hover:from-fuchsia-300 hover:to-purple-300 transition-all duration-300 font-medium underline decoration-purple-400/50 hover:decoration-purple-300"
              >
                climbing.club@westernusc.ca
              </a>
            </p>
          </div>

          {/* Instagram Contact */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-300/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10 group">
            <div className="flex items-center mb-4">
              <div className="p-2 rounded-lg bg-purple-500/20 mr-4 group-hover:bg-purple-500/30 transition-colors duration-300">
                <IconMessageCircle className="text-purple-300" size={24} />
              </div>
              <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-fuchsia-200">Quick Contact</h2>
            </div>
            <p className="text-gray-200 leading-relaxed">
              For quick questions and updates, contact us through our Instagram DMs at{" "}
              <a 
                href="https://www.instagram.com/westernclimbingclub/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300 hover:from-fuchsia-300 hover:to-purple-300 transition-all duration-300 font-medium underline decoration-purple-400/50 hover:decoration-purple-300"
              >
                @westernclimbingclub
              </a>
            </p>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl p-6 border border-purple-300/20 hover:border-purple-400/40 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/10">
            <div className="flex items-center mb-6">
              <div className="p-2 rounded-lg bg-purple-500/20 mr-4">
                <IconHelp className="text-purple-300" size={24} />
              </div>
              <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-fuchsia-200">Frequently Asked Questions</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-min">
              {faqData.map((item, index) => (
                <div key={index} className="bg-gray-700/20 backdrop-blur-sm rounded-xl border border-purple-300/10 hover:border-purple-300/30 self-start transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10">
                  <button
                    onClick={() => toggleItem(index)}
                    className="w-full px-4 py-3 text-left flex items-center justify-between hover:bg-gray-600/20 transition-colors duration-200 rounded-xl group"
                  >
                    <span className="text-purple-200 font-medium text-sm md:text-base group-hover:text-purple-100 transition-colors duration-200">
                      {item.question}
                    </span>
                    <div className="ml-3 flex-shrink-0">
                      {openItems.includes(index) ? (
                        <IconMinus className="text-purple-300 group-hover:text-purple-200 transition-all duration-300 ease-in-out transform group-hover:scale-110" size={20} />
                      ) : (
                        <IconPlus className="text-purple-300 group-hover:text-purple-200 transition-all duration-300 ease-in-out transform group-hover:scale-110" size={20} />
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
                    <div className="px-4 pb-4 pt-2">
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
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 to-fuchsia-200 mb-8">Connect With Us</h2>
            <div className="flex flex-wrap justify-center gap-8">
              <a
                href="https://discord.com/invite/8vjZAzeECQ"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 bg-gray-800/30 backdrop-blur-sm hover:bg-gray-700/40 rounded-2xl border border-purple-300/20 hover:border-purple-300/50 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-blue-500/20"
                aria-label="Discord"
              >
                <div className="w-18 h-18 flex items-center justify-center bg-gradient-to-br from-[#5865F2] to-[#4752C4] rounded-2xl shadow-lg mb-4 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <IconBrandDiscord size={36} color="white" />
                </div>
                <span className="text-purple-200 font-medium group-hover:text-white transition-colors duration-300">Discord</span>
              </a>
              
              <a
                href="https://www.instagram.com/westernclimbingclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 bg-gray-800/30 backdrop-blur-sm hover:bg-gray-700/40 rounded-2xl border border-purple-300/20 hover:border-purple-300/50 transition-all duration-300 hover:scale-110 hover:shadow-2xl hover:shadow-pink-500/20"
                aria-label="Instagram"
              >
                <div className="w-18 h-18 flex items-center justify-center bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 rounded-2xl shadow-lg mb-4 group-hover:shadow-xl group-hover:scale-110 transition-all duration-300">
                  <IconBrandInstagram size={36} color="white" />
                </div>
                <span className="text-purple-200 font-medium group-hover:text-white transition-colors duration-300">Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}