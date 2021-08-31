import React from 'react'
import './Disclosures.scss'
import TextLayoutWeb from 'layouts/web/TextLayout'
import TextLayoutMob from 'layouts/mobile/TextLayout'
import ViewSelector from 'hocs/ViewSelector'

document.title = document.title.replace(/( \| )([^|]*)$/, `$1Disclosures`)

const url = '/disclosures'

const pageHeader = {
  header: 'Disclosures',
  subText: 'Equipit.com receives compensation through affiliate relationships with merchants listed on this site',
  alignment: 'left',
}

const text = [
  {
    nav: 'overview',
    header: 'Affiliate Overview',
    text: <React.Fragment>
      <p>Equipit.com participates in many different affiliate programs, which are listed below.</p>
      <p>
        An affiliate advertising
         program is designed to provide a means for Equipit to earn advertising fees by advertising and linking to
         various merchants.
      </p>
    </React.Fragment>
  },
  {
    nav: 'amazon',
    header: 'Amazon Services LLC Associates Program',
    text: <React.Fragment>
      <p>As an Amazon Associate, Equipit earns from qualifying purchases.</p>
      <p>
        Product prices and availability are accurate as of the date/time indicated on the product page and are subject
         to change.
      </p>
      <p>
        Any price and availability information displayed on Amazon.com at the time of purchase will apply to
         the purchase of listed products.
      </p>
    </React.Fragment>
  },
  {
    nav: 'avantlink',
    header: 'AvantLink',
    text: <p>
      Equipit.com is a participant in the AvantLink affiliate program. As a result, Equipit earns commission from
       qualifying purchases from merchants within the AvantLink Network.
    </p>
  },
  {
    nav: 'viglink',
    header: 'VigLink',
    text: <React.Fragment>
      <div styleName='link'>
        <a href='https://www.viglink.com/legal/consumer-disclosure/?vgtag=badge'>
          <img src='https://www.viglink.com/images/badges/120x60.png'
            title='Links monetized by VigLink'
            alt='VigLink badge'
            width='120' height='60'
          />
        </a>
      </div>
      <p>
        Equipit.com is a participant in the VigLink affiliate program. As a result, Equipit earns commission from
        qualifying purchases from merchants within the VigLink Network.
      </p>
    </React.Fragment>
  }
]

export default ViewSelector({ url, pageHeader, text })(TextLayoutWeb, TextLayoutMob)
