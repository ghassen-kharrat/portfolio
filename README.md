# Advanced Portfolio Website

A modern, interactive portfolio website showcasing skills, projects, and professional information with advanced UI/UX features.

## 🌟 Features

### Performance & UX Optimizations
- **Loading Screen**: Custom animated loading screen with progress indicators
- **Smooth Transitions**: Seamless section transitions with scroll detection 
- **Responsive Design**: Fully responsive across all devices and screen sizes
- **Custom Cursor**: Context-aware cursor with magnetic effects
- **Keyboard Navigation**: Full keyboard accessibility with shortcut help panel

### Visual Enhancements
- **Dynamic Theme Switching**: Light/dark mode with smooth transitions
- **Animated Section Backgrounds**: Subtle animated gradients and particles
- **Custom Animations**: Scroll-triggered animations and parallax effects
- **3D Project Cards**: Interactive tilt effects on project cards
- **High-Quality Typography**: Carefully selected fonts and text animations

### Accessibility Features
- **Keyboard Navigation**: Full keyboard control with visible focus states
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **High Contrast Mode**: Enhanced contrast option for better readability
- **Focus Mode**: Highlights only the focused elements
- **Text Size Adjustment**: Font size controls for better readability
- **Reduced Motion Option**: Disable animations for users with vestibular disorders
- **Skip to Content**: Jump directly to main content

### Internationalization & Localization
- **Multi-language Support**: Content available in multiple languages
- **RTL Support**: Right-to-left language support
- **Automatic Language Detection**: Detects user's preferred language
- **Language Switcher**: Easy toggle between available languages

### Interactive Elements
- **Notification System**: Toast notifications for user feedback
- **Form Validation**: Enhanced contact form with validation
- **Audio Elements**: Subtle ambient sounds (with user control)
- **Micro-interactions**: Small animations on hover, click, and scroll
- **Scroll Progress Indicator**: Visual indicator of scroll position
- **Back to Top Button**: Easy navigation back to the top of the page

### Sharing & Integration
- **Social Sharing**: Share portfolio on social media platforms
- **Print Optimization**: Specialized print stylesheet
- **Analytics Integration**: Track user interactions and engagement
- **PDF Export**: Generate a PDF version of the portfolio

## 🚀 Tech Stack

- **Frontend**: React, TypeScript, Framer Motion
- **Styling**: TailwindCSS, CSS Variables
- **Animations**: Framer Motion, GSAP
- **State Management**: React Context API
- **Internationalization**: Custom translation system
- **Accessibility**: ARIA, semantic HTML5

## 🔧 Setup & Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/portfolio.git
cd portfolio
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

## 📂 Project Structure

```
portfolio/
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable components
│   │   ├── layout/        # Layout components (Header, Footer, etc.)
│   │   ├── sections/      # Main page sections
│   │   └── ui/            # UI components
│   ├── context/           # React Context providers
│   ├── hooks/             # Custom React hooks
│   ├── pages/             # Page components
│   ├── styles/            # Global styles and theme
│   ├── utils/             # Utility functions
│   ├── App.tsx            # Main App component
│   └── index.tsx          # Entry point
└── README.md              # Project documentation
```

## 🎨 UI/UX Enhancement Details

### Custom Cursor
The cursor adapts to different contexts within the application:
- Grows when hovering over interactive elements
- Displays "View" when hovering over projects
- Displays "Click" when hovering over buttons
- Implements a magnetic effect that pulls toward buttons and links

### Smooth Section Transitions
- Section reveal animations when scrolling
- Subtle parallax effects between sections
- Custom section dividers with animated SVGs
- Active section highlighting with scroll tracking

### Notification System
- Toast notifications for user feedback
- Multiple types: success, error, info, warning
- Animated entrance and exit
- Automatic dismissal with progress indicator

### Animated Backgrounds
- Subtle gradient animations that respond to mouse movement
- Particle animations with customizable density and speed
- Low-opacity geometric shapes that float in the background
- Noise texture for added depth

### Performance Optimizations
- Code splitting and lazy loading for faster initial load
- Optimized animations using GPU acceleration
- Image optimization and lazy loading
- Prefetching for smooth navigation

## 📱 Responsive Behavior

The portfolio is designed to work flawlessly across all device sizes:
- **Mobile**: Simplified animations, adapted layout
- **Tablet**: Touch-optimized interactions
- **Desktop**: Full experience with all animations
- **Large Screens**: Scaled content for optimal viewing

## 🌐 Browser Compatibility

Tested and optimized for:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Android Chrome)

## 📦 Deployment to GitHub Pages

To deploy this portfolio to GitHub Pages:

1. Install the gh-pages package if not already installed:
   ```
   npm install gh-pages --save-dev
   ```

2. Make sure your vite.config.js has the correct base path:
   ```javascript
   export default defineConfig({
     plugins: [react()],
     base: '/portfolio/', // Should match your repository name
   })
   ```

3. Add deployment scripts to package.json:
   ```json
   "predeploy": "npm run build",
   "deploy": "gh-pages -d dist"
   ```

4. Run the deploy command:
   ```
   npm run deploy
   ```

5. Configure GitHub Pages in the repository settings to use the gh-pages branch

## 🔧 Development

To run the development server:

```bash
npm install
npm run dev
```

## 📦 Build

To build for production:

```bash
npm run build
```

## 📋 Tech Stack

- React.js
- Framer Motion
- Tailwind CSS
- Vite
- EmailJS
- Three.js
