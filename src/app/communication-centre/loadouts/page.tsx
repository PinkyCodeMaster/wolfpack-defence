'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Search,
  Shield,
  Crosshair,
  Eye,
  Radio,
  Headphones,
  Briefcase,
  PlusCircle,
  MinusCircle
} from 'lucide-react'

type LoadoutItem = {
  id: string
  name: string
  type: 'weapon' | 'armor' | 'gear'
  icon: React.ReactNode
}

type Loadout = {
  id: string
  name: string
  description: string
  items: LoadoutItem[]
  terrain: 'urban' | 'desert' | 'jungle' | 'arctic'
  mission: 'assault' | 'recon' | 'support'
}

const loadoutItems: LoadoutItem[] = [
  { id: 'w1', name: 'M4A1 Carbine', type: 'weapon', icon: <Crosshair className="h-4 w-4" /> },
  { id: 'w2', name: 'Glock 19', type: 'weapon', icon: <Crosshair className="h-4 w-4" /> },
  { id: 'a1', name: 'Kevlar Vest', type: 'armor', icon: <Shield className="h-4 w-4" /> },
  { id: 'a2', name: 'Ballistic Helmet', type: 'armor', icon: <Shield className="h-4 w-4" /> },
  { id: 'g1', name: 'Night Vision Goggles', type: 'gear', icon: <Eye className="h-4 w-4" /> },
  { id: 'g2', name: 'Tactical Radio', type: 'gear', icon: <Radio className="h-4 w-4" /> },
  { id: 'g3', name: 'First Aid Kit', type: 'gear', icon: <Briefcase className="h-4 w-4" /> },
  { id: 'g4', name: 'Tactical Headset', type: 'gear', icon: <Headphones className="h-4 w-4" /> },
]

const loadouts: Loadout[] = [
  {
    id: '1',
    name: 'Urban Assault',
    description: 'Optimized for close-quarters combat in urban environments',
    items: [loadoutItems[0], loadoutItems[1], loadoutItems[2], loadoutItems[3], loadoutItems[5], loadoutItems[6]],
    terrain: 'urban',
    mission: 'assault'
  },
  {
    id: '2',
    name: 'Desert Recon',
    description: 'Lightweight setup for long-range reconnaissance in arid conditions',
    items: [loadoutItems[0], loadoutItems[1], loadoutItems[2], loadoutItems[4], loadoutItems[5], loadoutItems[7]],
    terrain: 'desert',
    mission: 'recon'
  },
  {
    id: '3',
    name: 'Jungle Support',
    description: 'Versatile loadout for providing support in dense jungle terrain',
    items: [loadoutItems[0], loadoutItems[1], loadoutItems[2], loadoutItems[3], loadoutItems[4], loadoutItems[5], loadoutItems[6]],
    terrain: 'jungle',
    mission: 'support'
  },
  {
    id: '4',
    name: 'Arctic Assault',
    description: 'Heavy-duty setup for assault operations in extreme cold conditions',
    items: [loadoutItems[0], loadoutItems[1], loadoutItems[2], loadoutItems[3], loadoutItems[4], loadoutItems[5], loadoutItems[6], loadoutItems[7]],
    terrain: 'arctic',
    mission: 'assault'
  },
]

export default function LoadoutsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [terrainFilter, setTerrainFilter] = useState<'all' | 'urban' | 'desert' | 'jungle' | 'arctic'>('all')
  const [missionFilter, setMissionFilter] = useState<'all' | 'assault' | 'recon' | 'support'>('all')
  const [customLoadout, setCustomLoadout] = useState<LoadoutItem[]>([])

  const filteredLoadouts = loadouts.filter(loadout =>
    (terrainFilter === 'all' || loadout.terrain === terrainFilter) &&
    (missionFilter === 'all' || loadout.mission === missionFilter) &&
    (loadout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      loadout.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const addToCustomLoadout = (item: LoadoutItem) => {
    if (!customLoadout.find(i => i.id === item.id)) {
      setCustomLoadout([...customLoadout, item])
    }
  }

  const removeFromCustomLoadout = (item: LoadoutItem) => {
    setCustomLoadout(customLoadout.filter(i => i.id !== item.id))
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Tactical Loadouts</h1>

      <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <Input
            placeholder="Search loadouts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-auto"
          />
          <Button size="icon">
            <Search className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex space-x-2">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Select value={terrainFilter} onValueChange={(value: any) => setTerrainFilter(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Terrain" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Terrain</SelectItem>
              <SelectItem value="urban">Urban</SelectItem>
              <SelectItem value="desert">Desert</SelectItem>
              <SelectItem value="jungle">Jungle</SelectItem>
              <SelectItem value="arctic">Arctic</SelectItem>
            </SelectContent>
          </Select>
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <Select value={missionFilter} onValueChange={(value: any) => setMissionFilter(value)}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Mission" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Missions</SelectItem>
              <SelectItem value="assault">Assault</SelectItem>
              <SelectItem value="recon">Recon</SelectItem>
              <SelectItem value="support">Support</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="preset" className="w-full">
        <TabsList>
          <TabsTrigger value="preset">Preset Loadouts</TabsTrigger>
          <TabsTrigger value="custom">Custom Loadout</TabsTrigger>
        </TabsList>
        <TabsContent value="preset">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredLoadouts.map((loadout) => (
              <Card key={loadout.id}>
                <CardHeader>
                  <CardTitle>{loadout.name}</CardTitle>
                  <CardDescription>{loadout.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary">{loadout.terrain}</Badge>
                    <Badge variant="secondary">{loadout.mission}</Badge>
                  </div>
                  <ul className="mt-4 space-y-2">
                    {loadout.items.map((item) => (
                      <li key={item.id} className="flex items-center space-x-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={() => setCustomLoadout(loadout.items)}>
                    Use as Base for Custom Loadout
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="custom">
          <Card>
            <CardHeader>
              <CardTitle>Custom Loadout</CardTitle>
              <CardDescription>Build your own tactical loadout</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-semibold mb-2">Available Items</h3>
                  <ul className="space-y-2">
                    {loadoutItems.map((item) => (
                      <li key={item.id} className="flex items-center justify-between">
                        <span className="flex items-center space-x-2">
                          {item.icon}
                          <span>{item.name}</span>
                        </span>
                        <Button size="sm" variant="ghost" onClick={() => addToCustomLoadout(item)}>
                          <PlusCircle className="h-4 w-4" />
                        </Button>
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Your Custom Loadout</h3>
                  {customLoadout.length === 0 ? (
                    <p className="text-muted-foreground">Add items to your loadout</p>
                  ) : (
                    <ul className="space-y-2">
                      {customLoadout.map((item) => (
                        <li key={item.id} className="flex items-center justify-between">
                          <span className="flex items-center space-x-2">
                            {item.icon}
                            <span>{item.name}</span>
                          </span>
                          <Button size="sm" variant="ghost" onClick={() => removeFromCustomLoadout(item)}>
                            <MinusCircle className="h-4 w-4" />
                          </Button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Save Custom Loadout</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}