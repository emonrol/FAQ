'use client';

import { useState } from 'react';
import React from 'react';

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        className="w-full py-6 px-4 text-left flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
        onClick={onToggle}
      >
        <span className="font-medium text-gray-900 dark:text-gray-100 pr-4">
          {question}
        </span>
        <span className="text-gray-500 text-xl font-light">
          {isOpen ? '−' : '+'}
        </span>
      </button>
      {isOpen && (
        <div className="px-4 pb-6 text-gray-600 dark:text-gray-300 leading-relaxed">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function Home() {
  const [openItems, setOpenItems] = useState({});
  const [faqData, setFaqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const loadFAQ = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api.github.com/repos/chagai95/stayinginbern/issues?labels=faq");
      
      if (!res.ok) {
        throw new Error(`Failed to fetch FAQ data: ${res.status}`);
      }
      
      const data = await res.json();
      
      // Transform GitHub issues into FAQ forma
      const transformedData = [{
        category: "FAQ from GitHub Issues",
        questions: data.map(issue => ({
          question: issue.title,
          answer: issue.body || "No description provided."
        }))
      }];
      
      setFaqData(transformedData);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error loading FAQ:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load FAQ on component mount
  React.useEffect(() => {
    loadFAQ();
    
    // Set up interval to update every 60 seconds
    const interval = setInterval(loadFAQ, 86400000);
    
    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <header className="bg-blue-600 dark:bg-blue-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Staying in Bern - FAQ</h1>
          <p className="text-xl opacity-90">Everything you need to know about our community project</p>
        </div>
      </header>

      {/* FAQ Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600 dark:text-gray-300">Loading FAQ data...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900 border border-red-200 dark:border-red-700 rounded-lg p-6 mb-8">
            <h3 className="text-red-800 dark:text-red-200 font-medium mb-2">Error loading FAQ</h3>
            <p className="text-red-600 dark:text-red-300">{error}</p>
            <button 
              onClick={loadFAQ}
              className="mt-4 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Try Again
            </button>
          </div>
        )}
        
        {!loading && !error && faqData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">No FAQ items found.</p>
          </div>
        )}
        
        {!loading && faqData.length > 0 && (
          <div className="space-y-8">
            {faqData.map((section, sectionIndex) => (
              <div key={sectionIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    {section.category}
                  </h2>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {section.questions.map((item, questionIndex) => {
                    const currentIndex = sectionIndex * 1000 + questionIndex; // Unique index
                    return (
                      <FAQItem
                        key={currentIndex}
                        question={item.question}
                        answer={item.answer}
                        isOpen={openItems[currentIndex]}
                        onToggle={() => toggleItem(currentIndex)}
                      />
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 bg-blue-50 dark:bg-blue-900 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Can not find what you are looking for? Join our community chat!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/41766524456"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              WhatsApp: +41 76 652 44 56
            </a>
            <a
              href="https://stayinginbern.ch/chat-link"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-medium transition-colors dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-blue-400 dark:border-blue-400"
            >
              Join Community Chat
            </a>
          </div>
          <div className="mt-4">
            <a
              href="https://stayinginbern.ch/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              Visit our website: stayinginbern.ch
            </a>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Staying in Bern Community Project. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
