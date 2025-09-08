import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { X, PieChart, TrendingUp, AlertTriangle, FileText } from 'lucide-react';
import { Widget as WidgetType } from '../types/dashboard';
import { useDashboard } from '../context/DashboardContext';

interface WidgetProps {
  widget: WidgetType;
  categoryId: string;
}

const Widget: React.FC<WidgetProps> = ({ widget, categoryId }) => {
  const { removeWidget } = useDashboard();

  const getIcon = () => {
    switch (widget.type) {
      case 'chart':
        return <PieChart className="h-4 w-4" />;
      case 'stat':
        return <TrendingUp className="h-4 w-4" />;
      case 'alert':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const getChartVisualization = () => {
    if (widget.type === 'chart' && widget.name === 'Cloud Accounts') {
      return (
        <div className="flex items-center justify-center h-32">
          <div className="relative">
            <svg width="80" height="80" viewBox="0 0 80 80">
              <circle
                cx="40"
                cy="40"
                r="30"
                fill="none"
                stroke="hsl(var(--chart-primary))"
                strokeWidth="8"
                strokeDasharray="94.2 94.2"
                strokeDashoffset="47.1"
                className="transform -rotate-90 origin-center"
              />
              <circle
                cx="40"
                cy="40"
                r="30"
                fill="none"
                stroke="hsl(var(--chart-secondary))"
                strokeWidth="8"
                strokeDasharray="94.2 94.2"
                strokeDashoffset="-47.1"
                className="transform -rotate-90 origin-center"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-semibold">2</span>
            </div>
          </div>
        </div>
      );
    }

    if (widget.type === 'chart' && widget.name === 'Cloud Account Risk Assessment') {
      return (
        <div className="flex items-center justify-center h-32">
          <div className="relative">
            <svg width="100" height="100" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--destructive))"
                strokeWidth="8"
                strokeDasharray="50 251.2"
                className="transform -rotate-90 origin-center"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--warning))"
                strokeWidth="8"
                strokeDasharray="40 251.2"
                strokeDashoffset="-50"
                className="transform -rotate-90 origin-center"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
                strokeDasharray="10 251.2"
                strokeDashoffset="-90"
                className="transform -rotate-90 origin-center"
              />
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="hsl(var(--success))"
                strokeWidth="8"
                strokeDasharray="151.2 251.2"
                strokeDashoffset="-100"
                className="transform -rotate-90 origin-center"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-lg font-semibold">9659</span>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  const getProgressBar = () => {
    if (widget.type === 'stat') {
      return (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Critical</span>
            <span>High</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-destructive to-warning rounded-full" style={{ width: '70%' }} />
          </div>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className="relative group hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            {getIcon()}
            {widget.name}
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => removeWidget(categoryId, widget.id)}
            className="opacity-0 group-hover:opacity-100 transition-opacity h-6 w-6 p-0 hover:bg-destructive hover:text-destructive-foreground"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {getChartVisualization()}
        {getProgressBar()}
        {widget.type === 'alert' && (
          <div className="flex items-center justify-center h-32 text-muted-foreground">
            <div className="text-center">
              <AlertTriangle className="h-8 w-8 mx-auto mb-2" />
              <p className="text-sm">{widget.text}</p>
            </div>
          </div>
        )}
        {!['chart', 'alert'].includes(widget.type || '') && (
          <div className="text-sm text-muted-foreground whitespace-pre-line">
            {widget.text}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default Widget;