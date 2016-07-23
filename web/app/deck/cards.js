import { connect } from 'react-redux'
import { Meta } from './Meta'

const mapStateToProps = (state) => ({
  deck: state.deck
})

const Card = ({card}) => {
  let setName = card.set.split('_').join(' ')
  let cardImg = '/static/images/dominion-cards/' + card.name.split(' ').join('_') + '.jpg'

  return (
    <div className='card'>
      <p>{setName}</p>
      <img src={cardImg}></img>
    </div>
  )
}

const Cards = ({deck}) => (
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

const CardsContainer = connect(mapStateToProps)(Cards)

export { CardsContainer, Cards, Cards }
