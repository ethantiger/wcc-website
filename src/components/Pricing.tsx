import React, { useRef, useState } from "react";
import { IconCircleCheck } from "@tabler/icons-react";
import BouncingText from "./ui/BouncingText";

type CardProps = {
  title: string;
  price: string;
  features: string[];
  button: string;
  highlighted?: boolean;
  denom?: boolean;
};

function TiltCard({
  title,
  price,
  features,
  button,
  highlighted = false,
  denom = false,
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (e: React.MouseEvent) => {
    const card = ref.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = (-y / (rect.height / 2)) * 5;
    const rotateY = (x / (rect.width / 2)) * 5;
    setStyle({
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`,
      transition: "transform 0.1s",
    });
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.3s",
    });
  };

  return (
    <div
      ref={ref}
      className={`group rounded-2xl shadow-2xl p-8 flex flex-col items-center border-2 transition-all duration-300 relative overflow-hidden
        ${
          highlighted
            ? "bg-gradient-to-br from-[#2a1458] via-[#24124a] to-[#1e0f3d] shadow-purple-500/30 border-purple-400 z-10 transform scale-105"
            : "bg-gradient-to-br from-[#1e1242] via-[#1a1033] to-[#140d28] border-purple-800/30 hover:border-purple-500/50 hover:shadow-purple-500/20"
        }
      `}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated background glow */}
      <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${
        highlighted ? 'opacity-30' : 'opacity-0 group-hover:opacity-20'
      }`}>
        <div className="absolute top-4 left-4 w-16 h-16 bg-purple-500/30 rounded-full blur-xl"></div>
        <div className="absolute bottom-4 right-4 w-20 h-20 bg-fuchsia-500/30 rounded-full blur-xl"></div>
      </div>

      <div className="relative z-10">
        <h2 className="text-2xl font-semibold mb-2 text-center bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-fuchsia-200">{title}</h2>
        <p className="text-4xl font-bold mb-4 text-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100">{price}</span>
          {denom && <span className="text-lg font-normal text-gray-300">/climb night</span>}
        </p>
        <ul className="mb-6 space-y-3 text-center">
          {features.map((f) => (
            <li key={f} className="flex items-center justify-center">
              <IconCircleCheck className="mr-2 text-green-400 flex-shrink-0" size={18} />
              <span className="text-gray-200 text-sm">{f}</span>
            </li>
          ))}
        </ul>
        <a
          target="_blank"
          href="https://westernusc.store/product/wcc-climb-night-pass/"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-purple-500/30 hover:from-fuchsia-600 hover:to-purple-500 transition-all duration-300 transform hover:scale-105 flex justify-center items-center"
        >
          {button}
        </a>
      </div>
    </div>
  );
}

// Toggle Switch Component
function MemberToggle({
  isMember,
  setIsMember,
}: {
  isMember: boolean;
  setIsMember: (v: boolean) => void;
}) {
  return (
    <div className="flex items-center mb-8">
      <span className={`mr-3 font-semibold transition-colors duration-200 ${!isMember ? "text-purple-300" : "text-gray-400"}`}>
        Non-Member
      </span>
      <button
        className={`relative w-16 h-9 rounded-full transition-all duration-300 focus:outline-none shadow-lg ${
          isMember ? "bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-purple-500/30" : "bg-gray-600"
        }`}
        onClick={() => setIsMember(!isMember)}
        aria-label="Toggle member type"
      >
        <span
          className={`absolute left-1 top-1 w-7 h-7 rounded-full bg-white shadow-md transition-transform duration-300 ${
            isMember ? "translate-x-7" : ""
          }`}
        />
      </button>
      
      <span className={`ml-3 font-semibold transition-colors duration-200 ${isMember ? "text-purple-300" : "text-gray-400"}`}>
        Junction Member
      </span>
    </div>
  );
}

export default function Pricing() {
  const [isMember, setIsMember] = useState(false);

  const plans = {
    dayPass: {
      title: "Day Pass",
      memberPrice: "$5",
      nonMemberPrice: "$10",
      features: ["Access to one climb night", "Free Snacks", "Giveaways"],
      button: "Choose Day Pass",
      denom: true,
      highlighted: false
    },
    semesterPass: {
      title: "Semester Pass",
      memberPrice: "$30",
      nonMemberPrice: "$60",
      features: ["Covers 8 - 10 climb nights", "Free Snacks", "Giveaways"],
      button: "Choose Semester Pass",
      denom: false,
      highlighted: true
    },
    yearPass: {
      title: "Year Pass",
      memberPrice: "$50",
      nonMemberPrice: "$100",
      features: ["Covers 18 - 22 climb nights", "Free Snacks", "Giveaways"],
      button: "Choose Year Pass",
      denom: false,
      highlighted: false
    }
  };

  return (
    <section
      id="pricing"
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#10091e] via-[#1a0d2e] to-[#0f0820] text-gray-800 dark:text-gray-200 relative overflow-hidden"
    >
      {/* Large Wavy Squiggle Transition */}

      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
        <svg className="relative block w-full h-[60px] md:h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 L0,60 Q150,110 300,60 Q450,10 600,60 Q750,110 900,60 Q1050,10 1200,60 L1200,0 Z" className="fill-[#10091e]" />
        </svg>
      </div>

      

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-30">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-6">
          <div className="inline-block">
            <span className="text-xs md:text-sm font-bold text-purple-300 uppercase tracking-widest bg-purple-500/10 px-5 py-2.5 rounded-full border border-purple-500/20 shadow-lg shadow-purple-500/10">
              Membership Options
            </span>
          </div>
          
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-purple-300">
            <BouncingText text="Choose Your Plan" />
          </h1>
          
        </div>

        {/* Toggle Section */}
        <div className="flex justify-center mb-12">
          <MemberToggle isMember={isMember} setIsMember={setIsMember} />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
          {Object.values(plans).map((plan) => (
            <TiltCard
              key={plan.title}
              title={plan.title}
              price={isMember ? plan.memberPrice : plan.nonMemberPrice}
              features={plan.features}
              button={plan.button}
              highlighted={plan.highlighted}
              denom={plan.denom}
            />
          ))}
        </div>

        {/* Bottom Info */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-400 max-w-3xl mx-auto">
            All passes include access to our exclusive climb nights with free snacks and exciting giveaways. 
            <span className="text-purple-300 font-semibold"> Junction Members save 50%!</span>
          </p>
        </div>
      </div>
      {/* Bottom Wavy Divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180">
        <svg className="relative block w-full h-[60px] md:h-[100px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0 L0,60 Q150,10 300,60 Q450,110 600,60 Q750,10 900,60 Q1050,110 1200,60 L1200,0 Z" className="fill-[#0a0513]" />
        </svg>
      </div>
    </section>
  );
}