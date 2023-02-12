// Experimental

//spanish providers

/* Search */
export class AnimeSearch {
    /**
     *
     * @param {*} anime_title
     * @param {*} anime_image
     * @param {*} link_anime
     * @param {*} type
     * @param {*} current_page
     */
    constructor(anime_title, anime_image, link_anime, type) {
        this.anime_title = anime_title;
        this.anime_image = anime_image;
        this.link_anime = link_anime;
        this.type = type;
    }
}
export class SearchArray {
    constructor(page) {
        this.data = new Array();
        this.page = page
    }
}
/* Search */

/* Anime Info */
export class Episode {
    /**
     * @param {*} episode_title String()
     * @param {*} episode_number String()
     * @param {*} image_espisode String()
     * @param {*} link_episode String()
     */
    constructor(episode_title, episode_number, image_espisode, link_episode) {
        this.episode_title = episode_title;
        this.episode_number = episode_number;
        this.image_espisode = image_espisode;
        this.link_episode = link_episode;
    }
}

export class GetAnimeInfo {
    /**
     * @param {*} anime_title String() 
     * @param {*} alternative_title String()
     * @param {*} description String()
     * @param {*} keywords new Array()
     * @param {*} status String() 
     * @param {*} link String() /anime/provider/ 
     * @param {*} episode_title String() 
     * @param {*} episode_number String()
     * @param {*} image_espisode String()
     * @param {*} type String()
     * @param {*} anime_image String()
     * @param {*} premiere String()
     * @author yako
     * @description please use: episode_title: String(), episode_number: String(), image_episode: String(), link_episode: String()
     */
    constructor(type = null, anime_image = null, premiere = null) {
        this.anime_title = String();
        this.alternative_title = new Array();
        this.type = type;
        this.anime_image = new String();
        this.synopsis = [
            {
                description: String(),
                keywords: new Array(),
                status: String(),
                premiere: premiere,
                chronology: [],
            },
        ];
        this.anime_similar = new Array();
        this.episode_list = new Array();
    }
}

/* Anime Info */



/* Anime Servers */

export class EpisodeServer {
    /**
     * @param {*} name
     * @param {*} url
     */
    constructor(name, url) {
        this.name = name;
        this.url = url;
    }
}
export class GetAnimeServers {
    constructor() {
        this.servers = new Array();
    }
}

/* Anime Servers*/