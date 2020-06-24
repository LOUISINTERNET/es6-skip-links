import polyfill from './polyfill.js' // jshint ignore:line
import { OPEN, config } from './config.js'
import Collection from './collection.js'

class Skiplinks {
  constructor(links = document.querySelectorAll(`[${config.dataLinkAttr}]`)) {
    this.version = config.version

    // Create cache
    this.collection = new Collection(this, links)

    // Context binding for event handling
    this.bindToContext(this, 'handleClick', 'handleBodyClick', 'handleEsc')

    if (this.collection.size > 0) {
      this.collection.addEvents()
    }

    // Activate all links with init state
    this.collection.triggerInitState()
  }

  bindToContext(context, ...methods) {
    methods.forEach(
      (method) => (context[method] = context[method].bind(context))
    )
  }

  handleClick(event) {
    if (!config.isActive) {
      return
    }

    let id = event.currentTarget.getAttribute(config.dataLinkAttr),
      cache = this.collection.filterById(id)

    if (cache === undefined) return

    // Ignore action if breakpoint attribute is set and is also true
    if (cache.breakpoint !== undefined) {
      const vpWidth = window.innerWidth
      const breakpoint = cache.breakpoint.split(',')
      if (
        (breakpoint[0] > vpWidth && !breakpoint[1]) ||
        breakpoint[0] > vpWidth ||
        breakpoint[1] < vpWidth
      )
        return
    }

    event.preventDefault()
    event.stopPropagation()

    if (cache !== undefined) {
      this.toggleTarget(cache)
    }
  }

  handleInnerClick(event) {
    if (!config.isActive) {
      return
    }

    let target = event.target,
      closeId = target.getAttribute(config.dataCloseAttr)

    if (closeId && target.closest(`#${closeId}`) !== null) {
      let cache = this.collection.filterById(closeId)

      if (cache !== undefined) {
        this.collection.toggleCaches(cache)
        return true
      }
    } else if (this.collection.hasParentTarget(target)) {
      return true
    }

    return false
  }

  handleBodyClick(event) {
    if (!config.isActive) {
      return
    }

    // Handle if is close button
    const isInnerClick = this.handleInnerClick(event)

    // If active smartClose close all open skip links
    if (config.smartClose && !isInnerClick) {
      let caches = this.collection.filterByKey([
        {
          key: 'siblingState',
          value: undefined,
        },
        {
          key: 'ignoreBody',
          value: undefined,
        },
        {
          key: 'state',
          value: OPEN,
        },
      ])

      if (caches.length) {
        this.collection.toggleCaches(...caches)
      }
    }
  }

  handleEsc(event) {
    if (event.keyCode !== 27) return

    const activeLinks = this.collection
      .filterByKey([{ key: 'state', value: 'open' }])
      .forEach((cache) => {
        const close = cache.target.querySelector(
          `[${config.dataCloseAttr}="${cache.target.id}"]`
        )
        if (close) close.click()
      })
  }

  toggleTarget(cache) {
    if (!config.isActive) {
      return
    }

    let elemsToToggle = []

    // Prevent closing target or target from group with init state or sibling with init state
    if (
      (cache.siblingState === 'open' || cache.initState) &&
      cache.state === OPEN
    ) {
      return false
    }

    // Close all open siblings from group
    if (cache.group !== undefined) {
      let groupSibling = this.collection.filterByKey(
        [
          {
            key: 'group',
            value: cache.group,
          },
          {
            key: 'state',
            value: OPEN,
          },
        ],
        cache.id
      )

      if (groupSibling.length) {
        elemsToToggle.push(...groupSibling)
      }
    }

    // Toggle elems (update cache and state)
    elemsToToggle.push(cache)
    this.collection.toggleCaches(...elemsToToggle)
  }

  toggleId(id) {
    let cache = this.collection.filterById(id)

    if (cache !== undefined) {
      this.toggleTarget(cache)
    }
  }

  stop() {
    config.isActive = false
  }

  start() {
    config.isActive = true
  }

  remove(node = undefined, fixClass = true) {
    if (!config.isActive) {
      return
    }

    // Get node from jQuery object
    if (typeof node === 'object') {
      node = node[0]
    }

    if (node === undefined) {
      this.collection.clear(fixClass)
    } else {
      this.collection.clearDom(node, fixClass)
    }
  }

  reInit(node = document.querySelectorAll(`[${config.dataLinkAttr}]`)) {
    if (!config.isActive) {
      return
    }

    this.collection.createItems(node)

    if (this.collection.size > 0) {
      this.collection.addEvents()
    }

    this.collection.triggerInitState()
  }
}

export default new Skiplinks()
