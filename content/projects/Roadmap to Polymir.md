# POLYMIR ROADMAP

**Last Updated:** November 1, 2025

**Alpha Target:** November 11, 2025  
**Multiplayer Beta Target:** January 11, 2026

---

## Core Architecture


### Dimensional Gates & Portals

- [ ] Real-time rendering between coordinate systems
- [ ] Parallel layer loading for linked spaces
- [ ] Seamless transitions through portals
- [ ] Block-anchored dimensional gates

### Pocket Dimensions

- [x] Personal pocket dimension creation
- [x] Manual block location association
- [x] 2-block minimum door size for traversal
- [ ] Infinite space nesting capability
- [ ] Ship quarters integration

### Gravity & Atmosphere

- [x] Procedural atmosphere rendering (biome-based haze)
- [ ] Day/night color blending
- [x] Gravity radius visualization
- [x] Simplified orbital capture mechanics (radius × time)
- [ ] Atmosphere density gradient

### 4D Traversal

- [x] 3D frame advancement system
- [ ] Multiple slice navigation
- [ ] Safe frame transitions (wall suffocation prevention)
- [ ] Volumetric microblock animation

## World & Content Generation

- [x] 3D model painter for distance models
- [x] Terrain painter → voxelization pipeline
- [x] Default planet templates
- [x] Semirealistic solar system backgrounds
- [ ] Procedural Backrooms generation
- [ ] Voxelgon creation at higher linked layer counts

## Player Systems

### Player Types

- [ ] Neutral player type
    - [ ] Higher Lore acquisition chance
    - [ ] Reduced scan visibility
    - [ ] Reduced ship destruction losses
    - [ ] Stargate claiming capability
    - [ ] Weapon purchase restriction
    - [ ] Faction join restriction
    - [ ] Convoy travel (fuel sharing)
- [ ] Factions player type
    - [ ] Weapon access
    - [ ] Territory claiming
    - [ ] Group missions

### Stargate Network

- [ ] Neutral territory gates
- [ ] Connection to Library of Alexandria
- [ ] Reduced travel distance via gates
- [ ] Reduced fuel consumption via gates
- [ ] Map data sharing on gate passage
- [ ] "Current # of ships" distance alerts
- [ ] Gate embargo mechanics

## Combat & Warfare

### Combat Mechanics

- [ ] No health system (ship damage only)
- [ ] Voxel hull damage
- [ ] Limited range laser weapons
- [ ] Manual hull repair requirement
- [ ] Ship volume maximum
- [ ] Docking ships within ships
- [ ] Fuel efficiency loss for docked ships
- [ ] Vault partial loss on destruction
- [ ] No vault loss on pilot error destruction

### Information Warfare

- [ ] neutral zone database upload/download system
- [ ] Malicious map alteration / map alteration GUI ("Hide base from Starmap" option)
- [ ] Conflicting/contradictory Lore handling - Neutral player overwrite (no malicious option for Neutral players)
- [ ] False system information strategy
- [ ] Lore contradiction rewards (multiplied)
- [ ] Autopilot (requires map data or manual navigation)
- [ ] Player Lore drops on ship destruction
- [ ] Debris ruins generation
- [ ] Schematic acquisition from debris

### Resources & Items

- [ ] Valuable items (limited inventory)
- [ ] Aesthetic blocks (unlimited, no value)
- [ ] False gold bluffing mechanic
- [ ] Ore blocks
- [ ] Ore → fuel conversion (one-way, variable rates)
- [ ] Location data as lootable resource
- [ ] Can only bluff with gold as faux ore with unlimited*

* "Unlimited" placement means that you are only restricted by overall server "block wallet" rather than inventory-based
* Functionally, infinite creative placement with the overall "claimed units" restriction

## Economy

- [ ] Schematic placement # -  popularity tracking (Create equation relating placement vs unique claims placement)
- [ ] Schematic usage rewards (server currency)
- [ ] Trust score system
    - [ ] Player history
    - [ ] Login frequency
    - [ ] Schematic creation frequency
    - [ ] Exploration frequency
    - [ ] Latency factors
- [ ] Reward calculation (trust × popularity)
- [ ] Anti-botnet design
- [ ] Public pocket dimension exclusion from tracking

---

## Development Milestones

### Pre-Alpha

- [ ] Core layer system functional
- [ ] Basic portal mechanics
- [ ] Pocket dimension creation

### Alpha (Nov 11, 2025)

- [ ] Single player gameplay loop
- [ ] Ship building
- [ ] Basic combat
- [ ] Gravity/atmosphere system

### Multiplayer Beta (Jan 11, 2025)

- [ ] Server infrastructure
- [ ] Player type system
- [ ] Stargate network
- [ ] Economic loops
- [ ] Information warfare systems

---

## Known Issues / Future Considerations

- [ ] Combat mechanics still being refined
- [ ] Trust score metric balancing
- [ ] Griefing prevention verification
- [ ] Server performance optimization for layer rendering