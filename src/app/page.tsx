import TMDBService from "@/services/TMDBService";
import RandomizedBanner from "@/components/RandomizedBanner";
import List from "@/components/List";
import DetailedList from "@/components/DetailedList";


export default async function HomePage() {
	const trendingAll = await TMDBService.getTrendingAll("day");

	return(
		<div>
			<RandomizedBanner items={trendingAll} />
			<List items={trendingAll} title="Trending" href="/all/trending"/>
			<DetailedList items={trendingAll} title="Trending" href="/all/trending"/>
			<List items={trendingAll} title="Trending" href="/all/trending" listType="horizontal"/>
			<List items={trendingAll} title="Trending" href="/all/trending"/>
		</div>
    );
}
