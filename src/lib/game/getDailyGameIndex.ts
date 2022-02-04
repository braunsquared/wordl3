import words from '$lib/assets/wordlist.json';
import daysBetween from '$lib/util/daysBetween';
import { OriginDate } from './constants';

const getDailyGameIndex = (): number => daysBetween(OriginDate.getTime(), Date.now()) % words.length;

export default getDailyGameIndex;
