import {LitElement, html, css} from 'lit';
import {state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import {colors, fonts} from '../styles';
import {isOwner, isManager} from '../services/lempira';
import ManagerView from './Manager/ManagerView';
import OwnerView from './Owner/OwnerView';

export default class Dashboard extends scope(LitElement) {
	@state() private isOwner = false;
	@state() private isManager = false;

	constructor() {
		super();
		isOwner().then(owner => this.isOwner = owner);
		isManager().then(manager => this.isManager = manager);
	}

	render() {
		return html`
		<div class="wrapper">
			${this.isOwner ? html`<owner-view></owner-view>` : ''}
			${this.isManager ? html`<manager-view></manager-view>` : ''}
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
	`];

	static get scopedElements() {
		return {
			'manager-view': ManagerView,
			'owner-view': OwnerView,
		};
	}
}
