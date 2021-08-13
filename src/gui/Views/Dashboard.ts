import {LitElement, html, css} from 'lit';
import {state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import {colors, fonts} from '../styles';
import {BigNumber} from 'ethers';
import {getTotalSupply} from '../services/lempira';
import Button from '../components/button';
import Card from '../components/card';

export default class Dashboard extends scope(LitElement) {
	@state() private totalSupply?: BigNumber;

	constructor() {
		super();
		this.updateTotalSupply();
	}

	async updateTotalSupply() {
		this.totalSupply = await getTotalSupply();
	}

	render() {
		return html`
			<div class="wrapper">
				<lc-card class="card" header footer>
					<div class="totalSupplyHeader" slot="header">
						Total Supply
					</div>
					<div class="totalSupply">
						$ ${this.totalSupply?.toNumber().toLocaleString()}
					</div>
					<div class="totalSupplyFooter" slot="footer">
						<lc-button @click=${this.updateTotalSupply}>Refresh</lc-button>
					</div>
				</lc-card>
				<div class="actions">
					<lc-card class="deposit" footer>
						<div>
						</div>
						<div slot="footer">
							<lc-button>Deposit</lc-button>
						</div>
					</lc-card>
					<lc-card class="withdraw" footer>
						<div>
						</div>
						<div slot="footer">
							<lc-button>Withdraw</lc-button>
						</div>
					</lc-card>
				</div>
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
			margin-bottom: 1rem;
		}
		.card {
			max-width: 40rem;
			width: 80vw;
		}
		.totalSupplyHeader, .totalSupplyFooter {
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.totalSupply {
			font-size: 4rem;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		.actions {
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.deposit {
			margin-right: 1rem;
		}
	`];

	static get scopedElements() {
		return {
			'lc-button': Button,
			'lc-card': Card,
		};
	}
}
