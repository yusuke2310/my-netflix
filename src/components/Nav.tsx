import { useEffect, useState } from 'react'
import './Nav.scss'

//type Props = {
//  className?: string;
//}

export const Nav = (
  {
    /*props: Props*/
  },
) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleShow = () => {
      if (window.scrollY > 100) {
        // スクロールが一定値に達したら、stateを更新する
        setShow(true)
      } else {
        setShow(false)
      }
    }

    window.addEventListener('scroll', handleShow)
    return () => {
      window.removeEventListener('scroll', handleShow)
    }
  }, [])

  return (
    <div className={`Nav ${show && 'Nav-black'}`}>
      {' '}
      {/* stateに応じて、DOMのNav-blackが付け外される */}
      <img
        className="Nav-logo"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1920px-Netflix_2015_logo.svg.png"
        alt="Netflix Logo"
      />
      <img
        className="Nav-avater"
        src="https://i.pinimg.com/originals/0d/dc/ca/0ddccae723d85a703b798a5e682c23c1.png"
        alt="Avatar"
      />
    </div>
  )
}
