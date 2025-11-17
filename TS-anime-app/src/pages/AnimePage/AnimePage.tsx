import { useEffect, useState } from "react";
import type { IAnimeModel } from "../../entities/anime.model";
import { useNavigate } from "react-router-dom";
import "../AnimePage/AnimePage.css"


function AnimePage() {
  const [images, setImages] = useState<IAnimeModel[]>([]);
  const [loadCount, setLoadCount] = useState(1);
  const navigate = useNavigate();

  const fetchImages = async () => {
    for (let i = 0; i < 2; i++) {
      try {
        const res = await fetch('https://api.nekosia.cat/api/v1/images/random');
        if (!res.ok) throw new Error('Ошибка загрузки изображения');
        const json: IAnimeModel = await res.json();
        setImages(prev => [...prev, json]);
      } catch (err) {
        console.error(`Ошибка при запросе изображения ${i + 1}:`, err);
      }
    }
  };

  useEffect(() => {
    fetchImages();
  }, [loadCount]);

  const handleShowMore = () => {
    setLoadCount(prev => prev + 1);
  };

  return (
    <div className="anime-page">
      <h1>♥ Аниме Арты ♥</h1>
      <section>
        {images.length > 0 ? (
          images.map((item) => (
            <div
              key={item.id}
              className="cat-art"
              onClick={() => navigate(`/art/${item.id}`)}
              style={{ cursor: 'pointer' }}
            >
              <img
                src={item.image.original.url}
                alt={item.anime.title || "art"}
                className="cat-image"
              />
            </div>
          ))
        ) : (
          <p>Загрузка изображений...</p>
        )}
      </section>
      <button onClick={handleShowMore} className="loadingmore">
        Показать еще
      </button>
    </div>
  );
}

export default AnimePage;