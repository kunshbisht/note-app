import type { ContentType } from "../types/note";
import $ from 'jquery';

function jq2AST(el: JQuery<HTMLElement> | HTMLElement): ContentType {
    if (el instanceof HTMLElement) {
        return jq2AST($(el));
    } else if (el.is('input')) {
        return {
            'data-format': el.attr('data-format') || 'text',
            'value': (el.val() as string) || ''
        };
    } else if (el.hasClass('row')) {
        return {
            'data-format': 'cols',
            'value': el.children('div.col').get().map(jq2AST)
        };
    } else if (el.hasClass('col')) {
        return {
            'data-format': 'col',
            'value': el.children('input').get().map(jq2AST)
        };
    } else if (el.is('img')) {
        return {
            'data-format': 'preview',
            'value': el.attr('src') || ''
        };
    }
    return { 'data-format': '', value: '' };
}

export function saveNote() {
    const title = $('#title').val() as string;

    const content: ContentType[] = $('#app')
        .children('input:not(#title), div.row, div.col, img')
        .get().map(jq2AST)

    localStorage.setItem('note', JSON.stringify({ title, content }));
}

export function getNote(): { title: string; content: ContentType[] } {
    const data = localStorage.getItem('note');
    if (!data) return { title: '', content: [] };

    try {
        const parsed = JSON.parse(data);

        return {
            title: typeof parsed.title === 'string' ? parsed.title : '',
            content: Array.isArray(parsed.content) ? parsed.content : []
        };
    } catch (err) {
        console.error('Failed to parse note from localStorage:', err);
        return { title: '', content: [] };
    }
}