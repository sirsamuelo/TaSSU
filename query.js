import getClient from './getClient.js';

const createGenresTable = async () => {
	try {
		const client = await getClient();
		const createReleaseTable = `
    CREATE TABLE IF NOT EXISTS genres as
select genre from movies;
  `;
		const res = await client.query(createReleaseTable);
		const addPrimaryKey = `
		CREATE SEQUENCE genre_seq;

		ALTER TABLE genres
		ADD COLUMN id_genre INTEGER PRIMARY KEY DEFAULT nextval('genre_seq');

`;
		await client.query(addPrimaryKey);
		await client.end();
	} catch (error) {
		console.error(error);
		return false;
	}
};

const createReleaseDateTable = async () => {
	try {
		const client = await getClient();
		const createReleaseDateTable = `
    CREATE TABLE IF NOT EXISTS release_date as
select released,year from movies;
  `;
		await client.query(createReleaseDateTable);
		const addPrimaryKey = `
		CREATE SEQUENCE release_date_seq;
		ALTER TABLE release_date
ADD COLUMN id_released_date INTEGER PRIMARY KEY DEFAULT nextval('release_date_seq');

`;
		await client.query(addPrimaryKey);
		await client.end();
	} catch (error) {
		console.error(error);
		return false;
	}
};

const createLanguagetable = async () => {
	try {
		const client = await getClient();
		const createLanguagetable = `
    CREATE TABLE IF NOT EXISTS lang as
select language from movies;
  `;
		await client.query(createLanguagetable);
		const addPrimaryKey = `
		CREATE SEQUENCE language_seq;
		ALTER TABLE lang
		ADD COLUMN id_language INTEGER PRIMARY KEY DEFAULT nextval('language_seq');
`;
		await client.query(addPrimaryKey);
		await client.end();
	} catch (error) {
		console.error(error);
		return false;
	}
};

const createCrewTable = async () => {
	try {
		const client = await getClient();
		const createCrewTable = `
    CREATE TABLE IF NOT EXISTS crew as
select director,writer from movies;
  `;
		await client.query(createCrewTable);
		const addPrimaryKey = `
		CREATE SEQUENCE crew_seq;
		ALTER TABLE crew
		ADD COLUMN id_crew INTEGER PRIMARY KEY DEFAULT nextval('crew_seq');
`;
		await client.query(addPrimaryKey);
		await client.end();
	} catch (error) {
		console.error(error);
		return false;
	}
};

const moviesTable = async () => {
	try {
		const client = await getClient();
		const createMoviesTable = `
    CREATE TABLE IF NOT EXISTS movies_table as
select title,plot from movies;
  `;
		await client.query(createMoviesTable);
		const addPrimaryKey = `
		CREATE SEQUENCE movies_seq;

		ALTER TABLE movies_table
		ADD COLUMN id_movie INTEGER PRIMARY KEY DEFAULT nextval('movies_seq');

`;
		await client.query(addPrimaryKey);
		await client.end();
	} catch (error) {
		console.error(error);
		return false;
	}
};

const movieFactsTable = async () => {
	try {
		const client = await getClient();
		const createMoviesTable = `
    CREATE TABLE IF NOT EXISTS movie_facts as
select id,title,plot from movies;
  `;
		await client.query(createMoviesTable);
		const addPrimaryKey = `
		alter table movieTitles add primary key (id);
`;
		await client.query(addPrimaryKey);
		await client.end();
	} catch (error) {
		console.error(error);
		return false;
	}
};

//createGenresTable();
// createLanguagetable();
// createCrewTable();
// moviesTable();

// createReleaseDateTable();
