import { Link, useMatch, useResolvedPath } from 'react-router-dom';

interface HeaderOptionProps {
	to: string;
	children: React.ReactNode;
	rest?: any;
}

export function HeaderListOption({ to, children, ...rest }: HeaderOptionProps) {
	const resolvedPath = useResolvedPath(to);
	const isActive = Boolean(useMatch({ path: resolvedPath.pathname, end: true }));
	return (
		<li>
			<Link
				className={(isActive ? 'underline' : 'no-underline') + 'text-[1rem] font-normal'}
				to={to}
				{...rest}>
				{children}
			</Link>
		</li>
	);
}
