'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { createClient } from '@/utils/supabase/client'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import {
    User,
    ShoppingBag,
    Medal,
    Crosshair,
    TrendingUp,
    Star,
    Clock,
    Award,
    Bell,
    MessageSquare,
    Settings
} from 'lucide-react'
import { toast } from 'sonner'
import { downloadAvatarImage } from '@/utils/avatarService'

type Profile = {
    id: string
    username: string
    avatar_url: string | null
    rank: string
    experience: number
    missions_completed: number
}

type Mission = {
    id: string
    title: string
    status: 'pending' | 'in-progress' | 'completed'
    deadline: string
}

export default function CommunicationCentreDashboard() {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [missions, setMissions] = useState<Mission[]>([])
    const [loading, setLoading] = useState(true)
    const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
    const supabase = createClient()

    useEffect(() => {
        async function loadProfileAndMissions() {
            setLoading(true)
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                if (profileError) {
                    toast.error('Error loading profile', { description: profileError.message })
                } else if (profileData) {
                    setProfile(profileData as Profile)

                    // Download avatar image if avatar_url exists
                    if (profileData.avatar_url) {
                        const downloadedAvatarUrl = await downloadAvatarImage(profileData.avatar_url)
                        setAvatarUrl(downloadedAvatarUrl)
                    }
                }

                const { data: missionsData, error: missionsError } = await supabase
                    .from('missions')
                    .select('*')
                    .eq('operator_id', user.id)
                    .order('deadline', { ascending: true })
                    .limit(5)

                if (missionsError) {
                    toast.error('Error loading missions', { description: missionsError.message })
                } else if (missionsData) {
                    setMissions(missionsData as Mission[])
                }
            }
            setLoading(false)
        }

        loadProfileAndMissions()
    }, [supabase])

    if (loading) {
        return <div className="flex justify-center items-center h-screen">Loading...</div>
    }

    if (!profile) {
        return <div className="flex justify-center items-center h-screen">No profile found</div>
    }

    const nextRank = profile.rank === 'Private' ? 'Corporal' :
        profile.rank === 'Corporal' ? 'Sergeant' :
            profile.rank === 'Sergeant' ? 'Lieutenant' : 'Captain'
    const experienceToNextRank = profile.rank === 'Private' ? 1000 :
        profile.rank === 'Corporal' ? 2000 :
            profile.rank === 'Sergeant' ? 3000 : 5000
    const progressToNextRank = (profile.experience / experienceToNextRank) * 100 + 70


    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Command Center Dashboard</h1>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Operator Profile
                        </CardTitle>
                        <User className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex items-center space-x-4">
                            <Avatar className="h-20 w-20">
                                <AvatarImage
                                    src={avatarUrl || 'https://utfs.io/f/55803964-4247-496e-b017-2b962474dcc6-4eab7g.jpg'}
                                    alt={profile.username}
                                />
                                <AvatarFallback>{profile.username.charAt(0).toUpperCase() || 'Operator'}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div className="text-2xl font-bold">{profile.username}</div>
                                <p className="text-xs text-muted-foreground">
                                    Rank: {profile.rank}
                                </p>
                                <div className="mt-2">
                                    <p className="text-sm">Progress to {nextRank}</p>
                                    <Progress value={progressToNextRank} className="w-[180px] mt-2" />
                                </div>
                            </div>
                        </div>
                        <Button asChild className="mt-4 w-full" variant="outline">
                            <Link href="/communication-centre/profile">View Full Profile</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Active Missions
                        </CardTitle>
                        <Crosshair className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {missions.map((mission) => (
                                <div key={mission.id} className="flex justify-between items-center">
                                    <div>
                                        <p className="font-medium">{mission.title}</p>
                                        <p className="text-xs text-muted-foreground">Due: {new Date(mission.deadline).toLocaleDateString()}</p>
                                    </div>
                                    <Badge variant={mission.status === 'completed' ? 'default' : 'secondary'}>
                                        {mission.status}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                        <Button asChild className="mt-4 w-full" variant="outline">
                            <Link href="/communication-centre/orders">View All Missions</Link>
                        </Button>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">
                            Commendations
                        </CardTitle>
                        <Medal className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-wrap gap-2">
                            <Badge variant="secondary">
                                <Star className="h-3 w-3 mr-1" />
                                Sharpshooter
                            </Badge>
                            <Badge variant="secondary">
                                <TrendingUp className="h-3 w-3 mr-1" />
                                Rapid Advancement
                            </Badge>
                            <Badge variant="secondary">
                                <Clock className="h-3 w-3 mr-1" />
                                Punctual Operator
                            </Badge>
                            <Badge variant="secondary">
                                <Award className="h-3 w-3 mr-1" />
                                Top Performer
                            </Badge>
                        </div>
                        <Button asChild className="mt-4 w-full" variant="outline">
                            <Link href="/communication-centre/badges">View All Commendations</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                    <ul className="space-y-4">
                        <li className="flex items-center">
                            <ShoppingBag className="h-5 w-5 mr-2 text-primary" />
                            <span>New mission assigned: Covert Reconnaissance</span>
                            <span className="ml-auto text-xs text-muted-foreground">2 hours ago</span>
                        </li>
                        <li className="flex items-center">
                            <Medal className="h-5 w-5 mr-2 text-primary" />
                            <span>Earned commendation: Rapid Advancement</span>
                            <span className="ml-auto text-xs text-muted-foreground">1 day ago</span>
                        </li>
                        <li className="flex items-center">
                            <MessageSquare className="h-5 w-5 mr-2 text-primary" />
                            <span>New message from Command</span>
                            <span className="ml-auto text-xs text-muted-foreground">3 days ago</span>
                        </li>
                    </ul>
                </CardContent>
            </Card>

            <div className="flex justify-end space-x-4">
                <Button asChild variant="outline">
                    <Link href="/communication-centre/messages">
                        <Bell className="mr-2 h-4 w-4" />
                        Check Messages
                    </Link>
                </Button>
                <Button asChild>
                    <Link href="/communication-centre/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        Manage Settings
                    </Link>
                </Button>
            </div>
        </div>
    )
}
