import type { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import type React from "react";

type IconButtonProps = {
	onClick?: React.MouseEventHandler;
	children?: React.ReactNode;
	icon: IconDefinition;
	icon2?: IconDefinition;
	disabled?: boolean;
};

export function IconButton({ onClick, icon, icon2, disabled = false }: IconButtonProps) {
	return <button
		className={clsx(
			"rounded-lg flex w-10 h-10 items-center justify-center",
			"bg-blue-50 hover:bg-blue-100 active:bg-blue-200 transition-colors",
			disabled ? "text-gray-500 cursor-not-allowed" : "text-black cursor-pointer"
		)}
		onClick={onClick}
	>
		<FontAwesomeIcon icon={icon} />
		{icon2 && <FontAwesomeIcon
			icon={icon2}
			className="absolute"
			transform="shrink-8 right-11 down-8"
		/>}
	</button>;
}
