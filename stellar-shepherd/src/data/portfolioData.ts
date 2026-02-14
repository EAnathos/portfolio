import type { ImageMetadata } from 'astro';
import contribotImage from '../assets/projects/contribot.png';
import babyfootImage from '../assets/projects/babyfoot-lottery.png';
import robotFrameworkIcon from '../assets/icons/robot-framework.svg?raw';
import photoGearBodyIcon from '../assets/icons/photo-gear-body.svg?raw';
import photoGearLensIcon from '../assets/icons/photo-gear-lens.svg?raw';
import photoGearFlashIcon from '../assets/icons/photo-gear-flash.svg?raw';

export type SkillItem = {
	name: string;
	icon?: string;
	iconSvg?: string;
	url?: string;
};

export type SkillGroup = {
	title: string;
	items: SkillItem[];
};

export type ProjectLink = {
	type: 'github' | 'web';
	url: string;
};

export type Project = {
	title: string;
	description: string;
	image?: ImageMetadata;
	emoji?: string;
	links?: ProjectLink[];
	tags: string[];
};

export type PhotoGearItem = {
	label: string;
	name: string;
	url: string;
	iconSvg: string;
};

export const skillGroups: SkillGroup[] = [
	{
		title: 'Langages',
		items: [
			{ name: 'TypeScript', icon: 'devicon-typescript-plain', url: 'https://www.typescriptlang.org/' },
			{ name: 'JavaScript', icon: 'devicon-javascript-plain', url: 'https://developer.mozilla.org/docs/Web/JavaScript' },
			{ name: 'Python', icon: 'devicon-python-plain', url: 'https://www.python.org/' },
			{ name: 'Java', icon: 'devicon-java-plain', url: 'https://www.java.com/' }
		]
	},
	{
		title: 'Web & Frameworks',
		items: [
			{ name: 'Astro', icon: 'devicon-astro-plain', url: 'https://astro.build/' },
			{ name: 'React', icon: 'devicon-react-original', url: 'https://react.dev/' },
			{ name: 'Vue.js', icon: 'devicon-vuejs-plain', url: 'https://vuejs.org/' },
			{ name: 'Node.js', icon: 'devicon-nodejs-plain', url: 'https://nodejs.org/' },
			{ name: 'Tailwind CSS', icon: 'devicon-tailwindcss-plain', url: 'https://tailwindcss.com/' }
		]
	},
	{
		title: 'Bases de donnees',
		items: [
			{ name: 'MySQL', icon: 'devicon-mysql-plain', url: 'https://www.mysql.com/' },
			{ name: 'PostgreSQL', icon: 'devicon-postgresql-plain', url: 'https://www.postgresql.org/' },
			{ name: 'MongoDB', icon: 'devicon-mongodb-plain', url: 'https://www.mongodb.com/' },
			{ name: 'Prisma', icon: 'devicon-prisma-plain', url: 'https://www.prisma.io/' }
		]
	},
	{
		title: 'Testing & CI/CD',
		items: [
			{ name: 'Jest', icon: 'devicon-jest-plain', url: 'https://jestjs.io/' },
			{ name: 'Selenium', icon: 'devicon-selenium-original', url: 'https://www.selenium.dev/' },
			{ name: 'Playwright', icon: 'devicon-playwright-plain', url: 'https://playwright.dev/' },
			{ name: 'Postman', icon: 'devicon-postman-plain', url: 'https://www.postman.com/' },
			{
				name: 'Robot Framework',
				url: 'https://robotframework.org/',
				iconSvg: robotFrameworkIcon
			},
			{ name: 'GitHub Actions', icon: 'devicon-githubactions-plain', url: 'https://github.com/features/actions' },
			{ name: 'Docker', icon: 'devicon-docker-plain', url: 'https://www.docker.com/' }
		]
	},
	{
		title: 'Outils',
		items: [
			{ name: 'Git', icon: 'devicon-git-plain', url: 'https://git-scm.com/' },
			{ name: 'Figma', icon: 'devicon-figma-plain', url: 'https://www.figma.com/' },
			{ name: 'Notion', icon: 'devicon-notion-plain', url: 'https://www.notion.so/' },
			{ name: 'Obsidian', icon: 'devicon-markdown-original', url: 'https://obsidian.md/' },
			{ name: 'Termius', icon: 'devicon-ssh-plain', url: 'https://termius.com/' }
		]
	}
];

export const projects: Project[] = [
	{
		title: 'ContriBot',
		description:
			'Bot Discord pour animer une communaute, avec systeme de recompenses et tableau de bord admin.',
		image: contribotImage,
		links: [{ type: 'github', url: 'https://github.com/ContriBot-Discord' }],
		tags: ['Node.js', 'Discord.js', 'MongoDB']
	},
	{
		title: 'Ant-ID Training',
		description:
			"Plateforme d entrainement pour identifier les especes de fourmis, avec parcours progressifs.",
		emoji: '🐜',
		links: [
			{ type: 'web', url: 'https://ant-id-training.anathos.me/' },
			{ type: 'github', url: 'https://github.com/EAnathos/ant-id-training' }
		],
		tags: ['Astro', 'TypeScript', 'Tailwind CSS']
	},
	{
		title: 'BabyFoot Lottery',
		description:
			'Une roulette interactive qui ajoute des effets surprises a chaque tour pour pimenter les parties de babyfoot.',
		image: babyfootImage,
		links: [
			{ type: 'web', url: 'https://babyfoot-lottery.anathos.me/' },
			{ type: 'github', url: 'https://github.com/EAnathos/BabyFoot-Lottery' }
		],
		tags: ['JavaScript', 'HTML', 'CSS']
	}
];

export const photoGear: PhotoGearItem[] = [
	{
		label: 'Boitier',
		name: 'Olympus OM-D E-M5 Mark II',
		url: 'https://www.olympus-global.com/technology/design/product/omd_em5_mk2.html',
		iconSvg: photoGearBodyIcon
	},
	{
		label: 'Objectif',
		name: 'Olympus M. Zuiko 60mm F2.8 Macro',
		url: 'https://explore.omsystem.com/fr/fr/m-zuiko-ed-60mm-f2-8-macro',
		iconSvg: photoGearLensIcon
	},
	{
		label: 'Flash',
		name: 'Godox V350-O + Diffuseur',
		url: 'https://www.godox.com/product-d/V350.html',
		iconSvg: photoGearFlashIcon
	}
];
