export default function Saved({ saveContent, isClicked }) {
  return (
    isClicked && (
      <div className="container-content">
        {saveContent.map((content) => (
          <div className="content" key={content.imdbID}>
            <Tilt
              className="parallax-effect-glare-scale"
              perspective={600}
              glareEnable={true}
              glareMaxOpacity={0.45}
              scale={1.02}
              gyroscope={false}
            >
              <img
                className="img-content"
                src={content.Poster}
                alt={content.Title}
              />
            </Tilt>
            <span className="span-content">{content.Title}</span>
            <div className="save-detail">
              <span
                className="detail-content"
                onClick={() => {
                  window.open(
                    `https://www.imdb.com/title/${content.imdbID}`,
                    "_blank"
                  );
                }}
              >
                detail
              </span>
            </div>
          </div>
        ))}
      </div>
    )
  );
}
