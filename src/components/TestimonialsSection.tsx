import React from "react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  image: string;
}

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Anna, Owner at PsiaŁapa",
      quote: "Kaśka created the product I needed—now my dog-walking business runs smoothly and stress-free. Highly recommended!"
    },
    {
      name: "Mo, CEO at LLC",
      quote: "Working with Kaśka was a game-changer. Her design and product insight helped us build something that truly resonates with users."
    },
    {
      name: "Sephen, Co-founder of Black Books Air",
      quote: "Kaśka's vision and execution brought our ideas to life. Her dedication and skill set are fantastic—highly recommended! We couldn't have asked for a better partner."
    }
  ];

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-16">
          <span className="text-portfolio-purple font-medium tracking-wider mb-2 block">WHAT CLIENTS SAY</span>
          <h2 className="text-3xl md:text-4xl font-bold">Testimonials</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-8 flex flex-col items-center text-center">
              <p className="text-lg text-gray-700 mb-6">"{testimonial.quote}"</p>
              <span className="font-semibold text-portfolio-accent">{testimonial.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
