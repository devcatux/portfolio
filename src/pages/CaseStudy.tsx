import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import Breadcrumbs from "@/components/Breadcrumbs";
import ScrollingImagesSection from "@/components/ScrollingImagesSection";
import ImageCarousel from "@/components/ImageCarousel";

const UX_STEPS = ["Discover", "Define", "Develop", "Deliver"];

const CaseStudy = () => {
	const [scrollProgress, setScrollProgress] = useState(0);

	// Scroll to top when page loads
	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	const [showProgressBar, setShowProgressBar] = useState(false);

	// Track scroll progress
	useEffect(() => {
		const handleScroll = () => {
			const scrollTop = window.scrollY;
			const totalHeight =
				document.documentElement.scrollHeight -
				document.documentElement.clientHeight;
			const progress = (scrollTop / totalHeight) * 100;

			setScrollProgress(progress);
			setShowProgressBar(scrollTop > 50); // Show bar only after user scrolls 50px down
			console.log("Scroll progress: ", progress); // Debug log
		};

		window.addEventListener("scroll", handleScroll);
		handleScroll(); // Call initially to set the progress
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Initialize animation observer
	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						entry.target.classList.add("active");
					}
				});
			},
			{ threshold: 0.1 }
		);

		const elements = document.querySelectorAll(
			".reveal-animation, .reveal-animation-right"
		);
		elements.forEach((el) => observer.observe(el));

		return () => {
			elements.forEach((el) => observer.unobserve(el));
		};
	}, []);

	// Calculate current step index (0 to 3)
	const currentStep = Math.min(
		UX_STEPS.length - 1,
		Math.floor((scrollProgress / 100) * UX_STEPS.length)
	);
	
	// Images for the scrolling section
	const projectImages = [
		"https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
		"https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
		"https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
		"https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
		"https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
		"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
	];

	// Additional high-quality images for the carousel
	const finalDesignImages = [
		"https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
		"https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
		"https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
		"https://images.unsplash.com/photo-1531297484001-80022131f5a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
		...projectImages,
	];

	return (
		<div className="min-h-screen">
			<Navbar />
			{/* Progress bar - fixed at the top of the viewport */}
			{showProgressBar && (
				<div className="fixed top-16 left-0 right-0 z-40 transition-opacity duration-300 bg-white shadow-md">
					{/* Custom progress bar - increased height for better visibility */}
					<div className="w-full h-3 bg-gray-200">
						<div
							style={{ width: `${scrollProgress}%` }}
							className="h-3 bg-portfolio-accent transition-all duration-300"
						/>
					</div>

					{/* Steps labels */}
					<div className="flex justify-between max-w-4xl mx-auto px-4 py-1 text-xs font-semibold text-gray-700">
						{UX_STEPS.map((step, idx) => (
							<div
								key={step}
								className={`flex flex-col items-center ${
									idx <= currentStep
										? "text-portfolio-accent"
										: "text-gray-400"
								}`}
							>
								<div
									className={`w-4 h-4 rounded-full mb-1 border-2 ${
										idx <= currentStep
											? "border-portfolio-accent bg-portfolio-accent"
											: "border-gray-400"
									}`}
								></div>
								{step}
							</div>
						))}
					</div>
				</div>
			)}

			{/* Hero Section */}
			<section className="pt-24 md:pt-32 pb-8">
				<div className="case-study-container">
					<Breadcrumbs 
						items={[
							{ label: "Works", href: "/works" },
							{ label: "FinTrack: Financial App Redesign", isCurrent: true }
						]} 
					/>

					<div className="max-w-3xl mx-auto text-center mb-16">
						<span className="text-portfolio-accent font-medium mb-4 block">
							Case Study
						</span>
						<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
							FinTrack: Financial App Redesign
						</h1>
						<p className="text-xl text-gray-600">
							Transforming a complex financial management application into an
							intuitive and engaging experience
						</p>
					</div>

					<div className="reveal-animation">
						<img
							src="https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
							alt="Financial App Dashboard"
							className="rounded-xl shadow-xl w-full object-cover h-[500px]"
						/>
					</div>
				</div>
			</section>

			{/* Overview Section */}
			<section className="py-16">
				<div className="case-study-container">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-12">
						<div className="reveal-animation">
							<h3 className="text-xl font-semibold mb-4 text-portfolio-blue">
								Client
							</h3>
							<p className="text-gray-700">
								FinTrack Technologies, a leading fintech company serving
								200,000+ users globally.
							</p>
						</div>
						<div className="reveal-animation">
							<h3 className="text-xl font-semibold mb-4 text-portfolio-blue">
								Timeline
							</h3>
							<p className="text-gray-700">
								12 weeks, from discovery to delivery of final designs and
								prototype.
							</p>
						</div>
						<div className="reveal-animation">
							<h3 className="text-xl font-semibold mb-4 text-portfolio-blue">
								My Role
							</h3>
							<p className="text-gray-700">
								Lead UX/UI Designer, responsible for research, UX design, UI
								design, and prototyping.
							</p>
						</div>
					</div>

					<div className="border-t border-gray-200 my-16"></div>

					<div className="reveal-animation">
						<h2 className="text-3xl font-bold mb-6">Project Overview</h2>
						<div className="prose prose-lg max-w-none">
							<p>
								FinTrack approached me to redesign their financial management
								application, which was suffering from poor user engagement and
								high abandonment rates. The existing app, while feature-rich,
								had become overly complex and difficult to navigate as new
								features were added over time.
							</p>
							<p>
								The primary goals were to simplify the user experience, improve
								key metrics like user retention and session time, and modernize
								the visual design while maintaining the app's comprehensive
								functionality.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Add the Scrolling Images Section */}
			<ScrollingImagesSection 
				title="Project Exploration"
				subtitle="A visual journey through the research, design, and development phases of the FinTrack application."
				images={projectImages}
			/>

			{/* Challenge Section */}
			<section className="py-16 bg-gray-50">
				<div className="case-study-container">
					<div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
						<div className="reveal-animation">
							<h2 className="text-3xl font-bold mb-6">The Challenge</h2>
							<div className="prose prose-lg">
								<p>
									The legacy FinTrack application suffered from several critical
									issues that were negatively impacting user experience:
								</p>
								<ul>
									<li>
										<strong>Information Overload:</strong> Dashboards were
										crowded with data, making it difficult for users to find
										what they needed.
									</li>
									<li>
										<strong>Complex Navigation:</strong> The app had grown to
										include over 30 different screens with inconsistent
										navigation patterns.
									</li>
									<li>
										<strong>Poor Mobile Experience:</strong> The mobile version
										was essentially a scaled-down version of the desktop app
										with tiny controls and text.
									</li>
									<li>
										<strong>Outdated Design:</strong> The visual design hadn't
										been updated in over 5 years and lacked modern UI patterns.
									</li>
									<li>
										<strong>Inconsistent UI:</strong> Different sections of the
										app had different visual styles, creating a disjointed
										experience.
									</li>
								</ul>
								<p>
									The key challenge was reimagining the experience while
									ensuring we didn't alienate existing power users who had
									adapted to the current workflow.
								</p>
							</div>
						</div>
						<div className="reveal-animation-right">
							<img
								src="https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
								alt="Complex data visualization"
								className="rounded-lg shadow-xl"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Research Section */}
			<section className="py-16">
				<div className="case-study-container">
					<div className="reveal-animation">
						<h2 className="text-3xl font-bold mb-8">Research & Discovery</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
						<div className="reveal-animation">
							<h3 className="text-2xl font-semibold mb-4 text-portfolio-blue">
								User Research
							</h3>
							<div className="prose prose-lg">
								<p>
									I conducted extensive user research to understand both pain
									points and what users valued about the current app:
								</p>
								<ul>
									<li>12 in-depth user interviews with existing customers</li>
									<li>Analysis of 500+ customer support tickets</li>
									<li>Competitive analysis of 5 leading fintech apps</li>
									<li>Survey with 350+ responses from current users</li>
								</ul>
								<p>
									This research revealed that while users appreciated the
									comprehensive feature set, they were frustrated by the
									learning curve and difficulty finding specific features.
								</p>
							</div>
						</div>

						<div className="reveal-animation-right">
							<h3 className="text-2xl font-semibold mb-4 text-portfolio-blue">
								Key Insights
							</h3>
							<div className="space-y-6">
								<div className="bg-gray-50 p-6 rounded-lg">
									<h4 className="font-medium mb-2">
										Power users vs. casual users
									</h4>
									<p className="text-gray-700">
										We identified two distinct user groups with different needs:
										power users who used the app daily and casual users who
										checked in weekly or monthly.
									</p>
								</div>

								<div className="bg-gray-50 p-6 rounded-lg">
									<h4 className="font-medium mb-2">Feature discovery issues</h4>
									<p className="text-gray-700">
										78% of users were unaware of key features that would benefit
										them, due to poor discoverability.
									</p>
								</div>

								<div className="bg-gray-50 p-6 rounded-lg">
									<h4 className="font-medium mb-2">Dashboard optimization</h4>
									<p className="text-gray-700">
										Users spent 65% of their time on just 3 key screens,
										suggesting a need to prioritize these experiences.
									</p>
								</div>
							</div>
						</div>
					</div>

					<div className="reveal-animation">
						<img
							src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
							alt="Research process image"
							className="case-study-image"
						/>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
							<div>
								<div className="bg-portfolio-purple text-white p-6 rounded-lg text-center">
									<span className="text-4xl font-bold block">67%</span>
									<span className="text-sm">
										of users found the navigation confusing
									</span>
								</div>
							</div>
							<div>
								<div className="bg-portfolio-purple text-white p-6 rounded-lg text-center">
									<span className="text-4xl font-bold block">82%</span>
									<span className="text-sm">
										preferred a simplified dashboard
									</span>
								</div>
							</div>
							<div>
								<div className="bg-portfolio-purple text-white p-6 rounded-lg text-center">
									<span className="text-4xl font-bold block">5+</span>
									<span className="text-sm">clicks to reach key features</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Add another scrolling images section */}
			<ScrollingImagesSection 
				title="Design Process"
				subtitle="Screenshots from various stages of the design process, from wireframes to high-fidelity mockups."
				images={[
					...projectImages.slice(3),
					...projectImages.slice(0, 3),
				]}
			/>

			{/* Strategy Section */}
			<section className="py-16 bg-gray-50">
				<div className="case-study-container">
					<div className="reveal-animation">
						<h2 className="text-3xl font-bold mb-8">Strategy & Approach</h2>
						<div className="prose prose-lg max-w-none mb-12">
							<p>
								Based on our research findings, I developed a comprehensive
								strategy to address the identified issues:
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
						<div className="reveal-animation">
							<div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 h-full">
								<div className="w-12 h-12 bg-portfolio-purple rounded-full flex items-center justify-center text-white font-bold mb-4">
									1
								</div>
								<h3 className="text-xl font-semibold mb-3">
									Simplify Without Reducing
								</h3>
								<p className="text-gray-700">
									Maintain all existing functionality while streamlining the UI
									and improving information architecture. Use progressive
									disclosure to manage complexity.
								</p>
							</div>
						</div>

						<div className="reveal-animation">
							<div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 h-full">
								<div className="w-12 h-12 bg-portfolio-purple rounded-full flex items-center justify-center text-white font-bold mb-4">
									2
								</div>
								<h3 className="text-xl font-semibold mb-3">
									Personalized Experience
								</h3>
								<p className="text-gray-700">
									Develop user-specific dashboards that prioritize the most
									relevant information and tasks based on user behavior and
									preferences.
								</p>
							</div>
						</div>

						<div className="reveal-animation">
							<div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100 h-full">
								<div className="w-12 h-12 bg-portfolio-purple rounded-full flex items-center justify-center text-white font-bold mb-4">
									3
								</div>
								<h3 className="text-xl font-semibold mb-3">
									Mobile-First Redesign
								</h3>
								<p className="text-gray-700">
									Rebuild the core experience for mobile first, ensuring
									excellent usability on smaller screens before scaling up to
									desktop.
								</p>
							</div>
						</div>
					</div>

					<div className="reveal-animation">
						<h3 className="text-2xl font-semibold mb-6">Design Principles</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="bg-white p-6 rounded-lg shadow border border-gray-100">
								<h4 className="font-medium mb-2 text-portfolio-blue">
									Clarity Over Density
								</h4>
								<p className="text-gray-700">
									Prioritize clear information hierarchy over showing everything
									at once. Use visual cues and whitespace effectively.
								</p>
							</div>

							<div className="bg-white p-6 rounded-lg shadow border border-gray-100">
								<h4 className="font-medium mb-2 text-portfolio-blue">
									Contextual Actions
								</h4>
								<p className="text-gray-700">
									Show relevant tools and options based on the current context
									instead of overwhelming with all possible actions.
								</p>
							</div>

							<div className="bg-white p-6 rounded-lg shadow border border-gray-100">
								<h4 className="font-medium mb-2 text-portfolio-blue">
									Consistent Patterns
								</h4>
								<p className="text-gray-700">
									Establish and maintain consistent UI patterns across the
									entire application to reduce cognitive load.
								</p>
							</div>

							<div className="bg-white p-6 rounded-lg shadow border border-gray-100">
								<h4 className="font-medium mb-2 text-portfolio-blue">
									Actionable Insights
								</h4>
								<p className="text-gray-700">
									Transform raw data into actionable insights with clear next
									steps for users to take.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Design Process */}
			<section className="py-16">
				<div className="case-study-container">
					<div className="reveal-animation">
						<h2 className="text-3xl font-bold mb-8">Design Process</h2>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
						<div className="reveal-animation">
							<h3 className="text-2xl font-semibold mb-4 text-portfolio-blue">
								Information Architecture
							</h3>
							<div className="prose prose-lg">
								<p>
									I completely restructured the app's information architecture,
									reducing navigation complexity and improving discoverability:
								</p>
								<ul>
									<li>
										Reduced main navigation items from 12 to 5 core categories
									</li>
									<li>Created logical groupings of related features</li>
									<li>Established clear user flows for common tasks</li>
									<li>
										Reduced the average number of clicks to reach key features
										from 5+ to 2
									</li>
								</ul>
							</div>
						</div>

						<div className="reveal-animation-right">
							<img
								src="https://images.unsplash.com/photo-1605810230434-7631ac76ec81?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
								alt="Information Architecture diagram"
								className="rounded-lg shadow-lg"
							/>
						</div>
					</div>

					<div className="border-t border-gray-200 my-16"></div>

					<div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
						<div className="reveal-animation">
							<img
								src="https://images.unsplash.com/photo-1527576539890-dfa815648363?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
								alt="Wireframe examples"
								className="rounded-lg shadow-lg"
							/>
						</div>

						<div className="reveal-animation-right">
							<h3 className="text-2xl font-semibold mb-4 text-portfolio-blue">
								Wireframing & Iteration
							</h3>
							<div className="prose prose-lg">
								<p>
									Starting with low-fidelity wireframes allowed me to rapidly
									explore multiple approaches and get early feedback:
								</p>
								<ul>
									<li>Created 30+ wireframes for key screens</li>
									<li>
										Conducted 3 rounds of user testing with interactive
										wireframes
									</li>
									<li>
										Iterated based on user feedback, focusing on usability
									</li>
									<li>
										Developed a component-based design system for consistency
									</li>
								</ul>
								<p>
									This iterative approach helped identify usability issues early
									and ensured the final design would meet user needs
									effectively.
								</p>
							</div>
						</div>
					</div>

					<div className="border-t border-gray-200 my-16"></div>

					<div className="mb-16">
						<div className="reveal-animation">
							<h3 className="text-2xl font-semibold mb-8 text-portfolio-blue">
								Visual Design System
							</h3>
							<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
								<div>
									<p className="text-gray-700 mb-6">
										To ensure consistency and scalability, I created a
										comprehensive design system with clear guidelines for all UI
										elements:
									</p>
									<ul className="space-y-2 text-gray-700">
										<li className="flex items-center">
											<span className="w-2 h-2 rounded-full bg-portfolio-accent mr-3"></span>
											Color palette with accessibility considerations
										</li>
										<li className="flex items-center">
											<span className="w-2 h-2 rounded-full bg-portfolio-accent mr-3"></span>
											Typography system with clear hierarchy
										</li>
										<li className="flex items-center">
											<span className="w-2 h-2 rounded-full bg-portfolio-accent mr-3"></span>
											Component library with states and variants
										</li>
										<li className="flex items-center">
											<span className="w-2 h-2 rounded-full bg-portfolio-accent mr-3"></span>
											Data visualization guidelines
										</li>
										<li className="flex items-center">
											<span className="w-2 h-2 rounded-full bg-portfolio-accent mr-3"></span>
											Animation and interaction patterns
										</li>
									</ul>
								</div>

								<div className="grid grid-cols-2 gap-4">
									<div className="flex flex-col space-y-4">
										<div className="h-16 rounded-md bg-portfolio-blue"></div>
										<div className="h-16 rounded-md bg-portfolio-accent"></div>
										<div className="h-16 rounded-md bg-portfolio-accentLight"></div>
									</div>
									<div className="flex flex-col space-y-4">
										<div className="h-16 rounded-md bg-gray-900"></div>
										<div className="h-16 rounded-md bg-gray-600"></div>
										<div className="h-16 rounded-md bg-gray-200"></div>
									</div>
								</div>
							</div>
						</div>

						<div className="reveal-animation">
							<img
								src="https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
								alt="Design system components"
								className="case-study-image"
							/>
						</div>
					</div>

					<div className="border-t border-gray-200 my-16"></div>

					<div className="reveal-animation">
						<h3 className="text-2xl font-semibold mb-8 text-portfolio-blue">
							Final Design Highlights
						</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-16">
							<div>
								<img
									src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
									alt="Dashboard design"
									className="rounded-lg shadow-lg mb-4"
								/>
								<h4 className="text-lg font-medium mb-2">
									Personalized Dashboard
								</h4>
								<p className="text-gray-700">
									Customizable widgets and data visualizations allow users to
									create a dashboard specific to their needs and priorities.
								</p>
							</div>

							<div>
								<img
									src="https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
									alt="Mobile app design"
									className="rounded-lg shadow-lg mb-4"
								/>
								<h4 className="text-lg font-medium mb-2">
									Responsive Mobile Experience
								</h4>
								<p className="text-gray-700">
									A truly responsive design that adapts to different screen
									sizes without compromising functionality or usability.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Add the new carousel section */}
			<ImageCarousel 
				title="Final Designs" 
				subtitle="Explore the high-fidelity mockups and final screens from the FinTrack app redesign"
				images={finalDesignImages} 
			/>

			{/* Results Section */}
			<section className="py-16 bg-gray-50">
				<div className="case-study-container">
					<div className="reveal-animation">
						<h2 className="text-3xl font-bold mb-8">Results & Impact</h2>
						<div className="prose prose-lg max-w-none mb-12">
							<p>
								The redesigned FinTrack app launched to overwhelmingly positive
								feedback from both users and stakeholders. Key metrics showed
								significant improvements:
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
						<div className="reveal-animation">
							<div className="bg-white p-6 rounded-lg shadow text-center h-full flex flex-col justify-center">
								<span className="text-4xl font-bold text-portfolio-blue block mb-2">
									37%
								</span>
								<span className="text-gray-700">
									Increase in daily active users
								</span>
							</div>
						</div>

						<div className="reveal-animation">
							<div className="bg-white p-6 rounded-lg shadow text-center h-full flex flex-col justify-center">
								<span className="text-4xl font-bold text-portfolio-blue block mb-2">
									42%
								</span>
								<span className="text-gray-700">
									Longer average session time
								</span>
							</div>
						</div>

						<div className="reveal-animation">
							<div className="bg-white p-6 rounded-lg shadow text-center h-full flex flex-col justify-center">
								<span className="text-4xl font-bold text-portfolio-blue block mb-2">
									28%
								</span>
								<span className="text-gray-700">
									Reduction in support tickets
								</span>
							</div>
						</div>

						<div className="reveal-animation">
							<div className="bg-white p-6 rounded-lg shadow text-center h-full flex flex-col justify-center">
								<span className="text-4xl font-bold text-portfolio-blue block mb-2">
									92%
								</span>
								<span className="text-gray-700">User satisfaction rating</span>
							</div>
						</div>
					</div>

					<div className="reveal-animation">
						<h3 className="text-2xl font-semibold mb-6">User Feedback</h3>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							<div className="bg-white p-6 rounded-lg shadow border border-gray-100">
								<div className="flex items-center mb-4">
									<img
										src="https://i.pravatar.cc/150?img=68"
										alt="User avatar"
										className="w-10 h-10 rounded-full mr-4"
									/>
									<div>
										<h4 className="font-medium">Michael P.</h4>
										<p className="text-sm text-gray-500">
											Power User, 3+ years
										</p>
									</div>
								</div>
								<p className="text-gray-700">
									"The new design is so much cleaner and easier to use. I can
									find everything I need much faster now, and the customizable
									dashboard is a game-changer."
								</p>
							</div>

							<div className="bg-white p-6 rounded-lg shadow border border-gray-100">
								<div className="flex items-center mb-4">
									<img
										src="https://i.pravatar.cc/150?img=26"
										alt="User avatar"
										className="w-10 h-10 rounded-full mr-4"
									/>
									<div>
										<h4 className="font-medium">Sarah T.</h4>
										<p className="text-sm text-gray-500">New User, 2 months</p>
									</div>
								</div>
								<p className="text-gray-700">
									"As someone new to financial apps, I was worried it would be
									confusing, but the interface is so intuitive. The guided setup
									was especially helpful."
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Reflections Section */}
			<section className="py-16">
				<div className="case-study-container">
					<div className="max-w-3xl mx-auto">
						<div className="reveal-animation">
							<h2 className="text-3xl font-bold mb-8">
								Reflections & Learnings
							</h2>
							<div className="prose prose-lg">
								<p>
									This project reinforced several important principles about
									designing complex applications:
								</p>
								<h3>Balance Between Simplicity and Functionality</h3>
								<p>
									The challenge wasn't removing features but making them more
									accessible. Rather than simplifying by cutting, we simplified
									by organizing and prioritizing.
								</p>
								<h3>User-Centered Process Pays Off</h3>
								<p>
									The extensive user research and testing throughout the process
									ensured we were solving the right problems. The positive
									metrics confirm that addressing user needs leads to business
									success.
								</p>
								<h3>The Value of Design Systems</h3>
								<p>
									Building a robust design system early in the process paid
									dividends later, allowing for consistent implementation and
									easier scaling as new features are added.
								</p>
								<h3>Looking Forward</h3>
								<p>
									Since launch, we've continued to monitor usage patterns and
									gather feedback. The modular design system we created has
									allowed the client's team to iteratively improve the product
									and add new features without compromising the core experience.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			{/* Next Project CTA */}
			<section className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
				<div className="case-study-container">
					<div className="text-center">
						<h2 className="text-3xl font-bold mb-8">Ready to see more?</h2>
						<div className="flex justify-center flex-wrap gap-4">
							<Button
								size="lg"
								variant="tertiary"
								onClick={() => window.location.href = '/works'}
							>
								View All Projects
							</Button>
							<Button
								size="lg"
								className="bg-portfolio-accent hover:bg-portfolio-accentLight text-white"
								asChild
							>
								<a href="mailto:hello@kaska.design">Get in Touch</a>
							</Button>
						</div>
					</div>
				</div>
			</section>

			<Footer />
		</div>
	);
};

export default CaseStudy;
