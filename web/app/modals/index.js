import fetch from 'isomorphic-fetch'
import { connect } from 'react-redux'

import { SetModalState } from '../utils/actions'
import { SettingsContainer } from './settings'

const ModalReducer = (state = false, action) => {
  switch (action.type) {
    case 'SET_MODAL_STATE':
      return action.visible

    default:
      return state
  }
}

const mapStateToProps = (state) => ({
  visible: state.modal
})

const mapDispatchToProps = (dispatch) => ({
  closeModal() {
    dispatch(SetModalState(false))
  }
})

const ModalWrapper = (props) => {
  if (!props.visible) {
    return null
  }

  return (
    <div className='modal-wrapper'>
      <div className='modal-backdrop in' onClick={props.closeModal}></div>
      <div className='modal-content in'>
        <SettingsContainer {...props} />
      </div>
    </div>
  )
}

const ModalWrapperContainer = connect(mapStateToProps, mapDispatchToProps)(ModalWrapper)

export { ModalWrapperContainer, ModalWrapper, ModalReducer }
