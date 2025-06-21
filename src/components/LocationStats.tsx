
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LocationStatsProps {
  students: Array<{ location: string }>;
}

const LocationStats: React.FC<LocationStatsProps> = ({ students }) => {
  const locationCounts = students.reduce((acc, student) => {
    acc[student.location] = (acc[student.location] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const locations = [
    { name: 'Outside Area', icon: '🌳', color: 'text-red-600' },
    { name: 'School Bus', icon: '🚌', color: 'text-yellow-600' },
    { name: 'Classroom', icon: '📚', color: 'text-blue-600' },
    { name: 'Toilet', icon: '🚻', color: 'text-purple-600' },
    { name: 'Canteen', icon: '🍽️', color: 'text-green-600' },
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <span>📊</span>
          <span>Location Statistics</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {locations.map((location) => (
            <div key={location.name} className="text-center p-3 bg-gray-50 rounded-lg">
              <div className="text-2xl mb-1">{location.icon}</div>
              <div className="text-sm font-medium text-gray-600 mb-1">{location.name}</div>
              <div className={`text-xl font-bold ${location.color}`}>
                {locationCounts[location.name] || 0}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default LocationStats;
