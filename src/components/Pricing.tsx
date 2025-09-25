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
        <button className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-500 via-fuchsia-500 to-purple-600 text-white font-semibold shadow-lg hover:shadow-purple-500/30 hover:from-fuchsia-600 hover:to-purple-500 transition-all duration-300 transform hover:scale-105">
          {button}
        </button>
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
      <span className={`mr-3 font-semibold transition-colors duration-200 ${isMember ? "text-purple-300" : "text-gray-400"}`}>
        Junction Member
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
      <span className={`ml-3 font-semibold transition-colors duration-200 ${!isMember ? "text-purple-300" : "text-gray-400"}`}>
        Non-Member
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
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#10091e] via-[#1a0d2e] to-[#0f0820] text-gray-800 dark:text-gray-200 p-6 relative overflow-hidden"
    >
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-purple-300">
        <BouncingText text="Choose Your Plan" />
      </h1>
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="relative z-10">
        <h1 className="text-3xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-500 text-center">
          <BouncingText text="Choose Your Plan" />
        </h1>
        <MemberToggle isMember={isMember} setIsMember={setIsMember} />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
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
      </div>
    </section>
  );
}