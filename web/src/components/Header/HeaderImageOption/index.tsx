import { Link, useMatch, useResolvedPath } from 'react-router-dom';
import './styles.css';

interface HeaderOptionImageProps {
	to: string;
	children: React.ReactNode;
	rest?: any;
}

export function HeaderImageOption({
	to,
	children,
	...rest
}: HeaderOptionImageProps) {
	const resolvedPath = useResolvedPath(to);
	const isActive = useMatch({ path: resolvedPath.pathname, end: true });
	return (
		<Link className={isActive ? ' selected' : ''} to={to} {...rest}>
			{children}
		</Link>
	);
}
