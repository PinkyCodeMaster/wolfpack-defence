'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { AlertCircle, CheckCircle2 } from 'lucide-react'
import { resetPassword } from './actions'

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false)

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        setIsLoading(true)
        setError(null)
        setSuccess(false)

        const formData = new FormData(event.currentTarget)
        const email = formData.get('email') as string

        try {
            await resetPassword(email)
            setSuccess(true)
        } catch (error) {
            console.error('Password reset error:', error)
            setError('Mission compromised! Unable to initiate password recovery. Check your intel and try again, soldier!')
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="container mx-auto px-4 py-8 max-w-md">
            <div className="flex justify-center mb-8">
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
            <div className="bg-card text-card-foreground rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-bold mb-6 text-center">Recover Your Access Codes</h1>
                {!success ? (
                    <form onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email">Comms Frequency (Email)</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder="Enter your registered email"
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? 'Initiating Recovery...' : 'Request New Access Codes'}
                            </Button>
                        </div>
                    </form>
                ) : (
                    <div className="text-center space-y-4">
                        <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto" />
                        <p>Recovery mission initiated! Check your comms (email) for further instructions.</p>
                    </div>
                )}
                {error && (
                    <div className="mt-4 p-4 bg-destructive/10 text-destructive rounded-md flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2" />
                        <p>{error}</p>
                    </div>
                )}
                <div className="mt-6 text-center">
                    <Link href="/enlist" className="text-sm text-primary hover:underline">
                        Return to Base (Login)
                    </Link>
                </div>
            </div>
        </div>
    )
}