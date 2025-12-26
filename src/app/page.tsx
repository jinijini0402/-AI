import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import PatientList from "@/components/PatientList";
import PatientDetail from "@/components/PatientDetail";

export default function Home() {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header pageTitle="차트" />
        <div className="flex-1 flex overflow-hidden">
          <PatientList />
          <PatientDetail />
        </div>
      </div>
    </div>
  );
}
