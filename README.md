# Vue 2.X Payline Widget Wrapper

[![npm version](https://badge.fury.io/js/vue-payline-wrapper.svg)](https://www.npmjs.com/package/@playmoweb/vue-payline-wrapper)
[![npm](https://img.shields.io/npm/l/@playmoweb/vue-payline-wrapper.svg)](https://www.npmjs.com/package/@playmoweb/vue-payline-wrapper)
[![vue2](https://img.shields.io/badge/vue-2.2+-brightgreen.svg)](https://vuejs.org/)

VueJS wrapper component for the web Payline Widget SDK.

_This is an unofficial repository._

## Installation

```shell
npm i --save @playmoweb/vue-payline-wrapper
```

## Usage

```js
import VuePaylineWrapper from '@playmoweb/vue-payline-wrapper';
import Vue from 'vue';
Vue.use(VuePaylineWrapper);
```

```vue
<template>
    <VuePaylineWrapper :noClose="noClose" :token="token" widgetType="lightbox" :isHomologation="isHomologation"
                       @success="(state) => this.logState(state)"
                       @error="(state) => this.logState(state)"
                       @didshowstate="(state) => this.logState(state)"
                       @handleFinalStateReached="(state) => this.logState(state)"
                       @readyToPay="(state) => this.logState(state)"/>
</template>
<script>
    export default {
        name: "samplePayline",
        data(){
            return {
                token: "YOUR-PAYMENT-TOKEN-FROM-DO-WEB-PAYMENT",
                noClose: false,
                isHomologation: false
            }
        },
        methods: {
            logState(state){
                console.log(state);
            }
        }
    }
</script>
```