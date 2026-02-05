import type { Line } from "./App";
import type { Metadata } from "./MetadataSection";

const NOTE_KEY = 'note';

export function saveNote(lines: Line[]) {
	localStorage.setItem(NOTE_KEY, JSON.stringify(lines));
}

export function loadNote(): Line[] {
	const raw = localStorage.getItem(NOTE_KEY);
	if (!raw) return [{ text: '', list: 'none', heading: 'none' }];

	try {
		return JSON.parse(raw);
	} catch {
		return [{ text: '', list: 'none', heading: 'none' }];
	}
}

const METADATA_KEY = 'md';

export function saveMetadata(metadata: object) {
	localStorage.setItem(METADATA_KEY, JSON.stringify(metadata));
}

export function loadMetadata(): Metadata {
	const raw = localStorage.getItem(METADATA_KEY);
	if (!raw) return { title: "", thumbnailUrl: "", mainIdea: "" };

	try {
		return JSON.parse(raw);
	} catch {
		return { title: "", thumbnailUrl: "", mainIdea: "" };
	}
}