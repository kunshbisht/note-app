type ImageDropCallback = (url: string) => void;

export default function enableImageDrop(el: JQuery<HTMLElement>, onImage: ImageDropCallback) {
	el.on('dragover dragenter', (e) => {
		e.preventDefault();
		e.stopPropagation();
		el.css('border-color', 'blue');
	});

	el.on('dragleave', (e) => {
		e.preventDefault();
		e.stopPropagation();
		el.css('border-color', '#ccc');
	});

	el.on('drop', (e) => {
		e.preventDefault();
		e.stopPropagation();
		el.css('border-color', '#ccc');

		const oe = e.originalEvent as DragEvent;
		if (!oe.dataTransfer) return;
		const dt = oe.dataTransfer;

		// 1. Direct URL
		const url = dt.getData('text/uri-list') || dt.getData('text/plain');
		if (url && url.match(/^https?:\/\/.+\.(jpg|jpeg|png|gif|webp)$/i)) {
			onImage(url);
			return;
		}

		// 2. HTML snippet
		const html = dt.getData('text/html');
		if (html) {
			const match = html.match(/<img[^>]+src="([^"]+)"/i);
			if (match) {
				onImage(match[1]);
				return;
			}
		}

		console.warn('Could not detect external image URL.');
	});
}
