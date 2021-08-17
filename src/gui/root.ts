import {LitElement, html, css} from 'lit';
import {property, customElement} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import NotConnected from './Views/notConnected';
import {colors, fonts} from './styles';
import Dashboard from './Views/Dashboard';
import {connect} from 'pwa-helpers';
import {RootState, store} from '#services/redux/store';

@customElement('root-el')
export default class RootElement extends connect(store)(scope(LitElement)) {
	@property({attribute: false}) connected = false;

	stateChanged(state: RootState) {
		this.connected = state.eth.connected;
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
