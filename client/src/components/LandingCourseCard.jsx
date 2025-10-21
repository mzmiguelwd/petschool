import { useNavigate } from "react-router-dom";

const LandingCourseCard = ({ card }) => {
  // Hook to enable programmatic navigation (routing)
  const navigate = useNavigate();

  return (
    <div
      className="overflow-hidden rounded-xl shadow-2xl transition-transform duration-300 cursor-pointer hover:scale-102"
      onClick={() => {
        navigate("/");
      }}
    >
      {/* --- Course Image --- */}
      <img
        src={card.img}
        alt={card.title}
        className="w-full h-48 object-cover"
      />
      {/* --- Card Content Area --- */}
      <div className="p-6">
        {/* --- Title --- */}
        <h3 className="text-xl font-bold mb-1">{card.title}</h3>
        {/* --- Description --- */}
        <p className="font-medium text-[var(--text-muted)]">{card.content}</p>
      </div>
    </div>
  );
};

export default LandingCourseCard;
