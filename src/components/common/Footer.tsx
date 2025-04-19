import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Github as GitHub, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-container py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold gradient-text mb-4">Shikimanga</h3>
            <p className="text-text-secondary mb-4">
              AI-powered manga panel colorization with endless customization options.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://twitter.com/shikimanga" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a 
                href="https://github.com/shikimanga" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-secondary hover:text-primary transition-colors"
              >
                <GitHub size={20} />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/features" 
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing" 
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  to="/testimonials" 
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link 
                  to="/roadmap" 
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Roadmap
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/blog" 
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link 
                  to="/documentation" 
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link 
                  to="/community" 
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Community
                </Link>
              </li>
              <li>
                <Link 
                  to="/support" 
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-text-primary mb-4">Company</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/about" 
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-text-secondary hover:text-primary transition-colors"
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-text-secondary text-sm">
            &copy; {new Date().getFullYear()} Shikimanga. All rights reserved.
          </p>
          <p className="text-text-secondary text-sm flex items-center mt-4 md:mt-0">
            Made with <Heart size={14} className="text-primary mx-1" /> by xAI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;