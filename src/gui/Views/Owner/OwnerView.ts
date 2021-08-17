import {LitElement, html, css} from 'lit';
import {state} from 'lit/decorators.js';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import Card from '../../components/card';
import TextField from '../../components/textfield';
import Button from '../../components/button';
import {connect} from 'pwa-helpers';
import {store, RootState} from '#services/redux/store';
import {Manager} from '../../../managerType';

export default class OwnerView extends connect(store)(scope(LitElement)) {
	@state() managers: Manager[] = [];

	stateChanged(store: RootState) {
		this.managers = store.lempira.managers;
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
