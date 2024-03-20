import Image from "next/image";
import { ReactNode } from "react";
import onboardBg from "../../../public/images/onboard-bg.webp";

interface Prop {
  children: ReactNode;
}

const OnBoardContainer = ({ children }: Prop) => {
  return (
    <div className="relative mx-auto flex h-screen w-full max-w-6xl items-center gap-16 lg:px-10 lg:py-12">
      <div className="absolute left-0 top-0 -z-10 h-full w-full bg-gradient-to-t from-black to-transparent/60 lg:hidden" />

      <Image
        src={onboardBg}
        alt="Cinema"
        fill
        className="-z-20 object-cover lg:hidden"
      />
      <div className="hidden h-full w-1/2 max-w-lg rounded-3xl bg-primary lg:flex">
        <Image
          src={onboardBg}
          alt="Cinema"
          className="h-full rounded-3xl object-cover"
        />
      </div>
      <div className="flex-1 basis-1/2 flex-col px-5 sm:px-10 lg:px-0">
        {children}
      </div>
    </div>
  );
};

export default OnBoardContainer;
