const privada = 'aa58f246ede578352b8489f4101cfc27483d1118';
const publica = '7e127bd9cabb683df771ddcab140a8a8';
// const publica = '586b18cad7e0e9c211f61f8222f57401';
const timestamp = Date.now();

const hash = md5(timestamp + privada + publica);
const boton1 = document.getElementById('boton1');
const boton2 = document.getElementById('boton2');
const botonInicio = document.getElementById('boton-inicio');
const botonFinal = document.getElementById('boton-final');


let offset = 0;
let total = 0;

// const url = `http://gateway.marvel.com/v1/public/comics?ts=${timestamp}&apikey=${publica}&hash=${hash}`;
// const url = `http://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`;

const fetchData = () => {
  const url = `https://gateway.marvel.com/v1/public/comics?limit=20&offset=${offset}&ts=${timestamp}&apikey=${publica}&hash=${hash}`;
  fetch(url)
    .then(response => response.json())
    .then(obj => {
      const total = obj.data
      printData(obj.data.results, total)
      checkOffset(total.total);
    })
    .catch(error => console.error(error))
    return total.total
}

fetchData();

boton1.addEventListener('click', () => {
  offset -= 20;
  fetchData();
  checkOffset();
})

boton2.addEventListener('click', () => {
  offset += 20;
  fetchData();
  checkOffset();
})

botonInicio.addEventListener('click', () => {
  offset = 0;
  fetchData();
  checkOffset();
})

botonFinal.addEventListener('click', () =>{
  offset = total.innerText - (total.innerText % 20);
  fetchData();
  checkOffset();
})

const checkOffset = (total) => {
  offset <= 0 ? boton1.disabled = true : boton1.disabled = false;
  offset <= 0 ? botonInicio.disabled = true : botonInicio.disabled = false;
  offset == total - (total % 5) ? boton2.disabled = true : boton2.disabled = false;
  offset == total - (total % 5) ? botonFinal.disabled = true : botonFinal.disabled = false;
}


const getId = id => {
  const url = `https://gateway.marvel.com/v1/public/comics/${id}?ts=${timestamp}&apikey=${publica}&hash=${hash}`;
  fetch(url)
    .then(resp => resp.json())
    .then(obj => printDetailComic(obj.data.results))
    comicId = id
    getCharacterComicId(comicId)
    return comicId
}

const getCharacterComicId = (id) => {
  let offsetComic = 0; 
  const url = `https://gateway.marvel.com/v1/public/comics/${id}/characters?limit=5&offset=${offsetComic}&ts=${timestamp}&apikey=${publica}&hash=${hash}`
  fetch(url)
      .then(response => response.json())
      .then(obj => {
        const totalComics = obj.data.total;
        checkOffset(totalComics)
        console.log(totalComics, offsetComic);
        printCharactersComic(obj.data.results, comicCharactersResults, comicCharactersInfo)})
      .catch(err => console.error(err))
};