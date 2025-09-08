import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Plus } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import Widget from './Widget';
import AddWidgetModal from './AddWidgetModal';
import SearchWidget from './SearchWidget';

const Dashboard: React.FC = () => {
  const { dashboardData } = useDashboard();

  return (
    <div className="min-h-screen bg-dashboard-bg">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <div className="flex items-center gap-4">
            <div className="w-64">
              <SearchWidget />
            </div>
            <AddWidgetModal />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        <div className="space-y-8">
          {dashboardData.categories.map(category => (
            <section key={category.id}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-foreground">{category.name}</h2>
                <AddWidgetModal categoryId={category.id} />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {category.widgets.map(widget => (
                  <Widget
                    key={widget.id}
                    widget={widget}
                    categoryId={category.id}
                  />
                ))}
                
                {/* Add Widget Placeholder */}
                <Card className="border-dashed border-2 border-muted-foreground/25 hover:border-muted-foreground/50 transition-colors">
                  <CardContent className="flex items-center justify-center h-48">
                    <AddWidgetModal categoryId={category.id} />
                  </CardContent>
                </Card>
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;