import DashboardLayout from "@/components/layouts/DashboardLayout";
import Campaign from "@/components/views/Admin/Campaign";

const AdminCampaignPage = () => {
  return (
    <DashboardLayout
      title="Penggalangan Dana"
      description="Daftar Semua Penggalanan Dana, Tambah Penggalanan Dana dan Atur Penggalanan Dana yang tersedia."
      type="admin">
      <Campaign />
    </DashboardLayout>
  )
}

export default AdminCampaignPage;