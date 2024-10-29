import React from 'react'

interface ContactElementProps {
	name: string;
	email: string;
}
export default function ContactElement({ name, email }: ContactElementProps) {
	return (
		<div className="flex flex-row items-center gap-2">
			<div className="w-16 h-16 bg-gray-200 rounded-full" />
			<div>
				<p className="font-bold">{name}</p>
				<p className="">{email}</p>
			</div>
		</div>
	)
}

