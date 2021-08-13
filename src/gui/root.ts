import {LitElement, html, css, customElement} from 'lit-element';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';

@customElement('root-el')
export default class RootElement extends scope(LitElement) {
	render() {
		return html`
			<div class="wrapper">
			</div>
		`;
	}

	static styles = css`
		.wrapper {
			height: 100vh;
			width: 100vw;
			background: #222;
		}
	`;
}
