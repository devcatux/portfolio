import React from "react";

const servicesData = [
    {
        title: "User-centered mobile and web design",
        description: [
          "Beautiful, functional design with mobile-friendly layouts and clear user journeys.",
          "Empathy-driven, brand-aligned experiences that build trust and encourage customer interaction. UX and Ui design services."
        ],
      },
  {
    title: "Static website development",
    description: [
      "Boutique, one-on-one service for businesses seeking simple, professional static websites — without big platform complexity.",
      "Fast, sites that are easy to manage and built to last. No backend hassle, just reliability."
    ],
  },
  {
    title: "Support for small UK businesses",
    description: [
      "As a former small business owner, I understand the challenges of navigateing from idea to launch and beyond.", "Jargon-free guidance, compliance peace of mind, and stress-free tech setup."
    ],
  },
  
];

const Services = () => {
  return (
    <section className="py-24 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-8 max-w-6xl">
        <div className="text-center mb-16">
          <span className="text-portfolio-purple font-medium tracking-wider mb-2 block">WHAT I OFFER</span>
          <h2 className="text-xl md:text-4xl font-bold">Services</h2>
          <p className="mt-4 text-gray-700 max-w-3xl mx-auto text-lg">
            Helping small businesses feel confident online with clear design, modern code, and stress-free support tailored to sole traders, freelancers, and solopreneurs.
          </p>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {servicesData.map(({ title, description }, idx) => (
            <article
              key={idx}
              className="bg-white rounded-lg shadow-md p-8 flex flex-col text-center hover:shadow-lg transition-shadow duration-300 max-w-md mx-auto"
            >
              <h3 className="text-xl font-semibold mb-4 text-portfolio-blue">{title}</h3>
              {description.map((para, i) => (
                <p key={i} className="text-gray-700 mb-4">{para}</p>
              ))}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
