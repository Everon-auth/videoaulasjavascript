'use strict';
//GetBoundingClientRect = da as coordenadas do elemento selecionado 

///////////////////////////////////////
// Modal window
const header = document.querySelector('header')
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btns => btns.addEventListener('click', openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
const message = document.createElement('div')
message.classList.add('cookie-message')

message.innerHTML = `We use cookies for improved functionality and analytics. <button class="btn btn--close--cookie">Got it!</button>`

header.append(message)
header.after(message)

document.querySelector('.btn--close--cookie').addEventListener('click', ()=>{
  message.remove()
})

message.style.backgroundColor='#37383d'
message.style.width="100%"

message.style.height = Number.parseFloat(getComputedStyle(message).height,10) +40 + 'px'

//document.documentElement.style.setProperty('--color-primary','orangered')

const logo = document.querySelector('.nav__logo')


const btnScrollTo = document.querySelector('.btn--scroll-to')

const section1 = document.querySelector('#section--1')

btnScrollTo.addEventListener('click', (e)=>{

/*

  /////////////////////////////////////////////////
  JEITO ANTIGO DE FAZER O SCROLL ATÉ TAL ELEMENTO
  ////////////////////////////////////////////////

  const s1coords = section1.getBoundingClientRect()
    window.scrollTo({
      left : s1coords.left + window.pageXOffset,
      top: s1coords.top + window.pageYOffset,
      behavior : 'smooth'
   }) */

   section1.scrollIntoView({behavior:'smooth'})
})

/* 
//////////////////////////////////////////////////
                gerador de cor aleatória
//////////////////////////////////////////////////

const randomInt = (min,max) => 
Math.floor(Math.random() * (max - min + 1) + min)

const randomColor = () =>
`rgb(${randomInt(0,255)},${randomInt(0,255)},${randomInt(0,255)})`


document.querySelector('.nav__link').addEventListener("click", function(e){
  e.preventDefault()
  this.style.backgroundColor=randomColor()
  console.log('link', e.target)
}) 
*/
/*
/////////////////////////////////////////////////////////////////////
    Jeito ruim de fazer para todos os elementos o evento de click.
////////////////////////////////////////////////////////////////////
 document.querySelectorAll(".nav__link").forEach(el =>{

  el.addEventListener("click", function(e){
    e.preventDefault()
    const id = this.getAttribute('href')
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    })
  }) 
})  */

/* function evt(container,selection,atributo){

  let evtclicko = () =>{
    document.querySelector(container).addEventListener('click', function(e){
      console.log(e.target)

      if (e.target.classList.contains(selection)) {
        console.log('link')
        e.preventDefault()
        const id = e.target.getAttribute(atributo)
        console.log(document.querySelector(id))
        return document.querySelector(id)
      }
    })
  }

  const slider = (element) =>{
    element.scrollIntoView({behavior : 'smooth'})
  }

  let click = evtclicko()
  console.log(evtclicko())
  slider(click)

}
evt('.nav__links','.nav__link','href') */


document.querySelector('.nav__links').addEventListener('click', function(e){

  if (e.target.classList.contains('nav__link')) {
    e.preventDefault()
    const id = e.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({
    behavior: 'smooth'})
  }
})
const tabs = document.querySelectorAll('.operations__tab')
const tabsContainer = document.querySelector('.operations__tab-container')
const tabsContent = document.querySelectorAll('.operations__content')
tabsContainer.addEventListener('click', function(e){
  //aceita os targets apênas da classe definida
  const clicked = e.target.closest('.operations__tab')
  
  //quando houver algum erro, retorna a função ao inves de correr mais ela.
  if(!clicked) return

  tabs.forEach(t => t.classList.remove('operations__tab--active'))
  tabsContent.forEach(t => t.classList.remove('operations__content--active'))

  clicked.classList.add('operations__tab--active')
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active')

})

const handledEvt = function(e){
  if(e.target.classList.contains('nav__link')){
    const link = e.target
    const siblings = link.closest('nav').querySelectorAll('.nav__link')
    const logo = link.closest('.nav').querySelector('img')

    siblings.forEach(el =>{
      if(el !== link) el.style.opacity =this
    })
    logo.style.opacity=this
  }
}

const nav = document.querySelector('.nav__links')

nav.addEventListener('mouseover', handledEvt.bind(0.5))
nav.addEventListener('mouseout', handledEvt.bind(1))

const navigationBar = document.querySelector('.nav')

/* 
/////////////////////////////////////////////////////
A API IntersectionObserver consegue fazer isso melhor.
/////////////////////////////////////////////////////
const initialCoords = section1.getBoundingClientRect()
window.addEventListener('scroll',()=>{
  if(window.scrollY > initialCoords.top)
  navigationBar.classList.add('sticky')
  else navigationBar.classList.remove('sticky')
}) 

///////////////////////////////////////////////////////
  Exemplo da API
///////////////////////////////////////////////////////
const obscallback = function(entries,observer){
  entries.forEach(entry =>{
    console.log(entry)
  })
}

const obsOptins = {
  root: null,
  threshold: 0.4,
}

const observer = new IntersectionObserver(obscallback,obsOptins)
observer.observe(section1)
*/

//////////////////////////////////////////
//Header andando junto com a página a partir de tal ponto
const headernav = document.querySelector('.header')
const navHeight = navigationBar.getBoundingClientRect().height


const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) navigationBar.classList.add('sticky');
  else navigationBar.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(headernav);


//////////////////////////////////////////////
//As sessões de conteúdo aparecendo com o andar da página
const allSection = document.querySelectorAll('.section')

const revealSection = function(entries,observer){
  const[entry] = entries
  if(!entry.isIntersecting) return

  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)
}

const sectionObserver = new IntersectionObserver(revealSection,{
  root:null,
  threshold: 0.15,
})

allSection.forEach(function(section){
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})


//////////////////////////////////
// as imágens dando load quando houver 
//scroll e ela for mostrada otimizar
//o load da página quando aberta

const imgTargets = document.querySelectorAll('img[data-src]')

const loadImg = (entries,observer) =>{
  const [entry] = entries

  if(!entry.isIntersecting) return

  entry.target.src=entry.target.dataset.src

  entry.target.addEventListener('load', ()=>{
    entry.target.classList.remove('lazy-img')
  })
  
}

const imgObserver = new IntersectionObserver(loadImg,{
  root: null,
  threshold: 0,
})

imgTargets.forEach(img => imgObserver.observe(img))



/////////////////////////////////////////////
// Slider de componentes
const slider = function(){
const slides = document.querySelectorAll('.slide')
const dotContainer = document.querySelector('.dots')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')

const createDots = () =>{
  slides.forEach((_,i)=>{
    dotContainer.insertAdjacentHTML('beforeend',`<button class="dots__dot" data-slide="${i}"></button>`)
  })
}


let curSlide = 0

const maxSlide = slides.length

const slider = document.querySelector('.slider')
slider.style.overflow='hidden'

const goToSlide = (slide)=>{
slides.forEach((s,i)=>{
s.style.transform = `translateX(${100 * (i-slide)}%)`
})
}

const nextSlide = function(){
  if (curSlide==maxSlide -1) {
    curSlide=0
  }else{
    curSlide++
  }
  goToSlide(curSlide)
  activeDot(curSlide)
}

const prevSlide = () =>{
  if (curSlide==0){
    curSlide=maxSlide-1
  }else{
    curSlide--
  }
  goToSlide(curSlide)
  activeDot(curSlide)
}

btnRight.addEventListener('click',nextSlide)
btnLeft.addEventListener('click', prevSlide)

const dots = document.querySelector('.dots')

document.addEventListener('keydown', function(e){
  if(e.key === 'ArrowLeft')prevSlide()
  e.key === 'ArrowRight' && nextSlide()

})

dotContainer.addEventListener('click',function(e){
  if(e.target.classList.contains('dots__dot')){
    const {slide} = e.target.dataset
    goToSlide(slide)
    activeDot(slide)
  }
})

const activeDot = (slide) =>{
  document.querySelectorAll('.dots__dot').forEach(dot =>dot.classList.remove('dots__dot--active'))
  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add(`dots__dot--active`)
}
const init = () =>{
  goToSlide(0)
  createDots()
  activeDot(0)
}
init()
}
slider()
