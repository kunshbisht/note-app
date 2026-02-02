import React, { useEffect, useRef, useState } from "react";
import { loadMetadata, saveMetadata } from "./localStorage";

function isValidUrl(value: string) {
	try {
		new URL(value);
		return true;
	} catch {
		return false;
	}
}

function StyledInput(props: React.InputHTMLAttributes<HTMLInputElement>) {
	return (
		<input
			className="flex-1 outline-none p-2 border-2 rounded-lg border-transparent transition-colors hover:bg-blue-100 focus:border-blue-500"
			{...props}
		/>
	);
}

export type Metadata = {
	title: string;
	thumbnailUrl: string;
};

export function MetadataSection() {
	const [meta, setMeta] = useState<Metadata>({
		title: '',
		thumbnailUrl: ''
	});
	const [imageMode, setImageMode] = useState(false);
	const isValidImageUrl =
		isValidUrl(meta.thumbnailUrl) &&
		/\.(jpg|jpeg|png|webp|gif)$/i.test(meta.thumbnailUrl);
	const mounted = useRef(false);

	useEffect(() => {
		if (!mounted.current) {
			mounted.current = true;
			return;
		}
		saveMetadata(meta);
	}, [meta]);

	useEffect(() => {
		setMeta(loadMetadata());
		setImageMode(true);
	}, [])

	return (
		<div className="flex flex-col gap-4">
			{
				imageMode
					? <img
						src={meta.thumbnailUrl}
						className="w-full cursor-pointer hover:scale-95 active:scale-90 transition-transform rounded-xl shadow-xl aspect-video object-cover"
						onClick={() => setImageMode(prev => !prev)}
						onError={() => setImageMode(false)}
					/>
					: <div className="flex gap-4">
						<StyledInput
							type="text"
							placeholder="Thumbnail URL"
							value={meta.thumbnailUrl}
							onChange={(e) => setMeta({ ...meta, thumbnailUrl: e.target.value })}
						/>
						<button
							className="bg-green-500 hover:bg-green-600 cursor-pointer p-2 px-3 rounded-lg text-white disabled:opacity-50 disabled:cursor-not-allowed"
							disabled={!isValidImageUrl}
							onClick={() => setImageMode(true)}
						>
							Image
						</button>
					</div>
			}
			<StyledInput
				type="text"
				placeholder="Title"
				value={meta.title}
				onChange={(e) => setMeta({ ...meta, title: e.target.value })} />
		</div>
	);
}
