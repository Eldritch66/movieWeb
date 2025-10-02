import { Sling as Hamburger } from "hamburger-react";
import { useState } from "react";
import logo1 from "../assets/logo1.png";

export default function Navbar({ setQuery }) {
  const [isOpen, setIsOpen] = useState(false);

  function setOpen() {
    setIsOpen(() => !isOpen);
  }
  function handleSearch(event) {
    event.preventDefault();
    const query = event.target.querySelector("input").value;
    setQuery(query);
    event.target.reset(); // Reset input setelah pencarian
    console.log(query);
  }

  const sign_in_Style = {
    color: "white",
    fontSize: "1.2rem",
    fontWeight: "bold",
    cursor: "pointer",
    marginRight: "3rem",
    fontFamily: "Roboto, sans-serif",
    textDecoration: "none",
  };

  return (
    <div className={`main-content ${isOpen ? "shifted" : ""}`}>
      <Nav>
        <LeftSection>
          <Hamburger
            style={{ marginLeft: "2rem", color: "white !important" }}
            toggled={isOpen}
            toggle={setOpen}
            color="white"
          />
          <Logo />
        </LeftSection>
        <SearchForm handleSearch={handleSearch} />

        <Login sign_in_Style={sign_in_Style} />
      </Nav>

      {/* konten lain di sini */}
      {isOpen && <ListMenu />}
    </div>
  );
}

function Nav({ children }) {
  return <nav className="navbar">{children}</nav>;
}

function LeftSection({ children }) {
  return <div className="left-section">{children}</div>;
}

function Logo() {
  return (
    <div className="logo">
      <img src={logo1} alt="logo" />
    </div>
  );
}

function SearchForm({ handleSearch }) {
  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input type="text" placeholder="Search..." />
    </form>
  );
}

function Login() {
  return (
    <div className="login">
      <span className="login-teks">Sign in</span>
    </div>
  );
}

function ListMenu() {
  return (
    <div className="list-menu">
      <ul>
        <li>Saved</li>
        <li>Tv Shows</li>
        <li>Movies</li>
        <li>Trending</li>
        <li>Genre</li>
      </ul>
    </div>
  );
}

// export function Saved({ saveContent }) {
//   return (
//     <div className="container-content">
//       <div className="content" key={saveContent.imdbID}>
//         <Tilt
//           className="parallax-effect-glare-scale"
//           perspective={600}
//           glareEnable={true}
//           glareMaxOpacity={0.45}
//           scale={1.02}
//           gyroscope={false}
//         >
//           <img
//             className="img-content"
//             src={saveContent.Poster}
//             alt={saveContent.Title}
//           />
//         </Tilt>
//         <span className="span-content">{saveContent.Title}</span>
//         <div className="save-detail">
//           <span
//             className="detail-content"
//             onClick={() => {
//               window.open(
//                 `https://www.imdb.com/title/${movie.imdbID}`,
//                 "_blank"
//               );
//             }}
//           >
//             detail
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }
