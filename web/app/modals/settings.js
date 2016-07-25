import { connect } from 'react-redux'

import { SetModalState, SetSettings } from '../utils/actions'

const defaultSettings = {
  sets: ['dominion'],
  weights: {
    trashing: 5,
    random: 5,
    chaining: 5,
    cost_spread: 5,
    set_count: 5,
    mechanic_count: 5
  }
}

const SettingsReducer = (state = defaultSettings, action) => {
  switch (action.type) {
    case 'SET_SETTINGS':
      return action.settings

    default:
      return state
  }
}

const mapStateToProps = (state) => ({
  sets: state.sets,
  settings: state.settings
})

const mapDispatchToProps = (dispatch) => ({
  closeModal() {
    dispatch(SetModalState(false))
  },

  handleSubmit(e, settings, sets) {
    e.preventDefault()
    settings.sets = []

    sets.forEach(set => {
      if (e.target.elements[set].checked) {
        settings.sets.push(set)
      }
    })

    dispatch(SetSettings(settings))
    dispatch(SetModalState(false))
  }
})

const setCheckboxes = (sets, settings) => {
  return sets.map((set, index) => (
    <div key={index}>
      <input type='checkbox' id={set} name={set} defaultChecked={settings.sets.indexOf(set) >= 0} />
      <label htmlFor={set}>{set.split('_').join(' ')}</label>
    </div>
  ))
}

const Settings = ({sets, settings, closeModal, handleSubmit}) => (
  <form id='settings-modal' onSubmit={(e) => handleSubmit(e, settings, sets)}>
    <div className='modal-header'>
      <button type='button' className='close' onClick={closeModal}>&times;</button>
      <h4 className='modal-title'>Deck Settings</h4>
    </div>

    <div className='modal-body text-center'>
      <div id='sets'>
        {setCheckboxes(sets, settings)}
      </div>
    </div>

    <div className='modal-footer'>
      <button type='button' className='btn btn-primary pull-left' onClick={closeModal}>Never Mind</button>
      <button type='submit' className='btn btn-success pull-right'>Save Settings</button>
    </div>
  </form>
)

const SettingsContainer = connect(mapStateToProps, mapDispatchToProps)(Settings)

export { SettingsContainer, Settings, SettingsReducer }
