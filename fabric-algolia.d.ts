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
import { LitElement, PropertyValues } from "lit-element";
export declare class FabricAlgolia extends LitElement {
    /**
     * Algolia Application ID
     */
    applicationId: any;
    /**
     * Algolia Api Key
     */
    apiKey: any;
    /**
     * Index
     */
    index: any;
    /**
     * Algolia Settings
     */
    settings: any;
    /**
     * Algolia Settings
     */
    response: any;
    /**
     * Response hits
     */
    hits: any[];
    /**
     * Response error
     */
    error: {};
    /**
     * Response error
     */
    query: any;
    /**
     * Update event
     * @param {PropertyValues} changedProperties
     */
    protected updated(changedProperties: PropertyValues): void;
    /**
     * Send query to Algolia & return results.
     *
     * @private
     */
    private _queryObserver;
    /**
     * Trigger event
     *
     * @param {string} name
     * @private
     */
    private _notify;
}
declare global {
    interface HTMLElementTagNameMap {
        "fabric-algolia": FabricAlgolia;
    }
}
