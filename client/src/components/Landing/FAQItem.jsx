const FAQItem = ({ question, answer }) => {
  return (
    <details className="group rounded-lg bg-background-light  p-4 border border-gray-200 ">
      <summary className="summary-arrow flex items-center justify-between cursor-pointer list-none">
        <span className="font-medium text-gray-900 ">{question}</span>
        {/* Ícono de flecha */}
        <svg
          className="h-5 w-5 text-gray-500  transition-transform duration-300 group-open:rotate-180"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></path>
        </svg>
      </summary>
      <p className="mt-2 text-sm text-gray-600 ">{answer}</p>
    </details>
  );
};

export default FAQItem;
