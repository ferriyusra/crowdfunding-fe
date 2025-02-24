import Image from "next/image"
import Link from "next/link"
import { NAV_ITEMS, SOCIAL_ITEMS } from "../LandingPageLayout.constants"

const LandingPageLayoutFooter = () => {
  return (
    <div>
      <footer className="m-4 mt-16 rounded-2xl bg-neutral-800 text-white md:m-8 md:mt-32">
        <div className="container mx-auto flex flex-col gap-8 px-6 py-8 md:py-12">
          <div className="flex w-full flex-col gap-8 md:flex-row md:gap-20">
            <div className="flex w-full flex-col gap-2 md:w-1/3">
              <Image
                src={"/images/general/logo.svg"}
                alt="logo"
                width={100}
                height={100}
              />
              <p className="mt-4 text-sm leading-relaxed lg:text-base">
                Berbagi Donasi adalah platform donasi yang mempertemukan antara donatur dan penerima donasi.
              </p>
              <div className="mt-4 flex flex-col items-start gap-4 xl:flex-row">
                <div className="flex items-center justify-center gap-1 text-sm text-neutral-300">
                  <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 384 512" className="text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg" ><path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"></path></svg>
                  <p>Jakarta, Indonesia</p>
                </div>
                <Link className="flex items-center justify-center gap-1 text-sm text-neutral-300" href="tel:+627212331"><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" className="text-2xl" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path fill="none" d="M0 0h24v24H0z"></path><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"></path></svg>
                  +62 851-234-567</Link>
              </div>
            </div>
            <div className="flex w-full flex-wrap gap-8 md:w-2/3 md:flex-nowrap">
              <div className="flex w-2/5 flex-col gap-4 md:w-1/3">
                <h2 className="mb-2 font-bold">Menu</h2>
                {NAV_ITEMS.map((item) => (
                  <Link key={`footer-nav-${item.label}`} href={item.href} className="cursor-pointer w-fit text-neutral-400 hover:text-neutral-200">
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="flex w-2/5 flex-col gap-4 md:w-1/3">
                <h2 className="mb-2 font-bold">Sosial Media</h2>
                {SOCIAL_ITEMS.map((item) => (
                  <Link key={`footer-nav-${item.label}`} href={item.href} className="cursor-pointer w-fit text-neutral-400 hover:text-neutral-200">
                    {item.label}
                  </Link>
                ))}
              </div>
              <div className="flex w-2/5 flex-col gap-4 md:w-1/3">
                <h2 className="mb-2 font-bold">Sosial Media</h2>
                {SOCIAL_ITEMS.map((item) => (
                  <Link key={`footer-nav-${item.label}`} href={item.href} className="cursor-pointer w-fit text-neutral-400 hover:text-neutral-200">
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col reverse justify-between gap-4 border-t-2 border-neutral-700 pt-4 md:flex-row lg:items-center">
            <p className="text-sm text-neutral-400">
              © 2025 Berbagi Donasi. All right reserved.
            </p>
            <div className="flex gap-4">
              {SOCIAL_ITEMS.map((item) => (
                <Link
                  key={`footer-social-${item.label}`}
                  href={item.href} className="text-3xl text-neutral-400 hover:text-neutral-200">{item.icon}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPageLayoutFooter