package deck

import (
	"log"
	"reflect"
	"testing"
	"testing/quick"
)

func TestSerDe(t *testing.T) {
	f := func() bool {
		d := NewRandomDeck()

		id := d.ID()
		d2, err := NewDeckFromID(id)
		if err != nil {
			log.Printf("Failed to deserialize: %s\n", err)
			return false
		}
		if !reflect.DeepEqual(d, d2) {
			log.Printf("%x unequal: %+v != %+v\n", id, d, d2)
			return false
		}
		return true
	}
	if err := quick.Check(f, nil); err != nil {
		t.Error(err)
	}
}
