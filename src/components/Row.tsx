import { useState, useEffect } from 'react'
import axios from '../axios'
import './Row.scss'
import YouTube from 'react-youtube'

const base_url = 'https://image.tmdb.org/t/p/original'

type Props = {
  title: string
  fetchUrl: string
  isLargeRow?: boolean
}

type Movie = {
  id: string
  name: string
  title: string
  original_name: string
  poster_path: string
  backdrop_path: string
}

// trailerのoption
type Options = {
  height: string
  width: string
  playerVars: {
    autoplay: 0 | 1 | undefined // autoplayプロパティは3つの値のうちいずれかである
  }
}

export const Row = ({ title, fetchUrl, isLargeRow }: Props) => {
  const [movies, setMovies] = useState<Movie[]>(
    [],
  ) /* 映画のデータはstateで管理している。初期値は空配列。 */
  const [trailerUrl, setTrailerUrl] = useState<string | null>('')

  // URLが更新されるたびに
  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl) /* APIリクエスト */
      setMovies(request.data.results) /* データをmoviesに設定する */
      return request
    }
    fetchData()
  }, [fetchUrl]) /* 非同期処理はfetchUrlが変わるたびに発火される */

  const opts: Options = {
    height: '390',
    width: '640',
    playerVars: {
      autoplay: 1,
    },
  }

  const handleClick = async (movie: Movie) => {
    // トレイラーにyoutubeの映像を呼び出す処理を実行
    if (trailerUrl) {
      //
      setTrailerUrl('')
    } else {
      let trailerUrl = await axios.get(
        // 指定した映画のトレイラーURLを￥TMDB APIから取得してsetTrailerUrlする
        `/movie/${movie.id}/videos?api_key=2e5d2d1e59d12c2593b2caeb8f1a6e85`,
      )
      setTrailerUrl(trailerUrl.data.results[0]?.key)
    }
  }

  return (
    <div className="Row">
      <h2>{title}</h2>
      <div className="Row-posters">
        {/* ポスターコンテンツ */}
        {movies.map((movie) => (
          <img
            key={
              movie.id /* Reactのリストや配列の要素をレンダリングする際に、ユニークなkeyプロパティが必要。 */
            }
            className={
              `Row-poster ${
                isLargeRow && 'Row-poster-large'
              }` /* 条件つきクラス名。isLargeRowがtrueの場合Row-poster-largeも設定される。 */
            }
            src={`${base_url}${
              /* 画像のURLを指定する */
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={
              movie.name /* 画像が表示されない場合の代替テキストを指定する */
            }
            onClick={() => handleClick(movie)}
          />
        ))}
      </div>
      {
        trailerUrl && (
          <YouTube videoId={trailerUrl} opts={opts} />
        ) /* trailerUrlがtrueの時は、YoutubeのiFrameの動画が流れるように */
      }
    </div>
  )
}
