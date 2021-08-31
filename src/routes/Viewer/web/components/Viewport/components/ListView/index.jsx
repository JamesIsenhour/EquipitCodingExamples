import React from 'react'
import PropTypes from 'prop-types'
import './ListView.scss'
import Slideshow from 'components/Slideshow'
import Item from './components/Item'

class ListView extends React.Component {
  constructor (props) {
    super(props)
  }

  render () {
    const results = this.props.items.map((item, index) => (
      <Item
        key={`${item.get('name')}_${index}`}
        slotNo={index}
        onClick={this.props.onClickItem}
        name={item.get('name')}
        image={_EQ.getItemImage(item)}
      />
    ))

    return (
      <div styleName='list_container'>
        <h2 styleName='slideshow_title'>{this.props.title }</h2>
        <div styleName='results_container'>
          <Slideshow columns={this.props.columns} rows={this.props.rows}>
            {results}
          </Slideshow>
        </div>
      </div>
    )
  }
}

ListView.propTypes = {
  items: PropTypes.object, // Immutable list
  onClickItem: PropTypes.func.isRequired,
  columns: PropTypes.number,
  rows: PropTypes.number,
  title: PropTypes.string,
}

ListView.defaultProps = {
  title: 'Loadouts List View',
  columns: 2,
  rows: 5,
}

export default ListView
