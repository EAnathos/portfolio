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
	// Example entry — replace the placeholder values (location, links) with the
	// real details for this observation. Localized fields accept { fr, en }.
	'Allothrombium sp.': {
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
