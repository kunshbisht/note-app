import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import type { Line } from "./App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type IconButtonProps = {
	lastActiveIndex: number;
	setLines: React.Dispatch<React.SetStateAction<Line[]>>;
	icon: IconDefinition;
	icon2?: IconDefinition;
	patch: Partial<Line>;
};

export function IconButton({ lastActiveIndex, setLines, icon, icon2, patch }: IconButtonProps) {
	return <button
		className="bg-blue-50 text-black rounded-lg flex w-10 h-10 items-center justify-center
			cursor-pointer hover:bg-blue-100 active:bg-blue-200 transition-colors"
		onClick={() => {
			setLines(prev => {
				if (!prev[lastActiveIndex]) return prev;
				const next = [...prev];
				next[lastActiveIndex] = {
					...next[lastActiveIndex],
					...patch
				};
				return next;
			});
		}}
	>
		<FontAwesomeIcon icon={icon} />
		{icon2 && <FontAwesomeIcon
			icon={icon2}
			className="absolute"
			transform="shrink-8 right-11 down-8"
		/>}
	</button>
}