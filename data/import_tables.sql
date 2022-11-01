
BEGIN;

-- Create function to add current timestamp on article update automaticaly
CREATE OR REPLACE FUNCTION update_timestamp()
RETURNS TRIGGER AS $$
BEGIN
      NEW.updated_at = now(); 
      RETURN NEW;
END;
$$ language 'plpgsql';
COMMIT;

-- Clear tables, domains
DROP TABLE IF EXISTS "user", 
"category", 
"article";

DROP DOMAIN IF EXISTS "email", 
"password";


-- Create email domain
CREATE DOMAIN "email" AS text
   CHECK(
      value ~ '(?:[a-z0-9!#$%&''*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&''*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
   );

-- Create password domain
CREATE DOMAIN "mdp" AS text
   CHECK (
   value ~ '(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}'
   );


-- Create user table
CREATE TABLE IF NOT EXISTS "user" (
  "user_id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "email" email NOT NULL UNIQUE,
  "firstname"  TEXT NOT NULL,
  "lastname"  TEXT NOT NULL,
  "password"  mdp NOT NULL
);

-- Create category table
CREATE TABLE IF NOT EXISTS "category" (
  "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "label"  TEXT NOT NULL
);

-- Create article table
CREATE TABLE IF NOT EXISTS "article" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "category" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "category_id" INTEGER NOT NULL REFERENCES "category"("id"),
    "user_id" INTEGER NOT NULL REFERENCES "user"("user_id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ 
);

-- Trigger for the updated_at function created earlier
CREATE TRIGGER article_timestamp BEFORE UPDATE ON article
FOR EACH ROW EXECUTE PROCEDURE update_timestamp();

-- Seeding
INSERT INTO "user" ("email", "firstname", "lastname", "password")
VALUES  ('jeremyatn@gmail.com', 'Jeremy','Antoni', 'motdepassedeJeremy9?'),
        ('jeanpeuplu@gmail.com', 'Jean','Peuplu', 'motdepassedeJean9?');

INSERT INTO "category" ("label")
VALUES  ('Funny'),
        ('Random'),
        ('Science'),
        ('Recipe');

INSERT INTO "article" ("category", "slug", "title", "content", "category_id", "user_id")
VALUES ('Funny', 'angular-une-fausse-bonne-idee', 'Angular, une fausse bonne idée ?', 'Angular, une fausse bonne idée ? Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.', 1, 1),
('Random', 'pourquoi-a-t-on-besoin-de-developpeurs', 'Pourquoi a-t-on besoin de développeurs ?', 'Pourquoi a-t-on besoin de développeurs ? Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.', 4, 2);

COMMIT;