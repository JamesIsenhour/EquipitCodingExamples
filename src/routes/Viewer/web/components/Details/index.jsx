import React from 'react'
import { Link } from 'react-router-dom'
import { List } from 'immutable'
import capitalize from 'lodash/capitalize'
import './Details.scss'
import PropTypes from 'prop-types'
import Icon from 'components/Icon'

const buildTag = (tag, index, array) => (
  <Link to={`/search?q=${tag}&page=1`} key={tag} styleName='tag'>
    {capitalize(tag)}{array.length - 1 === index ? '' : ','}
  </Link>
)

const Details = props => (
  <div styleName='details_container'>
    <h1>{props.title}</h1>
    <p>{props.description}</p>
    <div styleName='tag_container'>
      <Icon name='tag' version='alternate' width={30} height={30} />
      <div styleName='tag_list'>
        <h3>Tags</h3>
        <div styleName='tag_links'>
          {
            props.tags.size > 0 ? props.tags.map(buildTag) : ''
          }
        </div>
      </div>
    </div>
  </div>
)

Details.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string,
  tags: PropTypes.instanceOf(List).isRequired,
}

Details.defaultProps = {
  title: 'No title'
}

export default Details
