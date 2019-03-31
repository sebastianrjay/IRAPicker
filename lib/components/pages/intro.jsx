import React from 'react'
import {
  ROTH_IRA_DESCRIPTION_URL,
  TRADITIONAL_IRA_DESCRIPTION_URL,
} from '../../constants/external_links'

const Intro = () => (
  <div className="row mb-5">
    <div className="col-md-12">
      <p>
        Not sure whether to invest in a <a 
          href={ROTH_IRA_DESCRIPTION_URL}
          target="_blank"
        >Roth</a> or <a
          href={TRADITIONAL_IRA_DESCRIPTION_URL}
          target="_blank"
        >traditional</a> IRA this year? Calculate your best option here, for free.
      </p>
    </div>
  </div>
)

export default Intro
