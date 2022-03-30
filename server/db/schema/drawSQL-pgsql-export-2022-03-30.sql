CREATE TABLE "users"(
    "id" INTEGER NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL
);
ALTER TABLE
    "users" ADD PRIMARY KEY("id");
CREATE TABLE "projects"(
    "id" INTEGER NOT NULL,
    "name" INTEGER NOT NULL,
    "owner" INTEGER NOT NULL
);
ALTER TABLE
    "projects" ADD PRIMARY KEY("id");
CREATE TABLE "editors"(
    "user_id" INTEGER NOT NULL,
    "map_id" INTEGER NOT NULL,
    "write_permission" BOOLEAN NOT NULL
);
ALTER TABLE
    "editors" ADD PRIMARY KEY("user_id");
ALTER TABLE
    "editors" ADD PRIMARY KEY("map_id");
CREATE TABLE "centerlines"(
    "id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "date" DATE NOT NULL
);
ALTER TABLE
    "centerlines" ADD PRIMARY KEY("id");
CREATE TABLE "centerline_points"(
    "id" INTEGER NOT NULL,
    "centerline_id" INTEGER NOT NULL,
    "geometry" geography(POINT, 4326) NOT NULL,
    "value" DOUBLE PRECISION NOT NULL
);
ALTER TABLE
    "centerline_points" ADD PRIMARY KEY("id");
CREATE TABLE "centerline_linestrings"(
    "id" INTEGER NOT NULL,
    "centerline_id" INTEGER NOT NULL,
    "geometry" geography(LINESTRING, 4326) NOT NULL
);
ALTER TABLE
    "centerline_linestrings" ADD PRIMARY KEY("id");
ALTER TABLE
    "centerlines" ADD CONSTRAINT "centerlines_project_id_foreign" FOREIGN KEY("project_id") REFERENCES "projects"("id");
ALTER TABLE
    "projects" ADD CONSTRAINT "projects_owner_foreign" FOREIGN KEY("owner") REFERENCES "users"("id");
ALTER TABLE
    "centerline_points" ADD CONSTRAINT "centerline_points_centerline_id_foreign" FOREIGN KEY("centerline_id") REFERENCES "centerlines"("id");
ALTER TABLE
    "centerline_linestrings" ADD CONSTRAINT "centerline_linestrings_centerline_id_foreign" FOREIGN KEY("centerline_id") REFERENCES "centerlines"("id");