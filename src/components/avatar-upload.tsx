'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { downloadAvatarImage, uploadAvatar } from '@/utils/avatarService'
import { Loader2, Upload, User } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Label } from "@/components/ui/label"
import { toast } from 'sonner'

export default function AvatarUpload({
  uid,
  url,
  onUpload,
}: {
  uid: string | null
  url: string | null
  onUpload: (url: string) => void
}) {
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url)
  const [uploading, setUploading] = useState(false)

  useEffect(() => {
    if (url) {
      (async () => {
        const downloadedUrl = await downloadAvatarImage(url)
        if (downloadedUrl) setAvatarUrl(downloadedUrl)
      })()
    }
  }, [url])

  const handleAvatarUpload: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true)

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.')
      }

      const file = event.target.files[0]
      const filePath = await uploadAvatar(uid, file)

      onUpload(filePath)
      toast.success('Operator avatar updated', {
        description: 'Your new avatar has been successfully uploaded.',
      })
    } catch (error) {
      console.error('Error uploading avatar: ', error)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="h-32 w-32">
        <AvatarImage src={avatarUrl || undefined} alt="Operator Avatar" />
        <AvatarFallback>
          <User className="h-16 w-16 text-muted-foreground" />
        </AvatarFallback>
      </Avatar>
      <div className="flex flex-col items-center">
        <Label htmlFor="avatar-upload" className="cursor-pointer">
          <div className="flex items-center space-x-2">
            {uploading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Upload className="h-4 w-4" />
            )}
            <span>{uploading ? 'Uploading...' : 'Upload New Avatar'}</span>
          </div>
        </Label>
        <input
          id="avatar-upload"
          type="file"
          accept="image/*"
          onChange={handleAvatarUpload}
          disabled={uploading}
          className="sr-only"
          aria-label="Upload new avatar"
        />
      </div>
    </div>
  )
}
