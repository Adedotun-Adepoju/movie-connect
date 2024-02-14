"use client";

import { NewPasswordType, newPasswordSchema } from "@/utils/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { IoMdArrowRoundBack } from "react-icons/io";
import InputFieldContainer from "./InputFieldContainer";

const NewPasswordForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isDirty, setDirty] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<NewPasswordType>({
    resolver: zodResolver(newPasswordSchema),
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
      <div className="mb-8 mt-16 flex flex-col gap-2">
        <h2 className=" font-sfpro text-4xl font-bold">Set new password</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => setDirty(true)} // set isDirty to true when form changes
        className="flex w-full flex-col gap-2"
      >
        <InputFieldContainer
          label="New password"
          id="password"
          error={errors.password?.message as string | undefined}
        >
          <span className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="new-password"
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
        <InputFieldContainer
          label="Confirm new password"
          id="confirmPassword"
          error={errors.confirmPassword?.message as string | undefined}
        >
          <span className="relative w-full">
            <input
              type={showPassword ? "text" : "password"}
              id="confirmPassword"
              autoComplete="new-password"
              placeholder="Re-enter your new password..."
              {...register("confirmPassword")}
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
        <input
          type="submit"
          value="Get Recovery Link"
          disabled={isSubmitting}
          className="input_submit mt-4 "
        />
      </form>
      <button className="mx-auto block">
        <Link
          href="/login"
          className="mt-6 flex items-center gap-2 p-3 text-center font-sfpro text-lg text-primary"
        >
          <IoMdArrowRoundBack /> Back to login
        </Link>
      </button>
    </>
  );
};

export default NewPasswordForm;
