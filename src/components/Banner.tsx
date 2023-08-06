import { useEffect, useState } from 'react'
import axios from '../axios'
import { requests } from '../request'
import './Banner.scss'

type movieProps = {
  title?: string
  name?: string
  original_name?: string
  backdrop_path?: string
  overview?: string
}
// 映画のデータを取得するためにuseStateでmovieを扱い、useEffectでAPI取得、更新まで実施
export const Banner = () => {
  const [movie, setMovie] = useState<movieProps>({})

  useEffect(() => {
    async function fetchData() {
      //console.log(requests.feachNetflixOriginals);
      const request = await axios.get(requests.feachNetflixOriginals)
      console.log(request.data.results)

      // apiからランダムで値を取得
      setMovie(
        request.data.results[ // 配列からランダムに要素を選択して、setMovie関数を使用して設定する
          Math.floor(Math.random() * request.data.results.length - 1) // 与えられた数値以下の最大の整数を返却する
        ],
      )

      return request
    }
    fetchData()
  }, [])
  //console.log(movie);

  // descriptionの切り捨て
  function truncate(str: any, n: number) {
    // 与えられた文字列を、指定された長さnまで切り詰めるtruncate関数を定義している
    if (str !== undefined) {
      return str.lenght > n ? str?.substr(0, n - 1) + '...' : str
    }
  }

  return (
    <header
      className="Banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url("https://image.tmdb.org/t/p/original${movie?.backdrop_path}")`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="Banner-contents">
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="Banner-buttons">
          <button className="Banner-button">Play</button>
          <button className="Banner-button">My List</button>
        </div>

        <h1 className="Banner-description">{truncate(movie?.overview, 150)}</h1>
      </div>

      <div className="Banner-fadeBottom" />
    </header>
  )
}
