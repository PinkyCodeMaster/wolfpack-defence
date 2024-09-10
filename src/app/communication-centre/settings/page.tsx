'use client'

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { passwordSchema, type PasswordSchema } from '@/lib/validations/password'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ModeToggle } from '@/components/layout/mode-toggle'
import { createClient } from '@/utils/supabase/client'
import { PhoneInput } from '@/components/phone-input'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'
import { z } from 'zod'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [personalInfo, setPersonalInfo] = useState({
    email: '',
    phone: ''
  })

  const [securitySettings, setSecuritySettings] = useState({
    twoFactor: false,
    passwordLastChanged: ''
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    missionAlerts: true
  })

  const [passwordData, setPasswordData] = useState<PasswordSchema>({
    password: '',
    confirmPassword: ''
  })

  const [passwordErrors, setPasswordErrors] = useState<Partial<PasswordSchema>>({})

  const supabase = createClient()

  useEffect(() => {
    const fetchUserData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        toast.error('Error fetching user data', { description: error.message })
        return
      }
      if (user) {
        setPersonalInfo({
          email: user.email || '',
          phone: user.phone || ''
        })
        // Fetch other settings from the database if needed
      }
      setLoading(false)
    }
    fetchUserData()
  }, [supabase])

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value })
  }

  const handlePhoneChange = (value: string) => {
    setPersonalInfo({ ...personalInfo, phone: value })
  }

  const handleNotificationChange = (setting: keyof typeof notificationSettings) => {
    setNotificationSettings({ ...notificationSettings, [setting]: !notificationSettings[setting] })
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswordData({ ...passwordData, [name]: value })
    setPasswordErrors({})
  }

  const handleUpdateProfile = async () => {
    setLoading(true)

    const { error } = await supabase.auth.updateUser({
      email: personalInfo.email,
      phone: personalInfo.phone,
    })

    if (error) {
      toast.error('Error updating profile', { description: error.message })
    } else {
      toast.success('Profile updated successfully')
    }
    setLoading(false)
  }

  const handleChangePassword = async () => {
    try {
      passwordSchema.parse(passwordData)
    } catch (error) {
      if (error instanceof z.ZodError) {
        setPasswordErrors(error.formErrors.fieldErrors)
        return
      }
    }

    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: passwordData.password })

    if (error) {
      toast.error('Error changing password', { description: error.message })
    } else {
      toast.success('Password changed successfully')
      setPasswordData({ password: '', confirmPassword: '' })
    }
    setLoading(false)
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Field Settings</h1>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="personal">Personal</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="display">Display</TabsTrigger>
        </TabsList>

        <TabsContent value="personal">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Update your operator details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" value={personalInfo.email} onChange={handlePersonalInfoChange} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <PhoneInput value={personalInfo.phone} onChange={handlePhoneChange} />
                <p className="text-sm text-muted-foreground">Select your country code and enter your phone number</p>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleUpdateProfile} disabled={loading}>
                {loading ? 'Updating...' : 'Update Profile'}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Security Settings</CardTitle>
              <CardDescription>Manage your account security</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Two-Factor Authentication</Label>
                  <p className="text-sm text-muted-foreground">Enhance your account security</p>
                </div>
                <Switch
                  checked={securitySettings.twoFactor}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactor: checked })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">New Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={passwordData.password}
                  onChange={handlePasswordChange}
                />
                {passwordErrors.password && (
                  <p className="text-sm text-red-500">{passwordErrors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                />
                {passwordErrors.confirmPassword && (
                  <p className="text-sm text-red-500">{passwordErrors.confirmPassword}</p>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleChangePassword} disabled={loading || !passwordData.password || !passwordData.confirmPassword}>
                Change Password
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
              <CardDescription>Manage how you receive alerts</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="email-notifications">Email Notifications</Label>
                <Switch
                  id="email-notifications"
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={() => handleNotificationChange('emailNotifications')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="push-notifications">Push Notifications</Label>
                <Switch
                  id="push-notifications"
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={() => handleNotificationChange('pushNotifications')}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="mission-alerts">Mission Alerts</Label>
                <Switch
                  id="mission-alerts"
                  checked={notificationSettings.missionAlerts}
                  onCheckedChange={() => handleNotificationChange('missionAlerts')}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="display">
          <Card>
            <CardHeader>
              <CardTitle>Display Settings</CardTitle>
              <CardDescription>Customize your viewing experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Theme</Label>
                <ModeToggle />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}