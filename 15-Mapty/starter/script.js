const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');
 
let data = new database('workouts')

class workout{
    type = 'running'
    date = new Date()
    id = data.createID()
    constructor(coords,distance,duration){
        this.coords = coords
        this.distance = distance
        this.duration = duration
    }
    _setDescription(){
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        this.description = `${this.type[0].toUpperCase()}${this.type.slice(1)} on ${months[this.date.getMonth()]} ${this.date.getDate()}`
    }
}

class running extends workout{
    constructor(coords,distance,duration,cadence){
        super(coords,distance,duration)
        this.cadence = cadence
        this.calcPace()
        this._setDescription()
    }

    calcPace(){
        this.pace = this.duration / this.distance
        return this.pace
    }
}
class cycling extends workout{
    type = 'cycling'
    constructor(coords,distance,duration,elevationGain){
        super(coords,distance,duration)
        this.elevationGain = elevationGain
        this.calcSpeed()
        this._setDescription()
    }

    calcSpeed(){
        this.speed = this.distance / (this.duration / 60)
        return this.speed
    }
}


class App {
    #map;
    #mapZoomLevel = 13;
    #mapEvent;
    #workouts = [];

    constructor(){
        
        this._getPosition()

        this._getLocalstorage(this)
        form.addEventListener('submit',this._newWorkout.bind(this))
        inputType.addEventListener('change',this._toggleElevationField)
        containerWorkouts.addEventListener('click',this._moveToPopup.bind(this))
    }
    _getPosition(){
        if(navigator.geolocation)
        navigator.geolocation.getCurrentPosition(this._loadMap.bind(this),function(){
            alert('não é possível acessar sua localização')
        })
    }
    _loadMap(position) {

        const { latitude } = position.coords;
        const { longitude } = position.coords;
    
        const coords = [latitude, longitude];
    
        this.#map = L.map('map').setView(coords, this.#mapZoomLevel);
    
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(this.#map);


        this.#map.on('click',this._showForm.bind(this))
    }
    _showForm(mapE){
        this.#mapEvent = mapE
        form.classList.remove('hidden')
        inputDistance.focus()

    }

    _hideForm(){
        inputDistance.value = inputDuration.value = inputCadence.value = inputElevation.value = ''
        form.style.dysplay='none'
        form.classList.add('hidden')
        setTimeout(() => form.style.dysplay='grid',2000)
    }

    _toggleElevationField(){
        inputElevation.closest('.form__row').classList.toggle('form__row--hidden')
inputCadence.closest('.form__row').classList.toggle('form__row--hidden')

    }
    _newWorkout(e){


        const validInputs = (...inputs) =>
            inputs.every(inp => Number.isFinite(inp))
        const allPositive = (...inputs) => inputs.every(inp => inp > 0)
        e.preventDefault()

        const type = inputType.value
        const distance = Number(inputDistance.value)
        const duration = Number(inputDuration.value)
        const {lat,lng} = this.#mapEvent.latlng
        let workout

        if(type =='running'){
            const cadence = +inputCadence.value
            if(!validInputs(distance,duration,cadence) ||
                !allPositive(duration,distance,cadence)) 
                return alert('Os valores devem ser positivos!')

            workout = new running([lat,lng],distance,duration,cadence)
        }
        if(type =='cycling'){
            const elevation = +inputElevation.value
            if(!validInputs(duration,distance,elevation) || 
                !allPositive(duration,distance))
                return alert('Os valores devem ser positivos!')

            workout = new cycling([lat,lng],distance,duration,elevation)
        }

        this.#workouts.push(workout)
        this._renderWorkoutMarker(workout)
        this._renderWorkout(workout)

        this._hideForm()
        this._setLocalStorage()
    
    }

    _renderWorkoutMarker(workout){
        L.marker(workout.coords)
        .addTo(this.#map)
        .bindPopup(
            L.popup({
                maxWidth: 250,
                minWidth: 100,
                autoClose: false,
                closeOnClick: false,
                className: `${workout.type}-popup`
            })
        )
        .setPopupContent(`${workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'} ${workout.description}`)
        .openPopup()
    }

    _renderWorkout(workout){

    let html = `
      <li class="workout workout--${workout.type}" data-lat="${workout.coords[0]}" data-lng="${workout.coords[1]}">
        <h2 class="workout__title">${workout.description}</h2>
        <div class="workout__details">
          <span class="workout__icon">${
            workout.type === 'running' ? '🏃‍♂️' : '🚴‍♀️'
          }</span>
          <span class="workout__value">${workout.distance}</span>
          <span class="workout__unit">km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⏱</span>
          <span class="workout__value">${workout.duration}</span>
          <span class="workout__unit">min</span>
        </div>
    `;

    if (workout.type === 'running')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.pace.toFixed(1)}</span>
          <span class="workout__unit">min/km</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">🦶🏼</span>
          <span class="workout__value">${workout.cadence}</span>
          <span class="workout__unit">spm</span>
        </div>
      </li>
      `;

    if (workout.type === 'cycling')
      html += `
        <div class="workout__details">
          <span class="workout__icon">⚡️</span>
          <span class="workout__value">${workout.speed.toFixed(1)}</span>
          <span class="workout__unit">km/h</span>
        </div>
        <div class="workout__details">
          <span class="workout__icon">⛰</span>
          <span class="workout__value">${workout.elevationGain}</span>
          <span class="workout__unit">m</span>
        </div>
      </li>
      `;

    form.insertAdjacentHTML('afterend', html);
    }

    _moveToPopup(e){

        if (!this.#map) return;
        const workoutEl = e.target.closest('.workout')
        if(workoutEl !=null){
            let coords = new Array
            
            coords =[ workoutEl.getAttribute('data-lat'),   workoutEl.getAttribute('data-lng')]
            this.#map.setView(coords,this.#mapZoomLevel,{
                animate : true,
                pan: {
                    duration: 1
                }
            })
        }
    }

        _setLocalStorage() {
            localStorage.setItem('workouts', JSON.stringify(this.#workouts));
          }
          _getLocalstorage() {
            const data = JSON.parse(localStorage.getItem('workouts'));
        
            if (!data) return;
        
            this.#workouts = data;
        
            this.#workouts.forEach(work => {
              this._renderWorkout(work);
            });
          }
        
          reset() {
            localStorage.removeItem('workouts');
            location.reload();
          }

}
const app = new App()
