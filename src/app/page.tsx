import TMDBService from "@/services/TMDBService";
import List from "@/components/List";

export default async function HomePage() {
	const trendingShows = await TMDBService.getTrendingAll();

	return(
		<div>
			<List items={trendingShows} title="Trending" href="/all/trending"/>
			<List items={trendingShows} title="Trending" href="/all/trending" listType="horizontal"/>
			<List items={trendingShows} title="Trending" href="/all/trending"/>
		</div>
    );
}
