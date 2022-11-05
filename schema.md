# Account
- Id
- TotalMonsterKilled

# Character
- Id
- Class
- AccountId
- Name
- Level
- Experience
- Strength
- AttackSpeed
- HitPoints
- Stage
- TotalMonsterKilled
- HighestMonsterKilled

# Item
- Id
- Name
- BonusType = 'Hp' | 'Strength'
- Type = 'Legs' | 'Gauntlets'

# ItemCharacter
- Id
- ItemId
- CharacterId
- Position = 'Inventory' | 'Stash'

# Fight
- Id
- CharacterId
- MonsterId
- Outcome = 'Victory' | 'Defeat'
- Date