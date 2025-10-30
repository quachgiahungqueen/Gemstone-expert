
import React from 'react';
import { GemIcon } from './icons';

export const Header: React.FC = () => {
  return (
    <header className="py-6 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50 shadow-lg">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-cyan-400">
          <GemIcon className="w-10 h-10 mr-4 text-indigo-400" />
          <h1>Chuyên Gia Đá Quý AI</h1>
        </div>
        <p className="mt-2 text-md text-gray-400">
          Tải lên hình ảnh đá quý của bạn để nhận phân tích chuyên sâu từ AI
        </p>
      </div>
    </header>
  );
};
