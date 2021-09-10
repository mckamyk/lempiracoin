import {LitElement, html, css} from 'lit';
import {property, customElement, state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import NotConnected from './Views/notConnected';
import {colors, fonts} from './styles';
import {connect} from 'pwa-helpers';
import {RootState, store} from './services/redux/store';
import {faUsers, faHome, faMoneyBillWave} from '@fortawesome/free-solid-svg-icons';
import FaIcon from './components/faIcon';
import ManagerView from './Views/Manager/ManagerView';
import OwnerView from './Views/Owner/OwnerView';
import CustomerView from './Views/Customer/customerView';

@customElement('root-el')
export default class RootElement extends connect(store)(scope(LitElement)) {
	@property({attribute: false}) connected = false;
	@state() private isOwner = false;
	@state() private isManager = false;

	@state() private view: 'home' | 'manager' | 'owner' = 'home';

	stateChanged(state: RootState) {
		this.connected = state.eth.connected;
		this.isOwner = state.lempira.isOwner;
		this.isManager = state.lempira.isManager;
	}

	get showNav(): boolean {
		return this.isOwner || this.isManager;
	}

	goOwner() {
		this.view = 'owner';
	}

	goManager() {
		this.view = 'manager';
	}

	goHome() {
		this.view = 'home';
	}

	renderView() {
		switch (this.view) {
			case 'home':
				return html`<customer-view></customer-view>`;
			case 'manager':
				return html`<manager-view></manager-view>`;
			case 'owner':
				return html`<owner-view></owner-view>`;
			default:
				return html``;
		}
	}

	render() {
		if (!this.connected) {
			return html`
				<div class="wrapper">
					<not-connected></not-connected>
				</div>
			`;
		}

		return html`
			<div class="wrapper">
				${this.showNav ? html`
				<div class="nav">
					<lc-icon class="icon" .icon=${faHome} action @clicked=${this.goHome} circle></lc-icon>
					${this.isOwner ? html`
						<lc-icon class="icon" .icon=${faUsers} action @clicked=${this.goOwner} circle></lc-icon>
					` : ''}
					${this.isManager ? html`
						<lc-icon class="icon" .icon=${faMoneyBillWave} action @clicked=${this.goManager}></lc-icon>
					` : ''}
				</div>
				` : ''}
				${this.renderView()}
			</div>
		`;
	}

	static styles = [colors, fonts, css`
		.wrapper {
			height: 100vh;
			width: 100vw;
			background: var(--bg);
			position: relative;
			display: flex;
			align-items: center;
			justify-content: center;
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
			top: 0;
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
			'manager-view': ManagerView,
			'owner-view': OwnerView,
			'customer-view': CustomerView,
			'lc-icon': FaIcon,
		};
	}
}
