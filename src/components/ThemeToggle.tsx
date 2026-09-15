import { useEffect, useState } from 'react';

type Theme = 'light' | 'dark';

export default function ThemeToggle() {
	const [theme, setTheme] = useState<Theme>('light');

	useEffect(() => {
		const storedTheme = localStorage.getItem('theme') as Theme | null;
		const initialTheme = storedTheme ?? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

		setTheme(initialTheme);
		document.documentElement.classList.toggle('dark', initialTheme === 'dark');
	}, []);

	const toggleTheme = () => {
		const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';

		localStorage.setItem('theme', nextTheme);
		setTheme(nextTheme);
		document.documentElement.classList.toggle('dark', nextTheme === 'dark');
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