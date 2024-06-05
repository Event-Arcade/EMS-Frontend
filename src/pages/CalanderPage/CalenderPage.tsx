import CalendarComponent from "./CalendarComponent";

interface EventType {
  id: string; 
  title: string; 
  start: string; 
  end?: string; 
}
const CalenderPage: React.FC = () => {
  const eventsData: EventType[] = [
    {
      id: "1",
      title: "Supply Food to Hotel Araliya",
      start: "2024-05-06",
    },
    {
      id: "2",
      title: "DJ Event",
      start: "2024-05-07",
    },
    {
      id: "3",
      title: "Wedding",
      start: "2024-05-08",
    },
    {
      id: "4",
      title: "DJ Event",
      start: "2024-05-08",
    },];
  return (
    <>
      <CalendarComponent events={eventsData} />
    </>
  );
};

export default CalenderPage;
