import React from 'react'

interface ContactElementProps {
	name: string;
	location: string;
}
export default function ContactElement({ name, location }: ContactElementProps) {
	return (
		<div className="flex flex-row items-center gap-2">
			<div>
				<p className="font-bold">{name}</p>
				<p className="">{location}</p>
			</div>
		</div>
	)
}

