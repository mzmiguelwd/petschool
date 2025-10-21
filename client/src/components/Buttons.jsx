export const PrimaryButton = ({ text = "PrimaryButton" }) => {
  return (
    <button className="py-2 px-4 items-center rounded-[6px] text-sm font-bold bg-[var(--primary-button)] text-[white] cursor-pointer transition-all duration-300 hover:bg-[var(--primary-hover)]">
      {text}
    </button>
  );
};

export const SecondaryButton = ({ text = "SecondaryButton" }) => {
  return (
    <button className="py-2 px-4 items-center rounded-[6px] text-sm font-medium text-[var(--primary-button)] border-1 cursor-pointer transition-all duration-300 hover:bg-[var(--primary-button)]/10">
      {text}
    </button>
  );
};

export const Button3 = ({ text = "Button3" }) => {
  return (
    <button className="py-2 px-4 items-center rounded-[6px] text-sm font-medium text-[white] border-1 cursor-pointer transition-all duration-300 hover:bg-[white]/10">
      {text}
    </button>
  );
};
