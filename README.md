# itchy-guacamole
Dom Bot App :tada:

## Use

The server accepts some ENV variables.  `SETS` is a comma-delimited list
of Dominion sets to use when generating decks.  See `deck/cards.go` for
valid values.  Example:

```
SETS=Dominion,DarkAges,Adventures go run main.go
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

```
curl -u user:password -X POST -d '{"trashing": 10, "random": 9, "chaining": 8, "cost_spread": 7, "set_count": 6, "mechanic_count": 5}' 'localhost:8000/deck'
curl -u user:password 'localhost:8000/deck/ABEAPQBiAHgAFgBMAIoAGAA0ADYA'
```
