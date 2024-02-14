import Image from "next/image";
import { ReactNode } from "react";
import onboardBg from "../../../public/images/onboard-bg.webp";

interface Prop {
  children: ReactNode;
}

const OnBoardContainer = ({ children }: Prop) => {
  return (
    <div className="mx-auto flex h-screen w-full max-w-6xl gap-16 items-center">
      <div className="h-full w-1/2 hidden lg:flex  max-w-lg rounded-3xl bg-primary">
        <Image
          src={onboardBg}
          alt="Cinema"
          className="h-full rounded-3xl object-cover"
        />
      </div>
      <div className="basis-1/2 flex-1 flex-col">{children}</div>
    </div>
  );
};

export default OnBoardContainer;
