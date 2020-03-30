import { useRouter } from 'next/router';
import Link from 'next/link';
import React, { Children } from 'react';

const ActiveLink = ({ children, className, ...props }) => {
	const { pathname } = useRouter();
	const child = Children.only(children);

	const currentClassName = pathname === props.href ? `${className} active` : className;

	return <Link {...props}>{React.cloneElement(child, { className: currentClassName })}</Link>;
};

export default ActiveLink;
