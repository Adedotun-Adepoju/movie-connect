"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FacebookIcon, GoogleIcon } from "@/components/icons";
import { SignupType, SignupsSchema } from "@/utils/zodSchemas";
import InputFieldContainer from "../../../components/onboard/InputFieldContainer";
import Checkbox from "../../../components/onboard/CheckBox";
import Link from "next/link";
import { Api } from "@/utils";
import { useRouter } from "next/navigation";
import { useContext } from "react";
import { setUserContext } from "@/components/context/userContext";
const SignupForm = () => {
  const [isDirty, setDirty] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    reset,
  } = useForm<SignupType>({
    resolver: zodResolver(SignupsSchema),
    mode: "onChange",
  });
  const setActiveUser = useContext(setUserContext)
  const onSubmit = async (data: any) => {
    Api.post('auth/sign-up', data)
    .then((response) => (
      router.push('/'),
      setActiveUser?.setUser(response.data.data),
      sessionStorage.setItem('user',JSON.stringify(response.data.data))
    ))
    .catch((error) => (setError('first_name', { message: error.response.data.message }), console.error(error)))
  };

  return (
    <>
      <h2 className="mb-8 text-center text-white text-base font-sfpro text-4xl font-bold">
        Sign up to get started
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => setDirty(true)} // set isDirty to true when form changes
        className="flex w-full flex-col gap-2"
      >
        <div className="flex flex-row gap-x-6">
          <InputFieldContainer
            label="First Name"
            id="Fname"
            error={errors.first_name?.message as string | undefined}
          >
            <input
              type="text"
              id="Fname"
              autoComplete="firstname"
              placeholder="Jonathan"
              {...register("first_name")}
              className="input_field"
            />
          </InputFieldContainer>
          <InputFieldContainer
            label="Last Name"
            id="Lname"
            error={errors.last_name?.message as string | undefined}
          >
            <input
              type="text"
              id="Lname"
              autoComplete="firstname"
              placeholder="White"
              {...register("last_name")}
              className="input_field"
            />
          </InputFieldContainer>
        </div>
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
              placeholder="********"
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

        <InputFieldContainer
          label="Confirm Password"
          id="password"
          error={errors.password?.message as string | undefined}
        >
          <span className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password2"
              autoComplete="current-password"
              placeholder="********"
              {...register("password2")}
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

        <div className="flex justify-between items-center">
          <Checkbox id="remember_me" register={register} label=""/> 
          <p className="text-pimary text-white font-semibold text-xs lg:text-black">
            By clicking on sign-up, you agree to Movies-connect’s <span className="hover:text-secondary font-semibold text-primary transition-all duration-200 ease-in-out"> Terms and conditions.</span>
          </p>
        </div>

        <input
          type="submit"
          value="Create account"
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
        <div className="flex flex-col items-center justify-between gap-4">
          <button className="flex h-12 w-5/6 items-center justify-center gap-2 rounded-lg border border-dark bg-transparent font-semibold text-dark transition-all duration-200 ease-in-out hover:bg-white hover:text-primary">
            <GoogleIcon /> Signup with Google
          </button>
          <button className="flex h-12 w-5/6 items-center justify-center gap-2 rounded-lg border border-dark bg-transparent font-semibold text-dark transition-all duration-200 ease-in-out hover:bg-white hover:text-primary">
            <FacebookIcon /> Signup with Facebook
          </button>
        </div>
        <div>
          <p className="mt-8 text-center text-dark">
            Already have an account?{" "}
            <a
              href="/login"
              className="hover:text-secondary font-semibold text-primary transition-all duration-200 ease-in-out"
            >
              Sign in
            </a> <br />
            <a className="hover:text-secondary font-semibold text-primary transition-all duration-200 ease-in-out">Continue as guest</a>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
