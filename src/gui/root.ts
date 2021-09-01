import {LitElement, html, css} from 'lit';
import {property, customElement, state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import NotConnected from './Views/notConnected';
import {colors, fonts} from './styles';
import Dashboard from './Views/Dashboard';
import {connect} from 'pwa-helpers';
import {RootState, store} from '#services/redux/store';
import {faUsers, faHome} from '@fortawesome/free-solid-svg-icons';
import FaIcon from '#components/faIcon';

@customElement('root-el')
export default class RootElement extends connect(store)(scope(LitElement)) {
	@property({attribute: false}) connected = false;
	@state() private isOwner = false;
	@state() private isManager = false;

	stateChanged(state: RootState) {
		this.connected = state.eth.connected;
		this.isOwner = state.lempira.isOwner;
		this.isManager = state.lempira.isManager;
	}

	get showNav(): boolean {
		return this.isOwner || this.isManager;
	}

	goOwner() {
		console.log('owner view');
	}

	goManager() {
		console.log('manager view');
	}

	goHome() {
		console.log('home view');
	}

	render() {
		return html`
			<div class="wrapper">
				${this.showNav ? html`
				<div class="nav">
					<lc-icon class="icon" .icon=${faHome} action @clicked=${this.goHome} circle></lc-icon>
					${this.isOwner ? html`
						<lc-icon class="icon" .icon=${faUsers} action @clicked=${this.goOwner} circle></lc-icon>
					` : ''}
					${this.isManager ? html`
						<lc-icon></lc-icon>
					` : ''}
				</div>
				` : ''}
				${this.connected ? html`<dashboard-el></dashboard-el>` : html`<not-connected></not-connected>`}
			</div>
		`;
	}

	static styles = [colors, fonts, css`
		.wrapper {
			height: 100vh;
			width: 100vw;
			background: var(--bg);
			position: relative;
		}
		.icon {
			width: 3rem;
			transition: width 150ms linear;
		}
		.icon:hover {
			width: 5rem;
		}
		.nav {
			display: flex;
			position: absolute;
			left: 0;
			right: 0;
			width: fit-content;
			margin: auto;
		}
		.nav > *:not(:last-child) {
			margin-right: 1rem;
		}
	`];

	static get scopedElements() {
		return {
			'not-connected': NotConnected,
			'dashboard-el': Dashboard,
			'lc-icon': FaIcon,
		};
	}
}
