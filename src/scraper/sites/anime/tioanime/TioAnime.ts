import axios from "axios";
import * as cheerio from "cheerio";
import { utils } from "../../../../types/utils";
import * as types from "../../../../types/.";
import { ResultSearch, IResultSearch } from "../../../../types/search";

const PageInfo = {
    url: 'https://tioanime.com' // url page
}


function getAnimeChronology($) {
    let chrono_list: types.IChronology[] = [];
    $('section.w-history ul.list-unstyled li').each((i, element) => {
		// The chronological anime has to access its year and type as extra
		// information that is not included in the Chronology class
		chrono_list.push(new types.Chronology(
				$(element).find('h3.title').text(), 
				PageInfo.url + $(element).find('div.media-body a').attr('href'), 
				PageInfo.url + $(element).find('figure.fa-play-circle img').attr('src')
			));
    });
    return chrono_list;
}

async function getEpisodeServers(url) {
	'use strict'
	let servers: types.IEpisodeServer[] = [];
    const $ = cheerio.load((await axios.get(url)).data);
	const script = $($('script').get().pop()).text().trim();
	try {
		// The variable 'videos' of the script is accessed
		eval?.(script.substring(0, script.indexOf('$(document)')));
		eval(script.substring(0, script.indexOf('$(document)')));
		for (let i = 0; i < globalThis.videos.length; i++) {
			servers.push(new types.EpisodeServer(globalThis.videos[i][0], 
				globalThis.videos[i][1].replace('\\', '')
			));
		}
	} catch (error) {
        
    }
	return servers;
}

async function getAnimeEpisodes(data) {
	let __episodes: types.IEpisode[] = [];
	data.episodes.forEach(episode_number => {
		let episode     = new types.Episode();
		episode.name    = `${data.info[2]} Capitulo ${episode_number}`;
		episode.image   = PageInfo.url +`/uploads/thumbs/${data.info[0]}.jpg`;
		episode.url     = `/anime/tioanime/servers/${data.info[1]}-${episode_number}`;
		episode.number  = episode_number;
        __episodes.push(episode);
	});
	return __episodes;
}

function getEpisode($, element) {
	const title   = $(element).find('h3.title').text().trim();
	const episode = new types.Episode();
	episode.image = PageInfo.url + $(element).find('figure.fa-play-circle img').attr('src');
	episode.url   = $(element).find('article.episode a').attr('href').replace('/ver/', '/anime/tioanime/servers/')
	
    for (let i = title.length - 1; i >= 0; i--) {
        if (title[i] == ' ') {
			episode.name   = title.substring(0, i).trim();
			episode.number = parseInt(title.substring(i + 1, title.length));
			break;
        }
    }
	return episode;
}

async function getLastEpisodes() {
	let episodes: types.IEpisode[] = [];
    try {
        const $ = cheerio.load((await axios.get(PageInfo.url)).data);
		const elements = $('div.container section ul.episodes li').children();
		for (let i = 0; i < elements.length; i++) {
			episodes.push(getEpisode($, elements[i]));
		}
    } catch (error) {
        console.log(error);
    }
    return episodes;
}

function getGenres($, elements) {
    let genres: string[] = [];
    elements.each((_i, element) => {
        genres.push($(element).find('a').text().trim());
    });
    return genres;
}

function getScriptAnimeInfo($) {
	'use strict'
	try {
		const script = $($('script').get().pop()).text().trim();
		eval?.(script.substring(0, script.indexOf('$(document)')));
        eval(script.substring(0, script.indexOf('$(document)')));
		return {
			// An object with the variables initialized in the script is returned.
			info: globalThis.anime_info,
			episodes: globalThis.episodes
		}
	} catch(error) {
		console.log(error);
	}
	return null;
}

async function getAnime(url) {
	// ignore property alt_name
	const $ = cheerio.load((await axios.get(url)).data);
	const data       = getScriptAnimeInfo($);
	// It is possible that the object returned by the getScriptAnimeInfo function is null.
	if (data == null) return null;
	
	const anime      = new types.Anime();
    anime.name       = $('div.container h1.title').text();
    //anime.url        = url;
	anime.url        = url.replace('https://tioanime.com/anime/', '/anime/tioanime/name/');
	//anime.type       = $('div.meta span.anime-type-peli').text();
    anime.type       = (() => {
        switch ($('div.meta span.anime-type-peli').text().toLowerCase()) {
            case "anime": 
                return "Anime";
            case "movie": 
                return "Movie";
            case "one":   
                return "ONA";
            case "ona":   
                return "OVA";
        }
        return "Null";
    })();
    
	//anime.year       = parseInt($('div.meta span.year').text().trim());
	anime.date       = new types.DatePeriod(new types.Calendar(data.info.length < 4 ? 
                                parseInt($('div.meta span.year').text().trim().substring(0, 4)) : 
                                new Date(data.info[3]).getFullYear())
                             ) ;
    anime.synopsis   = $('p.sinopsis').text().trim();
    anime.genres     = getGenres($, $('div.container p.genres span'));
    anime.image      = new types.Image(PageInfo.url + $('div.container div.thumb figure img').attr('src'), 
											    	  $('figure.backdrop img').attr('src') == undefined ? null :
								 					  PageInfo.url + $('figure.backdrop img').attr('src')
												);
    anime.status     = $('div.thumb a.status').text().trim() === 'En emision';
	anime.station    = $('div.meta span.fa-snowflake').text().trim().split('\n')[0];
	anime.episodes   = await getAnimeEpisodes(data);
	anime.chronology = getAnimeChronology($);
	return anime;
}

async function getLastAnimes(url: string) {
    try {
        let animes: types.IAnime[] = [];
        const $ = cheerio.load((await axios.get(url ?? PageInfo.url)).data);
		const elements = $(utils.isUsableValue(url) ? 'ul.animes' : 'div.container section ul.list-unstyled.row li').children();
		for (let i = 0; i < elements.length; i++) {
            const anime_url = $(elements[i]).find('article.anime a').attr('href');
            if (utils.isUsableValue(anime_url)) {
				animes.push(await getAnime(PageInfo.url + anime_url));
            }
		}
        return animes;
    } catch (error) {
        console.log(error);
    }
    return [];
}

async function getSectionContents(section: number) {
	let animes: types.IAnime[] = [];
    try {
        const $ = cheerio.load((await axios.get(`${PageInfo.url}/directorio?type%5B%5D=${section}`)).data);
		const elements = $(`ul.animes`).children();
		for (let i = 0; i < elements.length; i++) {
			animes.push(await getAnime(PageInfo.url + $(elements[i])
				.find('article.anime a').attr('href')));
		}
    } catch (error) {
        console.log(error);
    }
    return animes;
}

async function getLastMovies() {
    return await getSectionContents(1);
}

async function getLastOvas() {
    return await getSectionContents(2);
}

async function getLastOnas() {
    return await getSectionContents(3);
}

//console.log(await getEpisodeServers('https://tioanime.com/ver/getsuyoubi-no-tawawa-2-11'));

export interface IYearRange {
	begin: number;
	end: number;
}

export class TioAnime 
{
	getLastEpisodes = getLastEpisodes;
	getLastAnimes = getLastAnimes;
	getLastMovies = getLastMovies;
	getLastOvas = getLastOvas;
	getLastOnas = getLastOnas; 
	getEpisodeServers = getEpisodeServers;
	getAnime = getAnime;

	private arrayToURLParams(param: string, array: string[]): string {
		let elements = '';
		if (utils.isUsableValue(array)) {
			for (let i = 0; i < array.length; i++) {
				elements += `${param}%5B%5D=${array[i]}`;
				if (i + 1 < array.length) {
					elements += '&';
				}
			}
		}
		return elements;
	}

 	// <types> 0: Anime (TV), 1 Movie, 2: OVA, 3: ONA
 	// <genres> all genres
 	// <year_range> year_range { begin, end }
 	// <status> 2: Finalizado, 1: En emision, 3: Proximamente
 	// <sort> recent, -recent
 	
	async filter(types: string[], genres: string[], year_range: IYearRange, status: number, sort: string): Promise<IResultSearch> {
		const animes = new ResultSearch();
		// If any of the arguments is null or undefined, a default value will be assigned.
		year_range ?? (year_range = { begin: 1950, end: new Date().getFullYear() });
		(await getLastAnimes(`https://tioanime.com/directorio?${this.arrayToURLParams('type', types)}&${this.arrayToURLParams('genre', genres)}&year=${year_range.begin}%2C${year_range.end}&status=${status ?? 2}&sort=${sort ?? 'recent'}`))
			.forEach(element => {
				if (utils.isUsableValue(element)) {
					animes.results.push({ name: element.name, image: element.image.url, 
						url: element.url, type: element.type })
				}
			});
		return animes;
	}
};
