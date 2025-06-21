
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { User, MapPin } from 'lucide-react';

interface StudentCardProps {
  id: number;
  name: string;
  location: string;
  lastUpdate: string;
}

const StudentCard: React.FC<StudentCardProps> = ({ id, name, location, lastUpdate }) => {
  const getLocationColor = (location: string) => {
    switch (location) {
      case 'Outside Area':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'School Bus':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Classroom':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Toilet':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'Canteen':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getLocationIcon = (location: string) => {
    switch (location) {
      case 'School Bus':
        return '🚌';
      case 'Classroom':
        return '📚';
      case 'Toilet':
        return '🚻';
      case 'Canteen':
        return '🍽️';
      case 'Outside Area':
        return '🌳';
      default:
        return '🏫';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-2">
      <CardContent className="p-4">
        <div className="flex items-center space-x-3 mb-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
            <User size={20} />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-gray-800">{name}</h3>
            <p className="text-sm text-gray-500">ID: ST{id.toString().padStart(3, '0')}</p>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <MapPin size={16} className="text-gray-400" />
            <Badge className={`${getLocationColor(location)} font-medium`}>
              {getLocationIcon(location)} {location}
            </Badge>
          </div>
          
          <div className="text-xs text-gray-500">
            Last updated: {lastUpdate}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentCard;
