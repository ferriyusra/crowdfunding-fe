import { Button, Card, CardBody, Input, Spinner } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import useLogin from "./useLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Login = () => {
  const {
    isVisible,
    toggleVisibility,
    control,
    handleSubmit,
    handleLogin,
    isPendingLogin,
    errors,
  } = useLogin();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-10 lg:flex-row lg:gap-20">
      <div className="lg:py flex w-full flex-col items-center justify-center gap-10 py-10 lg:w-1/3">
        <Image
          src="/images/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src="/images/illustrations/login.svg"
          alt="login"
          className="w-2/3 lg:w-full"
          width={1024}
          height={1024}
        />
      </div>
      <Card>
        <CardBody className="p-8">
          <h2 className="text-2xl font-bold text-teal-600">Login</h2>
          <p className="mb-4 mt-2 text-small">
            Belum punya akun?&nbsp;
            <Link href="/auth/register" className="font-semibold text-teal-600">
              Daftar disini
            </Link>
          </p>
          {
            errors.root && (
              <p className="mb-2 font-medium text-teal">
                {errors?.root?.message}
              </p>
            )
          }
          <form className={cn("flex w-80 flex-col", Object.keys(errors).length > 0 ? "gap-2" : "gap-4")} onSubmit={handleSubmit(handleLogin)}>
            <Controller
              name="identifier"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="text"
                  label="Nama Pengguna / Email"
                  autoComplete="off"
                  variant="bordered"
                  isInvalid={errors.identifier !== undefined}
                  errorMessage={errors.identifier?.message}
                />
              )}
            />
            <Controller
              name="password"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type={isVisible ? "text" : "password"}
                  label="Kata Sandi"
                  autoComplete="off"
                  variant="bordered"
                  isInvalid={errors.password !== undefined}
                  errorMessage={errors.password?.message}
                  endContent={
                    <>
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                      >
                        {isVisible ? (
                          <FaEye className="pointer-events-none text-xl text-default-400" />
                        ) : (
                          <FaEyeSlash className="pointer-events-none text-xl text-default-400" />
                        )}
                      </button>
                    </>
                  }
                />
              )}
            />
            <Button color="success" size="lg" type="submit" className="bg-teal-600">
              {
                isPendingLogin ? (
                  <Spinner color="white" size="sm" />
                ) : <p className="text-white">Masuk</p>
              }
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  );
};

export default Login;
