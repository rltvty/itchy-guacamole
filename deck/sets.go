package deck

// Set describes different dominion games and promotional cards
type Set string

const (
	Dominion           Set = "Dominion"
	Intrigue           Set = "Intrigue"
	Seaside            Set = "Seaside"
	Alchemy            Set = "Alchemy"
	Prosperity         Set = "Prosperity"
	Cornucopia         Set = "Cornucopia"
	Hinterlands        Set = "Hinterlands"
	DarkAges           Set = "DarkAges"
	Guilds             Set = "Guilds"
	Adventures         Set = "Adventures"
	PromoEnvoy         Set = "Envoy"
	PromoBlackMarket   Set = "BlackMarket"
	PromoStash         Set = "Stash"
	PromoWalledVillage Set = "WalledVillage"
	PromoGovernor      Set = "Governor"
	PromoPrince        Set = "Prince"
	PromoSummon        Set = "Summon"
)

// Sets is a struct for defining a group of sets
type Sets struct {
	Dominion           bool `json:"dominion"`
	Intrigue           bool `json:"intrigue"`
	Seaside            bool `json:"seaside"`
	Alchemy            bool `json:"alchemy"`
	Prosperity         bool `json:"prosperity"`
	Cornucopia         bool `json:"cornucopia"`
	Hinterlands        bool `json:"hinterlands"`
	DarkAges           bool `json:"dark_ages"`
	Guilds             bool `json:"guilds"`
	Adventures         bool `json:"adventures"`
	PromoEnvoy         bool `json:"envoy"`
	PromoBlackMarket   bool `json:"black_market"`
	PromoStash         bool `json:"stash"`
	PromoWalledVillage bool `json:"walled_village"`
	PromoGovernor      bool `json:"governor"`
	PromoPrince        bool `json:"prince"`
	PromoSummon        bool `json:"summon"`
}

// Include returns true if a given set is included in the Sets group
func (s Sets) Include(set Set) bool {
	switch set {
	case Dominion:
		return s.Dominion
	case Intrigue:
		return s.Intrigue
	case Seaside:
		return s.Seaside
	case Alchemy:
		return s.Alchemy
	case Prosperity:
		return s.Prosperity
	case Cornucopia:
		return s.Cornucopia
	case Hinterlands:
		return s.Hinterlands
	case DarkAges:
		return s.DarkAges
	case Guilds:
		return s.Guilds
	case Adventures:
		return s.Adventures
	case PromoEnvoy:
		return s.PromoEnvoy
	case PromoBlackMarket:
		return s.PromoBlackMarket
	case PromoStash:
		return s.PromoStash
	case PromoWalledVillage:
		return s.PromoWalledVillage
	case PromoGovernor:
		return s.PromoGovernor
	case PromoPrince:
		return s.PromoPrince
	case PromoSummon:
		return s.PromoSummon
	default:
		return false
	}
}

func (s *Sets) Add(set Set) {
	switch set {
	case Dominion:
		s.Dominion = true
	case Intrigue:
		s.Intrigue = true
	case Seaside:
		s.Seaside = true
	case Alchemy:
		s.Alchemy = true
	case Prosperity:
		s.Prosperity = true
	case Cornucopia:
		s.Cornucopia = true
	case Hinterlands:
		s.Hinterlands = true
	case DarkAges:
		s.DarkAges = true
	case Guilds:
		s.Guilds = true
	case Adventures:
		s.Adventures = true
	case PromoEnvoy:
		s.PromoEnvoy = true
	case PromoBlackMarket:
		s.PromoBlackMarket = true
	case PromoStash:
		s.PromoStash = true
	case PromoWalledVillage:
		s.PromoWalledVillage = true
	case PromoGovernor:
		s.PromoGovernor = true
	case PromoPrince:
		s.PromoPrince = true
	case PromoSummon:
		s.PromoSummon = true
	}
}

func (s *Sets) Intersect(other Sets) {
	s.Dominion = s.Dominion && other.Dominion
	s.Intrigue = s.Intrigue && other.Intrigue
	s.Seaside = s.Seaside && other.Seaside
	s.Alchemy = s.Alchemy && other.Alchemy
	s.Prosperity = s.Prosperity && other.Prosperity
	s.Cornucopia = s.Cornucopia && other.Cornucopia
	s.Hinterlands = s.Hinterlands && other.Hinterlands
	s.DarkAges = s.DarkAges && other.DarkAges
	s.Guilds = s.Guilds && other.Guilds
	s.Adventures = s.Adventures && other.Adventures
	s.PromoEnvoy = s.PromoEnvoy && other.PromoEnvoy
	s.PromoBlackMarket = s.PromoBlackMarket && other.PromoBlackMarket
	s.PromoStash = s.PromoStash && other.PromoStash
	s.PromoWalledVillage = s.PromoWalledVillage && other.PromoWalledVillage
	s.PromoGovernor = s.PromoGovernor && other.PromoGovernor
	s.PromoPrince = s.PromoPrince && other.PromoPrince
	s.PromoSummon = s.PromoSummon && other.PromoSummon
}

func (s Sets) Empty() bool {
	return !s.Dominion &&
		!s.Intrigue &&
		!s.Seaside &&
		!s.Alchemy &&
		!s.Prosperity &&
		!s.Cornucopia &&
		!s.Hinterlands &&
		!s.DarkAges &&
		!s.Guilds &&
		!s.Adventures &&
		!s.PromoEnvoy &&
		!s.PromoBlackMarket &&
		!s.PromoStash &&
		!s.PromoWalledVillage &&
		!s.PromoGovernor &&
		!s.PromoPrince &&
		!s.PromoSummon
}
