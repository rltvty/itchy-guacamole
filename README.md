# itchy-guacamole
Dom Bot App :tada:

## Use

The server accepts some ENV variables.  `SETS` is a comma-delimited list
of Dominion sets to use when generating decks.  See `deck/cards.go` for
valid values.  Example:

```
SETS=dominion,dark_ages,adventures go run main.go
```

You can also specify a `PORT` value to control the port on which the API is
served.



## Starting Victory Cards & House Rules

* All victory card counts below are after each player has thier starter deck.

### 2 Player Game

#### Victory Cards
* Estates: 8
* Duchys: 8
* Provinces: 8
* Colonies: 8  (only if selected in a Prosperity game)
* Any other victory cards in the supply should be reduced to 8

#### Game End
* 3 piles gone (or Provinces or Colonies) 
* No extra turns

### 3-4 Player Game

#### Victory Cards
* Estates: 12
* Duchys: 12
* Provinces: 12
* Colonies: 12  (only if selected in a Prosperity game)

#### Game End
* 3 piles gone (or Provinces or Colonies) 
* No extra turns

### 5 Player Game

#### Victory Cards
* Estates: 12
* Duchys: 12
* Provinces: 15
* Colonies: 12  (only if selected in a Prosperity game)

#### Game End
* 4 piles gone (or Provinces or Colonies) 
* Equal turns and phantom Provinces (and Colonies in a Prosperity game)

### 6 Player Game

#### Victory Cards
* Estates: 12
* Duchys: 12
* Provinces: 18
* Colonies: 12  (only if selected in a Prosperity game)

#### Game End
* 5 piles gone (or Provinces or Colonies) 
* Equal turns and phantom Provinces (and Colonies in a Prosperity game)

## API

Create a deck

```
POST /deck
{
  "sets": {
    "seaside": false, // Sets are included by default
    "governor": false,
  },
  "weights": {
    "trashing": 0,
    "random": 2,
    "chaining": 1,
    "cost_spread": 3,
    "set_count": 1,
    "mechanic_count": 0
  },
}

{
  "id": "foo",
  "cards": [],
  "events": [],
  "colonies_and_platinums": false,
  "shelters": false,
  "potions": false,
  "ruins": false,
  "hardware": {
    "coin_tokens": false,
    "victory_tokens": false,
    "minus_one_card_tokens": false,
    "minus_one_coin_tokens": false,
    "journey_tokens": false,
    "tavern_mats": false,
    "trade_route_mats": false,
    "native_village_mats": false
  }
}
```

Fetch a deck

```
GET /deck/foo
{
  "id": "foo",
  "cards": [],
  "events": [],
  "colonies_and_platinums": false,
  "shelters": false,
  "potions": false,
  "ruins": false,
  "hardware": {
    "coin_tokens": false,
    "victory_tokens": false,
    "minus_one_card_tokens": false,
    "minus_one_coin_tokens": false,
    "journey_tokens": false,
    "tavern_mats": false,
    "trade_route_mats": false,
    "native_village_mats": false
  }
}
```
