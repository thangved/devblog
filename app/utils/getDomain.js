export default function getDomain() {
	try {
		return `${document.URL.split("/")[0]}//${document.URL.split("/")[2]}`;
	} catch (error) {
		return null;
	}
}
