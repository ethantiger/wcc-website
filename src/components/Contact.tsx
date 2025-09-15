import { IconBrandDiscord, IconBrandInstagram, IconTree, IconMail, IconMessageCircle, IconHelp } from "@tabler/icons-react";
import BouncingText from "./ui/BouncingText";

export default function Contact() {
  return (
    <section id="contact">
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#10091e] text-gray-800 dark:text-gray-200 p-6">
        <h1 className="text-center text-3xl md:text-5xl font-bold mb-6 text-purple-300">
          <BouncingText text="Contact Us" />
        </h1>
        
        {/* Contact Information */}
        <div className="max-w-4xl w-full space-y-8">
          {/* General Questions */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-purple-300/20">
            <div className="flex items-center mb-4">
              <IconMail className="text-purple-300 mr-3" size={24} />
              <h2 className="text-xl font-semibold text-purple-200">General Questions</h2>
            </div>
            <p className="text-gray-300">
              For general questions about the club, events, or membership, reach out to us at{" "}
              <a 
                href="mailto:climbing.club@westernusc.ca" 
                className="text-purple-300 hover:text-purple-200 transition-colors font-medium"
              >
                climbing.club@westernusc.ca
              </a>
            </p>
          </div>

          {/* Instagram Contact */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-purple-300/20">
            <div className="flex items-center mb-4">
              <IconMessageCircle className="text-purple-300 mr-3" size={24} />
              <h2 className="text-xl font-semibold text-purple-200">Quick Contact</h2>
            </div>
            <p className="text-gray-300">
              For quick questions and updates, contact us through our Instagram DMs at{" "}
              <a 
                href="https://www.instagram.com/westernclimbingclub/" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-purple-300 hover:text-purple-200 transition-colors font-medium"
              >
                @westernclimbingclub
              </a>
            </p>
          </div>

          {/* FAQ Section */}
          <div className="bg-gray-800/50 rounded-lg p-6 border border-purple-300/20">
            <div className="flex items-center mb-4">
              <IconHelp className="text-purple-300 mr-3" size={24} />
              <h2 className="text-xl font-semibold text-purple-200">Frequently Asked Questions</h2>
            </div>
            <p className="text-gray-300 mb-4">
              Have a question? Check out our comprehensive FAQ document for answers to common questions about the club, events, and climbing.
            </p>
            <a
              href="https://docs.google.com/document/d/1R_tDyVxYqNBGVJbCR0cZ94eoh_cVqGbEEcNUJRgKqbY/edit?tab=t.0"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
            >
              View FAQ Document
            </a>
          </div>

          {/* Social Media Links */}
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-purple-200 mb-6">Connect With Us</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <a
                href="https://discord.com/invite/8vjZAzeECQ"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-purple-300/20 hover:border-purple-300/40 transition-all duration-200 hover:scale-105"
                aria-label="Discord"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-[#5865F2] rounded-lg shadow mb-3 group-hover:shadow-lg transition-shadow">
                  <IconBrandDiscord size={32} color="white" />
                </div>
                <span className="text-purple-200 font-medium">Discord</span>
              </a>
              
              <a
                href="https://www.instagram.com/westernclimbingclub/"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-purple-300/20 hover:border-purple-300/40 transition-all duration-200 hover:scale-105"
                aria-label="Instagram"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 rounded-lg shadow mb-3 group-hover:shadow-lg transition-shadow">
                  <IconBrandInstagram size={32} color="white" />
                </div>
                <span className="text-purple-200 font-medium">Instagram</span>
              </a>
              
              <a
                href="https://linktr.ee/westernclimbingclub?fbclid=PAZXh0bgNhZW0CMTEAAacbBuTURLLWFg-On2lXv-9Mwb1wq2U07HZCGJbf_btCImc_YGRqo3YWz3QKHw_aem_UoJRo2Q0GtdCEqHvgyMwoA"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-4 bg-gray-800/50 hover:bg-gray-700/50 rounded-lg border border-purple-300/20 hover:border-purple-300/40 transition-all duration-200 hover:scale-105"
                aria-label="Linktree"
              >
                <div className="w-16 h-16 flex items-center justify-center bg-green-600 rounded-lg shadow mb-3 group-hover:shadow-lg transition-shadow">
                  <IconTree size={32} color="white" />
                </div>
                <span className="text-purple-200 font-medium">Linktree</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}