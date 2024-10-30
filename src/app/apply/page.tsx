import { Card } from '@/components/ui/card';
import React from 'react'

const page = () => {
  return (
    <div className="max-w-3xl mx-auto p-2 prose">
      <section className="not-prose">
        <Card className="p-4 prose mx-auto">
          <h2 className="text-2xl font-bold">Iscriviti a Young InfoLife</h2>
          <p>
            Ecco il link per l'iscrizione.
          </p>
        </Card>
      </section>
      <h2>
        Le nostre attività
      </h2>
      <p>
        Cosa potresti fare...
      </p>
    </div>
  )
}

export default page;
