import { Button } from "@heroui/react"
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6"

const HomeSectionWelcome = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-teal-50 to-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
            Dukung Kegiatan Bermakna &
            <br />
            <span className="text-teal-600">Berikan Dampak Nyata</span>
          </h1>
          <p className="text-xl text-default-600 mb-8 max-w-2xl mx-auto">
            Bergabunglah dengan ribuan donatur dan pelaku perubahan yang dermawan dalam menyediakan bantuan dan peluang melalui kontribusi yang digerakkan oleh masyarakat.
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="bg-teal-600"
            >
              <p className="text-white">Berdonasi Sekarang</p>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomeSectionWelcome