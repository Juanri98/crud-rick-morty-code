import { Episodes } from '../interfaces/episodes.interface';

export interface DataEpisodes{
    info: {
        count: Number;
        pages: Number;
        next: String;
        prev: String;
    },
    results: Episodes[]
}