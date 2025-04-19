import React, { useState, useEffect, useCallback } from 'react';
import { ArrowLeft, ArrowRight, Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  role: string;
  quote: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Akira Tanaka',
    avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg',
    role: 'Manga Artist',
    quote: 'Shikimanga made my Marin panels pop with vibrant colors! The AI understands character-specific coloring so well.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Emily Wong',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg',
    role: 'Digital Colorist',
    quote: 'The layered editing feature saves me hours of work. I can tweak colors for each element independently!',
    rating: 5,
  },
  {
    id: 3,
    name: 'David Chen',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg',
    role: 'Manga Enthusiast',
    quote: 'I\'ve tried many colorization tools, but Shikimanga\'s attention to character authenticity is unmatched.',
    rating: 4,
  },
  {
    id: 4,
    name: 'Sophia Rodriguez',
    avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg',
    role: 'Animation Student',
    quote: 'The community features are amazing! I love sharing my colored panels and getting feedback from others.',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [autoplay, setAutoplay] = useState(true);

  const nextTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, []);

  const prevTestimonial = useCallback(() => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, []);

  useEffect(() => {
    if (!autoplay) return;
    
    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [autoplay, nextTestimonial]);

  return (
    <section className="py-20 relative screentone-pattern">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            What People Are <span className="gradient-text">Saying</span>
          </motion.h2>
          <motion.p 
            className="text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Join thousands of manga enthusiasts and artists who are already
            transforming their favorite panels with Shikimanga.
          </motion.p>
        </div>

        <div 
          className="max-w-4xl mx-auto"
          onMouseEnter={() => setAutoplay(false)}
          onMouseLeave={() => setAutoplay(true)}
        >
          <motion.div 
            className="bg-container rounded-xl shadow-custom p-8 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex flex-col items-center">
              <img 
                src={testimonials[currentIndex].avatar} 
                alt={testimonials[currentIndex].name}
                className="w-20 h-20 rounded-full object-cover border-4 border-primary mb-6"
              />
              
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i}
                    size={20}
                    fill={i < testimonials[currentIndex].rating ? "#ff69b4" : "none"}
                    className={i < testimonials[currentIndex].rating ? "text-primary" : "text-gray-600"}
                  />
                ))}
              </div>
              
              <blockquote className="text-lg md:text-xl text-center mb-6">
                "{testimonials[currentIndex].quote}"
              </blockquote>
              
              <div className="text-center">
                <h4 className="font-semibold text-lg">{testimonials[currentIndex].name}</h4>
                <p className="text-text-secondary">{testimonials[currentIndex].role}</p>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
              <button 
                className="w-12 h-12 rounded-full bg-container shadow-custom flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                onClick={prevTestimonial}
                aria-label="Previous testimonial"
              >
                <ArrowLeft size={20} />
              </button>
              <button 
                className="w-12 h-12 rounded-full bg-container shadow-custom flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                onClick={nextTestimonial}
                aria-label="Next testimonial"
              >
                <ArrowRight size={20} />
              </button>
            </div>
          </motion.div>
          
          {/* Dots */}
          <div className="flex justify-center space-x-2 mt-12">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  currentIndex === index 
                    ? 'bg-primary w-6' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;