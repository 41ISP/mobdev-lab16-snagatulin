import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { IAnimeModel } from "../../entities/anime.model";
import "../OtherPage/OtherPage.css";

function OtherPage() {
  const { id } = useParams<{ id: string }>();
  const [artData, setArtData] = useState<IAnimeModel | null>(null);
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchArtById = async () => {
      if (!id) return;
      try {
        const res = await fetch(`https://api.nekosia.cat/api/v1/getImageById/${id}`);
        if (!res.ok) throw new Error('Ошибка загрузки изображения');
        const data: IAnimeModel = await res.json();
        setArtData(data);
        setImageUrl(data.image.original.url);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArtById();
  }, [id]);



  return (
    <section className="art-container">
      {imageUrl ? (
        <img className="art-image" src={imageUrl} alt="art" />
      ) : (
        <p>Загрузка...</p>
      )}

      {artData && (
        <div className="info">
          <h2 className="title">
            {artData.anime?.title || "Без названия"}
          </h2>

          <p className="category">
            <strong>Категория:</strong> {artData.category}
          </p>

          <p className="tags">
            <strong>Теги:</strong> {artData.tags?.length > 0 ? artData.tags.join(', ') : 'Нет тегов'}
          </p>

          <p className="creator">
            <strong>Автор:</strong> {artData.attribution?.artist?.username || "Неизвестен"}
          </p>

          <p className="source">
            <strong>Источник:</strong>{' '}
            <a
              href={artData.source?.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Посмотреть
            </a>
          </p>
        </div>
      )}

      <button className="back-button" onClick={() => navigate(-1)}>
        &#8592; Назад
      </button>
    </section>
  );
}

export default OtherPage;