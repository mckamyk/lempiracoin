import {LitElement, html, css, property, customElement} from 'lit-element';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import {connected} from '#services/eth';
import NotConnected from './Views/notConnected';
import {colors, fonts} from './styles';

@customElement('root-el')
export default class RootElement extends scope(LitElement) {
	@property({attribute: false}) connected = false;

	connectedCallback() {
		connected.subscribe({
			next: c => {
				this.connected = c;
				this.requestUpdate();
			},
		});
		super.connectedCallback();
	}

	render() {
		return html`
			<div class="wrapper">
				${this.connected ? html`connected` : html`<not-connected></not-connected>`}
			</div>
		`;
	}

	static styles = [colors, fonts, css`
		.wrapper {
			height: 100vh;
			width: 100vw;
			background: var(--bg);
		}
	`];

	static get scopedElements() {
		return {
			'not-connected': NotConnected,
		};
	}
}
