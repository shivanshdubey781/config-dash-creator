export interface Widget {
  id: string;
  name: string;
  text: string;
  type?: 'chart' | 'stat' | 'alert' | 'text';
}

export interface Category {
  id: string;
  name: string;
  widgets: Widget[];
}

export interface DashboardData {
  categories: Category[];
}