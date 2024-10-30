import React from 'react'
import { ContactForm } from './form'
import { Card } from '@/components/ui/card'

export default function page() {
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-2">
      <h1 className="text-3xl font-bold">Contatti</h1>
      <Card className="p-4">
        <ContactForm />
      </Card>
    </div>
  )
}

