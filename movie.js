import puppeteer from 'puppeteer';
import axios from 'axios';
import cheerio from 'cheerio';
import { load } from 'cheerio';

const options = {
	headless: false, // default is true
	ignoreDefaultArgs: ['--enable-automation'],
	defaultViewport: null,
	devtools: true,
	ignoreHTTPSErrors: true,
};

let movie1 = 'https://yts-subs.com/movie-imdb/tt14147224';
let baseURL = 'https://yts-subs.com';
let downloadableURL = 'https://yifysubtitles.org';

async function run() {
	let { data } = await axios.get(movie1, {
		responseType: 'document',
		headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
	});
	const $ = load(data);
	const movies = $('tbody span.flag.flag-fr')
		.parent()
		.next()
		.find('a')
		.attr('href');
	const downloadURL = downloadableURL + movies;
	console.log(downloadURL);

	const browser = await puppeteer.launch(options);
	const page = await browser.newPage();
	await page.goto(downloadURL, {
		waitUntil: 'networkidle2',
	});

	// const startButton = await page.$('a#btn-download-subtitle');
	let tag = await page.evaluate(() => {
		return document.querySelector('a#btn-download-subtitle');
	});
	await tag.click();

	// let response = await axios.get(downloadURL, {
	// 	responseType: 'document',
	// 	headers: { 'Accept-Encoding': 'gzip,deflate,compress' },
	// });

	// console.log(response.data);
}
run();
