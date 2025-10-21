/**
 * Helper function to render a visual star rating based on the numerical rating.
 * @param {number} rating - The current rating (e.g., 5).
 * @returns {Array<JSX.Element>} Array of star icon elements.
 */
export const renderStars = (rating) => {
  const totalStars = 5;
  const stars = [];

  // Filled stars
  for (let i = 0; i < rating; i++) {
    stars.push(
      <i
        key={`filled-${i}`}
        className="bi bi-star text-[var(--primary-light)]"
      ></i>
    );
  }

  // Empty stars
  for (let i = rating; i < totalStars; i++) {
    stars.push(
      <i key={`empty-${i}`} className="bi bi-star text-[#cfcfcf]"></i>
    );
  }

  return stars;
};
