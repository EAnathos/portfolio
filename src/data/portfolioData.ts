import type { ImageMetadata } from 'astro';
import contribotImage from '../assets/projects/contribot.png';
import robotFrameworkIcon from '../assets/icons/robot-framework.svg?raw';
import claudeIcon from '../assets/icons/claude.svg?raw';
import antIdTrainingLogo from '../assets/projects/ant-id-training.svg?raw';
import puzzleMultiplayerLogo from '../assets/projects/puzzle-multiplayer.svg?raw';
import seleniumScreenshotLogo from '../assets/projects/selenium-screenshot-compare.svg?raw';
import scholarWatcherLogo from '../assets/projects/scholar-watcher.svg?raw';
import fangleafLogo from '../assets/projects/fangleaf.svg?raw';
import fangleafPreview from '../assets/projects/previews/fangleaf.jpg';
import antIdTrainingPreview from '../assets/projects/previews/ant-id-training.jpg';
import puzzleMultiplayerPreview from '../assets/projects/previews/puzzle-multiplayer.jpg';
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

/**
 * What the project card shows: a real capture framed in a browser window
 * (scrolls on hover when taller than the frame), or a hand-built HTML mock
 * for projects without a web UI (CLI tools, Discord bots).
 */
export type ProjectPreview =
	| { kind: 'screenshot'; image: ImageMetadata; url: string }
	| { kind: 'compare' }
	| { kind: 'discord'; variant: 'scholar' | 'contribot' };

export type Project = {
	title: string;
	description: string;
	image?: ImageMetadata;
	imageSvg?: string;
	emoji?: string;
	preview?: ProjectPreview;
	links?: ProjectLink[];
	tags: SkillItem[];
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
			{ name: 'Vite', icon: 'devicon-vitejs-plain', url: 'https://vite.dev/' },
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
			{ name: 'Prisma', icon: 'devicon-prisma-plain', url: 'https://www.prisma.io/' },
			{ name: 'Drizzle', icon: 'devicon-drizzle-plain', url: 'https://orm.drizzle.team/' },
			{ name: 'Supabase', icon: 'devicon-supabase-plain', url: 'https://supabase.com/' }
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
			{ name: 'Termius', icon: 'devicon-ssh-plain', url: 'https://termius.com/' },
			{ name: 'Claude', iconSvg: claudeIcon, url: 'https://claude.ai/' }
		]
	}
];

export const projects: Project[] = [
	{
		title: 'FangLeaf',
		description:
			'Jeu coop en ligne dans le navigateur : chasse, apprivoise et fais evoluer ta meute de monstres, a 4 joueurs par village.',
		imageSvg: fangleafLogo,
		preview: { kind: 'screenshot', image: fangleafPreview, url: 'fangleaf.anathos.me' },
		links: [
			{ type: 'web', url: 'https://fangleaf.anathos.me/' },
			{ type: 'github', url: 'https://github.com/EAnathos/Fangleaf' }
		],
		tags: [
			{ name: 'TypeScript', icon: 'devicon-typescript-plain' },
			{ name: 'Node.js', icon: 'devicon-nodejs-plain' },
			{ name: 'Vite', icon: 'devicon-vitejs-plain' },
			{ name: 'Supabase', icon: 'devicon-supabase-plain' },
			{ name: 'WebSocket' },
			{ name: 'Canvas 2D' }
		]
	},
	{
		title: 'Ant-ID Training',
		description:
			"Plateforme d entrainement pour identifier les especes de fourmis, avec parcours progressifs.",
		imageSvg: antIdTrainingLogo,
		preview: { kind: 'screenshot', image: antIdTrainingPreview, url: 'ant-id-training.anathos.me' },
		links: [
			{ type: 'web', url: 'https://ant-id-training.anathos.me/' },
			{ type: 'github', url: 'https://github.com/EAnathos/antIdTraining' }
		],
		tags: [
			{ name: 'React', icon: 'devicon-react-original' },
			{ name: 'Node.js', icon: 'devicon-nodejs-plain' },
			{ name: 'Express', icon: 'devicon-express-original' },
			{ name: 'Prisma', icon: 'devicon-prisma-plain' },
			{ name: 'TypeScript', icon: 'devicon-typescript-plain' }
		]
	},
	{
		title: 'Puzzle Multiplayer',
		description:
			'Puzzle collaboratif multijoueur en temps reel : on rejoint une partie avec un code, sans compte, et on assemble les pieces ensemble.',
		imageSvg: puzzleMultiplayerLogo,
		preview: { kind: 'screenshot', image: puzzleMultiplayerPreview, url: 'puzzle-multiplayer.anathos.me' },
		links: [
			{ type: 'web', url: 'https://puzzle-multiplayer.anathos.me/' },
			{ type: 'github', url: 'https://github.com/EAnathos/puzzle-multiplayer' }
		],
		tags: [
			{ name: 'React', icon: 'devicon-react-original' },
			{ name: 'TypeScript', icon: 'devicon-typescript-plain' },
			{ name: 'Socket.IO', icon: 'devicon-socketio-original' },
			{ name: 'Node.js', icon: 'devicon-nodejs-plain' }
		]
	},
	{
		title: 'Selenium Screenshot Compare',
		description:
			"Outil de regression visuelle : compare le rendu d'un site entre deux versions de Firefox via des scenarios de navigation Selenium.",
		imageSvg: seleniumScreenshotLogo,
		preview: { kind: 'compare' },
		links: [
			{ type: 'web', url: 'https://pypi.org/project/selenium-screenshot-compare/' },
			{ type: 'github', url: 'https://github.com/EAnathos/selenium-screenshot-compare' }
		],
		tags: [
			{ name: 'Python', icon: 'devicon-python-plain' },
			{ name: 'Selenium', icon: 'devicon-selenium-original' },
			{ name: 'Robot Framework', iconSvg: robotFrameworkIcon }
		]
	},
	{
		title: 'Scholar Watcher',
		description:
			'Bot Discord de veille bibliographique automatisee : surveille Google Scholar et AntCat pour notifier les nouvelles publications.',
		imageSvg: scholarWatcherLogo,
		preview: { kind: 'discord', variant: 'scholar' },
		links: [{ type: 'github', url: 'https://github.com/EAnathos/scholarWatcherForDiscord' }],
		tags: [
			{ name: 'TypeScript', icon: 'devicon-typescript-plain' },
			{ name: 'Discord.js' },
			{ name: 'Prisma', icon: 'devicon-prisma-plain' },
			{ name: 'Docker', icon: 'devicon-docker-plain' }
		]
	},
	{
		title: 'ContriBot',
		description:
			'Bot Discord pour animer une communaute, avec systeme de recompenses et tableau de bord admin.',
		image: contribotImage,
		preview: { kind: 'discord', variant: 'contribot' },
		links: [{ type: 'github', url: 'https://github.com/ContriBot-Discord' }],
		tags: [
			{ name: 'Node.js', icon: 'devicon-nodejs-plain' },
			{ name: 'Discord.js' },
			{ name: 'MongoDB', icon: 'devicon-mongodb-plain' }
		]
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

export function getLocalizedSkillGroups(
	groupLabels: Record<'languages' | 'web' | 'databases' | 'testing' | 'tools', string>
): SkillGroup[] {
	const keys: Array<keyof typeof groupLabels> = ['languages', 'web', 'databases', 'testing', 'tools'];
	return skillGroups.map((group, i) => ({ ...group, title: groupLabels[keys[i]] }));
}

export function getLocalizedGear(labels: { body: string; lens: string; flash: string }): PhotoGearItem[] {
	return [
		{ ...photoGear[0], label: labels.body },
		{ ...photoGear[1], label: labels.lens },
		{ ...photoGear[2], label: labels.flash },
	];
}

export function getLocalizedProjects(
	descriptions: Record<'fangleaf' | 'antid' | 'puzzle' | 'seleniumScreenshot' | 'scholarWatcher' | 'contribot', string>
): Project[] {
	return [
		{ ...projects[0], description: descriptions.fangleaf },
		{ ...projects[1], description: descriptions.antid },
		{ ...projects[2], description: descriptions.puzzle },
		{ ...projects[3], description: descriptions.seleniumScreenshot },
		{ ...projects[4], description: descriptions.scholarWatcher },
		{ ...projects[5], description: descriptions.contribot },
	];
}
