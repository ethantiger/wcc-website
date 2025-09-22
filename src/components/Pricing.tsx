import React, { useRef, useState } from "react";
import BouncingText from "./ui/BouncingText";

type CardProps = {
  title: string;
  price: string;
  features: string[];
  button: string;
  highlighted?: boolean;
};

function TiltCard({
  title,
  price,
  features,
  button,
  highlighted = false,
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
        <span className="text-lg font-normal">/mo</span>
      </p>
      <ul className="mb-6 space-y-2 text-center">
        {features.map((f) => (
          <li key={f}>✔️ {f}</li>
        ))}
      </ul>
      <button className="w-full py-2 rounded-lg bg-gradient-to-r from-purple-500 to-fuchsia-600 text-white font-semibold shadow-md hover:from-fuchsia-600 hover:to-purple-500 transition">
        {button}
      </button>
    </div>
  );
}

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="min-h-screen flex flex-col items-center justify-center bg-[#10091e] text-gray-800 dark:text-gray-200 p-6"
    >
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-purple-300">
        <BouncingText text="Choose Your Plan" />
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <TiltCard
          title="Basic"
          price="$19"
          features={["1 Project", "Email Support", "Community Access"]}
          button="Choose Basic"
        />
        <TiltCard
          title="Pro"
          price="$49"
          features={["10 Projects", "Priority Support", "Advanced Analytics"]}
          button="Choose Pro"
          highlighted
        />
        <TiltCard
          title="Enterprise"
          price="$99"
          features={["Unlimited Projects", "Dedicated Support", "Custom Solutions"]}
          button="Contact Sales"
        />
      </div>
    </section>
  );
}