type ExecCardProps = {
  name: string;
  role: string;
  img: string;
  bio: string;
};

function ExecCard({ name, role, img, bio }: ExecCardProps) {
  return (
    <div className="relative group flex flex-col items-center bg-[#1a0f2e] p-4 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200 w-48">
      <img
        src={img}
        alt={role}
        className="w-28 h-28 rounded-full mb-4 object-cover"
      />
      <h3 className="text-lg font-semibold text-white">{name}</h3>
      {role && <p className="text-sm text-gray-400">{role}</p>}

      {/* Bio on hover */}
      <div className="absolute inset-0 bg-[#10091e] bg-opacity-75 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <p className="whitespace-normal text-sm text-center">{bio}</p>
      </div>

      </div>
  );
}

export default ExecCard;
