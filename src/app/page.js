'use client';

import { useState } from 'react';

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

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    // Booking & Arrival
    {
      category: "Booking & Arrival",
      questions: [
        {
          question: "How can we book?",
          answer: "There is no traditional booking system. The sleeping plan is just to get an idea of how many people will be staying. We are a free offer and that's also the expectation. We cannot guarantee a place for you, even though we will most probably (99%) be able to host you. It's always good to have a backup plan - you could find someone on another free website or book a flexible Airbnb and cancel it a few days before you arrive."
        },
        {
          question: "Is it enough to add my name to the list?",
          answer: "1. We prefer to have a quick call especially for you, so you don't have the wrong expectations. 2. There is no need to write your name but it's nice for everyone to know who's coming so we prefer you do that. 3. The most important thing is to not bother the neighbors so you need to communicate well when you're coming and have someone confirm they will be there so they can open the door for you. 4. Do not just come the first time unannounced because we cannot have people waiting outside the door."
        },
        {
          question: "When someone books on Airbnb - free community listing",
          answer: "Unfortunately we realized too many people didn't understand properly what we wrote on Airbnb, so we are reminding everyone that we cannot host unconditionally. Even if you booked on Airbnb, if you don't follow the rules, especially regarding our check in procedure, then we will NOT BE ABLE TO HOST YOU. Please remember that this is a completely free experience, and we don't have time to answer all of your questions - you will have to read and watch everything yourself."
        },
        {
          question: "How do I get an invoice for my visa process?",
          answer: "We at Staying in Bern cannot offer you an invoice yet because we are not a professional business. If you want you can book us through Airbnb and we will return the money to you for the booking, but we are not able to refund any money that Airbnb takes as a percentage. This will be purely to help you get your invoice for your visa application and will not mean you can stay at our place for a few weeks."
        }
      ]
    },

    // House Rules & Community Living
    {
      category: "House Rules & Community Living",
      questions: [
        {
          question: "Protocol for people staying for 1-2 nights",
          answer: "1. Use sustainable section, or even your own sleeping bag. 2. We don't have a towel. 3. Be home at 8. 4. Wake up first and wake up everyone else. 5. Leave a 5 star review on Airbnb, Google maps and hostel world. 6. Help the long term people with their focus areas."
        },
        {
          question: "Daily meeting at 9:00 pm (evening 🙂)",
          answer: "We can check if everyone answered all the WhatsApp message. If everyone knows what their area of focus is. Tell everyone what we did today (fun stuff included 😎). Time to ask questions for everyone - make sure these are not repetitive questions - time box this."
        },
        {
          question: "Can I come sleep only for a few more nights?",
          answer: "No sorry, we usually host people for 2-3 days and if they show intrinsic interest in the project then they are asked to stay longer. We are not a free place to stay, everyone is welcome to come and be part of what we are trying to build, but not to take advantage of our limited time and energy and ask for too much. You can only come if the only thing you're interested in is to be part of what we're trying to build - not to sleep for free, that's not the idea of the project."
        },
        {
          question: "Sometimes we need a reset",
          answer: "It's difficult to live together with people. The longer you spend time with same person in the same house the more difficult it gets. In these cases we will ask people who were planning on staying longer to leave for a week, so we can reset the dynamics of the place and not fall into a rut. To avoid getting into such an uncomfortable situation, you can ask every day how we feel about you staying the next day. Don't take living together for granted, let's talk about what bothers us in each other so we can survive living together the longest."
        }
      ]
    },

    // Facilities & Practical Information
    {
      category: "Facilities & Practical Information",
      questions: [
        {
          question: "Where do I hang up my towel?",
          answer: "The towel problem is that if you put it in the bathroom, it doesn't really get dry because the bathroom is very damp, and there are too many people. The best place is to go outside and hang it up somewhere in the park. If there's not a lot of people around, you can find somewhere in the room. Most important: put your name on it with tape so we know it's yours. If you're okay with it in the basement, that would be the best solution, because there we have hooks."
        },
        {
          question: "Are there electricity sockets near the mattresses?",
          answer: "Yes, depending on which mattress you are sleeping on it might be closer or less close but all in all it's pretty close and there are quite a lot of sockets 😎 We also have some more extension cables so we can put them wherever if anyone needs 🙂"
        },
        {
          question: "Is there a locker in the basement so I can lock valuables?",
          answer: "We have 1 key for all doors in the basement so we could help one person if it's very valuable or if you are really afraid of losing your stuff. We also have a camera 📸 that records everything and from our experience things hardly ever get stolen, they do sometimes get misplaced and it takes some time to find stuff so it's best you keep your stuff in 1 bag and put a big sign on it with your name 😎"
        },
        {
          question: "Where can I park?",
          answer: "Unfortunately, we don't have parking available at the moment."
        },
        {
          question: "Washing and drying machine",
          answer: "The washing and drying facilities are located at Länggassstrasse 36, 3012 Bern, Switzerland. You can find the exact location here: https://maps.app.goo.gl/agr3GQuKaYDLTU1o8"
        }
      ]
    },

    // Community & Events
    {
      category: "Community & Events",
      questions: [
        {
          question: "How do I post about a community event?",
          answer: "You can post on: Instagram (tag Chagai and Ludo), Staying in Bern WhatsApp groups (Main group, Fun activities, House group), and Let's Bern (connectbern.ch) in the 'let's dine' channel. Example: 'Hello everyone! Today we are going to cook dinner for everyone that wants to join 🎉! We are thinking about eating around 17:30 so please let us know if you want to join by reacting on this message until 14:00.'"
        },
        {
          question: "Template for answering workaway and world packers",
          answer: "Hey it's so nice to get this message from you! Check out our website - https://stayinginbern.ch/ Let's have a quick call? We don't have any work hours and you are welcome to come for a few days completely for free with no expectations 🙂 You're welcome to also come anytime spontaneously, last minute or just use us as a backup plan 🎉 This is my WhatsApp number +41766524456 Here's the link to the groups: https://stayinginbern.ch/chat-link"
        },
        {
          question: "The idea of Staying in Bern",
          answer: "You can watch our video explaining the concept here: https://tube.dev.displ.eu/w/mnRSD9MJFNLHQQM3UENNxp"
        }
      ]
    },

    // Resources & Help
    {
      category: "Resources & Help",
      questions: [
        {
          question: "Places to go to for help with finding a job or apartment",
          answer: "ISA and Mazay are good places to start for help with finding a job or apartment."
        },
        {
          question: "How can I find a place in Basel?",
          answer: "You can use this Telegram group: https://t.me/basel_wohn_chat/62"
        },
        {
          question: "Where to find other accommodations like this in any other country/City?",
          answer: "1. Workaway 2. Couch surfing 3. https://trustroots.org 4. https://bewelcome.org 5. https://couchers.org"
        },
        {
          question: "How to find stuff",
          answer: "Here's a note we have for stuff we need: https://pad.chagai.website/p/stuffweneed. You can find things by: 1. Using https://map.pumpipumpe.ch/ to ask people in Bern for donations 2. Writing in the telegram group https://connectbern.ch/groups/non-commercial-marketplace/join 3. Searching on websites like Ricardo, tutti, Facebook marketplace, nimms.ch 4. Going to hotels and hostels to ask for donated sheets"
        }
      ]
    },

    // How-to Videos & Instructions
    {
      category: "How-to Videos & Instructions",
      questions: [
        {
          question: "How-to videos and QR codes",
          answer: "We have instructional videos with QR codes for: How to enter the apartment (tiny.cc/8mcl001), How to find the basement (tiny.cc/bmcl001), How to sleep (tiny.cc/cmcl001), Trash separation (tiny.cc/fmcl001), Using the Staying In Bern bike (tiny.cc/hmcl001), Taking out trash (tiny.cc/imcl001), Places to work in Bern (tiny.cc/nmcl001), Free breakfast at coop central station (tiny.cc/rmcl001), Free toilet and storage (tiny.cc/tmcl001), and many more helpful videos."
        },
        {
          question: "How to get in with the key",
          answer: "Please watch this instructional video: https://tiny.cc/1ncl001 for detailed instructions on how to use the key to enter the apartment."
        },
        {
          question: "Evening routine",
          answer: "Check out our evening routine video here: https://tiny.cc/4ncl001 to understand the daily procedures and expectations."
        }
      ]
    }
  ];

  let itemIndex = 0;

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
        <div className="space-y-8">
          {faqData.map((section, sectionIndex) => (
            <div key={sectionIndex} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-4 border-b border-gray-200 dark:border-gray-600">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                  {section.category}
                </h2>
              </div>
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {section.questions.map((item) => {
                  const currentIndex = itemIndex++;
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

        {/* Contact Section */}
        <div className="mt-16 bg-blue-50 dark:bg-blue-900 rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Still have questions?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Can't find what you're looking for? Join our community chat!
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
