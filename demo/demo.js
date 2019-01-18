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
      query: {
        type: String,
        hasChanged(newVal, oldVal) {
          if (newVal > oldVal) {
            console.log(`${newVal} > ${oldVal}. hasChanged: true.`);
            return true;
          } else {
            console.log(`${newVal} <= ${oldVal}. hasChanged: false.`);
            return false;
          }
        },
      },
      response: {
        type: Object,
      },
      hits: {
        type: Array,
        // observer: 'responseObserver',
      },
      resp: {
        type: String,
      },
    };
  }

  connectedCallback() {
    super.connectedCallback();
    // setTimeout(() => {
    //   this.query = 'mee';
    // }, 500);
  }

  render() {
    // const {query} = this;
    return html`
      <!--<style is="custom-style">
        :host {
          display: block;
        }
      </style>-->
      <paper-input type="search"
      label="Search a movie"
      value="${this.query}"
      @change="${(value) => {
      console.log('times are changing', value);
      console.log(this.query);
      // this.query = this.query;
    }}"></paper-input>
      <input type="search" value="${this.query}" aria-label="jumm">a</input>
      <!--
        <fabric-algolia application-id="latency"
        api-key="6be0576ff61c053d5f9a3225e2a90f76"
        index="movies" query="[[query]]"
        response="{{response}}"></fabric-algolia>
      -->

      <h1>query = ${this.query}</h1>
      <h1>resp = ${this.resp}</h1>
      <div>whales: ${'🐳'.repeat(5)}</div>

      <!--<template is="dom-repeat" items="[[hits]]">-->
        <!--<paper-card image="[[item.image]]">-->
          <!--<div class="card-content">-->
            <!--<h4>[[item.title]]</h4>-->
            <!--&lt;!&ndash; <h5>[[item.year]]</h5> &ndash;&gt;-->
            <!--&lt;!&ndash; <p>[[item.genre]]</p> &ndash;&gt;-->
          <!--</div>-->
        <!--</paper-card>-->
      <!--</template>-->
    `;
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

customElements.define('demo-element', DemoElement);
