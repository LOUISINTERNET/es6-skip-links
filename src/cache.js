import { OPEN, CLOSED, config } from './config.js'
import { hyphenToCamelCase, camelCaseToHyphen } from './helper'

class Cache {
  constructor(id, link, target) {
    const dataset = link.dataset
    let state = document.querySelectorAll(
      `[${config.dataGroupAttr}="${
        dataset[hyphenToCamelCase(config.dataGroupAttr)]
      }"][${config.dataStateAttr}]`,
    )

    this.id = id
    this.link = link
    this.target = target
    this.group = dataset[hyphenToCamelCase(config.dataGroupAttr)]
    this.breakpoint = dataset[hyphenToCamelCase(config.dataBreakpointAttr)]
    this.breakpointClose =
      dataset[hyphenToCamelCase(config.dataBreakpointCloseAttr)] !== undefined
        ? true
        : false

    this.ignoreBody = dataset[hyphenToCamelCase(config.dataIgnoreBody)]

    this.linkClass =
      dataset[hyphenToCamelCase(config.dataClassAttr)] || config.activeClass
    this.targetClass =
      target.dataset[hyphenToCamelCase(config.dataClassAttr)] || this.linkClass
    this.wrapperClass = `skip-${this.id}`

    this.initState = dataset[hyphenToCamelCase(config.dataStateAttr)]
    this.siblingState = state.length
      ? state[0].dataset[hyphenToCamelCase(config.dataStateAttr)]
      : undefined
    this.state = CLOSED

    // this.cleanClasses()
  }

  cleanClasses() {
    if (this.link.classList.contains(this.linkClass)) {
      this.link.classList.remove(this.linkClass)
    }

    if (this.target.classList.contains(this.targetClass)) {
      this.target.classList.remove(this.targetClass)
    }

    if (config.wrapper.classList.contains(this.wrapperClass)) {
      config.wrapper.classList.remove(this.wrapperClass)
    }
  }

  toggleClasses() {
    this.link.classList.toggle(this.linkClass)
    this.target.classList.toggle(this.targetClass)
    config.wrapper.classList.toggle(this.wrapperClass)
    return this
  }

  toggleState() {
    this.state = this.state === OPEN ? CLOSED : OPEN
    return this
  }
}

export default Cache
