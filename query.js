import getClient from './getClient.js';

const createGenresTable = async () => {
	try {
		const client = await getClient();
		const createReleaseTable = `
    CREATE TABLE IF NOT EXISTS Genres as
select id,released from movies;
  `;
		const res = await client.query(createReleaseTable);
		const addPrimaryKey = `
		alter table Genres add primary key (id);
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
    CREATE TABLE IF NOT EXISTS release_Date as
select id,released,year from movies;
  `;
		await client.query(createReleaseDateTable);
		const addPrimaryKey = `
		alter table release_Date add primary key (id);
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
    CREATE TABLE IF NOT EXISTS language as
select id,language from movies;
  `;
		await client.query(createLanguagetable);
		const addPrimaryKey = `
		alter table language add primary key (id);
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
select id,director,writer from movies;
  `;
		await client.query(createCrewTable);
		const addPrimaryKey = `
		alter table crew add primary key (id);
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
    CREATE TABLE IF NOT EXISTS movieTitles as
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

createGenresTable();
createReleaseDateTable();
createLanguagetable();
createCrewTable();
moviesTable();
