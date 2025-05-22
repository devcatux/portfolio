import LazyImage from './LazyImage'; // adjust path based on your project structure
import CarouselResearch from './CarouselResearch';
// TextImg4: Text with split screen image spilling off screen
const TextImg4 = () => {
    return (
      <div className="relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
          <div className="lg:pr-12">
            <p className="text-lg text-gray-700 mb-8">
              During a UX bootcamp, I led the design of Urban Sprout, a platform connecting urban gardeners with sustainable farmers. 
              The project aimed to address the growing demand for local, sustainable produce while supporting small-scale farmers.
            </p>
            <div className="bg-gray-50 p-8 rounded-xl">
              <h3 className="text-xl font-semibold mb-4">Research Insights</h3>
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-lg">85%</p>
                  <p className="text-gray-600">of consumers want to support local farmers</p>
                </div>
                <div>
                  <p className="font-bold text-lg">70%</p>
                  <p className="text-gray-600">struggle to find local produce</p>
                </div>
                <div>
                  <p className="font-bold text-lg">60%</p>
                  <p className="text-gray-600">are willing to pay more for transparency</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative lg:absolute lg:right-0 lg:top-0 lg:h-full lg:w-1/2 xl:w-2/5">
            <div className="h-full w-full">
            <CarouselResearch
            images={[
                {
                src: "/images/bba/employee make an offer.png",
                alt: "Make an offer"
                },
                {
                src: "/images/bba/employer offer received.png",
                alt: "New offer"
                }
            ]}
            height="h-full"
            />

            </div>
            <div className="absolute -bottom-4 -left-4 h-24 w-2/3 bg-portfolio-accent rounded-xl -z-10 lg:hidden"></div>
          </div>
        </div>
      </div>
    );
  };

  export default TextImg4;