import {LitElement, html, css} from 'lit-element';
import {ScopedElementsMixin as scope} from '@open-wc/scoped-elements';
import {colors, fonts} from '../styles';

export default class Button extends scope(LitElement) {
	clicked(ev: MouseEvent) {
		ev.stopPropagation();
		this.dispatchEvent(new CustomEvent<void>('click', {
			composed: true,
			bubbles: true,
		}));
	}

	render() {
		return html`
      <div class="button" part="button" @click=${this.clicked}>
        <span class="text"><slot></slot></span>
      </div>
    `;
	}

  static styles = [colors, fonts, css`
    .button {
      background: var(--accent);
      padding: .5rem;
      cursor: pointer;
    }
    .text {

    }
  `];
}
