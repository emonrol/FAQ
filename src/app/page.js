'use client';

import { useState } from 'react';
import React from 'react';

const FAQItem = ({ question, answer, comments, html_url, isOpen, onToggle }) => {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        className="w-full py-6 px-4 text-left flex justify-between items-center hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors cursor-pointer"
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
        <div className="px-4 pb-6">
          <div className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
            {answer}
          </div>
          {comments > 0 && (
            <div className="bg-blue-50 dark:bg-blue-900 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
              <p className="text-blue-800 dark:text-blue-200 text-sm mb-2">
                💬 This FAQ has {comments} comment{comments !== 1 ? 's' : ''} on GitHub
              </p>
              <a
                href={html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 dark:text-blue-400 hover:underline text-sm font-medium"
              >
                Click here to view the discussion on GitHub →
              </a>
            </div>
          )}
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
  const [searchTerm, setSearchTerm] = useState('');

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const loadFAQ = async () => {
    try {
      setLoading(true);
      const res = await fetch("https://api.github.com/repos/chagai95/stayinginbern/issues?labels=faq&state=closed");
      
      if (!res.ok) {
        throw new Error(`Failed to fetch FAQ data: ${res.status}`);
      }
      
      const data = await res.json();
      
      // Transform GitHub issues into FAQ format
      const transformedData = [{
        category: "FAQ from GitHub Issues",
        questions: data.map(issue => ({
          question: issue.title,
          answer: issue.body || "No description provided.",
          comments: issue.comments,
          html_url: issue.html_url
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

  // Filter FAQ data based on search term
  const filteredFaqData = faqData.map(section => ({
    ...section,
    questions: section.questions.filter(item => 
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(section => section.questions.length > 0);

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
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search FAQ"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          {searchTerm && (
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              {filteredFaqData.reduce((total, section) => total + section.questions.length, 0)} result(s) found for &quot;{searchTerm}&quot;
            </p>
          )}
        </div>
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
        
        {!loading && !error && filteredFaqData.length === 0 && searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">No FAQ items match your search for &quot{searchTerm}&quot.</p>
            <button
              onClick={() => setSearchTerm('')}
              className="mt-4 text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
        
        {!loading && !error && faqData.length === 0 && !searchTerm && (
          <div className="text-center py-12">
            <p className="text-gray-600 dark:text-gray-300">No FAQ items found.</p>
          </div>
        )}
        
        {!loading && filteredFaqData.length > 0 && (
          <div className="space-y-8">
            {filteredFaqData.map((section, sectionIndex) => (
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
                        comments={item.comments}
                        html_url={item.html_url}
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
              href="https://wa.me/41783166727"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              WhatsApp: +41 78 316 67 27
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
