
import React from "react";
import TwoColumnTextSection from "./TwoColumnTextSection";

const CaseStudyTwoColumnSection = () => {
  return (
    <TwoColumnTextSection
      title="Project Insights"
      bgClass="bg-[#F0EEF9]"
      leftColumnContent={
        <>
          <h3 className="text-xl font-bold mb-4 text-portfolio-accent">Design Process</h3>
          <p className="mb-4">
            Our design process began with extensive user research to understand the needs
            and pain points of the target audience. We conducted interviews, surveys, and
            usability tests to gather insights that informed our design decisions.
          </p>
          <p>
            The iterative process allowed us to refine our solutions based on continuous
            feedback from stakeholders and end-users. Starting with low-fidelity wireframes,
            we gradually increased the fidelity while validating our assumptions at each step.
          </p>
        </>
      }
      rightColumnContent={
        <>
          <h3 className="text-xl font-bold mb-4 text-portfolio-accent">Key Learnings</h3>
          <p className="mb-4">
            One of the most valuable insights from this project was the importance of
            designing for accessibility from the very beginning. By prioritizing inclusive
            design practices, we were able to create an experience that worked well for all users.
          </p>
          <p>
            We also learned that involving developers early in the design process led to
            more feasible solutions and a smoother handoff. The collaborative approach
            resulted in fewer revisions during implementation and a more cohesive final product.
          </p>
        </>
      }
    />
  );
};

export default CaseStudyTwoColumnSection;
