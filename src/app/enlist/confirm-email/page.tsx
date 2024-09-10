import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function ConfirmEmailPage() {
    return (
        <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Confirm Your Email</h1>
            <p className="mb-6">
                We&apos;ve sent a confirmation email to your inbox. Please click the link in the email to activate your account.
            </p>
            <Button asChild>
                <Link href="/">Return to Home</Link>
            </Button>
        </div>
    )
}