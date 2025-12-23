

export default function Tutorial() {
  const steps = [
    {
      number: "1",
      title: "Get Your Membership",
      description: "Sign up for membership to access exclusive discounts, events, and climbing sessions throughout the year.",
      icon: "🤝",
      color: "from-purple-500 to-pink-500"
    },
    {
      number: "2",
      title: "Sign the Waivers",
      description: "Complete all necessary waivers to ensure a safe and enjoyable climbing experience.",
      icon: "🖊️",
      color: "from-pink-500 to-purple-600"
    },
    {
      number: "3",
      title: "Purchase Tickets",
      description: "Buy your climbing session tickets online or at the gym to secure your spot.",
      icon: "🎟️",
      color: "from-purple-600 to-indigo-500"
    },
    {
      number: "4",
      title: "Start Climbing!",
      description: "Whether you're a beginner or expert, challenge yourself, meet new friends, and reach new heights!",
      icon: "🧗‍♂️",
      color: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <section id="tutorial" className="min-h-screen">
      <div className="flex flex-col md:flex-row items-center justify-start bg-[#10091e] text-gray-200 py-12 md:py-0">

        {/* Steps Container */}
        <div className="flex-1 w-full max-w-6xl mx-auto px-4 md:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
              How to <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Join</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Follow these simple steps to become part of Western's most exciting climbing community
            </p>
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-2xl p-6 md:p-8 border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20"
              >
                {/* Step Number */}
                <div className="absolute -top-4 -left-4 w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <span className="text-2xl md:text-3xl font-bold text-white">{step.number}</span>
                </div>

                {/* Icon */}
                <div className="text-right text-4xl md:text-5xl mb-4 opacity-80 group-hover:scale-110 transition-transform duration-300">
                  {step.icon}
                </div>

                {/* Content */}
                <div className="mt-4">
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                    {step.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {step.description}
                  </p>
                </div>

                {/* Decorative gradient line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color} rounded-b-2xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}></div>
              </div>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-12 md:mt-16">
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {/* Membership Link */}
              <div className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 p-1 rounded-full shadow-lg hover:shadow-purple-500/50 transition-shadow duration-300">
                <a
                  href="https://westernusc.store/product/western-climbing-club/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-[#10091e] px-6 md:px-8 py-3 md:py-4 rounded-full text-white font-semibold hover:bg-transparent transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    Membership
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </a>
              </div>

              {/* Waivers Link */}
              <div className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 p-1 rounded-full shadow-lg hover:shadow-pink-500/50 transition-shadow duration-300">
                <a
                  href="https://westernu.campuslabs.ca/engage/submitter/form/start/19928"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-[#10091e] px-6 md:px-8 py-3 md:py-4 rounded-full text-white font-semibold hover:bg-transparent transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    USC Waiver
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </a>
              </div>

              <div className="inline-block bg-gradient-to-r from-pink-600 to-purple-600 p-1 rounded-full shadow-lg hover:shadow-pink-500/50 transition-shadow duration-300">
                <a
                  href="https://waiver.smartwaiver.com/w/5d1618de069c2/web/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-[#10091e] px-6 md:px-8 py-3 md:py-4 rounded-full text-white font-semibold hover:bg-transparent transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    Junction Waiver
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </a>
              </div>

              {/* Tickets Link */}
              <div className="inline-block bg-gradient-to-r from-indigo-600 to-purple-600 p-1 rounded-full shadow-lg hover:shadow-indigo-500/50 transition-shadow duration-300">
                <a
                  href="https://westernusc.store/product/wcc-climb-night-pass/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-[#10091e] px-6 md:px-8 py-3 md:py-4 rounded-full text-white font-semibold hover:bg-transparent transition-all duration-300 group"
                >
                  <span className="flex items-center gap-2">
                    Tickets
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}