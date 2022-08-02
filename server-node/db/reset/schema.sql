DROP TABLE IF EXISTS "takeoffs" CASCADE;
DROP TABLE IF EXISTS "projects" CASCADE;
DROP TABLE IF EXISTS "centerlines" CASCADE;
DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "shared_projects" CASCADE;

CREATE TABLE "takeoffs"(
    "id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL,
    "data" JSON NOT NULL
);
ALTER TABLE
    "takeoffs" ADD PRIMARY KEY("id");
CREATE TABLE "projects"(
    "id" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "desc" TEXT NOT NULL
);
ALTER TABLE
    "projects" ADD PRIMARY KEY("id");
CREATE TABLE "centerlines"(
    "id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "footprint" JSON NOT NULL,
    "centerline" JSON NOT NULL,
    "chainage" JSON NOT NULL,
    "elevation" JSON NOT NULL
);
ALTER TABLE
    "centerlines" ADD PRIMARY KEY("id");
CREATE TABLE "users"(
    "id" INTEGER NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "shared_projects"(
    "id" INTEGER NOT NULL,
    "user_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL
);
ALTER TABLE
    "shared_projects" ADD PRIMARY KEY("id");
ALTER TABLE
    "centerlines" ADD CONSTRAINT "centerlines_project_id_foreign" FOREIGN KEY("project_id") REFERENCES "projects"("id");
ALTER TABLE
    "takeoffs" ADD CONSTRAINT "takeoffs_project_id_foreign" FOREIGN KEY("project_id") REFERENCES "projects"("id");
ALTER TABLE
    "projects" ADD CONSTRAINT "projects_owner_id_foreign" FOREIGN KEY("owner_id") REFERENCES "users"("id");
ALTER TABLE
    "shared_projects" ADD CONSTRAINT "shared_projects_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
ALTER TABLE
    "shared_projects" ADD CONSTRAINT "shared_projects_project_id_foreign" FOREIGN KEY("project_id") REFERENCES "projects"("id");