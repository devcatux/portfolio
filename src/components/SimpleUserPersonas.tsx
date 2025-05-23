import React, { useState } from "react";

const SimpleUserPersonas = () => {
  const personas = [
    {
      name: "Freelancer",
      imageSrc: "/images/bba/freelancer.png",
    },
    {
      name: "Employer",
      imageSrc: "/images/bba/employer.png",
    },
    {
      name: "Employee",
      imageSrc: "/images/bba/employee.png",
    },
  ];

  const [active, setActive] = useState(0);

  return (
    <div className="py-16 bg-white flex flex-col items-center">
      {/* Selector with avatar + name */}
      <div className="flex gap-6 mb-12 bg-gray-100 rounded-full p-3">
        {personas.map((p, i) => (
          <button
            key={p.name}
            onClick={() => setActive(i)}
            className={`flex items-center gap-3 px-6 py-3 rounded-full transition-all duration-300 ${
              active === i
                ? "bg-portfolio-accent text-white shadow-lg scale-105"
                : "bg-transparent text-gray-700 hover:bg-white hover:shadow-md"
            }`}
            aria-label={`Select ${p.name}`}
          >
            <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300">
              <img
                src={p.imageSrc}
                alt={p.name}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="font-medium">{p.name}</span>
          </button>
        ))}
      </div>

      {/* Big rectangular image, max-width 600px, responsive */}
      <div className="max-w-[600px] w-full shadow-xl">
        <img
          src={personas[active].imageSrc}
          alt={personas[active].name}
          className="w-full h-auto object-contain"
        />
      </div>
    </div>
  );
};

export default SimpleUserPersonas;
