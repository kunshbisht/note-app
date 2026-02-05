export function isCaretOnFirstVisualLine(el: HTMLTextAreaElement) {
	return getCaretLine(el).lineIndex === 0;
}

export function isCaretOnLastVisualLine(el: HTMLTextAreaElement) {
	const { lineIndex, lineHeight } = getCaretLine(el);
	const totalLines = Math.ceil(el.scrollHeight / lineHeight);
	return lineIndex >= totalLines - 1;
}

function getCaretLine(el: HTMLTextAreaElement) {
	const { selectionStart } = el;
	const div = document.createElement("div");
	const style = getComputedStyle(el);

	div.style.position = "absolute";
	div.style.visibility = "hidden";
	div.style.whiteSpace = "pre-wrap";
	div.style.wordWrap = "break-word";
	div.style.width = el.clientWidth + "px";
	div.style.font = style.font;
	div.style.padding = style.padding;
	div.style.border = style.border;

	div.textContent = el.value.slice(0, selectionStart);

	const span = document.createElement("span");
	span.textContent = "\u200b";
	div.appendChild(span);

	document.body.appendChild(div);

	const top = span.offsetTop;
	const lineHeight = parseFloat(style.lineHeight);

	document.body.removeChild(div);

	return {
		lineIndex: Math.round(top / lineHeight),
		lineHeight,
	};
}