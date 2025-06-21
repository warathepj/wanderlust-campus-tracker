
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StudentCard from './StudentCard';
import LocationStats from './LocationStats';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface Student {
  id: number;
  name: string;
  location: string;
  lastUpdate: string;
}

const RFIDTrackingSystem: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isSimulationRunning, setIsSimulationRunning] = useState(false);
  const [lastUpdateTime, setLastUpdateTime] = useState<string>('');

  const locations = [
    'Outside Area',
    'School Bus', 
    'Classroom',
    'Toilet',
    'Canteen'
  ];

  const studentNames = [
    'Alice Johnson',
    'Bob Smith',
    'Carol Davis',
    'David Wilson',
    'Emma Brown',
    'Frank Garcia',
    'Grace Lee',
    'Henry Martinez',
    'Ivy Chen',
    'Jack Thompson'
  ];

  const initializeStudents = () => {
    const initialStudents = studentNames.map((name, index) => ({
      id: index + 1,
      name,
      location: locations[Math.floor(Math.random() * locations.length)],
      lastUpdate: new Date().toLocaleTimeString()
    }));
    setStudents(initialStudents);
    setLastUpdateTime(new Date().toLocaleTimeString());
  };

  const updateStudentLocations = () => {
    setStudents(prevStudents => 
      prevStudents.map(student => ({
        ...student,
        location: Math.random() > 0.7 ? locations[Math.floor(Math.random() * locations.length)] : student.location,
        lastUpdate: new Date().toLocaleTimeString()
      }))
    );
    setLastUpdateTime(new Date().toLocaleTimeString());
  };

  useEffect(() => {
    initializeStudents();
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isSimulationRunning) {
      interval = setInterval(() => {
        updateStudentLocations();
      }, 3000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isSimulationRunning]);

  const toggleSimulation = () => {
    setIsSimulationRunning(!isSimulationRunning);
  };

  const resetSimulation = () => {
    setIsSimulationRunning(false);
    initializeStudents();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            🎯 RFID Student Tracking System
          </h1>
          <p className="text-gray-600 text-lg">
            Real-time monitoring of student locations across school premises
          </p>
        </div>

        {/* Control Panel */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span className="flex items-center space-x-2">
                <span>⚙️</span>
                <span>Control Panel</span>
              </span>
              <Badge variant={isSimulationRunning ? 'default' : 'secondary'}>
                {isSimulationRunning ? '🟢 ACTIVE' : '🔴 STOPPED'}
              </Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Button 
                  onClick={toggleSimulation}
                  variant={isSimulationRunning ? 'destructive' : 'default'}
                  className="flex items-center space-x-2"
                >
                  {isSimulationRunning ? <Pause size={16} /> : <Play size={16} />}
                  <span>{isSimulationRunning ? 'Stop Simulation' : 'Start Simulation'}</span>
                </Button>
                
                <Button 
                  onClick={resetSimulation}
                  variant="outline"
                  className="flex items-center space-x-2"
                >
                  <RotateCcw size={16} />
                  <span>Reset</span>
                </Button>
              </div>
              
              <div className="text-sm text-gray-600">
                Last System Update: {lastUpdateTime}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Location Statistics */}
        <LocationStats students={students} />

        {/* Student Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {students.map((student) => (
            <div key={student.id} className="animate-fade-in">
              <StudentCard {...student} />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-500 text-sm">
          <p>🔒 Secure RFID Tracking • Real-time Updates Every 3 Seconds</p>
        </div>
      </div>
    </div>
  );
};

export default RFIDTrackingSystem;
