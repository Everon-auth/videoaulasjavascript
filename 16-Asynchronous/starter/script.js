const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////

/* const getCountryDataAndNeighbour = function(country){

    const request = new XMLHttpRequest()
    request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`)
    request.send()

    request.addEventListener('load',function(){
        const data = JSON.parse(this.responseText)
        data.forEach((dat,i) => {
                const html = `<article class="country">
                <img class="country__img" src="${data[i].flag}" />
                <div class="country__data">
                <h3 class="country__name">${data[i].nativeName}</h3>
                <h4 class="country__region">${data[i].region}</h4>
                <p class="country__row"><span>👫</span>${(data[i].population / 1000000).toFixed(1)}</p>
                <p class="country__row"><span>🗣️</span>${data[i].languages[0].name}</p>
                <p class="country__row"><span>💰</span>${data[i].currencies[0].code}</p>
                </div>
            </article>` 

            countriesContainer.insertAdjacentHTML('beforeend',html)
            countriesContainer.style.opacity =1
            countriesContainer.style.display = 'flex'
            countriesContainer.style.flexWrap ='wrap'
            const flagsBanners = document.querySelectorAll('article')
            flagsBanners.forEach((fl,i)=>{
                flagsBanners[i].style.marginTop ='40px'
                flagsBanners[i].style.marginBottom ='40px'
            })
        })
    })
}


getCountryDataAndNeighbour('Brazil')
 */



const renderCountry = function (data, className = '') {
  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  countriesContainer.style.opacity = 1;
  countriesContainer.style.display = 'flex'
  countriesContainer.style.flexWrap ='wrap'
  const flagsBanners = document.querySelectorAll('article')
  flagsBanners.forEach((fl,i)=>{
      flagsBanners[i].style.marginTop ='40px'
      flagsBanners[i].style.marginBottom ='40px'
  })
};
/*
request.open('GET', `https://restcountries.eu/rest/v2/all`)

request.addEventListener('load',function(){
    const data = JSON.parse(this.responseText)
    data.forEach((dat,i) => {
            const html = `<article class="country">
            <img class="country__img" src="${data[i].flag}" />
            <div class="country__data">
            <h3 class="country__name">${data[i].nativeName}</h3>
            <h4 class="country__region">${data[i].region}</h4>
            <p class="country__row"><span>👫</span>${(data[i].population / 1000000).toFixed(1)}</p>
            <p class="country__row"><span>🗣️</span>${data[i].languages[0].name}</p>
            <p class="country__row"><span>💰</span>${data[i].currencies[0].code}</p>
            </div>
        </article>` 

        countriesContainer.insertAdjacentHTML('beforeend',html)
        countriesContainer.style.opacity =1
        countriesContainer.style.display = 'flex'
        countriesContainer.style.flexWrap ='wrap'
        const flagsBanners = document.querySelectorAll('article')
        flagsBanners.forEach((fl,i)=>{
            flagsBanners[i].style.marginTop ='40px'
            flagsBanners[i].style.marginBottom ='40px'
        })
    })
}) */

/* const getCountryData = function(country){
    fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(response => console.log(response.json()))
    .then(data => renderCountry(data[0]))
}

getCountryData('brazil')
getCountryData('portugal')
getCountryData('united states')
getCountryData('france')

 */
/* var myImage = document.querySelector('img');
fetch(`data:image/jpeg;base64,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`)
.then((response) => response.blob())
.then(myBlob =>{
    var objectURL = URL.createObjectURL(myBlob);
    myImage.src = objectURL;
}) */
/* var myResponse = Response.error();
try {
  myResponse.headers.set("Origin", "http://mybank.com");
} catch(e) {
  console.error(e);
} */
/* const getJSON = function (url, errorMsg = 'alguma coisa aconteceu!') {
    return fetch(url).then(response => {
      if (!response.ok) throw new Error(`${errorMsg} (${response.status})`);
  
      return response.json();
    });
};
const getCountryData = function (country) {
    // Country 1
    getJSON(
      `https://restcountries.eu/rest/v2/name/${country}`,
      'Pais não encontrado'
    )
      .then(data => {
        renderCountry(data[0]);
        const neighbour = data[0].borders[0];
  
        if (!neighbour) throw new Error('Pais que faz divisa não encontrado!');
  
        // Country 2
        return getJSON(
          `https://restcountries.eu/rest/v2/alpha/${neighbour}`,
          'Pais não encontrado'
        );
      })
  
      .then(data => renderCountry(data, 'neighbour'))
      .catch(err => {
        console.error(`${err} `);
        renderError(`alguma coisa aconteceu!  ${err.message}. Tente novamente!`);
      })
      .finally(() => {
        countriesContainer.style.opacity = 1;
      });
  };

btn.addEventListener('click', function(){
    getCountryData(`brazil`)
}) */


//////////////////////////////////////////////////////////////////////////////////////////
// Desafio 1
/* 
const whereAmI = function (lat, lng) {
    fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(res => {
        if (!res.ok) throw new Error(`Houve um problema com a API 
    Erro: ${res.status}`);
        return res.json();
    })
    .then(data => {
        console.log(data);
        console.log(`Você está em ${data.city}, ${data.country}`);
  
        return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
    })
    .then(res => {
        if (!res.ok) throw new Error(`Pais não encontrado (${res.status})`);
  
        return res.json();
    })
    .then(data => renderCountry(data[0]))
    .catch(err => console.error(`${err.message}`));
};
whereAmI('52.508','13.381')
whereAmI('19.037','72.873')
whereAmI('-33.933','18.474') */

/* console.log('inicio do teste')

setTimeout(()=> console.log('0 seg'),0)
Promise.resolve('resolved promisse 1').then(res => console.log(res))
Promise.resolve('resolved promisse 2').then(res => {
    for(let i = 0; i<100000000000; i++){}
    console.log(res)
})


console.log('fim do teste')
 */

/* const lotteryPromisse = new Promise(function(resolve,reject){
console.log('Calculando...')
setTimeout(function(){
    if(Math.random() >=0.5){
        resolve('You Win!')
    }else{
        reject('You Lose')
    }
},2000)
})

lotteryPromisse.then(res => console.log(res)).catch(err => console.error(err)) */
/* const getPosition = function () {
    return new Promise(function (resolve, reject) {
     navigator.geolocation.getCurrentPosition(
       position => resolve(position),
       err => reject(err)
     );
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };
 getPosition().then(pos => console.log(pos));

const whereAmI = function () {
    getPosition()
      .then(pos => {
        const { latitude: lat, longitude: lng } = pos.coords;
  
        return fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
      })
      .then(res => {
        if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
        return res.json();
      })
      .then(data => {
        console.log(`You are in ${data.city}, ${data.country}`);
  
        return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
      })
      .then(res => {
        if (!res.ok) throw new Error(`Country not found (${res.status})`);
  
        return res.json();
      })
      .then(data => renderCountry(data[0]))
      .catch(err => console.error(`${err.message}`));
};
  



btn.addEventListener('click', whereAmI) */


/* const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
};









createImage('img/img-1.jpg').then(img =>{
    currentImg = img
    console.log('Imagem 1 carregada')
    return wait(2)
})
.then(()=>{
    currentImg.style.display='none'
    return createImage('img/img-2.jpg')
})
.then(img =>{
    currentImg = img
    console.log('imagem 2 Carregada')
    return wait(1)
})
.then(()=>{
    currentImg.style.display='none'
})
.catch(err => console.error(err)) */


/* const whereAmI = async function(country){
    const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    console.log(res) 

    const res = await fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    const data = await res.json()
    console.log(data)
    renderCountry(data[0])
}

whereAmI('brazil')
console.log('FIRST') */


const imgContainer = document.querySelector('img')
 const wait = function (seconds) {
    return new Promise(function (resolve) {
      setTimeout(resolve, seconds * 1000);
    });
};
const createImage = function(imgPath){
  return new Promise(function(resolve,reject){
      const img = document.createElement('img')
      img.src = imgPath

      img.addEventListener('load', function(){
          imgContainer.append(img)
          resolve(img)
      })
      img.addEventListener('error', function(){
          reject(new Error('Imagem não encontrada'))
      })
  })
}

const loadNPause = async function(){
  try{
  let img =  await createImage('img/img-1.jpg')
  await wait(2)
  console.log('img 1')
  img.style.display = 'none'

  img =  await createImage('img/img-1.jpg')
  await wait(2)
  img.style.display = 'none'
  console.log('img 2')
  }catch(err){
    console.log(err)
  }
}


const loadAll = async function(imgArr){
  try{
    const imgs = imgArr.map( async img => await createImage(img))
    console.log(imgs)
  }catch(err){
    console.log(err)
  }
}
loadAll(['img/img-1.jpg','img/img-2.jpg','img/img-3.jpg'])