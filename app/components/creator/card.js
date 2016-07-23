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

export { Card }
