import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Plus, X } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { Widget } from '../types/dashboard';

interface AddWidgetModalProps {
  categoryId?: string;
}

const AddWidgetModal: React.FC<AddWidgetModalProps> = ({ categoryId }) => {
  const { dashboardData, addWidget } = useDashboard();
  const [open, setOpen] = useState(false);
  const [widgetName, setWidgetName] = useState('');
  const [widgetText, setWidgetText] = useState('');
  const [widgetType, setWidgetType] = useState<Widget['type']>('text');
  const [selectedCategory, setSelectedCategory] = useState(categoryId || '');
  const [selectedWidgets, setSelectedWidgets] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!widgetName.trim() || !widgetText.trim() || !selectedCategory) return;

    addWidget(selectedCategory, {
      name: widgetName,
      text: widgetText,
      type: widgetType
    });

    // Reset form
    setWidgetName('');
    setWidgetText('');
    setWidgetType('text');
    if (!categoryId) setSelectedCategory('');
    setOpen(false);
  };

  const handleWidgetToggle = (widgetId: string) => {
    setSelectedWidgets(prev =>
      prev.includes(widgetId)
        ? prev.filter(id => id !== widgetId)
        : [...prev, widgetId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="border-dashed">
          <Plus className="h-4 w-4 mr-2" />
          Add Widget
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle>Personalize your dashboard by adding the following widget</DialogTitle>
            <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Widget Selection */}
          <div>
            <Label className="text-sm font-medium mb-4 block">Select widgets to add:</Label>
            <div className="space-y-4">
              {dashboardData.categories.map(category => (
                <div key={category.id} className="border rounded-lg p-4">
                  <h3 className="font-medium mb-3">{category.name}</h3>
                  <div className="space-y-2">
                    {category.widgets.map(widget => (
                      <div key={widget.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={widget.id}
                          checked={selectedWidgets.includes(widget.id)}
                          onCheckedChange={() => handleWidgetToggle(widget.id)}
                        />
                        <Label htmlFor={widget.id} className="text-sm">
                          {widget.name}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Add Custom Widget Form */}
          <div className="border-t pt-6">
            <h3 className="font-medium mb-4">Add Custom Widget</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="category">Category</Label>
                <Select value={selectedCategory} onValueChange={setSelectedCategory} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {dashboardData.categories.map(category => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="widget-name">Widget Name</Label>
                <Input
                  id="widget-name"
                  value={widgetName}
                  onChange={(e) => setWidgetName(e.target.value)}
                  placeholder="Enter widget name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="widget-text">Widget Text</Label>
                <Textarea
                  id="widget-text"
                  value={widgetText}
                  onChange={(e) => setWidgetText(e.target.value)}
                  placeholder="Enter widget content"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="widget-type">Widget Type</Label>
                <Select value={widgetType} onValueChange={(value) => setWidgetType(value as Widget['type'])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="chart">Chart</SelectItem>
                    <SelectItem value="stat">Statistics</SelectItem>
                    <SelectItem value="alert">Alert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={!widgetName.trim() || !widgetText.trim() || !selectedCategory}>
                  Confirm
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AddWidgetModal;