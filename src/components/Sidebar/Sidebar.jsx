import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import ActivityIcon from '../ActivityIcon/ActivityIcon';

const SideBar = styled.aside`
  width: 120px;
  height: 840px;
  background-color: black;
  position: relative;
  float: left;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Copyright = styled.div`
  color: #fff;
  transform: rotate(-90deg);
  transform-origin: 0, 0;
  white-space: nowrap;
  position: absolute;
  bottom: 120px;
`;

/**
 * Component displaying main sidebar.
 *
 * @example
 * const icons = [
 *   { icon: "yogaIcon.jpg", alt: "Yoga" },
 *   { icon: "swimmingIcon.jpg", alt: "Swimming" },
 *   { icon: "cyclingIcon.jpg", alt: "Cycling" },
 *   { icon: "liftingIcon.jpg", alt: "Strength Training" },
 * ]
 *
 * <Sidebar icons={icons} />
 */
export default function Sidebar({ icons }) {
	return (
		<SideBar>
			<div className="icons">
				{icons.map((item) => (
					<ActivityIcon icon={item.icon} alt={item.alt} key={item.alt} />
				))}
			</div>
			<Copyright>Copyright, SportSee 2020</Copyright>
		</SideBar>
	);
}

Sidebar.propTypes = {
	icons: PropTypes.arrayOf(
		PropTypes.shape({
			icon: PropTypes.string.isRequired,
			alt: PropTypes.string.isRequired,
		})
	).isRequired,
};
