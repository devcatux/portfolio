
import React from "react";

interface TwoColumnTextSectionProps {
  title?: string;
  leftColumnContent: React.ReactNode | string;
  rightColumnContent: React.ReactNode | string;
  bgClass?: string;
}

const TwoColumnTextSection: React.FC<TwoColumnTextSectionProps> = ({
  title,
  leftColumnContent,
  rightColumnContent,
  bgClass = "bg-white"
}) => {
  return (
    <section className={`py-16 md:py-20 ${bgClass}`}>
      <div className="case-study-container">
        {title && (
          <h2 className="text-3xl font-bold mb-10 text-portfolio-accent">
            {title}
          </h2>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="prose max-w-none">
            {typeof leftColumnContent === "string" ? (
              <p className="text-gray-700 leading-relaxed">{leftColumnContent}</p>
            ) : (
              leftColumnContent
            )}
          </div>
          
          <div className="prose max-w-none">
            {typeof rightColumnContent === "string" ? (
              <p className="text-gray-700 leading-relaxed">{rightColumnContent}</p>
            ) : (
              rightColumnContent
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TwoColumnTextSection;
