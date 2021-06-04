const root = document.getElementById('root');
const cajaTotal = document.getElementById('total');
const containerCharacterInfo = document.getElementById('container-character-info');
const comicCharactersResults = document.getElementById('comic-characters-results');
const comicCharactersInfo = document.getElementById('comic-characters-info');

const printData = (arr, total) => {
  const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
  const pathNonFoundWanted =   "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available/portrait_uncanny"
  let cajita = '';
  arr.forEach(comic => {
    const {title, thumbnail: {extension, path}, id} = comic;
    cajita += `
    <div class="column is-one-fifth" onclick="getId(${id})">
      <figure>
        <a>
        <img src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${title}">
          <p>${title}</p>
        </a>
      </figure>
    </div>`
  });
  cajaTotal.innerHTML = total.total;
  root.innerHTML = cajita;
}

const printDetailComic = arr => {
  let cajita = '';
  arr.forEach(comic => {
    const {thumbnail: {extension, path}, title, description, dates, creators } = comic;
    const releaseDate = new Intl.DateTimeFormat('es-AR').format(new Date(dates?.find(el => el.type === 'onsaleDate').date))
    const writer = creators?.items?.filter(el => el.role === 'writer')
    cajita += `
    <div class="columns">
      <div class="column is-one-quarter">
        <figure class="img-detalle">
          <img src="${path}.${extension}" alt="${title}">
        </figure>
      </div>
      <div class="column">
        <h3>${title}</h3>
        <h4>Publicado:</h4>
        <p>${releaseDate}</p>
        <h4>Guioniistas:</h4>
        <p>${writer ? writer[0]?.name : 'Sin informacion'}</p>
        <h4>Descripción:</h4>
        <p>${description}</p>
        <button onclick="fetchData()">Regresar</button>
      </div>
    </div> `
  })
  root.innerHTML = cajita
}



const printCharactersComic = (arr, containerText, container) => {
  if(arr.length === 0){
      containerText.innerHTML = `
          <h3 class="title mb-2 title-color">Personajes</h3>
          <p class="is-size-6 has-text-weight-bold mt-0">${arr.length} Resultado(s)</p>
          <p class="subtitle has-text-weight-bold mt-6 title-color">No se han encontrado resultados</p>`
  }
  let box = '';
  arr.forEach(character => {
      const {name, thumbnail: {extension, path}, id} = character;
      const pathNonFoundNowanted = "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available";
      const pathNonFoundWanted = "https://i.pinimg.com/564x/6d/af/a0/6dafa08555ee450d9d61061c7bc23cb5";
     
      containerText.innerHTML = `
              <h3 class="title mb-2 title-color">Personajes</h3>
              <p class="is-size-6 has-text-weight-bold mt-0">${arr.length} Resultado(s)</p>`
      box += `<div class="column is-one-fifth" onclick="getCharacterId(${id})">
                  <div class="card-character" data-title="Character" >
                      <img src="${path === pathNonFoundNowanted ? pathNonFoundWanted : path}.${extension}" alt="${name}" class="img-comic-character">
                      <span class="red"></span>
                      <p class="name is-size-5 has-text-weight-bold has-text-centered mt-1 p-3">${name}</p>
                  </div>
              </div> `
  });
container.innerHTML = box
};






