import {LitElement, html, css} from 'lit';
import {state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import {connect} from 'pwa-helpers';
import {RootState, store} from '#services/redux/store';
import Card from '../../components/card';
import {BigNumber, ethers} from 'ethers';

export default class CustomerView extends connect(store)(scope(LitElement)) {
	@state() balance = BigNumber.from(0);

	stateChanged(store: RootState) {
		this.balance = BigNumber.from(store.lempira.balance);
	}

	render() {
		return html`
			<div class="wrapper">
				<lc-card header>
					<div class="header" slot="header">
						Welcome!
					</div>
					<div class="body">
						Your balance: ${Number(ethers.utils.formatEther(this.balance)).toLocaleString()}
					</div>
				</lc-card>
			</div>
		`;
	}

	static style = css``;

	static get scopedElements() {
		return {
			'lc-card': Card,
		};
	}
}
