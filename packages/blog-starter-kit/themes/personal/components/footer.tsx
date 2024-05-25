import { useAppContext } from './contexts/appContext';
import PublicationSubscribeStandOut from './publication-subscribe-standout';

export const Footer = () => {
	const { publication } = useAppContext();

	return (
		<>
			<PublicationSubscribeStandOut />
			<footer className="flex justify-between border-t pt-10 text-sm text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
				<div>
					&copy; {new Date().getFullYear()} {publication.title}
				</div>
				<div>
					<a href="https://simonfarshid.com/impressum" target="_blank" className="hover:underline">
						Impressum
					</a>
				</div>
			</footer>
		</>
	);
};
