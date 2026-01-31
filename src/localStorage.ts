import type { Line } from "./App";

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