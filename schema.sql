BEGIN;

/* create table "account"
(
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "total_monster_killed" integer not null default 0
); */

create table "character"
(
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "class" text not null,
/*     "account_id" INTEGER not null, */
    "name" text not null,
    "level" INTEGER not null default 1,
    "experience" INTEGER not null default 0,
    "strength" INTEGER not null default 1,
    "attack_speed" INTEGER not null default 1,
    "hit_points" INTEGER not null default 100,
    "stage" INTEGER not null default 1,
    "total_monster_killed" INTEGER not null default 0,
    "highest_monster_killed" INTEGER null,

   CONSTRAINT FK_Character_Account
      FOREIGN KEY("account_id")
	  REFERENCES "account"("id")
);

create table "item_character"
(
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "item_id" integer not null,
    "character_id" INTEGER not null REFERENCES "character"("id"),
    "position" text not null
);

create table "fight"
(
    "id" INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "character_id" INTEGER not null REFERENCES "character"("id"),
    "monster_id" INTEGER not null,
    "date" timestamptz not null,
    "outcome" text not null
);

COMMIT;