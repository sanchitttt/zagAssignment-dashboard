import DashboardMain from "../components/dashboard/DashboardMain";
import DashboardNavbar from "../components/dashboard/DashboardNavbar";

function DashboardPage() {
  return (
    <div className='flex bg-[#F5F5F5]'>
      <DashboardNavbar />
      <DashboardMain />
    </div>
  )
}

export default DashboardPage;