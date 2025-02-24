import {
  Avatar,
  Button,
  ButtonProps,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
  Link,
  Listbox,
  ListboxItem,
  Spinner,
} from "@heroui/react";
import Image from "next/image";
import { BUTTON_ITEMS, NAV_ITEMS } from "../LandingPageLayout.constants";
import { cn } from "@/utils/cn";
import { useRouter } from "next/router";
import { CiSearch } from "react-icons/ci";
import { signOut, useSession } from "next-auth/react";
import useLandingPageLayoutNavbar from "./useLandingPageLayoutNavbar";
import { Fragment, useEffect, useState } from "react";
import { ICampaign } from "@/types/Campaign";

const LandingPageLayoutNavbar = () => {
  const router = useRouter();
  const session = useSession();
  const {
    dataProfile,
    dataCampaignsSearch,
    isLoadingCampaignsSearch,
    isRefetchingCampaignsSearch,
    handleSearch,
    search,
    setSearch,
  } = useLandingPageLayoutNavbar();
  // const [isScrolled, setIsScrolled] = useState(false);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.scrollY > 50) {
  //       setIsScrolled(true);
  //     } else {
  //       setIsScrolled(false);
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);
  //   return () => window.removeEventListener("scroll", handleScroll);
  // }, []);

  return (
    <Navbar
      maxWidth="full"
      isBordered={false}
      isBlurred={false}
      shouldHideOnScroll
    // className={cn(
    //   "transition-all duration-300 z-50 my-2",
    //   isScrolled ? "bg-white/95 backdrop-blur-md shadow-md" : "bg-transparent"
    // )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between w-full">
        <div className="flex items-center gap-8">
          <NavbarBrand as={Link} href="/">
            <Image
              src="/images/general/logo.svg"
              alt="logo"
              width={100}
              height={50}
              className="cursor-pointer transition-transform hover:scale-105"
            />
          </NavbarBrand>
          <NavbarContent className="hidden lg:flex">
            {NAV_ITEMS.map((item) => (
              <NavbarItem
                key={`nav-${item.label}`}
                as={Link}
                href={item.href}
                className={cn("font-medium text-default-700 hover:text-teal-700 transition-colors duration-200", {
                  "font-bold text-teal-700": router.pathname === item.href,
                })}
              >
                {item.label}
              </NavbarItem>
            ))}
          </NavbarContent>
        </div>
        <NavbarContent justify="end">
          <NavbarMenuToggle className="lg:hidden" />

          <NavbarItem className="hidden lg:relative lg:flex">
            <Input
              isClearable
              className="w-[300px]"
              classNames={{
                inputWrapper: "border-1 border-neutral-300 h-10 rounded-lg",
                input: "text-sm",
              }}
              placeholder="Cari Donasi..."
              startContent={<CiSearch className="text-neutral-500" size={18} />}
              onClear={() => setSearch("")}
              onChange={handleSearch}
            />
            {search !== "" && (
              <Listbox
                items={dataCampaignsSearch?.data || []}
                className="absolute right-0 top-12 rounded-xl border shadow-lg bg-white w-[300px] max-h-[300px] overflow-auto z-50"
              >
                {!isRefetchingCampaignsSearch && !isLoadingCampaignsSearch ? (
                  (item: ICampaign) => (
                    <ListboxItem key={item._id} href={`/campaign/${item.slug}`} className="p-2">
                      <div className="flex items-center gap-2">
                        <Image
                          src={`${item.image}`}
                          alt={`${item.name}`}
                          className="w-2/5 rounded-md object-cover h-16"
                          width={100}
                          height={40}
                        />
                        <p className="line-clamp-2 w-3/5 text-wrap text-sm">
                          {item.name}
                        </p>
                      </div>
                    </ListboxItem>
                  )
                ) : (
                  <ListboxItem key="loading" className="flex justify-center py-3">
                    <Spinner color="success" size="sm" />
                  </ListboxItem>
                )}
              </Listbox>
            )}
          </NavbarItem>
          {session.status === "authenticated" ? (
            <NavbarItem className="hidden lg:block">
              <Dropdown placement="bottom-end">
                <DropdownTrigger>
                  <Avatar
                    src={dataProfile?.profilePicture}
                    className="cursor-pointer transition-transform hover:scale-105 border border-teal-100"
                    showFallback
                  />
                </DropdownTrigger>
                <DropdownMenu className="p-1">
                  <DropdownItem
                    key="admin"
                    href="/admin/campaign"
                    className={cn({
                      hidden: dataProfile?.role !== "admin",
                    })}
                  >
                    Admin
                  </DropdownItem>
                  <DropdownItem key="profile" href="/member/profile">
                    Profile
                  </DropdownItem>
                  <DropdownItem key="signout" onPress={() => signOut()}>
                    Logout
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </NavbarItem>
          ) : (
            <div className="hidden lg:flex lg:gap-4">
              {BUTTON_ITEMS.map((item) => (
                <NavbarItem key={`button-${item.label}`}>
                  <Button
                    as={Link}
                    href={item.href}
                    variant={item.variant as ButtonProps["variant"]}
                    className={cn(
                      "px-4 py-2 rounded-lg text-lg transition-colors duration-200",
                      item.label === "Masuk" ? "bg-teal-600 text-white hover:bg-teal-700" : "",
                      item.label === "Daftar" ? "bg-white text-teal-600 border border-teal-600 hover:bg-teal-50" : ""
                    )}
                  >
                    {item.label}
                  </Button>
                </NavbarItem>
              ))}
            </div>
          )}

          <NavbarMenu className="gap-4 pt-6 pb-4 bg-white/95 backdrop-blur-md">
            <div className="md:hidden mx-4 mb-6">
              <Input
                isClearable
                fullWidth
                placeholder="Cari Donasi..."
                classNames={{
                  inputWrapper: "border-1 border-neutral-300 h-10 rounded-lg",
                  input: "text-sm",
                }}
                startContent={<CiSearch className="text-neutral-500" size={18} />}
                onClear={() => setSearch("")}
                onChange={handleSearch}
              />
            </div>

            {NAV_ITEMS.map((item) => (
              <NavbarMenuItem key={`nav-${item.label}`} className="my-1">
                <Link
                  href={item.href}
                  className={cn(
                    "block py-2 px-4 rounded-lg transition-colors font-medium text-default-700 hover:text-teal-700",
                    {
                      "font-bold text-teal-700": router.pathname === item.href,
                    },
                  )}
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
            {session.status === "authenticated" ? (
              <Fragment>
                <div className="flex items-center gap-3 mx-4 mt-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <Avatar
                    src={dataProfile?.profilePicture}
                    showFallback
                    size="md"
                    className="border-2 border-teal-100"
                  />
                  <div>
                    <p className="font-medium text-neutral-800">{dataProfile?.name || "User"}</p>
                    <p className="text-sm text-neutral-500">{dataProfile?.email}</p>
                  </div>
                </div>

                <NavbarMenuItem
                  className={cn("my-1", {
                    hidden: dataProfile?.role !== "admin",
                  })}
                >
                  <Link
                    href="/admin/campaign"
                    className="block py-2 px-4 rounded-lg transition-colors font-medium text-default-700 hover:text-danger hover:bg-red-50"
                  >
                    Admin
                  </Link>
                </NavbarMenuItem>
                <NavbarMenuItem className="my-1">
                  <Link
                    className="block py-2 px-4 rounded-lg transition-colors font-medium text-default-700 hover:text-danger hover:bg-red-50"
                    href="/member/profile"
                  >
                    Profile
                  </Link>
                </NavbarMenuItem>
                <NavbarMenuItem className="mt-6 mx-4">
                  <Button
                    color="success"
                    onPress={() => signOut()}
                    className="w-full bg-teal-600"
                    variant="bordered"
                    size="md"
                  >
                    Logout
                  </Button>
                </NavbarMenuItem>
              </Fragment>
            ) : (
              <Fragment>
                <div className="grid grid-cols-1 gap-3 mx-4 mt-4">
                  {BUTTON_ITEMS.map((item) => (
                    <NavbarMenuItem key={`button-${item.label}`}>
                      <Button
                        as={Link}
                        color="danger"
                        href={item.href}
                        fullWidth
                        variant={item.variant as ButtonProps["variant"]}
                        size="md"
                        className={cn(
                          "rounded-lg transition-colors duration-200",
                          item.label === "Masuk" ? "bg-teal-600 text-white hover:bg-teal-700" : "",
                          item.label === "Daftar" ? "bg-white text-teal-600 border border-teal-600 hover:bg-teal-50" : ""
                        )}
                      >
                        {item.label}
                      </Button>
                    </NavbarMenuItem>
                  ))}
                </div>
              </Fragment>
            )}
          </NavbarMenu>
        </NavbarContent>
      </div>
    </Navbar>
  );
};

export default LandingPageLayoutNavbar;
