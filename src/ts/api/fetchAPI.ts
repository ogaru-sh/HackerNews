import fetch from "node-fetch";
import config from "../config";

const fetchAPI: any = async (jsonName: string) => {
	const apiInfo = config.apiInfo;
	const apiUrl = `${apiInfo.baseUrl}/${jsonName}.json?${apiInfo.query}`;
	return await fetch(apiUrl).then((resp) => resp.json());
};

export default { fetchAPI };
