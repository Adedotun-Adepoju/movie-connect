"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FacebookIcon, GoogleIcon } from "../icons";
import { LoginType, loginSchema } from "@/utils/zodSchemas";
import InputFieldContainer from "./InputFieldContainer";
import Checkbox from "./CheckBox";
import Link from "next/link";
import { Api } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { setUserContext } from "../context/userContext";
import { AxiosError } from "axios";
const LoginForm = () => {
  const [isDirty, setDirty] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, },
    setError,
    reset,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });
  const setActiveUser = useContext(setUserContext)

  
  // const authDetails = localStorage.getItem('auth')
  // const [authReminder, setAuthReminder] = useState<{
  //   email: '',
  //   password: '',
  //   remember_me: boolean
  // }>()

  
  const onSubmit = (data: any) => {
    Api.post('auth/sign-in', data)
    .then((response) => (
      router.push('/'),
      setActiveUser?.setUser(response.data.data.user),
      sessionStorage.setItem('user',JSON.stringify(response.data.data.user))
      // data.remember_me ? localStorage.setItem('auth', JSON.stringify(data)) : ''
    ))
    .catch((error) => setError('password', { message: error.response.data.message }))
  };

  // useEffect(() => {
  //   if(authDetails) {
  //     console.log(JSON.parse(authDetails))
  //     setAuthReminder(JSON.parse(authDetails))
  //   }
  // }, [])


  return (
    <>
      <h2 className="mb-8 text-center font-sfpro text-4xl font-bold text-light lg:text-dark">
        Sign in<span className="hidden md:inline">&nbsp;to your account</span>
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => setDirty(true)} // set isDirty to true when form changes
        className="flex w-full flex-col gap-2"
      >
        <InputFieldContainer
          label="Email"
          id="email"
          error={errors.email?.message as string | undefined}
        >
          <input
            type="text"
            id="email"
            autoComplete="username"
            placeholder="Your email address..."
            {...register("email")}
            className="input_field"
          />
        </InputFieldContainer>

        <InputFieldContainer
          label="Password"
          id="password"
          error={errors.password?.message as string | undefined}
        >
          <span className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
              placeholder="Your password..."
              {...register("password")}
              className="input_field"
            />
            <div className="input_field_icon">
              {showPassword ? (
                <AiOutlineEyeInvisible
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              ) : (
                <AiOutlineEye
                  className="h-5 w-5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                />
              )}
            </div>
          </span>
        </InputFieldContainer>

        <div className="flex justify-between text-light lg:text-dark">
          <Checkbox id="remember_me" label="Remember me" register={register} />

          <Link
            href="/recover"
            className="xs:text-base text-sm font-semibold transition-all duration-200 ease-in-out hover:text-primary lg:text-lg"
          >
            Forgot password?
          </Link>
        </div>

        <input
          type="submit"
          value="Login"
          disabled={isSubmitting}
          className="input_submit mt-6"
        />
      </form>
      <div>
        <div className="my-6 flex w-full items-center justify-center">
          <span className="flex h-px w-16 flex-1 bg-gray-fill"></span>
          <span className="mx-3 text-xl text-gray-500">Or continue with:</span>
          <span className="flex h-px w-16 flex-1 bg-gray-fill"></span>
        </div>
        <div className="xs:flex-row flex flex-col items-center justify-between gap-8 text-light lg:text-dark">
          <button className="xs:w-1/2 line-clamp-1 flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-light bg-transparent px-4 py-2 font-semibold transition-all duration-200 ease-in-out hover:bg-white hover:text-primary lg:border-dark lg:text-dark">
            <GoogleIcon /> Login with Google
          </button>
          <button className="xs:w-1/2 line-clamp-1 flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-light bg-transparent px-4 py-2 font-semibold transition-all duration-200 ease-in-out hover:bg-white hover:text-primary lg:border-dark lg:text-dark">
            <FacebookIcon /> Login with Facebook
          </button>
        </div>
        <div>
          <p className="mt-8 text-center text-light lg:text-dark">
            Don't have an account?{" "}
            <a
              href="/register"
              className="hover:text-secondary font-semibold text-primary transition-all duration-200 ease-in-out"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
};

export default LoginForm;
