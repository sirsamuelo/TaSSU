import fetch from 'node-fetch';
import fs from 'fs';
import getClient from './getClient.js';

async function makeFetch(id) {
	const resp = await fetch(`http://www.omdbapi.com/?i=${id}&apikey=73d024eb`);
	return resp.json();
}
//9edd2bce
//73d024eb
function getData() {
	return new Promise((resolve, reject) => {
		let movies = [];
		var firstHalf = [];
		// var secondHalf = []
		fs.readFile('sample.txt', 'utf8', async function (err, data) {
			if (err) return reject(err);
			movies = data.split('\n').map((item) => item.substring(0, 9));

			firstHalf = movies.slice(0, 522);
			const respPromises = firstHalf.map((id) => makeFetch(id));
			const respArrays = await Promise.all(respPromises);

			return resolve(respArrays);
		});
	});
}

const arr = await getData();

const insertData = async () => {
	try {
		const client = await getClient();
		let createTableQuery = `
    CREATE TABLE IF NOT EXISTS movies(
      id BIGSERIAL PRIMARY KEY NOT NULL,
      title varchar,
      year varchar,
      rated varchar,
      released varchar,
      runtime varchar,
      genre varchar,
      director varchar,
      writer varchar,
      plot varchar,
      language varchar,
      country varchar,
      awards varchar,
      actors varchar,
      poster varchar,
      metascore varchar,
      imdbRating varchar,
      imdbVotes varchar,
      imdbID varchar,
      type varchar,
      dvd varchar,
      boxoffice varchar,
      production varchar,
      website varchar,
      date TIMESTAMP NOT NULL DEFAULT current_timestamp
    );
  `;
		const res = await client.query(createTableQuery);
		for (const record of arr) {
			const {
				Title,
				Year,
				Rated,
				Released,
				Runtime,
				Genre,
				Director,
				Writer,
				Actors,
				Plot,
				Language,
				Country,
				Awards,
				Poster,
				Ratings,
				Metascore,
				imdbRating,
				imdbVotes,
				imdbID,
				Type,
				DVD,
				BoxOffice,
				Production,
				Website,
			} = record;
			let insertRow = await client.query(
				'INSERT INTO movies(title,year,rated,released,runtime,genre,director,writer,actors,plot,language,country,awards,poster,metascore,imdbrating,imdbvotes,imdbid,type,dvd,boxoffice,production,website) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23);',
				[
					`${Title}`,
					`${Year}`,
					`${Rated}`,
					`${Released}`,
					`${Runtime}`,
					`${Genre}`,
					`${Director}`,
					`${Writer}`,
					`${Actors}`,
					`${Plot}`,
					`${Language}`,
					`${Country}`,
					`${Awards}`,
					`${Poster}`,
					`${Metascore}`,
					`${imdbRating}`,
					`${imdbVotes}`,
					`${imdbID}`,
					`${Type}`,
					`${DVD}`,
					`${BoxOffice}`,
					`${Production}`,
					`${Website}`,
				]
			);
		}
		await client.end();
	} catch (error) {
		console.error(error.stack);
		return false;
	}
};

insertData();
