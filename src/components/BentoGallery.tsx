
import React from 'react';

interface GalleryImage {
  url: string;
  alt: string;
  title?: string;
  subtitle?: string;
}

interface BentoGalleryProps {
  images: GalleryImage[];
  title?: string;
}

const BentoGallery: React.FC<BentoGalleryProps> = ({ images, title }) => {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        {title && (
          <h2 className="text-3xl font-bold mb-12 text-center text-portfolio-accent">{title}</h2>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Large featured image */}
          <div className="md:col-span-2 md:row-span-2 reveal-animation">
            <div className="group h-full overflow-hidden rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
              <div className="relative h-full">
                <img 
                  src={images[0]?.url || "https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=60"} 
                  alt={images[0]?.alt || "Gallery image"} 
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-6 text-white">
                    {images[0]?.title && <h3 className="text-xl font-semibold">{images[0].title}</h3>}
                    {images[0]?.subtitle && <p className="mt-2">{images[0].subtitle}</p>}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Smaller tiles */}
          {images.slice(1, 5).map((image, index) => (
            <div key={index} className={`reveal-animation-${index % 2 === 0 ? '' : 'right'}`}>
              <div className="group overflow-hidden rounded-md shadow-lg transition-all duration-300 hover:shadow-xl">
                <div className="relative h-64">
                  <img 
                    src={image.url} 
                    alt={image.alt} 
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                    <div className="p-4 text-white">
                      {image.title && <h3 className="text-lg font-semibold">{image.title}</h3>}
                      {image.subtitle && <p className="mt-1 text-sm">{image.subtitle}</p>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BentoGallery;
