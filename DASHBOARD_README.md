# Dynamic Dashboard Application

A professional React-based dashboard application with dynamic widget management, built with modern web technologies.

## 🚀 Features

- **Dynamic Widget Management**: Add and remove widgets from different categories
- **JSON-Based Configuration**: Dashboard structure defined through JSON for easy customization
- **Search Functionality**: Real-time search across all widgets
- **Category Management**: Organize widgets into logical categories (CNAPP, CSPM, CWPP, Registry Scan)
- **Interactive Charts**: Visual representations for different widget types
- **Responsive Design**: Fully responsive layout that works on all devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## 🏗️ Architecture

### Data Structure
The dashboard uses a hierarchical JSON structure:
```json
{
  "categories": [
    {
      "id": "category-id",
      "name": "Category Name", 
      "widgets": [
        {
          "id": "widget-id",
          "name": "Widget Name",
          "text": "Widget Content",
          "type": "chart|stat|alert|text"
        }
      ]
    }
  ]
}
```

### Core Components
- **Dashboard**: Main container component
- **Widget**: Individual widget renderer with type-specific visualizations
- **AddWidgetModal**: Modal for adding new widgets with category selection
- **SearchWidget**: Real-time search functionality
- **DashboardContext**: React context for state management

## 🛠️ Technologies Used

- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: React Context API
- **Build Tool**: Vite
- **UI Components**: Radix UI primitives
- **Icons**: Lucide React
- **Routing**: React Router DOM

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Steps to Run Locally

1. **Clone the repository**
   ```bash
   git clone <your-git-url>
   cd <project-directory>
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   Navigate to `http://localhost:8080` (or the port shown in your terminal)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## 🎯 Core Functionalities

### 1. Add Widget
- Click "Add Widget" button in any category
- Fill in widget name and content
- Select widget type (text, chart, stat, alert)
- Widget gets added to the selected category

### 2. Remove Widget  
- Hover over any widget to see the "X" button
- Click to remove widget from its category
- Alternative: Use the category selection in the Add Widget modal

### 3. Search Widgets
- Use the search bar in the header
- Real-time filtering across all widgets
- Search by widget name or content

### 4. Widget Types
- **Chart**: Displays circular progress/pie charts
- **Stat**: Shows statistics with progress bars
- **Alert**: Warning-style widgets for alerts
- **Text**: Basic text content widgets

## 🎨 Design System

The application uses a comprehensive design system with:
- Semantic color tokens (HSL format)
- Consistent spacing and typography
- Professional dashboard aesthetic
- Hover states and smooth transitions
- Responsive grid layouts

### Key Design Tokens
- `--primary`: Main brand color (blue)
- `--success`: Success states (green) 
- `--warning`: Warning states (orange)
- `--destructive`: Error states (red)
- `--chart-*`: Specific chart colors

## 📱 Responsive Design

The dashboard is fully responsive with:
- Mobile-first approach
- Flexible grid layouts (1-4 columns based on screen size)
- Touch-friendly interactions
- Optimized search and modal experiences

## 🔍 Search Implementation

The search functionality:
- Searches across widget names and content
- Case-insensitive matching
- Real-time results
- Highlights matching widgets
- Shows result count

## 🗂️ File Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components
│   ├── Dashboard.tsx    # Main dashboard component
│   ├── Widget.tsx       # Individual widget component
│   ├── AddWidgetModal.tsx # Modal for adding widgets
│   └── SearchWidget.tsx # Search functionality
├── context/
│   └── DashboardContext.tsx # State management
├── data/
│   └── dashboardData.ts # Initial dashboard data
├── types/
│   └── dashboard.ts     # TypeScript interfaces
└── pages/
    └── Index.tsx        # Main page component
```

## 🚀 Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `dist` folder** to your hosting service
   - Vercel, Netlify, or any static hosting
   - Ensure proper routing configuration for SPA

## 🔧 Customization

### Adding New Widget Types
1. Update the `Widget['type']` interface in `types/dashboard.ts`
2. Add rendering logic in `Widget.tsx`
3. Update the type selector in `AddWidgetModal.tsx`

### Modifying Categories
Edit the `initialDashboardData` in `src/data/dashboardData.ts`:
```typescript
export const initialDashboardData: DashboardData = {
  categories: [
    // Add your categories here
  ]
};
```

### Styling Changes
- Modify design tokens in `src/index.css`
- Update Tailwind configuration in `tailwind.config.ts`
- Use semantic tokens instead of hardcoded colors

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is built for educational/assignment purposes.

---

**Note**: This is a frontend-only implementation. For a full MERN stack, you would need to add:
- Node.js/Express backend
- MongoDB database
- API endpoints for CRUD operations
- Authentication system