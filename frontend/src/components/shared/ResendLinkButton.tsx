import { cx } from "@/utils";
import Link from "next/link";
import { useState, useEffect } from "react";

const ResendLinkButton = () => {
  const [countdown, setCountdown] = useState(0);

  const handleClick = () => {
    if (countdown === 0) {
      // Send email logic here
      setCountdown(60); // Set countdown to 60 seconds
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [countdown]);

  return (
    <Link
      href="#"
      className={cx(
        "xs:w-1/2 flex w-full items-center justify-center gap-2 p-3 text-center font-sfpro text-lg",
        countdown > 0 ? "cursor-wait text-gray-400" : "text-primary",
      )}
      onClick={handleClick}
    >
      {countdown > 0 ? `Resend in ${countdown}s` : "Resend recovery link"}
    </Link>
  );
};

// Usage:
// <ResendLinkButton />

export default ResendLinkButton;
