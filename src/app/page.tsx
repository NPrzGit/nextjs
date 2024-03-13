//"use client"
import Image from 'next/image'
import { useSession } from 'next-auth/react'

export default function Home() {
   const {data: session, status} = useSession();
   console.log(session,status);
  return (
    <>
    <h2>
      hola
    </h2>
    </>
  )
}
