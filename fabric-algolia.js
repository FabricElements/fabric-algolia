import {LitElement} from 'lit-element';
import 'algoliasearch/dist/algoliasearch.min.js';

/**
 * fabric-algolia base component
 */
class FabricAlgolia extends LitElement {
  /**
   * properties
   * @return {object}
   */
  static get properties() {
    return {
      applicationId: {type: String, attribute: 'application-id'},
      apiKey: {type: String, attribute: 'api-key'},
      index: {type: String, attribute: 'index'},
      settings: {type: Object, attribute: 'settings'},
      response: {type: Object, attribute: 'response', reflect: true},
      error: {type: Object, attribute: 'error', reflect: true},
      query: {type: String, attribute: 'query'},
    };
  }

  /**
   * values
   */
  constructor() {
    super();
    this.applicationId = null;
    this.apiKey = null;
    this.index = null;
    this.settings = null;
    this.response = null;
    this.error = null;
    this.query = null;
  }

  /**
   * Send query to Algolia & return results.
   *
   * @return {*}
   * @private
   */
  _queryObserver() {
    this.error = null;
    this.response = null;
    const query = this.query;
    console.log('query', query);
    if (!query) return;
    if (query.length < 3) {
      return;
    }

    /**
     * Reference basic properties
     */
    const index = this.index;
    const applicationID = this.applicationId;
    const apiKey = this.apiKey;
    const settings = this.settings;

    let error = {
      'message': 'Something is missing: ',
      'status': 400,
    };

    if (!applicationID || !apiKey || !index) {
      if (!applicationID) error.message += 'applicationId, ';
      if (!apiKey) error.message += 'apiKey, ';
      if (!index) error.message += 'index';
      return this.error = error;
    }

    /**
     * Set up algolia search
     */
    // eslint-disable-next-line no-undef
    const client = window.algoliasearch(applicationID, apiKey);
    const indexRef = client.initIndex(index);
    // Define search settings
    if (settings) indexRef.setSettings(settings);

    indexRef.search(query, (err, content) => {
      if (err) {
        return this.error = error;
      }
      console.log(content);
      this.response = content;
    });
  }

  /**
   * Update event
   * @param {PropertyValues} changedProperties
   */
  updated(changedProperties) {
    // @ts-ignore
    changedProperties.forEach((oldValue, propName) => {
      switch (propName) {
        case 'query':
          this._queryObserver();
          break;
        case 'hits':
        case 'error':
        case 'response':
          this._notify(`${propName}-changed`);
          break;
      }
    });
  }

  /**
   * Trigger event
   *
   * @param {string} name
   * @private
   */
  _notify(name) {
    const event = new CustomEvent(name, {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

customElements.define('fabric-algolia', FabricAlgolia);
