import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function HomePage() {
    return (
        <div className="flex flex-col items-center">
            {/* Hero Section */}
            <section className="w-full relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="https://utfs.io/f/209a0d33-d84b-46a2-93f5-23b52157f0f3-blada4.jpg"
                        alt="Tactical background"
                        fill
                        style={{ objectFit: 'cover' }}
                        className="opacity-30"
                    />
                </div>
                <div className="container relative z-10 mx-auto px-4 py-32 sm:px-6 lg:px-8 flex flex-col items-center text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-primary-foreground shadow-text">
                        Welcome to <span className="text-primary">Wolfpack Defence</span>
                    </h1>
                    <p className="mt-6 max-w-2xl text-xl text-primary-foreground shadow-text">
                        Your one-stop shop for tactical gear and airsoft equipment. Join the pack and gear up for your next mission!
                    </p>
                    <div className="mt-10 flex flex-wrap justify-center gap-4">
                        <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90 transform hover:scale-105 transition-transform">
                            <Link href="/buy">Shop Now</Link>
                        </Button>
                        <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground transform hover:scale-105 transition-transform">
                            <Link href="/sell">Sell Your Gear</Link>
                        </Button>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="w-full py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-8">Featured Products</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <Card key={i}>
                                <div className="relative w-full h-48">
                                    <Image
                                        src="https://utfs.io/f/209a0d33-d84b-46a2-93f5-23b52157f0f3-blada4.jpg"
                                        alt={`Featured product ${i}`}
                                        fill
                                        style={{ objectFit: 'cover' }}
                                    />
                                </div>
                                <CardHeader>
                                    <CardTitle>Tactical Gear {i}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-sm text-muted-foreground">High-quality airsoft equipment for your next mission.</p>
                                    <Button className="mt-4 w-full bg-primary text-primary-foreground hover:bg-primary/90">View Details</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* About Us */}
            <section className="w-full py-16 bg-muted">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">About Wolfpack Defence</h2>
                    <p className="max-w-2xl mx-auto text-lg text-muted-foreground">
                        We&apos;re not just another gear shop. We&apos;re a community of airsoft enthusiasts who believe in quality equipment and tactical humor. Join the pack and experience the difference!
                    </p>
                </div>
            </section>

            {/* Testimonials */}
            <section className="w-full py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-8">What Our Pack Says</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <Card key={i} className="bg-muted">
                                <CardContent className="pt-6">
                                    <p className="text-muted-foreground italic">&ldquo;Best gear I&apos;ve ever used. The tactical jokes are a bonus!&rdquo;</p>
                                    <p className="mt-4 font-semibold">- Happy Wolf {i}</p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blog Preview */}
            <section className="w-full py-16 bg-muted">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-center mb-8">Latest from the Den</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((i) => (
                            <Card key={i}>
                                <CardHeader>
                                    <CardTitle>Tactical Tips: Volume {i}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">Learn the latest strategies and gear recommendations from our experts.</p>
                                    <Button variant="link" className="mt-4 text-primary hover:text-primary/90">Read More</Button>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* Active Users */}
            <section className="w-full py-16 bg-primary text-primary-foreground">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold mb-4">Join the Pack</h2>
                    <p className="text-xl mb-6">Over 10,000 active wolves and growing!</p>
                    <Button asChild className="bg-background text-foreground hover:bg-background/90 transform hover:scale-105 transition-transform">
                        <Link href="/register">Become a Wolf</Link>
                    </Button>
                </div>
            </section>
        </div>
    )
}