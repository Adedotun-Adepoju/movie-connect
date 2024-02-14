"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FacebookIcon, GoogleIcon } from "../icons";
import { LoginType, loginSchema } from "@/utils/zodSchemas";
import InputFieldContainer from "./InputFieldContainer";
import Checkbox from "./CheckBox";
import Link from "next/link";

const LoginForm = () => {
  const [isDirty, setDirty] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h2 className="mb-8 text-center font-sfpro text-4xl font-bold">
        Sign in to your account
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
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 text-dark">
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

        <div className="flex justify-between">
          <Checkbox id="remember_me" label="Remember me" register={register} />

          <Link
            href="/recover"
            className="text-lg font-semibold text-dark transition-all duration-200 ease-in-out hover:text-primary"
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
        <div className="flex items-center justify-between gap-8">
          <button className="flex h-12 w-1/2 items-center justify-center gap-2 rounded-lg border border-dark bg-transparent font-semibold text-dark transition-all duration-200 ease-in-out hover:bg-white hover:text-primary">
            <GoogleIcon /> Login with Google
          </button>
          <button className="flex h-12 w-1/2 items-center justify-center gap-2 rounded-lg border border-dark bg-transparent font-semibold text-dark transition-all duration-200 ease-in-out hover:bg-white hover:text-primary">
            <FacebookIcon /> Login with Facebook
          </button>
        </div>
        <div>
          <p className="mt-8 text-center text-dark">
            Don't have an account?{" "}
            <a
              href="#"
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
