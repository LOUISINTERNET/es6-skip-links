export default (function () {
  /**
   * Closest polyfill
   * source: https://developer.mozilla.org/en-US/docs/Web/API/Element/closest
   */
  if (window.Element && !Element.prototype.closest) {
    Element.prototype.closest = function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i,
        el = this
      do {
        i = matches.length
        while (--i >= 0 && matches.item(i) !== el) {}
      } while (i < 0 && (el = el.parentElement))
      return el
    }
  }

  /**
   * CustomEvent polyfill from:
   * source: https://developer.mozilla.org/en-US/docs/Web/API/CustomEvent/CustomEvent
   */
  if (typeof window.CustomEvent !== 'function') {
    const CustomEvent = function (event, params) {
      params = params || {
        bubbles: false,
        cancelable: false,
        detail: undefined,
      }
      var evt = document.createEvent('CustomEvent')
      evt.initCustomEvent(
        event,
        params.bubbles,
        params.cancelable,
        params.detail
      )
      return evt
    }

    CustomEvent.prototype = window.Event.prototype

    window.CustomEvent = CustomEvent
  }

  /**
   * forEach polyfill from:
   * https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
   */
  if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, argument) {
      argument = argument || window
      for (var i = 0; i < this.length; i++) {
        callback.call(argument, this[i], i, this)
      }
    }
  }
})()
