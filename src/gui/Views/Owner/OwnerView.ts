import {LitElement, html, css} from 'lit';
import {state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import Card from '../../components/card';
import TextField from '../../components/textfield';
import Button from '../../components/button';
import {connect} from 'pwa-helpers';
import {store, RootState} from '../../services/redux/store';
import {Manager} from '../../../managerType';
import {toggleManager, addManager, removeManager} from '../../services/lempira';

export default class OwnerView extends connect(store)(scope(LitElement)) {
	@state() managers: Manager[] = [];

	@state() newAddress: string = '';
	@state() newName: string = '';

	stateChanged(store: RootState) {
		this.managers = store.lempira.managers;
	}

	async toggleManager(manager: Manager) {
		await toggleManager(manager.addr, !manager.enabled);
	}

	async removeManager(manager: Manager) {
		await removeManager(manager.addr);
	}

	async addManager() {
		console.log(this.newAddress, this.newName);
		await addManager(this.newAddress, this.newName);
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
					${manager.enabled ? 'Active' : 'Inactive'}
				</div>
				<lc-button @click=${() => this.toggleManager(manager)}>${manager.enabled ? 'Disable' : 'Enable'}</lc-button>
				<lc-button class="remove" @click=${() => this.removeManager(manager)}>Remove</lc-button>
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
						<lc-textfield label="Name" @change=${(ev: CustomEvent<string>) => this.newName = ev.detail}></lc-textfield>
						<lc-textfield label="Address" @change=${(ev: CustomEvent<string>) => this.newAddress = ev.detail}></lc-textfield>
						<lc-button @click=${this.addManager}>Add Manager</lc-button>
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
			width: 50rem;
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
		.remove::part(button) {
			background: var(--error)
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
