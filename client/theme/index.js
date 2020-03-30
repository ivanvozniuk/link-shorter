import { keyframes } from '@emotion/core';

const fadeAnimation = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export default {
	fadeAnimation,
	fadeFast: '0.2s',
	fadeMedium: '0.5s',
	fadeLong: '0.8s',
	hoverTransition: '.3s',
	hoverOpacity: 0.8,
	color: {
		main: '#9b59b6',
		text_main: 'rgba(0, 0, 0, 0.75)',
	},
	shadows: {
		default: '0 0 20px rgba(0, 0, 0, 0.15);',
	},
	borders: {
		default: '10px',
	},
};
