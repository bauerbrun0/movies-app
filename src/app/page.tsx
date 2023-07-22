import TMDBService from "@/services/TMDBService";

export default async function HomePage() {
	const trendingShows = await TMDBService.getTrendingAll();
	console.log(trendingShows);
    return(
		<div>
	        <h1>Home Page</h1>
		</div>
    );
}
