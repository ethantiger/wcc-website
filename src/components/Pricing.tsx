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
      className={`group rounded-xl shadow-lg p-8 flex flex-col items-center border-2 transition
        ${
          highlighted
            ? "bg-[#24124a] shadow-2xl border-purple-500 z-10"
            : "bg-[#1a1033] border-transparent hover:border-purple-500"
        }
      `}
      style={style}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <h2 className="text-2xl font-semibold mb-2">{title}</h2>
      <p className="text-4xl font-bold mb-4">
        {price}
        {denom && <span className="text-lg font-normal">/climb night</span>}
      </p>
      <ul className="mb-6 space-y-2 text-center">
        {features.map((f) => (
          <li key={f}>
            <IconCircleCheck className="inline-block mr-2 text-green-500" />
            {f}
          </li>
        ))}
      </ul>
      <button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white font-semibold shadow-md hover:from-fuchsia-600 hover:to-purple-500 transition">
        {button}
      </button>
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
      <span className={`mr-3 font-semibold ${isMember ? "text-purple-400" : "text-gray-400"}`}>
        Junction Member
      </span>
      <button
        className={`relative w-14 h-8 rounded-full transition-colors duration-300 focus:outline-none ${
          isMember ? "bg-purple-600" : "bg-gray-400"
        }`}
        onClick={() => setIsMember(!isMember)}
        aria-label="Toggle member type"
      >
        <span
          className={`absolute left-1 top-1 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ${
            isMember ? "translate-x-6" : ""
          }`}
        />
      </button>
      <span className={`ml-3 font-semibold ${!isMember ? "text-purple-400" : "text-gray-400"}`}>
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
      className="min-h-screen flex flex-col items-center justify-center bg-[#10091e] text-gray-800 dark:text-gray-200 p-6"
    >
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-purple-300">
        <BouncingText text="Choose Your Plan" />
      </h1>
      <MemberToggle isMember={isMember} setIsMember={setIsMember} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
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
    </section>
  );
}