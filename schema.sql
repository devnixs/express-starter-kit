create table "Account"
(
    "Id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "TotalMonsterKilled"  integer not null default 0
);

create table "Character"
(
    "Id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "Class" text not null,
    "AccountId" INTEGER not null,
    "Name" text not null,
    "Level" INTEGER not null default 1,
    "Experience" INTEGER not null default 0,
    "Strength" INTEGER not null default 1,
    "AttackSpeed" INTEGER not null default 1,
    "HitPoints" INTEGER not null default 100,
    "Stage" INTEGER not null default 1,
    "TotalMonsterKilled" INTEGER not null default 0,
    "HighestMonsterKilled" INTEGER null,

   CONSTRAINT FK_Character_Account
      FOREIGN KEY("AccountId")
	  REFERENCES "Account"("Id")
);

create table "ItemCharacter"
(
    "Id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "ItemId" integer not null,
    "CharacterId" INTEGER not null REFERENCES "Character"("Id"),
    "Position" text not null
);

create table "Fight"
(
    "Id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "CharacterId" INTEGER not null REFERENCES "Character"("Id"),
    "MonsterId" INTEGER not null,
    "Date" timestamptz not null,
    "Outcome" text not null
)


