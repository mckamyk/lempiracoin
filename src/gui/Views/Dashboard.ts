import {LitElement, html, css} from 'lit';
import {state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import {colors, fonts} from '../styles';
import {BigNumber} from 'ethers';
import {isOwner, isManager} from '../services/lempira';
import ManagerView from './Manager/ManagerView';

export default class Dashboard extends scope(LitElement) {
	@state() private totalSupply?: BigNumber;

	@state() private isOwner = false;
	@state() private isManager = false;

	constructor() {
		super();
		isOwner().then(owner => this.isOwner = owner);
		isManager().then(manager => this.isManager = manager);
	}

	render() {
		return html`
			${this.isManager ? html`<manager-view></manager-view>` : ''}
		`;
	}

	static styles = [colors, fonts, css`
	`];

	static get scopedElements() {
		return {
			'manager-view': ManagerView,
		};
	}
}
