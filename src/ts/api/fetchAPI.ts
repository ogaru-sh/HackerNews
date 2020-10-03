import fetch from "node-fetch";

const apiUrl =
	"https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty";

const fetchAPI: any = async () => {
	return await fetch(apiUrl).then((resp) => resp.json());
};

export default fetchAPI;
