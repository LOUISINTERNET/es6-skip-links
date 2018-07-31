/*
 * States
 */
const OPEN = 'open'
const CLOSED = 'closed'

/**
 * Config
 */
const config = {
  dataLinkAttr: 'data-skip-link',
  dataClassAttr: 'data-skip-class',
  dataCloseAttr: 'data-skip-close',
  dataIgnoreBody: 'data-skip-ignore-body',
  dataGroupAttr: 'data-skip-group',
  dataBreakpointAttr: 'data-skip-breakpoint',
  dataBreakpointCloseAttr: 'data-skip-breakpoint-close',
  dataStateAttr: 'data-skip-state',

  activeClass: 'is-visible',
  smartClose: true,
  wrapper: document.querySelector('html'),

  version: '2.4.1',
  isActive: true,
}

export { OPEN, CLOSED, config }
