import { renderStars } from "../landing/utils/InicioRender";

const LandingReviewCard = ({ review }) => {
  return (
    <div className="border rounded-xl p-6 space-y-2 shadow-2xl transition-transform duration-300 hover:scale-102">
      {/* --- Section: User Information */}
      <div className="flex items-center gap-4">
        <img
          alt={review.name}
          className="size-12 rounded-full object-cover"
          src={review.avatar}
        />
        <div>
          {/* --- User's name */}
          <p className="font-bold">{review.name}</p>
        </div>
      </div>

      {/* --- Section: Rating Stars --- */}
      {/* --- Renders the star icons component based on the rating score. */}
      <div className="flex gap-1">{renderStars(review.rating)}</div>

      {/* --- Section: Review Text --- */}
      <p className="text-sm font-medium">{review.text}</p>
    </div>
  );
};

export default LandingReviewCard;
