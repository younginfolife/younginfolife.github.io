import React from 'react'
import { ContactForm } from './form'
import { Card } from '@/components/ui/card'
import { notFound } from 'next/navigation'

export default function page() {
  // TODO: remove this redirection in the next deployment of this site.
  notFound();
  return (
    <div className="max-w-3xl mx-auto p-4 space-y-2">
      <h1 className="text-3xl font-bold">Contatti</h1>
      <Card className="p-4">
        <ContactForm />
      </Card>
    </div>
  )
}


