import { connect } from 'react-redux'
import { Deck } from './deck'
import { Loading, Error } from '../misc'

const mapStateToProps = (state) => ({
  deck: state.deck,
  error: state.error,
  loading: state.loading,
})

const Creator = ({deck, error, loading}) => {
  if (error) {
    return <Error />
  }

  if (loading) {
    <Loading />
  }

  return <Deck deck={deck} />
}
