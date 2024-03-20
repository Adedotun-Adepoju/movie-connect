'use client'
import MainLayout from "@/components/layout";
import { useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import { setUserContext } from "@/components/context/userContext";
export default function HomeLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
  const userSession = sessionStorage.getItem('user')
  const setActiveUser = useContext(setUserContext)
  const router = useRouter()
  useEffect(() => {
   if (!userSession) {
    router.push('/login')
   } else {
      setActiveUser?.setUser(JSON.parse(userSession))
   }
  }, [])
    return (
      <>
      {userSession ? 
      <main>
        <MainLayout>{children}</MainLayout>
      </main> : ''}
      </>
    );
  }