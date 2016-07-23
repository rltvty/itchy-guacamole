import { connect } from 'react-redux'

const getSets = (cards) => {
  let sets = []

  cards.forEach(item => {
    let setName = item.set.split("_").join(" ")
    if (!sets.includes(setName)) {
      sets.push(setName)
    }
  })

  return sets.sort().map((set, index) => (
    <li key={index}>{set}</li>
  ))
}

const getResources = (deck) => {
  let resources = []

  if(deck.potions) { resources.push("Potions") }
  if(deck.ruins) { resources.push("Ruins") }
  if(deck.shelters) { resources.push("Shelters") }
  if(deck.spoils) { resources.push("Spoils") }
  if(deck.colonies_and_platinums) { resources.push("Colonies/Platinums") }

  return resources.sort().map((set, index) => (
    <li key={index}>{set}</li>
  ))
}

const getHardware = (hardware) => {
  let hardwareNames = []

  hardware.forEach(item => {
    if(!hardwareNames.includes(item)) {
      hardwareNames.push(item.split("_").join(" "))
    }
  }

  return hardwareNames.sort().map((name, index) => (
    <li key={index}>{name}</li>
  ))
}

const mapStateToProps = (state) => ({
  deck: state.deck
})

const Meta = ({deck}) => (
  <div id='meta'>
    <div id='getSetNames'>
      <h3>Sets Needed</h3>
      <ul>{getSets(deck.cards)}</ul>
    </div>

    <div id='resources'>
      <h3>Resources</h3>
      <ul>{getResources(deck)}</ul>
    </div>

    <div id='hardware'>
      <h3>Hardware</h3>
      <ul>{getHardware(deck.hardware)}</ul>
    </div>
  </div>
)

const MetaContainer = connect(mapStateToProps)(Meta)

exports { MetaContainer, Meta }
