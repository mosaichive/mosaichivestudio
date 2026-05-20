
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Star, Users, Handshake, Book, Shield, Target } from 'lucide-react';
import { motion } from 'framer-motion';

interface TeamValueProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

const TeamValue = ({ title, description, icon, delay }: TeamValueProps) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);
    
    return () => clearTimeout(timer);
  }, [delay]);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="h-full border border-gray-200 hover:shadow-lg transition-all duration-300 bg-white">
        <CardContent className="p-6 flex flex-col items-center text-center h-full">
          <div className="mb-4 p-3 rounded-full bg-gray-100 text-gray-800">
            {icon}
          </div>
          <h3 className="text-xl font-bold mb-3 text-gray-900">{title}</h3>
          <p className="text-gray-700">{description}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
};

const TeamValuesAnimated = () => {
  const teamValues = [
    {
      title: "Creative Excellence",
      description: "We pursue innovative solutions and maintain the highest standards in all our creative endeavors.",
      icon: <Star size={24} />,
      delay: 200
    },
    {
      title: "Collaborative Spirit",
      description: "We believe great ideas come from diverse perspectives and open communication.",
      icon: <Users size={24} />,
      delay: 400
    },
    {
      title: "Client Partnership",
      description: "We work as an extension of our clients' teams, fully invested in their success.",
      icon: <Handshake size={24} />,
      delay: 600
    },
    {
      title: "Continuous Learning",
      description: "We stay at the forefront of industry trends and constantly expand our skills.",
      icon: <Book size={24} />,
      delay: 800
    },
    {
      title: "Integrity & Transparency",
      description: "We build trust through honest communication and ethical business practices.",
      icon: <Shield size={24} />,
      delay: 1000
    },
    {
      title: "Results-Driven Approach",
      description: "We focus on delivering measurable outcomes that advance our clients' goals.",
      icon: <Target size={24} />,
      delay: 1200
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-gray-900">Our Team Values</h2>
            <p className="text-gray-700 max-w-3xl mx-auto">
              These core principles guide how we work together and deliver results for our clients.
            </p>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamValues.map((value, index) => (
            <TeamValue 
              key={index}
              title={value.title}
              description={value.description}
              icon={value.icon}
              delay={value.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamValuesAnimated;
