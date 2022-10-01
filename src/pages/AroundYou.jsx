import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-cycle
import { Error, Loader, SongCard } from '../components';
import { useGetSongsByCountryQuery } from '../redux/services/shazamCore';

const CountryTracks = () => {
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(true);
  const { activeSong, isPlaying } = useSelector((state) => state.player);
  const { data, isFetching, error } = useGetSongsByCountryQuery(country);

  useEffect(() => {
    axios.get('https://geo.ipify.org/api/v2/country,city,vpn?apiKey=at_ziOVbkGRi5VjD8j4U5BGnCYJBFhda')
      .then((res) => setCountry(res?.data?.location?.country))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [country]);

  if (isFetching && loading) return <Loader title="Loading songs around you" />;

  if (error && country) return <Error />;

  return (

    <div className="flex flex-col">
      <h2 className="font-bold text-3x; mt-4 mb-10 text-white text-left">
        <span className="font-black">
          Around You {country}
        </span>
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {data?.map((song, i) => (
          <SongCard key={song.key} song={song} isPlaying={isPlaying} activeSong={activeSong} data={data} i={i} />
        ))}

      </div>

    </div>
  );
};

export default CountryTracks;
