'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2, Edit, Save, MessageSquare, Medal, Crosshair } from 'lucide-react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { createClient } from '@/utils/supabase/client'
import AvatarUpload from '@/components/avatar-upload'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

type Profile = {
    id: string
    username: string | null
    full_name: string | null
    avatar_url: string | null
    website: string | null
    rank: string
    experience: number
    bio: string | null
}

export default function CommunicationCentrePage() {
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState<Profile | null>(null)
    const [isEditing, setIsEditing] = useState(false)
    const router = useRouter()
    const supabase = createClient()

    useEffect(() => {
        const fetchProfile = async () => {
            const { data: { user }, error: userError } = await supabase.auth.getUser()
            if (userError) {
                toast.error("Error fetching user", {
                    description: userError.message,
                })
                return
            }

            if (user) {
                const { data: profileData, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('id', user.id)
                    .single()

                if (profileError) {
                    toast.error("Error fetching profile", {
                        description: profileError.message,
                    })
                } else if (profileData) {
                    setProfile(profileData)
                }
            }
            setLoading(false)
        }

        fetchProfile()
    }, [supabase])

    const handleUpdateProfile = async () => {
        if (!profile) return

        setLoading(true)
        const { error } = await supabase
            .from('profiles')
            .update({
                username: profile.username,
                full_name: profile.full_name,
                website: profile.website,
                bio: profile.bio,
            })
            .eq('id', profile.id)

        if (error) {
            toast.error("Error updating profile", {
                description: error.message,
            })
        } else {
            toast.success("Profile updated", {
                description: "Your operator profile has been updated successfully.",
            })
            setIsEditing(false)
        }
        setLoading(false)
    }

    const handleAvatarUpload = async (filePath: string) => {
        if (!profile) return

        setLoading(true)
        const { error } = await supabase
            .from('profiles')
            .update({ avatar_url: filePath })
            .eq('id', profile.id)

        if (error) {
            toast.error("Error updating avatar", {
                description: error.message,
            })
        } else {
            setProfile({ ...profile, avatar_url: filePath })
            toast.success("Avatar updated", {
                description: "Your operator avatar has been updated successfully.",
            })
        }
        setLoading(false)
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        )
    }

    if (!profile) {
        router.push('/login')
        return null
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">Communication Centre</h1>
                <Button onClick={() => isEditing ? handleUpdateProfile() : setIsEditing(true)}>
                    {isEditing ? (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </>
                    ) : (
                        <>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Profile
                        </>
                    )}
                </Button>
            </div>

            <Tabs defaultValue="profile" className="w-full">
                <TabsList>
                    <TabsTrigger value="profile">Operator Profile</TabsTrigger>
                    <TabsTrigger value="messages">Messages</TabsTrigger>
                    <TabsTrigger value="missions">Active Missions</TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Personal Information</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <AvatarUpload
                                    uid={profile.id}
                                    url={profile.avatar_url}
                                    onUpload={handleAvatarUpload}
                                />
                                <div className="space-y-2">
                                    <Label htmlFor="callsign">Callsign</Label>
                                    <Input
                                        id="callsign"
                                        value={profile.username || ''}
                                        onChange={(e) => setProfile({ ...profile, username: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="full_name">Full Name</Label>
                                    <Input
                                        id="full_name"
                                        value={profile.full_name || ''}
                                        onChange={(e) => setProfile({ ...profile, full_name: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="website">Personal Website</Label>
                                    <Input
                                        id="website"
                                        value={profile.website || ''}
                                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                                        disabled={!isEditing}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Operator Stats</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">Rank:</span>
                                    <Badge variant="secondary">{profile.rank}</Badge>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">Experience Points:</span>
                                    <span>{profile.experience}</span>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="bio">Mission Statement</Label>
                                    <Textarea
                                        id="bio"
                                        value={profile.bio || ''}
                                        onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                                        disabled={!isEditing}
                                        rows={4}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                <TabsContent value="messages">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Messages</CardTitle>
                            <CardDescription>Stay in touch with your squad</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <MessageSquare className="h-6 w-6 text-primary" />
                                    <div>
                                        <p className="font-semibold">Mission Briefing</p>
                                        <p className="text-sm text-muted-foreground">New mission details available. Check your inbox.</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Medal className="h-6 w-6 text-primary" />
                                    <div>
                                        <p className="font-semibold">Commendation Received</p>
                                        <p className="text-sm text-muted-foreground">You&apos;ve been awarded for your recent performance.</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">View All Messages</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                <TabsContent value="missions">
                    <Card>
                        <CardHeader>
                            <CardTitle>Active Missions</CardTitle>
                            <CardDescription>Your current assignments</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-4">
                                    <Crosshair className="h-6 w-6 text-primary" />
                                    <div>
                                        <p className="font-semibold">Operation Shadowstrike</p>
                                        <p className="text-sm text-muted-foreground">Infiltration mission in progress. ETA: 48 hours</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Crosshair className="h-6 w-6 text-primary" />
                                    <div>
                                        <p className="font-semibold">Operation Eagle Eye</p>
                                        <p className="text-sm text-muted-foreground">Reconnaissance mission. Awaiting further intel.</p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button className="w-full">View Mission Details</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}