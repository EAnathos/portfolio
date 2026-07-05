export type Lang = 'fr' | 'en';

export const translations = {
	fr: {
		lang: 'fr' as const,
		nav: {
			about: 'À propos',
			skills: 'Compétences',
			projects: 'Projets',
			photography: 'Photographie',
			contact: 'Contact',
			home: 'Accueil',
			macro: 'Macrophotographie',
			other: 'Autres',
		},
		hero: {
			greeting: 'Hello, je suis',
			subtitle:
				"Étudiant en Master Développement Full Stack, je conçois des expériences web solides. À côté de mes études, je fais aussi de la macrophotographie.",
			cta_projects: 'Voir mes projets',
			cta_cv: 'Télécharger mon CV',
			cv_unavailable: 'Je ne suis pas en recherche pour le moment.',
		},
		about: {
			label: 'À propos',
			title: 'Une approche simple, mais exigeante.',
			p1: "Je construis des produits web efficaces, pensés pour durer. J'aime travailler en équipe avec tous les profils afin de transformer une idée en interface lisible, rapide et accessible.",
			p2: "Côté photo, ma passion pour les fourmis m'a conduit à passer l'oeil dans l'objectif pour capturer des moments authentiques de ce qu'on oublie parfois de regarder.",
		},
		skills: {
			label: 'Compétences',
			title: 'Stack technique.',
			evolving: 'En constante évolution.',
			groups: {
				languages: 'Langages',
				web: 'Web & Frameworks',
				databases: 'Bases de données',
				testing: 'Testing & CI/CD',
				tools: 'Outils',
			},
		},
		projects: {
			label: 'Projets',
			title: 'Quelques réalisations.',
			descriptions: {
				contribot:
					'Bot Discord pour animer une communauté, avec système de récompenses et tableau de bord admin.',
				antid:
					"Plateforme d'entraînement pour identifier les espèces de fourmis, avec parcours progressifs.",
				puzzle:
					'Puzzle collaboratif multijoueur en temps réel : on rejoint une partie avec un code, sans compte, et on assemble les pièces ensemble.',
			},
		},
		photo: {
			label: 'Photographie animalière',
			title: 'Un regard sur les détails.',
			subtitle: "Découvre ma sélection d'images macro, mes séries et les stories associées.",
			cta_portfolio: 'Voir le portfolio photo',
			universe_label: 'Univers',
			universe_text:
				'Mon travail se concentre surtout sur des arthropodes dans leur environnement naturel, avec une spécialisation en macrophotographie.',
			gear_label: 'Matériel',
			gear_body: 'Boîtier',
			gear_lens: 'Objectif',
			gear_flash: 'Flash',
			click_enlarge: 'Cliquer pour agrandir',
			open_sr: 'Ouvrir la photo en grand',
			dialog_label: 'Photographie animalière',
			close: 'Fermer',
		},
		contact: {
			label: 'Contact',
			title: 'Parlons de ton projet.',
			subtitle: 'Pour un projet web, une collaboration ou une question, je réponds rapidement.',
			email_label: 'Email',
			subject_label: 'Sujet',
			subject_placeholder: 'Collaboration',
			message_label: 'Message',
			message_placeholder: 'Ton message',
			submit: 'Envoyer',
			sending: 'Envoi en cours…',
			success: 'Message envoyé. Je reviens vers toi rapidement.',
			error: "Impossible d'envoyer le message pour le moment.",
		},
		footer: {
			rights: '© 2026 EAnathos. Tous droits réservés.',
		},
		photography_page: {
			title: 'EAnathos | Photographie',
			description:
				'Portfolio photographique de EAnathos, organisé entre macrophotographie et autres prises de vue.',
			label: 'Portfolio photographique',
			heading: 'Le détail du vivant, en macrophotographie et au-delà.',
			intro:
				'Cette page rassemble mes images par univers. Les noms affichés reprennent le taxon de chaque sujet, dans une présentation simple et cohérente avec le reste du site.',
			stat_images: 'Images',
			stat_macro: 'Macrophotographies',
			stat_species: 'Espèces',
			contact_heading: 'Intéressé(e) par une image ?',
			contact_text:
				"Pour toute demande d'utilisation ou collaboration, contactez-moi directement.",
			contact_cta: 'Me contacter',
		},
	},
	en: {
		lang: 'en' as const,
		nav: {
			about: 'About',
			skills: 'Skills',
			projects: 'Projects',
			photography: 'Photography',
			contact: 'Contact',
			home: 'Home',
			macro: 'Macrophotography',
			other: 'Others',
		},
		hero: {
			greeting: "Hi, I'm",
			subtitle:
				"Master's student in Full Stack Development, I craft solid web experiences. Alongside my studies, I also do macrophotography.",
			cta_projects: 'View my projects',
			cta_cv: 'Download my CV',
			cv_unavailable: 'I am not looking for a job at the moment.',
		},
		about: {
			label: 'About',
			title: 'A simple, yet demanding approach.',
			p1: 'I build efficient web products built to last. I enjoy working with cross-functional teams to turn ideas into readable, fast, and accessible interfaces.',
			p2: "On the photography side, my passion for ants led me to look through the lens and capture authentic moments of what we sometimes forget to notice.",
		},
		skills: {
			label: 'Skills',
			title: 'Tech stack.',
			evolving: 'Always evolving.',
			groups: {
				languages: 'Languages',
				web: 'Web & Frameworks',
				databases: 'Databases',
				testing: 'Testing & CI/CD',
				tools: 'Tools',
			},
		},
		projects: {
			label: 'Projects',
			title: 'Some of my work.',
			descriptions: {
				contribot:
					'Discord bot to engage a community, with a rewards system and an admin dashboard.',
				antid: 'Training platform to identify ant species, with progressive learning paths.',
				puzzle:
					'A real-time collaborative multiplayer puzzle: join a game with a code, no account needed, and assemble the pieces together.',
			},
		},
		photo: {
			label: 'Wildlife photography',
			title: 'A focus on details.',
			subtitle: 'Explore my macro image selection, series, and associated stories.',
			cta_portfolio: 'View photo portfolio',
			universe_label: 'Universe',
			universe_text:
				'My work focuses mostly on arthropods in their natural environment, with a specialization in macrophotography.',
			gear_label: 'Gear',
			gear_body: 'Body',
			gear_lens: 'Lens',
			gear_flash: 'Flash',
			click_enlarge: 'Click to enlarge',
			open_sr: 'Open photo in full size',
			dialog_label: 'Wildlife photography',
			close: 'Close',
		},
		contact: {
			label: 'Contact',
			title: "Let's talk about your project.",
			subtitle: 'For a web project, a collaboration, or a question, I reply quickly.',
			email_label: 'Email',
			subject_label: 'Subject',
			subject_placeholder: 'Collaboration',
			message_label: 'Message',
			message_placeholder: 'Your message',
			submit: 'Send',
			sending: 'Sending…',
			success: 'Message sent. I will get back to you shortly.',
			error: 'Unable to send the message right now.',
		},
		footer: {
			rights: '© 2026 EAnathos. All rights reserved.',
		},
		photography_page: {
			title: 'EAnathos | Photography',
			description:
				"EAnathos's photography portfolio, organized between macrophotography and other shots.",
			label: 'Photography portfolio',
			heading: 'The detail of life, in macro and beyond.',
			intro:
				'This page gathers my images by universe. The names shown use the taxon of each subject, in a simple presentation consistent with the rest of the site.',
			stat_images: 'Images',
			stat_macro: 'Macrophotographs',
			stat_species: 'Species',
			contact_heading: 'Interested in an image?',
			contact_text: 'For any usage request or collaboration, contact me directly.',
			contact_cta: 'Contact me',
		},
	},
} as const;

export type Translations = (typeof translations)['fr'];

export function getTranslations(lang: Lang): Translations {
	return translations[lang] as Translations;
}
