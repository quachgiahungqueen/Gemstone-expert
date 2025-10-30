
import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { ImageUpload } from './components/ImageUpload';
import { AnalysisResult } from './components/AnalysisResult';
import { Loader } from './components/Loader';
import { Footer } from './components/Footer';
import { analyzeGemstone } from './services/geminiService';
import { fileToBase64 } from './utils/fileUtils';
import { GemIcon } from './components/icons';

const App: React.FC = () => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (file: File | null) => {
    setImageFile(file);
    setAnalysis(null);
    setError(null);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewUrl(null);
    }
  };

  const handleAnalyze = useCallback(async () => {
    if (!imageFile) {
      setError('Vui lòng chọn một hình ảnh để phân tích.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const { base64, mimeType } = await fileToBase64(imageFile);
      const result = await analyzeGemstone(base64, mimeType);
      setAnalysis(result);
    } catch (err) {
      console.error(err);
      setError('Đã xảy ra lỗi trong quá trình phân tích. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  }, [imageFile]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-black">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 flex flex-col items-center">
        <div className="w-full max-w-4xl bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl shadow-indigo-500/10 border border-gray-700">
          <div className="p-6 md:p-10">
            <ImageUpload 
              onImageChange={handleImageChange} 
              previewUrl={previewUrl}
              isLoading={isLoading}
            />
            <div className="mt-8 text-center">
              <button
                onClick={handleAnalyze}
                disabled={!imageFile || isLoading}
                className="inline-flex items-center justify-center px-8 py-3 font-bold text-lg text-white bg-indigo-600 rounded-lg shadow-lg hover:bg-indigo-700 disabled:bg-gray-500 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader />
                    <span className="ml-3">Đang phân tích...</span>
                  </>
                ) : (
                  <>
                    <GemIcon className="w-6 h-6 mr-3" />
                    <span>Phân Tích Đá Quý</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
        
        {error && (
          <div className="mt-8 w-full max-w-4xl text-center bg-red-900/50 border border-red-700 text-red-300 p-4 rounded-lg">
            <p>{error}</p>
          </div>
        )}
        
        <AnalysisResult analysis={analysis} isLoading={isLoading} />
        
      </main>
      <Footer />
    </div>
  );
};

export default App;
