import '../styles/globals.css'
import Link from "next/link";

function MyApp({ Component, pageProps }) {
  return <>
    <nav className='nav'>
      <ul>
        <li>
          <Link href={"/"}><a>Home</a></Link>
        </li>
        <li>
          <Link href={"/a"}><a>A</a></Link>
        </li>
        <li>
          <Link href={"/b"}><a>B</a></Link>
        </li>
      </ul>
    </nav>
    <Component {...pageProps} />
  </>;
}

export default MyApp
