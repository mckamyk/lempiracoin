import {LitElement, html, css} from 'lit';
import {property, query} from 'lit/decorators.js';
import {Icon, icon} from '@fortawesome/fontawesome-svg-core';
import {colors} from '../styles';

export default class FaIcon extends LitElement {
	@property({type: Object}) icon!: Icon;
	@property() href?: string;
	@property({type: Boolean}) action = false;
	@property({type: Boolean}) circle = false;

	@query('.icon') iconDiv!: HTMLDivElement;

	updated(changes: Map<keyof FaIcon, any>) {
		if (changes.has('icon')) {
			this.iconDiv.innerHTML = icon(this.icon).html[0];
		}
	}

	handleAction(ev: MouseEvent) {
		ev.stopPropagation();

		if (this.action) {
			this.dispatchEvent(new CustomEvent<void>('clicked', {
				composed: true,
				bubbles: true,
			}));

			return;
		}

		if (this.href) {
			window.open(this.href, '_blank')?.focus();
		}
	}

	render() {
		return html`
			<div
				class="wrapper ${this.href || this.action ? 'button' : ''} ${this.circle ? 'circle' : ''}"
				part="wrapper"
				@click=${this.handleAction}
			>
				<div class="icon" part="icon"></div>
			</div>
		`;
	}

	static styles = [colors, css`
		.wrapper {
      padding: 2px;
      width: inherit;
      height: inherit;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--white);
    }
    .button {
      background: transparent;
      transition: background 150ms linear, color 150ms linear;
      color: var(--accent);
    }
    .button.circle {
      border-radius: 50%;
    }
    .button:hover {
      background: var(--accent);
      cursor: pointer;
      color: var(--white);
    }
    .icon {
      width: inherit;
    }
    svg {
      display: block;
      aspect-ratio: 1/1;
    }
	`];
}
