import { useEffect } from "react";

type Props = {
	url?: string;
};

declare global {
	interface Window {
		LineIt?: { loadButton: () => void };
	}
}

export default function LineShareButton({ url }: Props) {
	useEffect(() => {
		if (url) window.LineIt?.loadButton();
	}, [url]);

	return (
		<div
			className={"line-it-button"}
			data-lang={"ja"}
			data-type={"share-a"}
			data-env={"REAL"}
			data-url={url}
			data-color={"default"}
			data-size={"large"}
			data-count={"false"}
			data-ver={"3"}
			style={{ display: "none" }}
		/>
	);
}
