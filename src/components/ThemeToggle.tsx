import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>('light');

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme') as Theme | null;
		const initialTheme = storedTheme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

		setTheme(initialTheme);
		document.documentElement.classList.toggle('dark', initialTheme === 'dark');
		document.documentElement.style.colorScheme = initialTheme;
	}, []);

	const toggleTheme = () => {
		const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

		localStorage.setItem('theme', nextTheme);
		setTheme(nextTheme);
		document.documentElement.classList.toggle('dark', nextTheme === 'dark');
		document.documentElement.style.colorScheme = nextTheme;
	};

	return (
		<button
			className="theme-toggle"
			type="button"
			onClick={toggleTheme}
		>
			<span>{theme === 'dark' ? '☀' : '☾'}</span>
		</button>
	);
}