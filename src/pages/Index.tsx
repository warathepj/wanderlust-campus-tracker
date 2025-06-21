
import RFIDTrackingSystem from '@/components/RFIDTrackingSystem';

interface IndexProps {
  sendStudentData: (studentsData: any[]) => void;
}

const Index: React.FC<IndexProps> = ({ sendStudentData }) => {
  return <RFIDTrackingSystem sendStudentData={sendStudentData} />;
};

export default Index;
