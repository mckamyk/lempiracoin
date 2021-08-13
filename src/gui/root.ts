import {LitElement, html, customElement} from 'lit-element';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';

@customElement('root-el')
export default class RootElement extends scope(LitElement) {
	render() {
		return html`Hello, world!`;
	}
}
