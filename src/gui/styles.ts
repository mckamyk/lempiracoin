import {css} from 'lit';

export const colors = css`
  :host {
    --bg: #222;
    --white: #eee;
    --accent: #3374ea;
    --error: #ea4833;
		--low: #404040;
  }
`;

export const fonts = css`
  * {
    font-family: sans-serif;
    color: var(--white);
  }
`;
