import DashboardLayout from "@/components/layouts/DashboardLayout";
import DetailCampaign from "@/components/views/Admin/DetailCampaign";

const AdminDetailCampaignPage = () => {
  return (
    <DashboardLayout
      title="Detail Penggalngan Dana"
      description="Atur Penggalngan Dana yang tersedia."
      type="admin">
      <DetailCampaign />
    </DashboardLayout>
  )
}

export default AdminDetailCampaignPage;