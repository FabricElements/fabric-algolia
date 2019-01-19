var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
import { customElement, LitElement, property } from "lit-element";
let FabricAlgolia = class FabricAlgolia extends LitElement {
    constructor() {
        super(...arguments);
        /**
         * Algolia Application ID
         */
        this.applicationId = null;
        /**
         * Algolia Api Key
         */
        this.apiKey = null;
        /**
         * Index
         */
        this.index = null;
        /**
         * Algolia Settings
         */
        this.settings = null;
        /**
         * Algolia Settings
         */
        this.response = null;
        /**
         * Response hits
         */
        this.hits = [];
        /**
         * Response error
         */
        this.error = {};
        /**
         * Response error
         */
        this.query = null;
    }
    /**
     * Update event
     * @param {PropertyValues} changedProperties
     */
    updated(changedProperties) {
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
    _queryObserver() {
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
    _notify(name) {
        const event = new CustomEvent(name, {
            bubbles: true,
            composed: true,
        });
        this.dispatchEvent(event);
    }
};
__decorate([
    property({ type: String, attribute: "application-id" })
], FabricAlgolia.prototype, "applicationId", void 0);
__decorate([
    property({ type: String, attribute: "api-key" })
], FabricAlgolia.prototype, "apiKey", void 0);
__decorate([
    property({ type: String, attribute: "index" })
], FabricAlgolia.prototype, "index", void 0);
__decorate([
    property({ type: Object, attribute: "settings" })
], FabricAlgolia.prototype, "settings", void 0);
__decorate([
    property({ type: Object, attribute: "response" })
], FabricAlgolia.prototype, "response", void 0);
__decorate([
    property({ type: Array, attribute: "hits", reflect: true })
], FabricAlgolia.prototype, "hits", void 0);
__decorate([
    property({ type: Object, attribute: "error", reflect: true })
], FabricAlgolia.prototype, "error", void 0);
__decorate([
    property({ type: String, attribute: "query" })
], FabricAlgolia.prototype, "query", void 0);
FabricAlgolia = __decorate([
    customElement("fabric-algolia")
], FabricAlgolia);
export { FabricAlgolia };
//# sourceMappingURL=fabric-algolia.js.map