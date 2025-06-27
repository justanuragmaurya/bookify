import { Button } from '@/components/ui/button'
import SignOutButton from '@/components/ui/signout-button'
import { auth } from '@/lib/auth'
import Link from 'next/link'
import React from 'react'

async function page() {
    const session = await auth()
    return(session?.user?(
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl m-5">
        <div className="md:flex">
            <div className="md:flex-shrink-0">
                {session?.user?.image && <img className="h-48 w-full object-cover md:w-48" src={session.user.image} alt='user image' />}        
            </div>
            <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{session?.user?.name}</div>
                <a href="#" className="block mt-1 text-lg leading-tight font-medium text-black hover:underline">{session?.user?.email}</a>
            </div>
        </div>
        <SignOutButton/>
    </div>
  ):
  <div>

  </div>
)
}

export default page 