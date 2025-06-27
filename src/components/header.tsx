"use client"
import { useSession } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import AuthDialog from "@/components/ui/auth-dialog"
import SignOutButton from "@/components/ui/signout-button"
import Link from "next/link"

export default function Header(){
    const { data: session, status } = useSession()
    const [authDialogOpen, setAuthDialogOpen] = useState(false)
    
    return(
        <header className="bg-white shadow-sm dark:bg-gray-900">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                <Link href="/" className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                    Bookify
                </Link>
                
                <nav className="hidden md:flex space-x-6">
                    <Link href="/" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
                        Home
                    </Link>
                    <Link href="/books" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
                        Books
                    </Link>
                    {session && (
                        <Link href="/me" className="text-gray-600 hover:text-indigo-600 dark:text-gray-300 dark:hover:text-indigo-400">
                            Profile
                        </Link>
                    )}
                </nav>
                
                <div>
                    {status === "loading" ? (
                        <Button variant="ghost" disabled>Loading...</Button>
                    ) : session ? (
                        <div className="flex items-center gap-4">
                            <div className="hidden md:block">
                                <span className="text-sm text-gray-600 dark:text-gray-300">Hello, {session.user?.name?.split(' ')[0]}</span>
                            </div>
                            <SignOutButton />
                        </div>
                    ) : (
                        <>
                            <Button onClick={() => setAuthDialogOpen(true)}>Login</Button>
                            <AuthDialog isOpen={authDialogOpen} onOpenChange={setAuthDialogOpen} />
                        </>
                    )}
                </div>
            </div>
        </header>
    )
}