const { default: axios } = require("axios");
const { JSDOM } = require("jsdom");

/**
 *
 * @param {string} url
 * @returns {object}
 */
module.exports = async function Crawler(url) {
	try {
		url = url.replace(/http[s]{0,1}:\/\//, "");
		url = `https://${url}`;
		const { data } = await axios.get(url);
		const { document } = new JSDOM(data).window;
		const img =
			url +
			"/" +
			document
				.querySelector("img")
				?.src.replace(/(http[s]{0,1}:\/\/){0,1}\w+(\.\w+)+/, "");
		const title = document.title;
		const description = document.querySelector("p")?.innerText;

		return {
			img,
			title,
			description,
		};
	} catch (error) {
		throw Error(error);
	}
};
