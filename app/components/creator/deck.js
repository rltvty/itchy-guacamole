import { connect } from 'react-redux'
import { Card } from './Card'
import { Meta } from './Meta'

const mapStateToProps = (state) => ({
  deck: state.deck
})

const Deck = ({deck}) => (
  <div id='deck'>
    <Meta />
    <div id='cards'>
      {deck.cards.map((card, index) => (
        <Card key={index} card={card} />
      ))}
    </div>
    <a id='share-deck' title='Share this deck' href={"/?id=" + deck.id} target="_blank">Share this deck</a>
  </div>
)

const DeckContainer = connect(mapStateToProps)(Deck)

export { DeckContainer, Deck }
