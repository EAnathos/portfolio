import type { ImageMetadata } from 'astro';

export type PhotographyCollectionId = 'macrophotography' | 'other';

/** A value that can be a single string or per-language variants. */
export type Localized = string | { fr: string; en: string };

/** Resolve a {@link Localized} value for the active language. */
export function localize(value: Localized | undefined, lang: 'fr' | 'en'): string | undefined {
	if (value == null) return undefined;
	if (typeof value === 'string') return value;
	return value[lang] ?? value.fr ?? value.en;
}

/**
 * Optional, per-image scientific metadata.
 *
 * Everything here is optional and rendered only when present, so the UI
 * degrades gracefully while the catalogue is filled in over time. Nothing is
 * invented: add real values (collection locations, capture settings,
 * taxonomic authority, observation links) as they become available.
 *
 * Keyed by the normalized taxon/title derived from the file name — see
 * `photographyMeta` below for the shape and an example entry.
 */
export type PhotographyMeta = {
	/** Taxonomic authority, e.g. "Latreille, 1812". */
	authority?: string;
	/** Common name, shown as a secondary label. */
	common?: Localized;
	/** Observation location. */
	location?: Localized;
	/** A short note on the species' biology. */
	biology?: Localized;
	/** iNaturalist observation URL. */
	inaturalist?: string;
	/** Instagram post URL. */
	instagram?: string;
	/** Scientific reference URL. */
	reference?: string;
	/** Promote to a larger card / eligible as the focus-stacking hero. */
	featured?: boolean;
};

export type PhotographyItem = {
	title: string;
	alt: string;
	collection: PhotographyCollectionId;
	dialogId: string;
	index: number;
	image: ImageMetadata;
	/** width / height of the source file — drives content-aware masonry sizing. */
	aspectRatio: number;
	meta: PhotographyMeta;
};

export type PhotographyCollection = {
	id: PhotographyCollectionId;
	items: PhotographyItem[];
};

/**
 * Real, verifiable metadata only. Left mostly empty on purpose — extend it
 * as observations are documented. Keys are the normalized taxon (matching the
 * title derived from the file name).
 *
 * Example of the full shape:
 *   'Formica lugubris': {
 *     authority: 'Zetterstedt, 1838',
 *     common: { fr: '…', en: '…' },
 *     location: { fr: '…', en: '…' },
 *     biology: { fr: '…', en: '…' },
 *     inaturalist: 'https://www.inaturalist.org/observations/…',
 *   },
 */
const photographyMeta: Record<string, PhotographyMeta> = {
	// Authorities follow GBIF. Locations and iNaturalist links are only set when
	// the photo matches a documented observation.
	'Allothrombium sp.': {
		authority: 'Berlese, 1903',
		common: { fr: 'Rouget / trombidion', en: 'Velvet mite' },
		location: {
			fr: 'Dans un sous-bois, sur une feuille',
			en: 'In woodland undergrowth, on a leaf'
		},
		biology: {
			fr: "Les Allothrombium sont des acariens de la famille des Trombidiidae. Les adultes, d'un rouge vif, chassent au sol de petits arthropodes et leurs œufs, tandis que les larves vivent en ectoparasites d'insectes. On les observe surtout au printemps, après les pluies.",
			en: 'Allothrombium are "velvet" mites of the family Trombidiidae. The bright red adults hunt small arthropods and their eggs on the ground, while the larvae live as ectoparasites of insects. They are seen mostly in spring, after the rains.'
		},
		inaturalist: 'https://www.inaturalist.org/observations/342122697',
		featured: true
	},
	'Cataglyphis sp. gr. bicolor': {
		common: { fr: 'Fourmi du désert', en: 'Desert ant' },
		location: { fr: 'Djerba, Tunisie', en: 'Djerba, Tunisia' },
		biology: {
			fr: "Les Cataglyphis sont des fourmis des milieux arides, actives aux heures les plus chaudes, quand leurs prédateurs se mettent à l'abri. Leurs longues pattes les tiennent à distance du sol brûlant. Elles fourragent seules, à la recherche d'insectes morts de chaleur, et retrouvent leur nid grâce à la position du soleil et au comptage de leurs pas.",
			en: 'Cataglyphis are ants of arid habitats, active during the hottest hours, when their predators take shelter. Their long legs keep them away from the scorching ground. They forage alone for insects killed by the heat and find their way home using the position of the sun and by counting their steps.'
		},
		inaturalist: 'https://www.inaturalist.org/observations/330936676'
	},
	'Cristarmadillidium muricatum': {
		authority: '(Budde-Lund, 1885)',
		common: { fr: 'Cloporte', en: 'Woodlouse' },
		biology: {
			fr: "Cloporte terrestre de la famille des Armadillidiidae, comme le cloporte commun. Il peut se rouler en boule pour se protéger. Sa carapace porte des rangées de tubercules, d'où son nom (muricatum : hérissé de pointes). Détritivore, il participe à la décomposition de la litière.",
			en: 'A terrestrial woodlouse of the family Armadillidiidae, like the common pill bug. It can roll into a ball for protection. Its back bears rows of tubercles, hence its name (muricatum: covered in points). As a detritivore, it helps break down leaf litter.'
		}
	},
	'Formica lugubris': {
		authority: 'Zetterstedt, 1838',
		common: { fr: 'Fourmi des bois', en: 'Hairy wood ant' },
		biology: {
			fr: "Fourmi du groupe des fourmis rousses des bois, surtout présente en montagne et dans les forêts de conifères. Elle bâtit de grands dômes d'aiguilles et peut former des supercolonies de nombreux nids reliés entre eux. Elle chasse de nombreux insectes et élève des pucerons pour leur miellat.",
			en: 'A member of the red wood ant group, found mostly in mountains and conifer forests. It builds large mounds of needles and can form supercolonies of many interconnected nests. It preys on many insects and tends aphids for their honeydew.'
		}
	},
	Lepidoptera: {
		authority: 'Linnaeus, 1758',
		common: { fr: 'Papillon', en: 'Butterfly' },
		biology: {
			fr: "Les lépidoptères regroupent papillons de jour et de nuit. Leurs ailes sont couvertes de minuscules écailles qui forment leurs motifs. Les adultes se nourrissent de nectar grâce à leur trompe enroulée, et jouent ainsi un rôle de pollinisateurs.",
			en: 'Lepidoptera include butterflies and moths. Their wings are covered with tiny scales that form their patterns. Adults feed on nectar through their coiled proboscis, acting as pollinators along the way.'
		}
	},
	'Malacosoma neustria': {
		authority: '(Linnaeus, 1758)',
		common: { fr: 'Livrée des arbres (chenille)', en: 'Lackey moth (caterpillar)' },
		location: { fr: 'Piré-sur-Seiche, Ille-et-Vilaine', en: 'Piré-sur-Seiche, Ille-et-Vilaine, France' },
		biology: {
			fr: "Les œufs sont pondus en anneau serré autour d'une branche, d'où le nom de « livrée ». Au printemps, les jeunes chenilles vivent en groupe dans une toile de soie sur les arbres fruitiers, l'aubépine ou le chêne, puis se dispersent. Leurs rayures bleues, blanches et orange les rendent faciles à reconnaître.",
			en: 'Eggs are laid in a tight ring around a twig, like a band of livery. In spring the young caterpillars live together in a silk tent on fruit trees, hawthorn or oak, then disperse. Their blue, white and orange stripes make them easy to recognise.'
		},
		inaturalist: 'https://www.inaturalist.org/observations/354258666'
	},
	'Platycnemis pennipes': {
		authority: '(Pallas, 1771)',
		common: { fr: 'Pennipatte bleuâtre', en: 'White-legged damselfly' },
		location: { fr: 'Saint-Berthevin, Mayenne', en: 'Saint-Berthevin, Mayenne, France' },
		biology: {
			fr: "Petite demoiselle des eaux calmes ou lentes, des rivières aux étangs. Ses tibias élargis et blanchâtres, comme des plumes, sont exhibés lors de la parade nuptiale. On l'observe de mai à septembre dans la végétation des berges.",
			en: 'A small damselfly of still or slow-moving water, from rivers to ponds. Its broadened, whitish, feather-like tibiae are displayed during courtship. It is seen from May to September in bankside vegetation.'
		},
		inaturalist: 'https://www.inaturalist.org/observations/375199334'
	},
	'Platyrhinus resinosus': {
		authority: '(Scopoli, 1763)',
		common: { fr: 'Anthribe des champignons', en: 'Cramp-ball fungus weevil' },
		location: { fr: "Bois de l'Huisserie, Laval", en: "Bois de l'Huisserie, Laval, France" },
		biology: {
			fr: "Coléoptère de la famille des Anthribidae. Sa larve se développe dans un champignon du bois mort, la Daldinie concentrique, surtout sur le frêne. Sa livrée sombre tachée de clair le fait passer pour une fiente d'oiseau ou un lichen.",
			en: 'A beetle of the family Anthribidae. Its larva develops inside a deadwood fungus, King Alfred\'s cakes (Daldinia concentrica), mostly on ash. Its dark, pale-spotted pattern makes it look like a bird dropping or a lichen.'
		},
		inaturalist: 'https://www.inaturalist.org/observations/346409379'
	},
	'Pristomyrmex punctatus': {
		authority: '(Smith, 1860)',
		common: { fr: 'Fourmi sans reine du Japon', en: 'Japanese queenless ant' },
		biology: {
			fr: "Fourmi d'Asie de l'Est au mode de vie étonnant : ses colonies n'ont pas de reine. Ce sont les ouvrières elles-mêmes qui pondent, sans fécondation, des œufs qui donnent de nouvelles ouvrières. Toutes participent d'abord à la ponte, puis au travail hors du nid en vieillissant.",
			en: 'An East Asian ant with a remarkable lifestyle: its colonies have no queen. The workers themselves lay unfertilised eggs that develop into new workers. They all reproduce when young, then switch to work outside the nest as they age.'
		}
	},
	'Lasius platythorax': {
		authority: 'Seifert, 1991',
		common: { fr: 'Fourmi noire des bois', en: 'Black ant' },
		location: { fr: 'Parc des Ondines, Changé (Mayenne)', en: 'Parc des Ondines, Changé, Mayenne, France' },
		biology: {
			fr: "Très proche de la fourmi noire des jardins (Lasius niger), dont elle n'a été distinguée qu'en 1991. Elle fréquente plutôt les milieux humides et boisés, et niche dans le bois mort ou les souches. Comme ici, elle élève des pucerons qu'elle protège en échange de leur miellat sucré.",
			en: 'Very close to the black garden ant (Lasius niger), from which it was only separated in 1991. It favours damp, wooded habitats and nests in dead wood or stumps. As here, it tends aphids, protecting them in exchange for their sugary honeydew.'
		},
		inaturalist: 'https://www.inaturalist.org/observations/395750242'
	},
	'Myrmica sp.': {
		authority: 'Latreille, 1804',
		common: { fr: 'Fourmi rouge', en: 'Red ant' },
		location: { fr: 'Louverné, Mayenne', en: 'Louverné, Mayenne, France' },
		biology: {
			fr: "Les Myrmica sont des fourmis rousses très communes en Europe, dans les prairies, lisières et sous-bois. Contrairement à beaucoup de fourmis, elles possèdent un aiguillon fonctionnel et peuvent piquer. Leurs colonies, souvent modestes, comptent fréquemment plusieurs reines.",
			en: 'Myrmica are reddish ants that are very common in Europe, in meadows, woodland edges and undergrowth. Unlike many ants, they have a functional sting. Their often modest colonies frequently have several queens.'
		},
		inaturalist: 'https://www.inaturalist.org/observations/395595081'
	},
	'Porcellio scaber': {
		authority: 'Latreille, 1804',
		common: { fr: 'Cloporte rugueux', en: 'Common rough woodlouse' },
		location: { fr: 'Bois Gamats, Laval', en: 'Bois Gamats, Laval, France' },
		biology: {
			fr: "L'un des cloportes les plus communs d'Europe, reconnaissable à sa carapace granuleuse. Contrairement aux cloportes-boules, il ne peut pas se rouler en boule. Crustacé terrestre, il respire grâce à des pseudo-trachées et a besoin d'humidité. Il se nourrit de matière végétale en décomposition.",
			en: 'One of the most common woodlice in Europe, recognisable by its granular back. Unlike pill bugs, it cannot roll into a ball. A land crustacean, it breathes through pseudotracheae and needs humidity. It feeds on decaying plant matter.'
		},
		inaturalist: 'https://www.inaturalist.org/observations/395332078'
	},
	'Camponotus lateralis': {
		authority: '(Olivier, 1792)',
		common: { fr: 'Fourmi charpentière', en: 'Carpenter ant' },
		location: { fr: 'Toulon, Var', en: 'Toulon, Var, France' },
		biology: {
			fr: "Petite Camponotus méditerranéenne au thorax rouge et à l'abdomen noir brillant. Ses ouvrières grimpent dans les arbres et les buissons pour récolter le miellat des pucerons. Sa coloration rappelle celle de Crematogaster scutellaris, une autre fourmi des chênes, qu'elle semble imiter.",
			en: 'A small Mediterranean Camponotus with a red thorax and a shiny black gaster. Its workers climb trees and shrubs to collect aphid honeydew. Its colouring resembles that of Crematogaster scutellaris, another oak-dwelling ant, which it appears to mimic.'
		},
		inaturalist: 'https://www.inaturalist.org/observations/391798449'
	},
	'Pelophylax ridibundus': {
		authority: '(Pallas, 1771)',
		common: { fr: 'Grenouille rieuse', en: 'Marsh frog' },
		location: { fr: 'Louverné, Mayenne', en: 'Louverné, Mayenne, France' },
		biology: {
			fr: "La plus grande grenouille verte d'Europe. Très aquatique, elle vit dans les mares, étangs et rivières, où les mâles chantent en gonflant deux sacs vocaux de part et d'autre de la tête. Introduite dans de nombreuses régions de France, elle peut s'hybrider avec les autres grenouilles vertes.",
			en: "Europe's largest water frog. Highly aquatic, it lives in ponds, lakes and rivers, where males call by inflating two vocal sacs on either side of the head. Introduced in many parts of France, it can hybridise with other water frogs."
		},
		inaturalist: 'https://www.inaturalist.org/observations/395595090'
	},
	'Garrulus glandarius': {
		authority: '(Linnaeus, 1758)',
		common: { fr: 'Geai des chênes', en: 'Eurasian jay' },
		location: { fr: 'Saint-Berthevin, Mayenne', en: 'Saint-Berthevin, Mayenne, France' },
		biology: {
			fr: "Corvidé forestier reconnaissable à ses plumes alaires barrées de bleu. À l'automne, il enterre des milliers de glands pour l'hiver ; ceux qu'il oublie germent, ce qui en fait un acteur majeur de la régénération des chênaies. C'est aussi un imitateur doué des cris d'autres oiseaux.",
			en: 'A woodland corvid recognisable by its blue-barred wing feathers. In autumn it buries thousands of acorns for winter; the forgotten ones sprout, making it a key player in oak forest regeneration. It is also a skilled mimic of other birds\' calls.'
		},
		inaturalist: 'https://www.inaturalist.org/observations/375198006'
	},
	'Podarcis muralis': {
		authority: '(Laurenti, 1768)',
		common: { fr: 'Lézard des murailles', en: 'Common wall lizard' },
		location: { fr: 'Philippsbourg, Moselle', en: 'Philippsbourg, Moselle, France' },
		biology: {
			fr: "Le lézard le plus commun en France, sur les murs, rochers et talus ensoleillés. Il se réchauffe au soleil pour réguler sa température et chasse insectes et araignées. En cas de danger, il peut abandonner sa queue, qui repousse ensuite. Il est protégé en France.",
			en: 'The most common lizard in France, found on sunny walls, rocks and banks. It basks to regulate its body temperature and hunts insects and spiders. When threatened, it can shed its tail, which later grows back. It is protected in France.'
		},
		inaturalist: 'https://www.inaturalist.org/observations/356923225'
	},
	'Salamandra salamandra': {
		authority: '(Linnaeus, 1758)',
		common: { fr: 'Salamandre tachetée', en: 'Fire salamander' },
		location: { fr: "Bois de l'Huisserie, Laval", en: "Bois de l'Huisserie, Laval, France" },
		biology: {
			fr: "Amphibien nocturne des forêts humides, surtout actif par temps de pluie. Ses couleurs jaune et noir signalent les toxines sécrétées par sa peau. La femelle ne pond pas d'œufs : elle dépose directement des larves dans les ruisseaux. Elle est protégée en France.",
			en: 'A nocturnal amphibian of damp forests, most active in rainy weather. Its yellow and black colours advertise the toxins secreted by its skin. The female does not lay eggs: she deposits larvae directly into streams. It is protected in France.'
		},
		inaturalist: 'https://www.inaturalist.org/observations/324398800'
	}
};

const photographyImages = import.meta.glob('../assets/photography/**/*.{jpg,jpeg,png,webp,avif}', {
	eager: true,
	import: 'default'
}) as Record<string, ImageMetadata>;

function normalizeTaxonName(fileName: string) {
	const withoutExtension = fileName.replace(/\.[^.]+$/, '');
	return withoutExtension.replace(/\s+/g, ' ').replace(/\.+$/, '.').trim();
}

function slugify(value: string) {
	return value
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-+|-+$/g, '');
}

function getCollectionId(path: string): PhotographyCollectionId | null {
	if (path.includes('/macrophotography/')) {
		return 'macrophotography';
	}

	if (path.includes('/other/')) {
		return 'other';
	}

	return null;
}

const items = Object.entries(photographyImages)
	.map(([path, image]) => {
		const collection = getCollectionId(path);

		if (!collection) {
			return null;
		}

		const fileName = path.split('/').pop() ?? path;
		const title = normalizeTaxonName(fileName);
		const aspectRatio = image.width && image.height ? image.width / image.height : 1;

		return {
			title,
			alt: `Photographie de ${title}`,
			collection,
			dialogId: `${collection}-${slugify(title)}`,
			index: 0,
			image,
			aspectRatio,
			meta: photographyMeta[title] ?? {}
		} satisfies PhotographyItem;
	})
	.filter((item): item is PhotographyItem => item !== null)
	.sort((left, right) => left.title.localeCompare(right.title, 'fr'));

export const photographyCollections: PhotographyCollection[] = (
	['macrophotography', 'other'] as const
).map((collectionId) => {
	const collectionItems = items
		.filter((item) => item.collection === collectionId)
		.map((item, index) => ({
			...item,
			index
		}));

	return {
		id: collectionId,
		items: collectionItems
	};
});

export const photographyOverview = {
	total: items.length,
	macrophotography:
		photographyCollections.find((collection) => collection.id === 'macrophotography')?.items.length ??
		0,
	other: photographyCollections.find((collection) => collection.id === 'other')?.items.length ?? 0
};

/**
 * The focus-stacking hero subject. Prefers an image flagged `featured` in
 * metadata; otherwise falls back to the Allothrombium sp. macro (its warm
 * amber tones anchor the highlight accent), then to the first macro image.
 */
const macroItems =
	photographyCollections.find((collection) => collection.id === 'macrophotography')?.items ?? [];

export const heroItem: PhotographyItem | undefined =
	macroItems.find((item) => item.meta.featured) ??
	macroItems.find((item) => item.title.startsWith('Allothrombium')) ??
	macroItems[0];
