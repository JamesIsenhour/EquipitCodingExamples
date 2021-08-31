import React from 'react'
import './RelatedLoadouts.scss'
import PropTypes from 'prop-types'
import Slideshow from 'components/Slideshow'
import LoadoutLink from './components/LoadoutLink'

class RelatedLoadouts extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const loadouts = this.props.loadouts
      .filter(loadout => loadout.get('status') === 'published')
      .map(loadout => (
        <LoadoutLink key={loadout.get('code')}
          loadout={{ code: loadout.get('code'), image: loadout.get('thumbnail_uri'), name: loadout.get('name') }}
        />
      ))

    return (
      <div styleName='details_container'>
        <h2>User's Other Loadouts</h2>
        <Slideshow initialize={this.props.initialize} columns={this.props.columns} rows={this.props.rows}>
          {loadouts}
        </Slideshow>
      </div>
    )
  }
}

RelatedLoadouts.propTypes = {
  initialize: PropTypes.func.isRequired,
  loadouts: PropTypes.object.isRequired,
  columns: PropTypes.number,
  rows: PropTypes.number,
}

RelatedLoadouts.defaultProps = {
}

export default RelatedLoadouts
