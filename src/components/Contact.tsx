import { IconBrandDiscord, IconBrandInstagram, IconTree } from "@tabler/icons-react";
import BouncingText from "./ui/BouncingText";

export default function Contact() {
  return (
    <section id="contact">
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#10091e] text-gray-800 dark:text-gray-200 p-6">
        <h1 className="text-center text-3xl md:text-5xl font-bold mb-6 text-purple-300">
          <BouncingText text="Contact Us" />
        </h1>
        <p className="max-w-2xl text-center mb-4">
          We would love to hear from you! Whether you have questions, feedback, or want to get involved with the climbing community, feel free to reach out to us at <a href="mailto:climbing.club@westernusc.ca" className="hover:text-blue-400">climbing.club@westernusc.ca</a>.
        </p>

        <div className="flex space-x-4 mt-6">
          <a
            href="https://discord.com/invite/8vjZAzeECQ"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 flex items-center justify-center bg-[#5865F2] rounded-lg shadow hover:scale-105 transition-transform"
            aria-label="Discord"
          >
            <IconBrandDiscord size={32} color="white" />
          </a>
          <a
            href="https://www.instagram.com/westernclimbingclub/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 flex items-center justify-center bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 rounded-lg shadow hover:scale-105 transition-transform"
            aria-label="Instagram"
          >
            <IconBrandInstagram size={32} color="white" />
          </a>
          <a
            href="https://linktr.ee/westernclimbingclub?fbclid=PAZXh0bgNhZW0CMTEAAacbBuTURLLWFg-On2lXv-9Mwb1wq2U07HZCGJbf_btCImc_YGRqo3YWz3QKHw_aem_UoJRo2Q0GtdCEqHvgyMwoA"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 flex items-center justify-center bg-green-600 rounded-lg shadow hover:scale-105 transition-transform"
            aria-label="Linktree"
          >
            <IconTree size={32} color="white" />
          </a>
        </div>
      </div>
    </section>
  );
}