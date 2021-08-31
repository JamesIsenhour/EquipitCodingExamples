/*
  @author: James Isenhour
*/

import React from 'react'
import PropTypes from 'prop-types'
import styles from './EditableTextareaInput.scss' // eslint-disable-line no-unused-vars
import StyleLib from '../../styles/StyleLibrary.scss' // eslint-disable-line no-unused-vars
import Icon from 'shared/components/Icon'
import TextareaInput from 'components/TextareaInput'

class EditableTextareaInput extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false
    }
  }

  handleStartEdit = () => {
    this.setState({
      editing: true
    })
  }

  handleOnApply = (e) => {
    this.setState({
      editing: false
    })
    this.props.onApply(this.props.value, this.props.name)
  }

  handleOnCancel = (e) => {
    this.setState({
      editing: false
    })
    this.props.onCancel()
  }

  render () {
    let editButton
    if (this.props.editable) {
      editButton = (
        <div styleName='styles.icon_button'>
          <Icon name='editPencilLarge' fill={this.state.editing ? '#ED7C00' : undefined} />
        </div>
      )
    }

    let editText = <p styleName='styles.uneditable_text'>{this.props.value || this.props.placeholder}</p>
    let editTextSaveTools

    if (this.state.editing) {
      editTextSaveTools = (
        <div styleName='styles.textarea_editing_save_controls'>
          <button
            styleName='StyleLib.eq_link'
            onClick={this.handleOnApply}
          >
            Apply Changes
          </button>
          &nbsp;|&nbsp;
          <button
            styleName='StyleLib.eq_link'
            onClick={this.handleOnCancel}
          >
            Cancel
          </button>
        </div>
      )
      editText = (
        <TextareaInput
          handleOnChange={this.props.onChange}
          name={this.props.name}
          pattern={this.props.pattern}
          placeholder={this.props.placeholder}
          tooltip={this.props.tooltip}
          value={this.props.value || ''}
        >
          {this.props.children}
        </TextareaInput>
      )
    }

    return (
      <div
        styleName='styles.editable_textarea_container'
        style={{
          width: this.props.width,
          maxWidth: this.props.width,
          height: this.props.height,
          minHeight: this.props.height
        }}
      >
        <div styleName='styles.textarea_editing_tools_container'>
          <label
            styleName='styles.textarea_editing_label'
            onClick={this.props.editable ? this.handleStartEdit : undefined}
          >
            <p>{this.props.label}</p>
            {editButton}
          </label>
          {editTextSaveTools}
        </div>
        {editText}
      </div>
    )
  }
}

EditableTextareaInput.propTypes = {
  children:      PropTypes.node,
  editable:      PropTypes.bool,
  onApply:       PropTypes.func.isRequired,
  onCancel:      PropTypes.func.isRequired,
  onChange:      PropTypes.func.isRequired,
  label:         PropTypes.string,
  name:          PropTypes.string.isRequired,
  pattern:       PropTypes.string,
  placeholder:   PropTypes.string,
  tooltip:       PropTypes.string,
  value:         PropTypes.string,
  height:         PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),
  width:         PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ])
}

EditableTextareaInput.defaultProps = {
  editable: false,
  width: '100%',
  height: '100%',
}

export default EditableTextareaInput
