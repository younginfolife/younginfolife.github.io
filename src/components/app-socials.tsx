import { SiFacebook, SiGithub, SiLinkedin, SiTelegram, SiX, SiYoutube } from '@icons-pack/react-simple-icons';
import React, { ReactElement } from 'react'
import { Card } from './ui/card';

interface SocialNetwork {
	name: string;
	url: string;
	icon: ReactElement
}

const allSocials: SocialNetwork[] = [
	{
		url: "https://twitter.com/young_infolife",
		name: "X | Twitter", icon: <SiX />
	},
	{
		url: "https://www.facebook.com/y.infolife",
		name: "Facebook", icon: <SiFacebook />
	},
	{
		url: "https://github.com/younginfolife",
		name: "GitHub", icon: <SiGithub />,
	},
	{
		url: "https://t.me/younginfolife",
		name: "Telegram", icon: <SiTelegram />,
	},
	{
		url: "https://www.linkedin.com/in/young-infolife-522834272/",
		name: "LinkedIn", icon: <SiLinkedin />,
	},
	{
		url: "https://www.youtube.com/@younginfolife",
		name: "YouTube", icon: <SiYoutube />,
	},
]

export default function AppSocials() {
	return (
		<Card>
			<ul className="flex gap-2 justify-evenly">
				{allSocials.map((social, index) =>
					<a href={social.url} key={index} >
						<div className="flex flex-row gap-2">
							<span>{social.icon}</span>
						</div>
					</a>
				)}
			</ul>
		</Card>
	)
}

