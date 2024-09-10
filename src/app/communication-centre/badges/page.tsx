'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
    Star,
    Award,
    Shield,
    Target,
    Zap,
    Clock,
    TrendingUp,
    Users,
    Search
} from 'lucide-react'

type Commendation = {
    id: string
    name: string
    description: string
    icon: React.ReactNode
    dateEarned: string
    category: 'performance' | 'achievement' | 'service'
}

const commendations: Commendation[] = [
    {
        id: '1',
        name: 'Sharpshooter',
        description: 'Achieved exceptional accuracy in marksmanship training.',
        icon: <Target className="h-6 w-6" />,
        dateEarned: '2023-05-15',
        category: 'achievement'
    },
    {
        id: '2',
        name: 'First Responder',
        description: 'Demonstrated quick thinking and action in emergency situations.',
        icon: <Zap className="h-6 w-6" />,
        dateEarned: '2023-06-22',
        category: 'performance'
    },
    {
        id: '3',
        name: 'Team Leader',
        description: 'Successfully led a team through high-pressure scenarios.',
        icon: <Users className="h-6 w-6" />,
        dateEarned: '2023-07-10',
        category: 'achievement'
    },
    {
        id: '4',
        name: 'Tactical Excellence',
        description: 'Displayed superior tactical decision-making in combat simulations.',
        icon: <Shield className="h-6 w-6" />,
        dateEarned: '2023-08-05',
        category: 'performance'
    },
    {
        id: '5',
        name: 'Endurance Star',
        description: 'Completed a grueling 72-hour field exercise with distinction.',
        icon: <Star className="h-6 w-6" />,
        dateEarned: '2023-09-18',
        category: 'achievement'
    },
    {
        id: '6',
        name: 'Rapid Deployment',
        description: 'Consistently achieved rapid response times in deployment drills.',
        icon: <Clock className="h-6 w-6" />,
        dateEarned: '2023-10-30',
        category: 'performance'
    },
    {
        id: '7',
        name: 'Combat Medic',
        description: 'Demonstrated exceptional medical skills in simulated combat scenarios.',
        icon: <Award className="h-6 w-6" />,
        dateEarned: '2023-11-15',
        category: 'service'
    },
    {
        id: '8',
        name: 'Strategic Planner',
        description: 'Developed innovative strategies that improved team performance.',
        icon: <TrendingUp className="h-6 w-6" />,
        dateEarned: '2023-12-07',
        category: 'achievement'
    },
]

export default function BadgesPage() {
    const [searchTerm, setSearchTerm] = useState('')
    const [selectedCategory, setSelectedCategory] = useState<'all' | 'performance' | 'achievement' | 'service'>('all')

    const filteredCommendations = commendations.filter(commendation =>
        (selectedCategory === 'all' || commendation.category === selectedCategory) &&
        (commendation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            commendation.description.toLowerCase().includes(searchTerm.toLowerCase()))
    )

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Commendations</h1>

            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <Input
                        placeholder="Search commendations..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-auto"
                    />
                    <Button size="icon">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
                <div className="flex space-x-2">
                    <Button
                        variant={selectedCategory === 'all' ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory('all')}
                    >
                        All
                    </Button>
                    <Button
                        variant={selectedCategory === 'performance' ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory('performance')}
                    >
                        Performance
                    </Button>
                    <Button
                        variant={selectedCategory === 'achievement' ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory('achievement')}
                    >
                        Achievement
                    </Button>
                    <Button
                        variant={selectedCategory === 'service' ? 'default' : 'outline'}
                        onClick={() => setSelectedCategory('service')}
                    >
                        Service
                    </Button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredCommendations.map((commendation) => (
                    <Card key={commendation.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {commendation.name}
                            </CardTitle>
                            <Badge variant="secondary">
                                {commendation.category.charAt(0).toUpperCase() + commendation.category.slice(1)}
                            </Badge>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center space-x-4">
                                <div className="p-2 bg-primary/10 rounded-full">
                                    {commendation.icon}
                                </div>
                                <div className="space-y-1">
                                    <p className="text-sm text-muted-foreground">
                                        {commendation.description}
                                    </p>
                                    <CardDescription>
                                        Earned on {new Date(commendation.dateEarned).toLocaleDateString()}
                                    </CardDescription>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {filteredCommendations.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-xl font-semibold">No commendations found</p>
                    <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
                </div>
            )}
        </div>
    )
}