# Staying in Bern - FAQ Application

A modern, responsive FAQ web application built with Next.js that dynamically fetches questions and answers from GitHub Issues. Perfect for community projects that need an easy-to-maintain FAQ system.

## 🌟 Features

- **Dynamic Content**: Automatically fetches FAQ data from GitHub Issues
- **Real-time Search**: Filter questions and answers with instant search
- **Responsive Design**: Works beautifully on desktop, tablet, and mobile
- **Dark Mode Support**: Automatic dark/light theme switching
- **Accessible UI**: Built with accessibility best practices
- **Auto-refresh**: Updates content every 24 hours automatically
- **Error Handling**: Graceful error states with retry functionality

## 🚀 Demo

The application fetches FAQ data from the [stayinginbern](https://github.com/chagai95/stayinginbern) GitHub repository, specifically from issues labeled with "faq" and in closed state.

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Language**: JavaScript (ES6+)
- **Data Source**: GitHub Issues API
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## 📋 Prerequisites

- Node.js 18+ installed
- npm or yarn package manager
- Internet connection (for fetching GitHub data)

## 🔧 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd faq
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
faq/
├── src/
│   └── app/
│       ├── globals.css       # Global styles and Tailwind imports
│       ├── layout.js         # Root layout component
│       └── page.js           # Main FAQ page component
├── eslint.config.mjs         # ESLint configuration
├── jsconfig.json            # JavaScript configuration
├── next.config.mjs          # Next.js configuration
├── package.json             # Dependencies and scripts
├── postcss.config.mjs       # PostCSS configuration
└── README.md               # This file
```

## 🎯 How It Works

### Data Flow

1. **Fetch**: Application calls GitHub Issues API on page load
2. **Transform**: Converts GitHub issues into FAQ format
3. **Display**: Renders questions in collapsible accordion format
4. **Search**: Filters content based on user input in real-time
5. **Refresh**: Automatically updates every 24 hours

### GitHub Issues Integration

The app fetches data from:
```
https://api.github.com/repos/chagai95/stayinginbern/issues?labels=faq&state=closed
```

**Issue Format Expected:**
- **Title**: Becomes the FAQ question
- **Body**: Becomes the FAQ answer
- **Labels**: Must include "faq"
- **State**: Must be "closed"

## 🎨 Key Components

### FAQItem Component
Renders individual FAQ questions with expand/collapse functionality.

### Search Functionality
- Real-time filtering of questions and answers
- Case-insensitive search
- Search result counter
- Clear search button

### State Management
```javascript
const [openItems, setOpenItems] = useState({});    // Track open/closed FAQ items
const [faqData, setFaqData] = useState([]);        // Store FAQ data
const [loading, setLoading] = useState(true);      // Loading state
const [error, setError] = useState(null);          // Error handling
const [searchTerm, setSearchTerm] = useState('');  // Search input
```

## 🔄 Customization

### Change Data Source
To use a different GitHub repository, update the API URL in `page.js`:

```javascript
const res = await fetch("https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/issues?labels=faq&state=closed");
```

### Modify Styling
All styles use Tailwind CSS classes. Key areas to customize:
- **Colors**: Update the blue theme (`bg-blue-600`, `text-blue-600`)
- **Spacing**: Modify padding and margins (`py-12`, `px-4`)
- **Typography**: Change font sizes (`text-4xl`, `text-xl`)

### Update Contact Information
Edit the contact section in `page.js`:
```javascript
<a href="https://wa.me/YOUR_PHONE_NUMBER">
<a href="https://your-website.com">
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
npx vercel --prod
```

### Netlify
```bash
npm run build
# Upload the .next/out folder to Netlify
```

### Static Export
```bash
npm run build
npm run export
```

## 🔧 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🌐 Environment Variables

No environment variables required! The app uses public GitHub API endpoints.

## 📱 Features in Detail

### Responsive Design
- **Mobile**: Single column layout, touch-friendly buttons
- **Tablet**: Optimized spacing and typography
- **Desktop**: Full-width layout with hover effects

### Accessibility
- Keyboard navigation support
- Screen reader friendly
- High contrast ratios
- Focus indicators

### Performance
- Automatic code splitting (Next.js)
- Optimized bundle size
- Fast page loads
- Efficient re-renders

## 🐛 Troubleshooting

### Common Issues

**FAQ not loading?**
- Check internet connection
- Verify GitHub repository is public
- Ensure issues have "faq" label and are closed

**Search not working?**
- Clear browser cache
- Check console for JavaScript errors

**Styling issues?**
- Ensure Tailwind CSS is properly installed
- Check for conflicting CSS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👥 Support

- **Community**: Join our [WhatsApp group](https://wa.me/41766524456)
- **Website**: [stayinginbern.ch](https://stayinginbern.ch/)
- **Issues**: Create a GitHub issue for bugs or feature requests

## 🙏 Acknowledgments

- Built for the "Staying in Bern" community project
- Inspired by modern FAQ design patterns
- Thanks to the open-source community for the tools and libraries

---

**Made with ❤️ for the Staying in Bern community**
