import styled from 'styled-components';
import PropTypes from 'prop-types';
import React from 'react';
import Nav from '../Nav/Nav';
import Sidebar from '../Sidebar/Sidebar';

import yogaIcon from '../../assets/icons/sidebar/icon_yoga.svg';
import swimmingIcon from '../../assets/icons/sidebar/icon_swimming.svg';
import cyclingIcon from '../../assets/icons/sidebar/icon_cycling.svg';
import liftingIcon from '../../assets/icons/sidebar/icon_lifting.svg';

// Add or delete navigation links here
const NAV_LINKS = [
	{ label: 'Accueil', href: '/' },
	{ label: 'Profil', href: '/' },
	{ label: 'Réglage', href: '/' },
	{ label: 'Communauté', href: '/' },
];

// Add or delete sidebar icons here
const SIDEBAR_ICONS = [
	{ icon: yogaIcon, alt: 'Yoga' },
	{ icon: swimmingIcon, alt: 'Swimming' },
	{ icon: cyclingIcon, alt: 'Cycling' },
	{ icon: liftingIcon, alt: 'Strength Training' },
];

const MainContent = styled.main`
  margin: 70px 7vw 0px calc(7vw + 117px);
`;

/**
 * Component for the main layout of the page.
 */
function Layout({ children }) {
	return (
		<>
			<Nav routes={NAV_LINKS} />
			<Sidebar icons={SIDEBAR_ICONS} />
			<MainContent>{children}</MainContent>
		</>
	);
}

Layout.propTypes = {
	children: PropTypes.node.isRequired,
};

export default Layout;
