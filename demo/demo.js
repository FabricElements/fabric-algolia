import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-input/paper-input.js';
import '../fabric-algolia.js';
import {html, LitElement} from 'lit-element';

/**
 * `view-help`
 *
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class DemoElement extends LitElement {
  /**
   * Constructor
   */
  constructor() {
    super();
    this.query = '';
    this.response = {};
    this.hits = [];
    this.resp = '';
  }

  /**
   * @return {object}
   */
  static get properties() {
    return {
      query: String,
      response: Object,
      hits: Array,
      resp: String,
    };
  }

  /**
   * Connected callback
   */
  connectedCallback() {
    super.connectedCallback();
    // setTimeout(() => {
    //   this.query = 'mee';
    // }, 500);
  }

  /**
   * Render template
   *
   *
   * @return {TemplateResult}
   */
  render() {
    return html`
      <style is="custom-style">
        :host {
          display: block;
        }
      </style>

      <fabric-algolia
        application-id="Y00JC9A2VD"
        api-key="62ef0fbbf1e47434cd0e30e2da63ebd3"
        index="demo"
        .query="${this.query}"
        .hits="${this.hits}"
      >
      </fabric-algolia>
      <paper-input .value="${this.query}" label="Type here"></paper-input>

      <h1>query = ${this.query}</h1>
      <h1>hits = ${this.hits.length}</h1>

      <!-- <template is="dom-repeat" items="[[hits]]"> -->
      <!-- <paper-card image="[[item.image]]"> -->
      <!-- <div class="card-content"> -->
      <!-- <h4>[[item.title]]</h4> -->
      <!-- &lt;!&ndash; <h5>[[item.year]]</h5> &ndash;&gt; -->
      <!-- &lt;!&ndash; <p>[[item.genre]]</p> &ndash;&gt; -->
      <!-- </div> -->
      <!-- </paper-card> -->
      <!-- </template> -->
    `;
  }

  /**
   * Response observer
   *
   * @param {any} response
   */
  responseObserver(response) {
    console.log('response changed');
    if (response) {
      console.log('response');
      console.log(response);
      console.log('///// response');
    }
  }

  /**
   * Renpod to changes
   *
   * @param {object} event
   * @private
   */
  _changes(event) {
    console.log(event);
  }
}

customElements.define('demo-element', DemoElement);
