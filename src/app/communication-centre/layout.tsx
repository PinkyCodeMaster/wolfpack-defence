import Link from 'next/link'
import { SiteHeader } from '@/components/layout/site-header'
import { Button } from '@/components/ui/button'
import { 
  User, 
  ShoppingBag, 
  Medal, 
  Crosshair,
  MessageSquare,
  Settings
} from 'lucide-react'

export default function CommunicationCentreLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <SiteHeader />
      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="flex flex-col md:flex-row gap-8">
          <aside className="w-full md:w-64 space-y-4">
            <nav className="space-y-2">
              <Link href="/communication-centre">
                <Button variant="ghost" className="w-full justify-start">
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Command Center
                </Button>
              </Link>
              <Link href="/communication-centre/profile">
                <Button variant="ghost" className="w-full justify-start">
                  <User className="mr-2 h-4 w-4" />
                  Operator Profile
                </Button>
              </Link>
              <Link href="/communication-centre/orders">
                <Button variant="ghost" className="w-full justify-start">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Mission Logs
                </Button>
              </Link>
              <Link href="/communication-centre/badges">
                <Button variant="ghost" className="w-full justify-start">
                  <Medal className="mr-2 h-4 w-4" />
                  Commendations
                </Button>
              </Link>
              <Link href="/communication-centre/loadouts">
                <Button variant="ghost" className="w-full justify-start">
                  <Crosshair className="mr-2 h-4 w-4" />
                  Loadouts
                </Button>
              </Link>
              <Link href="/communication-centre/settings">
                <Button variant="ghost" className="w-full justify-start">
                  <Settings className="mr-2 h-4 w-4" />
                  Field Settings
                </Button>
              </Link>
            </nav>
          </aside>
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}