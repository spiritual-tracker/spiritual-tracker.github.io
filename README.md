# Spiritual Tracker

A comprehensive spiritual growth tracking Progressive Web App (PWA) that combines four essential aspects of Christian spiritual development into one unified platform.

## 🌟 Features

### 📱 Progressive Web App (PWA)
- **Web App** - Fully functional PWA with offline support and hybrid notifications
- **Installable** - Add to home screen on mobile and desktop devices
- **Cross-Platform** - Works on all modern browsers and devices

### 🎯 Six Core Sections

1. **🍎 Fruits of the Spirit Tracker**
   - Track daily practice of love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control
   - Biblical definitions and guidance (Galatians 5:22-23)
   - Progress visualization and analytics

2. **💀 Works of the Flesh Tracker**
   - Monitor areas of struggle with fleshly works
   - Honest self-assessment tools
   - Biblical guidance (Galatians 5:19-21)
   - Repentance and recovery guidance

3. **⚡ Seven Deadly Sins Tracker**
   - Track struggles with pride, greed, lust, envy, gluttony, wrath, and sloth
   - Biblical scriptures and definitions (Proverbs 6:16-19)
   - Virtue development focus

4. **🛡️ Spiritual Armor Tracker**
   - Daily armor of God checklist
   - Ephesians 6:10-18 scripture integration
   - Practical application guidance

5. **📊 Analytics & Charts**
   - Visual progress tracking with multiple chart types
   - Historical data analysis (7-day and 30-day views)
   - Growth pattern identification
   - Line charts, bar charts, and pie charts
   - Spiritual growth insights and recommendations

6. **⚙️ Settings**
   - Data export/import functionality
   - Timezone management
   - Hybrid notification system (in-browser + OS notifications)
   - Privacy and data security information
   - App customization

## 🚀 Getting Started

### Prerequisites
- Node.js 16.0.0 or higher
- npm 8.0.0 or higher

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/spiritual-tracker/spiritual-tracker.github.io.git
   cd spiritual-tracker.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 🌐 Live Demo

The app is deployed as a PWA on GitHub Pages:
**[https://spiritual-tracker.github.io](https://spiritual-tracker.github.io)**

## 📦 Project Structure

```
spiritual-tracker.github.io/
├── web/                     # Progressive Web App
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── utils/           # Utility functions
│   │   ├── constants/       # App constants and data
│   │   └── App.js           # Main app component
│   └── public/              # Static assets and icons
├── .github/workflows/       # GitHub Actions for deployment
└── package.json             # Project configuration
```

## 🛠️ Development

### Available Scripts

**Installation:**
- `npm install` - Install all dependencies

**Development:**
- `npm start` - Start development server
- `npm run web:start` - Start web development server

**Building:**
- `npm run build` - Build for production
- `npm run web:build` - Build web app

**Testing:**
- `npm test` - Run tests
- `npm run web:test` - Run web tests

**Linting:**
- `npm run lint` - Run linter
- `npm run web:lint` - Run web linter

### Technology Stack

**Web App:**
- React 18 with React Router v6
- Bootstrap 5 for responsive UI
- Recharts for data visualization
- Toastify-js for in-browser notifications
- PWA capabilities with service workers
- Flatpickr for enhanced date selection

**Shared:**
- JavaScript ES6+
- Local Storage
- Date utilities with timezone support

## 📱 PWA Features

The web app includes full Progressive Web App capabilities:

- **Offline Support** - Works without internet connection
- **Installable** - Add to home screen on mobile and desktop
- **Hybrid Notifications** - Both in-browser and OS notifications
- **Fast Loading** - Optimized performance
- **Responsive Design** - Works on all screen sizes
- **Cross-Browser Support** - Works in Chrome, Firefox, Safari, Edge

## 🔔 Notification System

### Hybrid Notifications
- **In-Browser Toast Notifications** - Always work, no permissions needed
- **System OS Notifications** - Native OS integration when available
- **User Preferences** - Choose which notification types to use
- **Scheduled Reminders** - Set daily spiritual check-in reminders
- **Cross-Browser Compatible** - Works reliably across all browsers

### Features
- **Time-based scheduling** - Set reminders for specific times
- **Custom messages** - Personalize notification content
- **Multiple reminders** - Set multiple reminders throughout the day
- **Toggle controls** - Enable/disable individual reminders
- **Duration settings** - Customize how long toast notifications display

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the web directory:

```env
REACT_APP_BUILD_VERSION=1.0.0
REACT_APP_API_URL=https://api.spiritual-tracker.com
```

### PWA Configuration

The PWA is configured through:
- `web/public/manifest.json` - App manifest
- `web/public/index.html` - Meta tags and icons
- `web/public/sw.js` - Service worker for offline functionality

## 📊 Data Management

### Local Storage
- All data is stored locally using localStorage
- No external database required
- Data can be exported/imported as JSON
- Complete privacy - no data sent to external servers

### Data Structure
```javascript
{
  fruits: ['love', 'joy', 'peace'],      // Fruits practiced
  flesh: ['anger', 'jealousy'],          // Works of flesh struggled with
  sins: ['pride', 'greed'],              // Deadly sins struggled with
  armor: ['belt-of-truth', 'shield-of-faith'] // Armor pieces worn
}
```

## 🎨 Customization

### Themes
The app supports:
- Light mode (default)
- Dark mode (system preference)
- High contrast mode
- Reduced motion preferences

### Colors
Each section has its own color scheme:
- Fruits of Spirit: Green (#28a745)
- Works of Flesh: Blue (#316CF4)
- Seven Deadly Sins: Red (#dc3545)
- Spiritual Armor: Yellow (#ffc107)
- Analytics: Cyan (#17a2b8)
- Settings: Gray (#6c757d)

## 📈 Analytics

The analytics section provides:
- **Line charts** for trend analysis over time
- **Bar charts** for positive vs negative comparison
- **Pie charts** for daily distribution
- **Historical data tracking** (7-day and 30-day views)
- **Spiritual growth insights** with actionable recommendations
- **Export capabilities** for data backup

## 🌍 Timezone Support

- **Automatic detection** - Uses browser's timezone
- **Manual override** - Users can set their preferred timezone
- **Consistent date handling** - All date calculations respect timezone
- **Cross-timezone compatibility** - Works correctly regardless of user location

## 🔒 Privacy & Security

- **Local Storage Only** - No data sent to external servers
- **No Tracking** - No analytics or user tracking
- **Offline First** - Works completely offline
- **Data Ownership** - Users own and control their data
- **Export/Import** - Full control over data backup and transfer

## 🚀 Deployment

The app is automatically deployed to GitHub Pages using GitHub Actions:

1. **Automatic Deployment** - Pushes to main branch trigger deployment
2. **GitHub Pages** - Hosted at `https://spiritual-tracker.github.io`
3. **PWA Ready** - Fully functional Progressive Web App
4. **HTTPS** - Secure connection required for PWA features

### Manual Deployment

To deploy manually:

```bash
npm run build
# The build files will be in web/build/
# Deploy the contents of web/build/ to your hosting provider
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure cross-browser compatibility
- Test notification system across browsers

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Biblical references and definitions
- Christian community feedback
- Open source contributors
- PWA and React communities

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the FAQ section

## 🔄 Roadmap

### Version 1.1
- [ ] Cloud sync capabilities
- [ ] Community features
- [ ] Advanced analytics
- [ ] Custom tracking categories

### Version 1.2
- [ ] Bible study integration
- [ ] Prayer journal
- [ ] Accountability groups
- [ ] Export to PDF

### Version 2.0
- [ ] AI-powered insights
- [ ] Social sharing
- [ ] Advanced notifications
- [ ] Multi-language support

---

**Spiritual Tracker** - Growing in faith, one day at a time. 🙏