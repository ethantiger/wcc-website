import { useState } from "react";

type ExecCardProps = {
  name: string;
  role: string;
  img: string;
  bio: string;
};

function ExecCard({ name, role, img, bio }: ExecCardProps) {
  const [showBio, setShowBio] = useState(false);

  return (
    <div
      className="relative flex flex-col items-center bg-[#1a0f2e] p-4 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200 w-48 cursor-pointer"
      onClick={() => setShowBio(!showBio)}
    >
      <img
        src={img}
        alt={role}
        className="w-28 h-28 rounded-full mb-4 object-cover"
      />
      <h3 className="text-lg font-semibold text-white">{name}</h3>
      {role && <p className="text-sm text-gray-400">{role}</p>}

      {/* Bio on click */}
      {bio && showBio && (
        <div className="absolute inset-0 bg-[#10091e] bg-opacity-75 p-4 flex items-center justify-center transition-opacity duration-300">
          <p className="whitespace-normal text-xs text-center">{bio}</p>
        </div>
      )}
    </div>
  );
}

export default ExecCard;
