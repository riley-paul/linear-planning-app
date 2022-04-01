DROP TABLE IF EXISTS "users" CASCADE;
DROP TABLE IF EXISTS "projects" CASCADE;
DROP TABLE IF EXISTS "editors" CASCADE;

CREATE TABLE "users" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "first_name" VARCHAR(255) NOT NULL,
    "last_name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL
);

CREATE TABLE "projects" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "name" INTEGER NOT NULL,
    "owner_id" INTEGER NOT NULL
);

CREATE TABLE "editors" (
    "id" SERIAL PRIMARY KEY NOT NULL,
    "user_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "write_permission" BOOLEAN NOT NULL
);

-- CREATE TABLE "centerlines"(
--     "id" INTEGER NOT NULL,
--     "project_id" INTEGER NOT NULL,
--     "name" TEXT NOT NULL,
--     "date" DATE NOT NULL
-- );
-- ALTER TABLE
--     "centerlines" ADD PRIMARY KEY("id");
-- CREATE TABLE "centerline_points"(
--     "id" INTEGER NOT NULL,
--     "centerline_id" INTEGER NOT NULL,
--     "geometry" geography(POINT, 4326) NOT NULL,
--     "value" DOUBLE PRECISION NOT NULL
-- );
-- ALTER TABLE
--     "centerline_points" ADD PRIMARY KEY("id");
-- CREATE TABLE "centerline_linestrings"(
--     "id" INTEGER NOT NULL,
--     "centerline_id" INTEGER NOT NULL,
--     "geometry" geography(LINESTRING, 4326) NOT NULL
-- );
-- ALTER TABLE
--     "centerline_linestrings" ADD PRIMARY KEY("id");
-- ALTER TABLE
--     "editors" ADD CONSTRAINT "editors_map_id_foreign" FOREIGN KEY("map_id") REFERENCES "projects"("id");
-- ALTER TABLE
--     "centerlines" ADD CONSTRAINT "centerlines_project_id_foreign" FOREIGN KEY("project_id") REFERENCES "projects"("id");
-- ALTER TABLE
--     "projects" ADD CONSTRAINT "projects_owner_id_foreign" FOREIGN KEY("owner_id") REFERENCES "users"("id");
-- ALTER TABLE
--     "editors" ADD CONSTRAINT "editors_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "users"("id");
-- ALTER TABLE
--     "centerline_points" ADD CONSTRAINT "centerline_points_centerline_id_foreign" FOREIGN KEY("centerline_id") REFERENCES "centerlines"("id");
-- ALTER TABLE
--     "centerline_linestrings" ADD CONSTRAINT "centerline_linestrings_centerline_id_foreign" FOREIGN KEY("centerline_id") REFERENCES "centerlines"("id");