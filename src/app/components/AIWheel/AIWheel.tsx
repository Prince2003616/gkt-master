import React from 'react';
import Image from 'next/image';

const AIWheel: React.FC = () => {
  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-lavender-500 -ml-52 lg:-ml-15">
        Artificial Intelligence
      </h2>
            
      <div className="relative transition-transform hover:scale-105 duration-300 px-8 mt-8">
        <Image
          src="/aiwheel.png"
          alt="AI Solutions Wheel"
          width={800}
          height={800}
          className="w-full h-auto rounded-lg shadow-lg"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent rounded-lg" />
      </div>
    </div>
  );
};

export default AIWheel; 