/**
 * @license
 * Copyright FabricElements. All Rights Reserved.
 */
import {LitElement} from 'lit-element';
import 'algoliasearch/dist/algoliasearch.min.js';

/**
 * `fabric-algolia`
 * Algolia search component
 *
 * @license Copyright (c) 2017 FabricElements. All rights reserved.
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class FabricAlgolia extends LitElement {
  /**
   * Constructor
   */
  constructor() {
    super();
    this.query = null;
    this.applicationId = null;
    this.apiKey = null;
    this.index = null;
    this.settings = null;
    this.response = {};
    this.hits = [];
    this.error = null;
  }

  /**
   * @return {object}
   */
  static get properties() {
    return {
      /**
       * Algolia Application ID
       */
      applicationId: {
        type: String,
        attribute: 'application-id',
      },
      /**
       * Algolia Api Key
       */
      apiKey: {
        type: String,
        attribute: 'api-key',
      },
      /**
       * Index
       */
      index: {
        type: String,
        attribute: 'index',
      },
      /**
       * Settings
       */
      settings: {
        type: Object,
        attribute: 'settings',
      },
      /**
       * Response
       */
      response: {
        type: Object,
        reflect: true,
      },
      hits: {
        type: Array,
        reflect: true,
      },
      /**
       * Error
       */
      error: {
        type: Object,
        reflect: true,
      },
      /**
       * Query
       */
      query: {
        type: String,
        attribute: 'query',
        hasChanged(newVal, oldVal) {
          return newVal !== oldVal
            && typeof newVal === 'string';
          // && newVal.length > 0;
        },
      },
    };
  }

  /**
   * Update event
   * @param {array} changedProperties
   */
  updated(changedProperties) {
    changedProperties.forEach((oldValue, propName) => {
      switch (propName) {
        case 'query':
          this._queryObserver();
          break;
        case 'hits':
          this._notify('hits-changed');
          break;
        case 'error':
          this._notify('error-changed');
          break;
        case 'response':
          this._notify('response-changed');
          break;
      }
    });
  }

  /**
   * Send query to Algolia & return results.
   *
   * @private
   */
  _queryObserver() {
    this.error = null;
    this.hits = [];
    const query = this.query;
    if (!query) return;

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
      this.error = error;
      return;
    }

    /**
     * Set up algolia search
     */
      // eslint-disable-next-line no-undef
    const client = algoliasearch(applicationID, apiKey);
    const indexRef = client.initIndex(index);
    // Define search settings
    if (settings) indexRef.setSettings(settings);

    indexRef.search(query, (err, content) => {
      if (err) {
        this.error = err;
      }
      this.response = content;
      this.hits = content.hasOwnProperty('hits') ? content.hits : [];
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
      compose: true,
    });
    this.dispatchEvent(event);
  }
}

customElements.define('fabric-algolia', FabricAlgolia);
