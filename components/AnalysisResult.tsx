
import React from 'react';
import { SparklesIcon } from './icons';

interface AnalysisResultProps {
  analysis: string | null;
  isLoading: boolean;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ analysis, isLoading }) => {
  if (!analysis && !isLoading) {
    return null;
  }
  
  if (isLoading) {
      return (
        <div className="mt-8 w-full max-w-4xl text-center text-gray-400">
            <p>AI đang tập trung phân tích... Quá trình này có thể mất một chút thời gian.</p>
        </div>
      )
  }

  return (
    <div className="mt-8 w-full max-w-4xl bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-700 animate-fade-in">
      <div className="p-6 md:p-8">
        <h2 className="flex items-center text-2xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          <SparklesIcon className="w-7 h-7 mr-3 text-indigo-400" />
          Kết Quả Phân Tích Chuyên Sâu
        </h2>
        <div className="prose prose-invert prose-lg max-w-none text-gray-300 whitespace-pre-wrap leading-relaxed">
          {analysis}
        </div>
      </div>
    </div>
  );
};

// Add a simple fade-in animation
const style = document.createElement('style');
style.innerHTML = `
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .animate-fade-in {
    animation: fadeIn 0.5s ease-out forwards;
  }
`;
document.head.appendChild(style);
