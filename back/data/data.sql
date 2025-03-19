DROP TABLE IF EXISTS "project";

CREATE TABLE "project" (
  "id" SERIAL PRIMARY KEY,
  "image" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "slug" TEXT NOT NULL,
  "github" TEXT,
  "site" TEXT,
  "description" TEXT NOT NULL,
  "date" DATE,

  "conception" JSONB DEFAULT '[]'::JSONB, 
  "front" JSONB DEFAULT '[]'::JSONB,      
  "back" JSONB DEFAULT '[]'::JSONB,       
  "fullstack" JSONB DEFAULT '[]'::JSONB,  
  "bdd" JSONB DEFAULT '[]'::JSONB,        

  "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

COMMIT;