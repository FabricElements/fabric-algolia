import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-input/paper-input.js';
import '../fabric-algolia.js';

/**
 * `view-help`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class DemoElement extends PolymerElement {
  /**
   * @return {!HTMLTemplateElement}
   */
  static get template() {
    return html`
      <style is="custom-style">
        :host {
          display: block;
        }
        #container {
          background-color: #f1f1f1;
          padding: 1rem 0;
        }
        paper-card {
          display: block;
          margin: 1rem auto;
          width: 100%;
          max-width: 300px;
        }
      </style>
      <paper-input label="Search a movie" value="{{query}}"></paper-input>

      <fabric-algolia
        application-id="latency"
        api-key="6be0576ff61c053d5f9a3225e2a90f76"
        index="movies"
        query="[[query]]"
        response="{{response}}"
        hits="{{hits}}"
      ></fabric-algolia>
      <div id="container">
        <template is="dom-repeat" items="[[hits]]">
          <paper-card image="[[item.image]]">
            <div class="card-content">
              <h4>[[item.title]]</h4>
              <h5>[[item.year]]</h5>
              <p>[[item.genre]]</p>
            </div>
          </paper-card>
        </template>
      </div>
    `;
  }

  /**
   * @return {object}
   */
  static get properties() {
    return {
      query: String,
      response: {
        type: Object,
        value: null,
      },
      hits: {
        type: Array,
      },
    };
  }
}

customElements.define('demo-element', DemoElement);
