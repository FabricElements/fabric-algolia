/**
 * @license
 * Copyright FabricElements. All Rights Reserved.
 *
 * `fabric-algolia`
 * Algolia search component
 *
 * @demo demo/index.html
 */
import "algoliasearch/dist/algoliasearch.min.js";
import {customElement, LitElement, property, PropertyValues} from "lit-element";

@customElement("fabric-algolia")
export class FabricAlgolia extends LitElement {
  /**
   * Algolia Application ID
   */
  @property({type: String, attribute: "application-id"})
  public applicationId = null;

  /**
   * Algolia Api Key
   */
  @property({type: String, attribute: "api-key"}) public apiKey = null;

  /**
   * Index
   */
  @property({type: String, attribute: "index"}) public index = null;

  /**
   * Algolia Settings
   */
  @property({type: Object, attribute: "settings"}) public settings = null;

  /**
   * Algolia Settings
   */
  @property({type: Object, attribute: "response"}) public response = null;

  /**
   * Response hits
   */
  @property({type: Array, attribute: "hits", reflect: true}) public hits = [];

  /**
   * Response error
   */
  @property({type: Object, attribute: "error", reflect: true})
  public error = {};

  /**
   * Response error
   */
  @property({type: String, attribute: "query"}) public query = null;

  /**
   * Update event
   * @param {PropertyValues} changedProperties
   */
  protected updated(changedProperties: PropertyValues) {
    // @ts-ignore
    changedProperties.forEach((oldValue, propName) => {
      switch (propName) {
        case "query":
          this._queryObserver();
          break;
        case "hits":
        case "error":
        case "response":
          this._notify(`${propName}-changed`);
          break;
      }
    });
  }

  /**
   * Send query to Algolia & return results.
   *
   * @private
   */
  private _queryObserver() {
    this.error = null;
    this.hits = [];
    const query = this.query;
    if (!query) {
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
      message: "Something is missing: ",
      status: 400,
    };

    if (!applicationID || !apiKey || !index) {
      if (!applicationID) {
        error.message += "applicationId, ";
      }
      if (!apiKey) {
        error.message += "apiKey, ";
      }
      if (!index) {
        error.message += "index";
      }
      this.error = error;
      return;
    }

    /**
     * Set up algolia search
     */
    // @ts-ignore
    const client = window.algoliasearch(applicationID, apiKey);
    const indexRef = client.initIndex(index);
    // Define search settings
    if (settings) {
      indexRef.setSettings(settings);
    }

    indexRef.search(query, (err, content) => {
      if (err) {
        this.error = err;
      }
      this.response = content;
      this.hits = content.hasOwnProperty("hits") ? content.hits : [];
    });
  }

  /**
   * Trigger event
   *
   * @param {string} name
   * @private
   */
  private _notify(name) {
    const event = new CustomEvent(name, {
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "fabric-algolia": FabricAlgolia;
  }
}
