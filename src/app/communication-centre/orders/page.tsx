'use client'

import { useState } from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select'
import { Badge } from '@/components/ui/badge'
import {
    ArrowUpDown,
    ChevronDown,
    ChevronUp,
    Search
} from 'lucide-react'

type Order = {
    id: string
    type: 'incoming' | 'outgoing'
    item: string
    quantity: number
    price: number
    status: 'pending' | 'in-progress' | 'completed' | 'cancelled'
    date: string
    operator: string
}

const mockOrders: Order[] = [
    { id: '001', type: 'outgoing', item: 'Tactical Vest', quantity: 1, price: 199.99, status: 'completed', date: '2023-07-15', operator: 'Cpt. Sarah Johnson' },
    { id: '002', type: 'incoming', item: 'Night Vision Goggles', quantity: 2, price: 599.99, status: 'in-progress', date: '2023-07-18', operator: 'Lt. Mike Chen' },
    { id: '003', type: 'outgoing', item: 'Combat Boots', quantity: 1, price: 149.99, status: 'pending', date: '2023-07-20', operator: 'Sgt. Alex Rodriguez' },
    { id: '004', type: 'incoming', item: 'Tactical Gloves', quantity: 3, price: 89.97, status: 'completed', date: '2023-07-22', operator: 'Pvt. Emma Watson' },
    { id: '005', type: 'outgoing', item: 'Rifle Scope', quantity: 1, price: 349.99, status: 'in-progress', date: '2023-07-25', operator: 'Maj. Tom Hardy' },
]

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>(mockOrders)
    const [sortColumn, setSortColumn] = useState<keyof Order>('date')
    const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')
    const [filterType, setFilterType] = useState<'all' | 'incoming' | 'outgoing'>('all')
    const [searchTerm, setSearchTerm] = useState('')

    const sortOrders = (column: keyof Order) => {
        if (column === sortColumn) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
        } else {
            setSortColumn(column)
            setSortDirection('asc')
        }
    }

    const filteredAndSortedOrders = orders
        .filter(order => filterType === 'all' || order.type === filterType)
        .filter(order =>
            order.item.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.operator.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .sort((a, b) => {
            if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
            if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
            return 0
        })

    const statusColor = (status: Order['status']) => {
        switch (status) {
            case 'pending': return 'bg-yellow-500'
            case 'in-progress': return 'bg-blue-500'
            case 'completed': return 'bg-green-500'
            case 'cancelled': return 'bg-red-500'
            default: return 'bg-gray-500'
        }
    }

    return (
        <div className="space-y-6">
            <h1 className="text-3xl font-bold">Mission Logs</h1>

            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 sm:space-x-4">
                <div className="flex items-center space-x-2 w-full sm:w-auto">
                    <Input
                        placeholder="Search missions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-auto"
                    />
                    <Button size="icon">
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
                <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Filter by type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Missions</SelectItem>
                        <SelectItem value="incoming">Incoming</SelectItem>
                        <SelectItem value="outgoing">Outgoing</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">
                            <Button variant="ghost" onClick={() => sortOrders('type')}>
                                Type
                                {sortColumn === 'type' && (sortDirection === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />)}
                            </Button>
                        </TableHead>
                        <TableHead>
                            <Button variant="ghost" onClick={() => sortOrders('item')}>
                                Item
                                {sortColumn === 'item' && (sortDirection === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />)}
                            </Button>
                        </TableHead>
                        <TableHead className="text-right">Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>
                            <Button variant="ghost" onClick={() => sortOrders('date')}>
                                Date
                                {sortColumn === 'date' && (sortDirection === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />)}
                            </Button>
                        </TableHead>
                        <TableHead>Operator</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filteredAndSortedOrders.map((order) => (
                        <TableRow key={order.id}>
                            <TableCell>
                                <Badge variant={order.type === 'incoming' ? 'default' : 'secondary'}>
                                    {order.type === 'incoming' ? 'Incoming' : 'Outgoing'}
                                </Badge>
                            </TableCell>
                            <TableCell className="font-medium">{order.item}</TableCell>
                            <TableCell className="text-right">{order.quantity}</TableCell>
                            <TableCell className="text-right">${order.price.toFixed(2)}</TableCell>
                            <TableCell>
                                <Badge className={statusColor(order.status)}>
                                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                                </Badge>
                            </TableCell>
                            <TableCell>{order.date}</TableCell>
                            <TableCell>{order.operator}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}