/* const Person = function(FirstName,BirthYear){
    this.FirstName = FirstName
    this.BirthYear = BirthYear
}

const Everton = new Person('Everton','2001')
const Joaosinho = new Person('Joãosinho','1987')

Person.prototype.calcAge = function(){
    console.log(2021 - this.BirthYear)
}
Everton.calcAge()
 */





///////////////////////////////////
/////// challenger 1
/* 
1. Use a constructor function to implement a Car. A car has a make and a speed property. The speed property is the current speed of the car in km/h;
2. Implement an 'accelerate' method that will increase the car's speed by 10, and log the new speed to the console;
3. Implement a 'brake' method that will decrease the car's speed by 5, and log the new speed to the console;
4. Create 2 car objects and experiment with calling 'accelerate' and 'brake' multiple times on each of them.

DATA CAR 1: 'BMW' going at 120 km/h
DATA CAR 2: 'Mercedes' going at 95 km/h

GOOD LUCK 😀
*/

/* 

//////////////////////////////////////////////////////
////////// Resolução do desafio.

const car = function(make,speed){
 this.model = make
 this.speed = speed
 console.log(`Carro: ${this.model}
 Velocidade -- Inicial: ${this.speed} Km/h`)
}

const car1 = new car('BMW',120)

const car2 = new car('Mercedes',95)

car.prototype.accelerate = function(){
    this.speed+=10
    console.log(`Carro: ${this.model}
Velocidade -- Acelerando: ${this.speed} Km/h`)
}

car.prototype.brake = function(){
    this.speed-=5
    console.log(`Carro: ${this.model}
Velocidade -- Diminuindo: ${this.speed} Km/h`)
}

car1.accelerate()
car1.brake()
car2.accelerate()
car2.brake() */

///////////////////////////////////////////////////////
//////////////////// Usando o construtor de classes

/*
//////////////////////////////////
////////// Uma das formas de declarar uma classe


const personCL = class{
}*/


////////////////////////////////////////
//////////////// Outra forma de criar classe
/* class personCL{
    constructor(firstName,BirthYear){
        this.firstName = firstName
        this.BirthYear = BirthYear
    }
    calcAge(){
        console.log(2021- this.BirthYear)
    }
}

//////////////////////////////////////////
///// Adicionando um prototype na classe
//// Igual ao outro método de POO.

personCL.prototype.Arg = function(){
    console.log(`Olá ${this.firstName}`)
}

const Everton = new personCL('Everton',2001)
Everton.calcAge()
Everton.Arg()
 */

/* const personProto = {
    calcAge(){
        console.log(2037 - this.BirthYear)
    }
}

const steven = Object.create(personProto)
console.log(steven)
steven.name = 'Steven'
steven.BirthYear = 2002

console.log(steven.__proto__) */

/* 
1. Re-create challenge 1, but this time using an ES6 class;
2. Add a getter called 'speedUS' which returns the current speed in mi/h (divide by 1.6);
3. Add a setter called 'speedUS' which sets the current speed in mi/h (but converts it to km/h before storing the value, by multiplying the input by 1.6);
4. Create a new car and experiment with the accelerate and brake methods, and with the getter and setter.

DATA CAR 1: 'Ford' going at 120 km/h

GOOD LUCK 😀
*/

/* 
class car{
    constructor(make,speed){
        this.make = make
        this.speed = speed
    }

    accelerate(){
        this.speed+=10
        console.log(`Carro: ${this.make}
Velocidade: ${this.speed}Km/h`)
    }
    brake(){
        this.speed-=5
        console.log(`Carro: ${this.make}
Velocidade: ${this.speed}Km/h`)
    }
    get speedUS(){
        return this.speed / 1.6
    }
    set speedUS(speed){
        this.speed = speed * 1.6
    }
}

const Ford = new car('Ford',120)

Ford.accelerate()
 */

///////////////////////////////////////
// Coding Challenge #3

/* 
1. Use a constructor function to implement an Electric Car (called EV) as a CHILD "class" of Car. Besides a make and current speed, the EV also has the current battery charge in % ('charge' property);
2. Implement a 'chargeBattery' method which takes an argument 'chargeTo' and sets the battery charge to 'chargeTo';
3. Implement an 'accelerate' method that will increase the car's speed by 20, and decrease the charge by 1%. Then log a message like this: 'Tesla going at 140 km/h, with a charge of 22%';
4. Create an electric car object and experiment with calling 'accelerate', 'brake' and 'chargeBattery' (charge to 90%). Notice what happens when you 'accelerate'! HINT: Review the definiton of polymorphism 😉

DATA CAR 1: 'Tesla' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

/* const Car = function (modelo, speed) {
  this.modelo = modelo;
  this.speed = speed;
};

Car.prototype.accelerate = function () {
  this.speed += 10;
  console.log(`${this.modelo} está indo à ${this.speed} km/h`);
};

Car.prototype.brake = function () {
  this.speed -= 5;
  console.log(`${this.modelo} está indo à ${this.speed} km/h`);
};

const Eletrico = function (modelo, speed, bateria) {
  Car.call(this, modelo, speed);
  this.bateria = bateria;
};

Eletrico.prototype = Object.create(Car.prototype);

Eletrico.prototype.bateriaBattery = function (bateriaTo) {
  this.bateria = bateriaTo;
};

Eletrico.prototype.accelerate = function () {
  this.speed += 20;
  this.bateria--;
  console.log(
    `${this.modelo} está indo à ${this.speed} km/h, com ${this.bateria}% de Bateria`
  );
};

const tesla = new Eletrico('Tesla', 120, 23);
tesla.chargeBattery(90);
console.log(tesla);
tesla.brake();
tesla.accelerate(); */


// Coding Challenge #4

/* 
1. Re-create challenge #3, but this time using ES6 classes: create an 'EVCl' child class of the 'CarCl' class
2. Make the 'charge' property private;
3. Implement the ability to chain the 'accelerate' and 'chargeBattery' methods of this class, and also update the 'brake' method in the 'CarCl' class. They experiment with chining!

DATA CAR 1: 'Rivian' going at 120 km/h, with a charge of 23%

GOOD LUCK 😀
*/

class carCl{
    constructor(make,speed){
        this.make = make
        this.speed = speed
    }
    accelerate(){
        this.speed +=10
        console.log(
            `Modelo: ${this.make}
Está a ${this.speed}Km/h`
        )
    }
    brake(){
        this.speed -=5
        console.log(
            `Modelo: ${this.make}
Está a ${this.speed}Km/h`
        )
    }

}
class EVCl extends carCl{
    #charge
    constructor(make,speed,batery){
       super(make,speed)
        this.#charge = batery
    }
    accelerate(){
        this.speed +=20
        this.#charge--
        console.log(
            `Modelo: ${this.make}
Está a ${this.speed}Km/h
Com ${this.#charge}% de bateria`
        )
    }
    brake(){
        this.speed -=10
        console.log(
            `Modelo: ${this.make}
Está a ${this.speed}Km/h
Com ${this.#charge}% de bateria`
        )
    }
    chargeBatery(val){
        this.#charge = val
    }
}

const Rivian = new EVCl('Rivian',120,23)

Rivian.chargeBatery(90)
Rivian.accelerate()
Rivian.brake()