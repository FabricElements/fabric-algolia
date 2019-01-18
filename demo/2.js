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
      </style>
      <paper-input label="Search a movie" value="{{query}}"></paper-input>
      <!--
        <fabric-algolia application-id="latency"
        api-key="6be0576ff61c053d5f9a3225e2a90f76"
        index="movies" query="[[query]]"
        response="{{response}}"></fabric-algolia>
      -->

      <fabric-algolia
        application-id="Y00JC9A2VD"
        api-key="62ef0fbbf1e47434cd0e30e2da63ebd3"
        index="demo"
        query="[[query]]"
        response="{{response}}"
        hits="{{hits}}"
        hits-changes="_changes"
        .resp="{{resp}}"
      ></fabric-algolia>
      <h1>resp = [[resp]]</h1>
      <template is="dom-repeat" items="[[hits]]">
        <paper-card image="[[item.image]]">
          <div class="card-content">
            <h4>[[item.title]]</h4>
            <!-- <h5>[[item.year]]</h5> -->
            <!-- <p>[[item.genre]]</p> -->
          </div>
        </paper-card>
      </template>
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
        // observer: 'responseObserver',
        value: null,
      },
      hits: {
        // type: Array,
        observer: 'responseObserver',
        value: [],
      },
      resp: {
        type: String,
        value: 'jumm',
      },
    };
  }

  responseObserver(response) {
    console.log('response changed');
    if (response) {
      console.log('response');
      console.log(response);
      console.log('///// response');
    }
  }
  _changes(event) {
    console.log(event);
  }
}

window.customElements.define('demo-element', DemoElement);
