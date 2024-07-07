'use client';

import { MoonIcon, SunIcon } from '@radix-ui/react-icons';
import { useTheme } from 'next-themes';
import { Button } from './button';

export function ModeToggle() {
	const { resolvedTheme, setTheme } = useTheme();

	const toggleTheme = () => {
		if (resolvedTheme === 'dark') {
			setTheme('light');
		} else {
			setTheme('dark');
		}
	};

	return (
		<Button
			onClick={() => {
				if (!(document as any).startViewTransition) toggleTheme();
				(document as any).startViewTransition(toggleTheme);
			}}
			label=""
			type="outline"
			className="!p-2"
			icon={
				<span className="flex">
					<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
				</span>
			}
		></Button>
	);
}
