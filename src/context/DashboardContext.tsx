import React, { createContext, useContext, useState, ReactNode } from 'react';
import { DashboardData, Category, Widget } from '../types/dashboard';
import { initialDashboardData } from '../data/dashboardData';

interface DashboardContextType {
  dashboardData: DashboardData;
  addWidget: (categoryId: string, widget: Omit<Widget, 'id'>) => void;
  removeWidget: (categoryId: string, widgetId: string) => void;
  searchWidgets: (query: string) => Widget[];
  getAllWidgets: () => Widget[];
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export const useDashboard = () => {
  const context = useContext(DashboardContext);
  if (!context) {
    throw new Error('useDashboard must be used within a DashboardProvider');
  }
  return context;
};

interface DashboardProviderProps {
  children: ReactNode;
}

export const DashboardProvider: React.FC<DashboardProviderProps> = ({ children }) => {
  const [dashboardData, setDashboardData] = useState<DashboardData>(initialDashboardData);

  const addWidget = (categoryId: string, widget: Omit<Widget, 'id'>) => {
    const newWidget: Widget = {
      ...widget,
      id: `widget-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };

    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === categoryId
          ? { ...category, widgets: [...category.widgets, newWidget] }
          : category
      )
    }));
  };

  const removeWidget = (categoryId: string, widgetId: string) => {
    setDashboardData(prev => ({
      ...prev,
      categories: prev.categories.map(category =>
        category.id === categoryId
          ? { ...category, widgets: category.widgets.filter(widget => widget.id !== widgetId) }
          : category
      )
    }));
  };

  const getAllWidgets = (): Widget[] => {
    return dashboardData.categories.flatMap(category => category.widgets);
  };

  const searchWidgets = (query: string): Widget[] => {
    if (!query.trim()) return getAllWidgets();
    
    const lowercaseQuery = query.toLowerCase();
    return getAllWidgets().filter(widget =>
      widget.name.toLowerCase().includes(lowercaseQuery) ||
      widget.text.toLowerCase().includes(lowercaseQuery)
    );
  };

  return (
    <DashboardContext.Provider value={{
      dashboardData,
      addWidget,
      removeWidget,
      searchWidgets,
      getAllWidgets
    }}>
      {children}
    </DashboardContext.Provider>
  );
};