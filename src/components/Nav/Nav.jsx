import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Logo from '../../assets/logo/sportsee_logo.svg';

const Header = styled.header`
  height: 91px;
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  padding-left: 30px;
  background-color: #000;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const MainLogo = styled.img`
  width: 178px;
  transform: translateY(1.5px);
`;

const Links = styled.nav`
  color: white;
  font-size: 24px;
  font-weight: 500;
  line-height: 1;
  display: flex;
  justify-content: space-around;
  width: 100%;

  a:hover {
    color: var(--color-primary);
  }
`;

/**
 * Component displaying main navigation.
 *
 * @example
 * const routes = [
 *   { label: "Accueil", href: "/" },
 *   { label: "Profil", href: "/" },
 *   { label: "Réglage", href: "/" },
 *   { label: "Communauté", href: "/" },
 * ]
 *
 * <Nav routes={routes} />
 */
function Nav({ routes }) {
	return (
		<Header className="nav">
			<a href="/" className="nav__logo">
				<MainLogo src={Logo} alt="SportSee Logo" />
			</a>
			<Links className="nav__links">
				{routes.map((item) => (
					<a href={item.href} key={item.label}>
						{item.label}
					</a>
				))}
			</Links>
		</Header>
	);
}

Nav.propTypes = {
	routes: PropTypes.arrayOf(
		PropTypes.shape({
			label: PropTypes.string.isRequired,
			href: PropTypes.string.isRequired,
		})
	).isRequired,
};

export default Nav;
