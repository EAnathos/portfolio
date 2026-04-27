import type { ImageMetadata } from 'astro';

export type PhotographyCollectionId = 'macrophotography' | 'other';

export type PhotographyItem = {
	title: string;
	alt: string;
	collection: PhotographyCollectionId;
	dialogId: string;
	index: number;
	image: ImageMetadata;
};

export type PhotographyCollection = {
	id: PhotographyCollectionId;
	title: string;
	description: string;
	items: PhotographyItem[];
};

const collectionMeta: Record<PhotographyCollectionId, { title: string; description: string }> = {
	macrophotography: {
		title: 'Macrophotographie',
		description:
			'Une selection de prises de vue rapprochées autour des insectes et petits organismes que je croise sur le terrain.'
	},
	other: {
		title: 'Autres prises de vue',
		description:
			'Des images complémentaires, plus generalistes, qui prolongent la même recherche de lumière et de détail.'
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

		return {
			title,
			alt: `Photographie de ${title}`,
			collection,
			dialogId: `${collection}-${slugify(title)}`,
			index: 0,
			image
		};
	})
	.filter((item): item is PhotographyItem => item !== null)
	.sort((left, right) => left.title.localeCompare(right.title, 'fr'));

export const photographyCollections: PhotographyCollection[] = (['macrophotography', 'other'] as const).map(
	(collectionId) => {
		const collectionItems = items
			.filter((item) => item.collection === collectionId)
			.map((item, index) => ({
				...item,
				index
			}));

		return {
			id: collectionId,
			title: collectionMeta[collectionId].title,
			description: collectionMeta[collectionId].description,
			items: collectionItems
		};
	}
);

export const photographyOverview = {
	total: items.length,
	macrophotography: photographyCollections.find((collection) => collection.id === 'macrophotography')?.items.length ?? 0,
	other: photographyCollections.find((collection) => collection.id === 'other')?.items.length ?? 0
};