import React, { useState, useEffect } from 'react';
import { Input } from './ui/input';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Search, FileText } from 'lucide-react';
import { useDashboard } from '../context/DashboardContext';
import { Widget } from '../types/dashboard';

const SearchWidget: React.FC = () => {
  const { searchWidgets } = useDashboard();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Widget[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      const results = searchWidgets(searchQuery);
      setSearchResults(results);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  }, [searchQuery, searchWidgets]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search widgets..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      {isSearching && (
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Search Results ({searchResults.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {searchResults.length > 0 ? (
              <div className="space-y-2">
                {searchResults.map((widget, index) => (
                  <div key={`${widget.id}-${index}`} className="border rounded p-3 hover:bg-muted/50 transition-colors">
                    <div className="flex items-start gap-2">
                      <FileText className="h-4 w-4 mt-0.5 text-muted-foreground" />
                      <div>
                        <h4 className="font-medium text-sm">{widget.name}</h4>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {widget.text}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-sm text-center py-4">
                No widgets found matching "{searchQuery}"
              </p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SearchWidget;