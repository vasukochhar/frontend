import React from 'react';
import { PaintBucket, Layers, Users, Sliders, Palette, CloudLightning, Globe, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <motion.div 
      className="bg-container rounded-lg p-6 shadow-custom hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      viewport={{ once: true }}
    >
      <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center mb-4">
        <div className="text-primary">{icon}</div>
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-text-secondary">{description}</p>
    </motion.div>
  );
};

const Features: React.FC = () => {
  const features = [
    {
      icon: <PaintBucket size={24} />,
      title: 'Hybrid Coloring',
      description: 'Combines character-specific models with LAB color space for unknown elements and user-uploaded references.',
    },
    {
      icon: <Layers size={24} />,
      title: 'Layered Editing',
      description: 'Edit hair, eyes, clothes, and backgrounds independently with precise control over each element.',
    },
    {
      icon: <Users size={24} />,
      title: 'Community Hub',
      description: 'Share your colorized panels, discover creations from others, and participate in community challenges.',
    },
    {
      icon: <Sliders size={24} />,
      title: 'Post-Processing',
      description: 'Adjust contrast, shading intensity, and apply authentic manga screentone patterns to your colored panels.',
    },
    {
      icon: <Palette size={24} />,
      title: 'Style Options',
      description: 'Choose from multiple coloring styles including Hand-Drawn, Anime-Style, Cel-Shading, and more.',
    },
    {
      icon: <CloudLightning size={24} />,
      title: 'Batch Processing',
      description: 'Colorize multiple manga panels at once with consistent styles and character colorations.',
    },
    {
      icon: <Globe size={24} />,
      title: 'Multi-Language',
      description: 'Full support for English and Japanese interfaces to make Shikimanga accessible worldwide.',
    },
    {
      icon: <Zap size={24} />,
      title: 'Fun Mode',
      description: 'Discover easter eggs and playful character interactions that make colorization even more enjoyable.',
    },
  ];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            className="text-3xl sm:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            Powerful <span className="gradient-text">Features</span>
          </motion.h2>
          <motion.p 
            className="text-text-secondary max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            Shikimanga combines advanced AI with intuitive tools to deliver the most
            comprehensive manga colorization experience available.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
              delay={0.1 + index * 0.05}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;