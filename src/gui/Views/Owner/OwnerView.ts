import {LitElement, html, css} from 'lit';
import {state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import {getManagers} from '../../services/lempira';
import Card from '../../components/card';
import TextField from '../../components/textfield';
import Button from '../../components/button';

interface Manager {
	name: string;
	manager: boolean;
	addr: string;
}

export default class OwnerView extends scope(LitElement) {
	@state() managers: Manager[] = [];

	constructor() {
		super();
		getManagers().then(managers => this.managers = managers);
	}

	renderManager(manager: Manager) {
		return html`
			<div class="manager">
				<div class="name">
					${manager.name}
				</div>
				<div class="address">
					${manager.addr}
				</div>
				<div class="enabled">
					${manager.manager ? 'Active' : 'Inactive'}
				</div>
			</div>
		`;
	}

	render() {
		return html`
			<div class="wrapper">
				<lc-card header footer>
					<div class="header" slot="header">
						Managers
					</div>
					<div class="managers">
						${this.managers.map(man => this.renderManager(man))}
					</div>
					<div class="footer" slot="footer">
						<lc-textfield label="Name"></lc-textfield>
						<lc-textfield label="Address"></lc-textfield>
						<lc-button>Add Manager</lc-button>
					</div>
				</lc-card>
			</div>
		`;
	}

	static styles = css`
		.header {
			text-align: center;
		}
		.manager {
			width: 40rem;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		.footer {
			display: flex;
		}
		.footer > *:not(:last-child) {
			margin-right: 1rem;
			flex-grow: 1;
		}
	`;

	static get scopedElements() {
		return {
			'lc-card': Card,
			'lc-textfield': TextField,
			'lc-button': Button,
		};
	}
}
