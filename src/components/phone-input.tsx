import React, { useState, useEffect } from 'react'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Input } from '@/components/ui/input'

const countryCodes = [
    { code: '+1', country: 'US' },
    { code: '+44', country: 'UK' },
    { code: '+61', country: 'AU' },
    { code: '+33', country: 'FR' },
    { code: '+49', country: 'DE' },
    // Add more country codes as needed
]

interface PhoneInputProps {
    value: string
    onChange: (value: string) => void
}

export function PhoneInput({ value, onChange }: PhoneInputProps) {
    const [countryCode, setCountryCode] = useState('+1')
    const [phoneNumber, setPhoneNumber] = useState('')

    useEffect(() => {
        const parsePhoneNumber = (input: string) => {
            for (const { code } of countryCodes) {
                if (input.startsWith(code)) {
                    setCountryCode(code)
                    setPhoneNumber(input.slice(code.length).trim())
                    return
                }
            }
            // If no matching country code is found, default to +1
            setCountryCode('+1')
            setPhoneNumber(input.replace(/^\+/, '').trim())
        }

        parsePhoneNumber(value)
    }, [value])

    const handleCountryCodeChange = (newCode: string) => {
        setCountryCode(newCode)
        onChange(`${newCode}${phoneNumber}`)
    }

    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newNumber = e.target.value.replace(/\D/g, '')
        setPhoneNumber(newNumber)
        onChange(`${countryCode}${newNumber}`)
    }

    return (
        <div className="flex space-x-2">
            <Select value={countryCode} onValueChange={handleCountryCodeChange}>
                <SelectTrigger className="w-[120px]">
                    <SelectValue placeholder="Code" />
                </SelectTrigger>
                <SelectContent>
                    {countryCodes.map((country) => (
                        <SelectItem key={country.code} value={country.code}>
                            {country.code} ({country.country})
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                placeholder="Phone number"
                className="flex-1"
            />
        </div>
    )
}