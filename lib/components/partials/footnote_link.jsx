import React from 'react'

const FootnoteLink = ({ to }) => (
  <a className="font-weight-normal" href={`#footnote-${to}`}>
    <sup>[{to}]</sup>
  </a>
)

export default FootnoteLink
