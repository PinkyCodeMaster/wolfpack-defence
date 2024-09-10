'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '@/hooks/use-auth'
import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import { Sheet, SheetContent } from '@/components/ui/sheet'
import { Search, ShoppingBag, Menu, X, MessageSquare, Settings, LogOut, ChevronDown } from 'lucide-react'

export function SiteHeader() {
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const { user, logout } = useAuth()

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 
      ${isScrolled
                ? 'bg-white dark:bg-black shadow-md'
                : 'bg-background'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16 md:h-20">
                    <div className="flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <Image
                                src="https://utfs.io/f/e0c4a800-c0f4-4159-bfda-b1535eb6eab3-1zbfv.jpg"
                                alt="Wolfpack Defence Logo"
                                width={40}
                                height={40}
                                className="rounded-full"
                            />
                            <span className="text-xl md:text-2xl font-bold text-primary">Wolfpack Defence</span>
                        </Link>
                    </div>
                    <nav className="hidden md:flex items-center space-x-4">
                        <Link href="/marketplace" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Armory</Link>
                        <Link href="/blog" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Intel Hub</Link>
                        <Link href="/loadouts" className="text-foreground hover:text-primary px-3 py-2 rounded-md text-sm font-medium">Tactical Loadouts</Link>
                    </nav>
                    <div className="hidden md:flex items-center space-x-4">
                        <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(!isSearchOpen)}>
                            <Search className="h-5 w-5" />
                        </Button>
                        <Link href="/cart">
                            <Button variant="ghost" size="sm">
                                <ShoppingBag className="h-5 w-5" />
                            </Button>
                        </Link>
                        {user ? (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                                        <span className="hidden lg:inline">{user.email || 'Operator'}</span>
                                        <ChevronDown className="h-4 w-4" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                    <DropdownMenuItem>
                                        <Link href="/communication-centre" className="flex items-center">
                                            <MessageSquare className="mr-2 h-4 w-4" />
                                            <span>Comms Centre</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Link href="/communication-centre/settings" className="flex items-center">
                                            <Settings className="mr-2 h-4 w-4" />
                                            <span>Operator Settings</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem onClick={logout}>
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Debrief (Logout)</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        ) : (
                            <Button asChild variant="default" size="sm">
                                <Link href="/enlist">Enlist Now</Link>
                            </Button>
                        )}
                    </div>
                    <div className="md:hidden">
                        <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu className="h-6 w-6" />
                        </Button>
                    </div>
                </div>
            </div>
            {isSearchOpen && (
                <div className="border-t border-border py-4 px-4 md:px-0">
                    <div className="container mx-auto">
                        <form onSubmit={(e) => e.preventDefault()} className="flex items-center">
                            <Input
                                type="search"
                                placeholder="Search for gear, intel, or loadouts..."
                                className="w-full"
                            />
                            <Button type="submit" size="sm" className="ml-2">
                                Search
                            </Button>
                        </form>
                    </div>
                </div>
            )}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
                <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white dark:bg-black shadow-md">
                    <div className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-6">
                            <span className="text-lg font-semibold">Command Center</span>
                            <Button variant="ghost" size="sm" onClick={() => setIsMobileMenuOpen(false)}>
                                <X className="h-6 w-6" />
                            </Button>
                        </div>
                        <nav className="flex flex-col space-y-4">
                            <Link href="/marketplace" className="text-foreground hover:text-primary py-2">Armory</Link>
                            <Link href="/blog" className="text-foreground hover:text-primary py-2">Intel Hub</Link>
                            <Link href="/loadouts" className="text-foreground hover:text-primary py-2">Tactical Loadouts</Link>
                            <Link href="/cart" className="text-foreground hover:text-primary py-2">Supply Crate</Link>
                            {user ? (
                                <>
                                    <Link href="/communication-centre" className="text-foreground hover:text-primary py-2">Comms Centre</Link>
                                    <Link href="/communication-centre/settings" className="text-foreground hover:text-primary py-2">Operator Settings</Link>
                                    <Button variant="ghost" onClick={logout} className="justify-start px-0">
                                        Debrief (Logout)
                                    </Button>
                                </>
                            ) : (
                                <Button asChild variant="default" className="w-full">
                                    <Link href="/enlist">Enlist Now</Link>
                                </Button>
                            )}
                        </nav>
                    </div>
                </SheetContent>
            </Sheet>
        </header>
    )
}