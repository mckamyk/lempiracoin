import {LitElement, html, css} from 'lit';
import {state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import {colors, fonts} from '../styles';
import ManagerView from './Manager/ManagerView';
import OwnerView from './Owner/OwnerView';
import {connect} from 'pwa-helpers';
import {store, RootState} from '../services/redux/store';
import CustomerView from './Customer/customerView';
import FaIcon from '#components/faIcon';

export default class Dashboard extends connect(store)(scope(LitElement)) {
	@state() private isOwner = false;
	@state() private isManager = false;

	get showNav(): boolean {
		return this.isOwner || this.isManager;
	}

	stateChanged(store: RootState) {
		this.isOwner = store.lempira.isOwner;
		this.isManager = store.lempira.isManager;
	}

	render() {
		return html`
		<div class="wrapper">
			${this.isOwner ? html`<owner-view></owner-view>` : ''}
			${this.isManager ? html`<manager-view></manager-view>` : ''}
			<customer-view></customer-view>
		</div>
		`;
	}

	static styles = [colors, fonts, css`
		.wrapper {
			height: 100%;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			justify-content: center;
		}
		.wrapper > *:not(:last-child) {
			margin-bottom: 5rem;
		}
		.icon {
			width: 2.5rem;
		}
		.nav {
			justify-self: flex-start;
		}
	`];

	static get scopedElements() {
		return {
			'manager-view': ManagerView,
			'owner-view': OwnerView,
			'customer-view': CustomerView,
			'lc-icon': FaIcon,
		};
	}
}
