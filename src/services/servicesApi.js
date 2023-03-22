const API_KEY = '32953122-2dcf40f65e2637fc605cd2cf8';

export const searchImage = async (search, page) => {
  const resp = await fetch(
    `https://pixabay.com/api/?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  );
  if (!resp.ok) {
    throw new Error(`fetch failed`);
  }
  const body = await resp.json();
  const images = body.hits.map(el => {
    return {
      id: el.id,
      webformatURL: el.webformatURL,
      largeImageURL: el.largeImageURL,
    };
  });
  const totalImages = body.totalHits;
  return { images, totalImages };
};
