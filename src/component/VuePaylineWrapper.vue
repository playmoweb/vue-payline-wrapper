<template>
    <div :class="`${noClose?'noClose':''}`">
        <div id="PaylineWidget"
             data-auto-init="false"
             data-event-didshowstate="didshowstate"
             data-event-finalstatehasbeenreached="handleFinalStateReached"
        />
    </div>
</template>

<script>
import {loadPayline} from "../payline-helper.js";

  /**
   * This component can $emit
   * - @success
   * - @error
   * - @readyToPay
   * - @didshowstate
   * - @handleFinalStateReached
   */
  export default {
    name: "VuePaylineWrapper",
    props: {
      widgetType: {
        type: String,
        default: "lightbox"
      },
      noClose: {
        type: Boolean,
        default: false,
      },
      token: {
        type: String,
        default: undefined
      },
      isHomologation: {
        type: Boolean,
        default: false
      }
    },
    watch: {
      token: {
        immediate: true,
        handler() {
          if (this.token) {
            this.initPayline(this.token);
          }
        }
      }
    },
    computed: {
      payline() {
        return window.Payline;
      },
      isLightbox() {
        return this.widgetType === 'lightbox';
      }
    },
    beforeMount() {
      if (!this.payline) {
        loadPayline(this.isHomologation);
      }
    },
    mounted() {
      // Globally expose internal function, required since the Payline Widget hook the method via the internal jQuery.
      window.handleFinalStateReached = this.handleFinalStateReached;
      window.didshowstate = this.didshowstate;

      // Temporary disable the « escape key »
      if (this.noClose && this.isLightbox) {
        document.addEventListener('keydown', this.noCloseHandler);
      }
    },
    beforeDestroy() {
      // Remove the globally expose method.
      window.handleFinalStateReached = undefined;
      window.didshowstate = undefined;

      // Re-enable the escape key
      if (this.noClose && this.isLightbox) {
        document.removeEventListener('keydown', this.noCloseHandler);
      }
    },
    methods: {
      /**
       * Prevent the usage of the escape key
       */
      noCloseHandler(e) {
        if (this.isLightbox) {
          const key = e.key || e.keyCode;
          if (key === 'Escape' || key === 'Esc' || key === 27) {
            e.preventDefault();
            e.cancelBubble = true;
          }
        }
      },
      /**
       * Init the payline « Widget »
       */
      initPayline(token) {
        this.$emit("readyToPay", false);
        if(this.payline){
          this.payline.Api.reset(token, this.widgetType);
        }
      },
      /**
       * Emit the current Payline state.
       * If the current state is « PAYMENT_METHODS_LIST » consider the Componant as « Ready To Pay ».
       *  * when its ready $emmit readyToPay.
       *  * In every case forward via $emit the Payline state.
       * @param param
       */
      didshowstate(param) {
        if (param.state === "PAYMENT_METHODS_LIST") {
          // The lightbox is _not_ in the middle of the screen so…
          if (this.isLightbox) {
            window.scrollTo(0, 0);
          }

          this.$emit("readyToPay", true);
        }

        this.$emit("didshowstate", param);
      },
      /**
       * Handle the Final state of the component.
       * * Emit success when final state is => PAYMENT_SUCCESS, PAYMENT_SUCCESS_FORCE_TICKET_DISPLAY, PAYMENT_ONHOLD_PARTNER.
       * * Emit error when final state is something else.
       * @param param
       * @returns {boolean}
       */
      handleFinalStateReached(param) {

        this.$emit("handleFinalStateReached", param);

        this.$nextTick().then(() => {
          this.payline.Api.hide();
        });

        switch (param.state) {
          case "PAYMENT_SUCCESS":
          case "PAYMENT_SUCCESS_FORCE_TICKET_DISPLAY":
          case "PAYMENT_ONHOLD_PARTNER":
            this.$emit('success', param);
            return false;
          default:
            this.$emit('error', param);
            return false;
        }
      }
    }
  }
</script>

<style>
    .noClose /deep/ #pl-container-lightbox-header-bar {
        display: none !important;
    }
</style>
