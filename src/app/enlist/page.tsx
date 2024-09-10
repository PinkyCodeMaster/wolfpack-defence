'use client'

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'
import { login, signup } from './actions'
import { useState } from 'react'
import Image from 'next/image'
import { toast } from 'sonner'
import Link from 'next/link'

export default function EnlistPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const router = useRouter()

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>, action: 'enlist' | 'login') => {
        event.preventDefault()
        setIsLoading(true)
        setError(null)

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string
        const password = formData.get('password') as string

        try {
            if (action === 'enlist') {
                await signup(email, password)
                toast.success('Successfully enlisted! Confirm your email to proceed.')
                router.push('/enlist/confirm-email')
            } else {
                await login(email, password)
                toast.success('Login successful! Welcome back, soldier.')
                router.push('/communication-centre')
            }
        } catch (error) {
            console.error('Authentication error:', error)
            setError('Mission failed! Check your intel and try again, soldier!')
            toast.error('Authentication failed! Mission incomplete.')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="w-full max-w-md space-y-8">
            <div className="flex justify-center">
                <Link href="/">
                    <Image
                        src="https://utfs.io/f/e0c4a800-c0f4-4159-bfda-b1535eb6eab3-1zbfv.jpg"
                        alt="Wolfpack Defence Logo"
                        width={100}
                        height={100}
                        className="rounded-full"
                    />
                </Link>
            </div>
            <Tabs defaultValue="enlist" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="enlist">Enlist for Duty</TabsTrigger>
                    <TabsTrigger value="login">Report for Duty</TabsTrigger>
                </TabsList>
                <TabsContent value="enlist">
                    <form onSubmit={(e) => handleSubmit(e, 'enlist')}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Comms Frequency (Email)</Label>
                                <Input id="email" name="email" type="email" required placeholder="recruit@wolfpack.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="password">Secret Code (Password)</Label>
                                <Input id="password" name="password" type="password" required placeholder="Minimum 8 characters, soldier!" />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Enlisting...' : 'Join the Pack'}
                            </Button>
                        </div>
                    </form>
                </TabsContent>
                <TabsContent value="login">
                    <form onSubmit={(e) => handleSubmit(e, 'login')}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="login-email">Codename (Email)</Label>
                                <Input id="login-email" name="email" type="email" required placeholder="alpha@wolfpack.com" />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="login-password">Access Code (Password)</Label>
                                <Input id="login-password" name="password" type="password" required placeholder="Your top-secret password" />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Authenticating...' : 'Commence Mission'}
                            </Button>
                        </div>
                    </form>
                    <div className="mt-4 text-center">
                        <Link href="/enlist/forgot-password" className="text-sm text-primary hover:underline">
                            Lost your access codes?
                        </Link>
                    </div>
                </TabsContent>
                {error && (
                    <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <p>{error}</p>
                    </div>
                )}
                <div className="mt-6 text-center text-sm text-muted-foreground">
                    <p>By enlisting or reporting for duty, you agree to follow the</p>
                    <Link href="/terms" className="text-primary hover:underline">Wolfpack Code of Conduct</Link>
                </div>
            </Tabs>
        </div>
    )
}