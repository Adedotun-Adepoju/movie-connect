import Image from "next/image";
import MainLayout from "@/components/layout";

export default function Home() {
  return (
    <main>
      <Image src='/images/logo.svg' width={200} height={200} alt="image"/>
    </main>
  );
}
