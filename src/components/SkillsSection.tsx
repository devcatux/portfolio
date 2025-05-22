import React from "react";

const SkillsSection = () => {
  const skills = [
    {
      category: "Design",
      items: [
        "UI/UX Design",
        "Design Systems",
        "Wireframing",
        "Prototyping",
        "User Research"
      ]
    },
    {
      category: "Development",
      items: [
        "HTML, CSS, JavaScript",
        "Bootstrap",
        "GitHub",
        "Low-Code / No-Code Platforms",
        "AWS"
      ]
    },
    {
      category: "Process",
      items: [
        "Business Analysis",
        "Value Proposition Design",
        "Data-Driven Design",
        "Agile Collaboration",
        "Product Thinking"
      ]
    }
  ];

  return (
    <section className="bg-portfolio-blue text-white py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Expertise</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            I craft thoughtful, end-to-end product experiences that blend design precision, technical fluency, and strategic thinking.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {skills.map((skillGroup, index) => (
            <div key={index} className="bg-portfolio-lightBlue rounded-lg p-8">
              <h3 className="text-2xl font-bold mb-6 text-portfolio-accentLight">
                {skillGroup.category}
              </h3>
              <ul className="space-y-4">
                {skillGroup.items.map((skill, skillIndex) => (
                  <li key={skillIndex} className="flex items-center">
                    <span className="w-2 h-2 rounded-full bg-portfolio-accent mr-3"></span>
                    <span>{skill}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
