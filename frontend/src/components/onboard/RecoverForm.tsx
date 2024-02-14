"use client";

import { RecoverType, recoverSchema } from "@/utils/zodSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import InputFieldContainer from "./InputFieldContainer";
import { IoMdArrowRoundBack } from "react-icons/io";
import Link from "next/link";

const BackToLogin = () => {
  return (
    <Link
      href="/login"
      className="mt-6 flex items-center gap-2 p-3 text-center font-sfpro text-lg text-primary"
    >
      <IoMdArrowRoundBack /> Back to login
    </Link>
  );
};

const RecoverForm = () => {
  const [isSubmitSuccessful, setIsSubmitSuccessful] = useState<boolean>(false);
  const [isDirty, setDirty] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RecoverType>({
    resolver: zodResolver(recoverSchema),
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    try {
      console.log(data);
      setIsSubmitSuccessful(true);
    } catch (error) {
      console.error("Error:", error);
      setIsSubmitSuccessful(false);
    }
  };

  if (isSubmitSuccessful)
    return (
      <div className="flex flex-col items-center justify-center">
        <div className="mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-primary">
          <svg
            width="80"
            height="80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <p className="text-center text-lg">
          We've sent you an email with a recovery link. Please check your inbox
        </p>
        <div className="flex items-center justify-between">
          <BackToLogin />
          <Link
            href="#"
            className="mt-6 flex items-center gap-2 p-3 text-center font-sfpro text-lg text-primary"
          >
            Resend recovery link
          </Link>
        </div>
      </div>
    );
  return (
    <>
      <div className="mb-8 mt-16 flex flex-col gap-2">
        <h2 className=" font-sfpro text-4xl font-bold">
          Forgot your password?
        </h2>
        <p className="text-lg">Your need your e-mail to reset you password</p>
      </div>
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
        <input
          type="submit"
          value="Get Recovery Link"
          disabled={isSubmitting}
          className="input_submit mt-4 "
        />
      </form>
      <button className="mx-auto block">
        <BackToLogin />
      </button>
    </>
  );
};

export default RecoverForm;
