import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import NotConnected from './Views/notConnected';
import {colors, fonts} from './styles';
import {isConnected} from '#services/eth';
import Dashboard from './Views/Dashboard';

declare const window: Window & typeof globalThis & {
  ethereum: any;
};

@customElement('root-el')
export default class RootElement extends scope(LitElement) {
	@property({attribute: false}) connected = false;

	connectedCallback() {
		window.ethereum.on('accountsChanged', (accounts: any) => {
			if (accounts.length) {
				this.connected = true;
			} else {
				this.connected = false;
			}
		});
		isConnected().then(con => this.connected = con);
		super.connectedCallback();
	}

	render() {
		return html`
			<div class="wrapper">
				${this.connected ? html`<dashboard-el></dashboard-el>` : html`<not-connected></not-connected>`}
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
			'dashboard-el': Dashboard,
		};
	}
}
