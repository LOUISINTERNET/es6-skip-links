import { OPEN, config } from './config.js'
import Cache from './cache.js'
import _throttle from 'lodash/throttle'

class Collection {
  constructor(Skiplinks, links) {
    this.collection = new Map()
    this.Skiplinks = Skiplinks

    this.createItems(links)
  }

  createItems(links) {
    links.forEach((link) => {
      let id = link.getAttribute(config.dataLinkAttr),
        target = document.querySelector(`#${id}`)

      if (!id || !target) return

      this.collection.set(id, new Cache(id, link, target))
    })
  }

  hasParentTarget(element) {
    let rValue = false

    for (let value of this.collection.values()) {
      if (element.closest(`#${value.id}`) !== null) {
        rValue = true
      }
    }

    return rValue
  }

  filterById(id) {
    return this.collection.get(id)
  }

  filterByKey(keyValuePairs, exceptId) {
    let cachedElems = []
    this.collection.forEach((cache) => {
      if (cache.id === exceptId) {
        return true
      }

      let fit = true
      keyValuePairs.forEach((pair) => {
        if (cache[pair.key] !== pair.value) {
          fit = false
        }
      })

      if (fit) {
        cachedElems.push(cache)
      }
    })

    return cachedElems
  }

  toggleCaches(...caches) {
    if (!config.isActive) {
      return
    }

    caches.forEach((cache) => {
      // Toggle state and classes
      cache.toggleState().toggleClasses()

      const event = new CustomEvent('skipper:stateChange', {
        detail: { cache },
      })

      document.dispatchEvent(event)
    })
  }

  triggerInitState() {
    this.filterByKey([
      {
        key: 'initState',
        value: 'open',
      },
    ]).forEach((elem) => {
      elem.link.click()
    })
  }

  addEvents() {
    this.links.forEach((link) => {
      link.addEventListener('click', this.Skiplinks.handleClick)
    })

    document.addEventListener('click', this.Skiplinks.handleBodyClick)

    document.addEventListener('keydown', this.Skiplinks.handleEsc)

    this.resizeEvent = _throttle((e) => {
      if (!config.isActive) {
        return
      }

      const vpWidth = window.innerWidth

      Array.from(this.collection)
        .filter((arr) => {
          const cache = arr[1]
          if (
            !cache.breakpointClose ||
            cache.state !== OPEN ||
            !cache.breakpoint
          )
            return false

          const breakpoint = cache.breakpoint.split(',')
          return (
            (breakpoint[0] > vpWidth && !breakpoint[1]) ||
            breakpoint[0] > vpWidth ||
            breakpoint[1] < vpWidth
          )
        })
        .forEach((cache) => {
          this.toggleCaches(cache[1])
        })
    }, 250)

    window.addEventListener('resize', this.resizeEvent)
  }

  removeEvents(cache = undefined) {
    //Remove all events
    if (cache === undefined) {
      this.links.forEach((link) => {
        link.removeEventListener('click', this.Skiplinks.handleClick)
      })

      document.removeEventListener('click', this.Skiplinks.handleBodyClick)

      document.removeEventListener('keydown', this.Skiplinks.handleEsc)

      // Remove all events from single cache
    } else {
      cache.link.removeEventListener('click', this.Skiplinks.handleClick)
    }

    window.removeEventListener('resize', this.resizeEvent)
  }

  clear(fixClass) {
    if (fixClass) {
      for (let value of this.collection.values()) {
        if (
          fixClass &&
          value.state === OPEN &&
          value.siblingState === undefined
        ) {
          this.toggleCaches(value)
        }
      }
    }

    this.removeEvents()
    this.collection.clear()
  }

  clearDom(node, fixClass) {
    // Workaround because closest need selector
    let searchClass = 'skip-closest'
    node.classList.add(searchClass)

    for (let value of this.collection.values()) {
      if (
        value.link === node ||
        value.link.closest(`.${searchClass}`) !== null
      ) {
        if (
          fixClass &&
          value.state === OPEN &&
          value.siblingState === undefined
        ) {
          this.toggleCaches(value)
        }
        this.removeEvents(value)
        this.collection.delete(value.id)
      }
    }

    node.classList.remove(searchClass)
  }

  get links() {
    let links = []
    for (let value of this.collection.values()) {
      links.push(value.link)
    }
    return links
  }

  get size() {
    return this.collection.size
  }
}

export default Collection
