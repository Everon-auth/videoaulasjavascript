/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
  ['R$', 'Real Brasileiro']
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////

function dates () {
  // Armazena o dia de hoje
  let d = new Date();
  let dia = d.toLocaleDateString()
  let dateComplete = dia
  return{
    ins : (element, DOM = true) =>{
      if(DOM){
        element.value=dateComplete
      }else{
        element.innerText=dateComplete
      }
    }
  }
}
let datainsert = new dates()
datainsert.ins(document.getElementsByClassName("date")[0],false)

const displayMovements = function(movements, sort = false){
  containerMovements.innerHTML="";

  const movs = sort ? movements.slice().sort((a,b)=> a - b ) : movements

  movs.forEach(function (mov, i) {
    
    const type = mov > 0 ? 'deposit' : 'withdrawal'

    const html = `
    <div class="movements__row">
      <div class="movements__type movements__type--${type}">${i +1} ${type}</div>
      
      <div class="movements__value">R$ ${mov}</div>
    </div>`

    //<div class="movements__date">3 days ago</div>
    containerMovements.insertAdjacentHTML('afterbegin',html);
  });
}

const createUsernames = (accs) =>{
  accs.forEach(acc =>{
    acc.username = acc.owner
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('')
  })
}
createUsernames(accounts)

const calcDisplayBalance = (acc)=>{
acc.balance = acc.movements.reduce((acc, cur) =>
 acc + cur)
 labelBalance.textContent= `R$ ${acc.balance}`
}

const updateUI = (acc) =>{
  displayMovements(acc.movements)
    
  calcDisplayBalance(acc)

  let summ = new calcDisplaySummary(acc.movements)

  labelSumIn.textContent=`R$ ${summ.movIN()}`
  labelSumOut.textContent=`R$ ${summ.movOUT()}`

  inputLoginPin.value = inputLoginUsername.value = ""
}

const eurToUsd = 1.1

const movementsUSD = movements.map((mov) =>{
  return mov * eurToUsd
})

const movementsDescriptions = movements.map((mov,i)=>
  `Moviment ${i+1}: You ${mov > 0 ? 'Deposited' : 'Withdrew'} ${Math.abs(mov)}`
)


// Filter = Filtra os dados gerando um novo array com os dados extraídos
const deposits = movements.filter(mov => mov > 0 )
const withdrawals = movements.filter(mov => mov < 0)

// reduce = faz um calculo com os dados oferecidos como no exemplo, soma o acc e o mov
function calcDisplaySummary(movements){

  let input = ()=>{  
    const movementation = movements.filter(mov => mov > 0)
    .reduce((acc,mov) => acc + mov, 0)
    return movementation 
  }

  let output = () =>{
    const movementation = movements.filter(mov => mov < 0)
    .reduce((acc,mov)=> acc +mov,0)
    return movementation * -1
  }

  return{
     movIN : () =>{
       return input()
     },
     movOUT : () =>{
       return output()
     }
  }
}



// find = procura no array os itens que se comportam como o definido 
const firstWithdrawal = movements.find(mov => mov<0)

const account = accounts.find(acc => acc.owner === 'Jessica Davis')



//preventDeflaut = Impede o reload da página por enviar o formulário
btnLogin.addEventListener("click", (e) =>{
  //Parar o reload do form
  e.preventDefault()
  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  if(currentAccount.pin === Number(inputLoginPin.value)){
    labelWelcome.textContent= `Welcome back, ${currentAccount.owner.split(' ')[0]}`
    containerApp.style.opacity= "100"
    updateUI(currentAccount)
  }
})

btnLoan.addEventListener("click", (e)=>{
  e.preventDefault()
  
  const amount = Number(inputLoanAmount.value)

  if(amount > 0 && currentAccount.movements.some(mov => mov >= amount * 0.1)){

    currentAccount.movements.push(amount)

    inputLoanAmount.value = ""
    updateUI(currentAccount)
  }
})




// Number = transforma a tring em número
// push = Depois do ultimo indice, insere os dados definidos
btnTransfer.addEventListener("click", (e)=>{
 e.preventDefault()

 const amount = Number(inputTransferAmount.value)
 const receiverAcc = accounts.find(acc => acc.username === inputTransferTo.value)

  inputTransferAmount.value = inputTransferTo.value = ""
 if ( amount > 0 && receiverAcc && currentAccount.balance >= amount && receiverAcc?.username !== currentAccount.username
) {
  currentAccount.movements.push(-amount)
  receiverAcc.movements.push(amount)

  updateUI(currentAccount)
  
 }
})



/* FindIndex  = Procura o indice do elemento com as condições declaradas */
btnClose.addEventListener("click", (e) =>{
  e.preventDefault()
    if((currentAccount.pin) === Number(inputClosePin.value) && currentAccount.username === inputCloseUsername.value){
      const index = accounts.findIndex(acc => acc.username === currentAccount.username)
      
      accounts.splice(index,1)

      containerApp.style.opacity="0"
    }
    inputClosePin.value = inputCloseUsername.value =""
})


let sorted = false
btnSort.addEventListener("click", (e)=>{
  e.preventDefault()
  displayMovements(currentAccount.movements,!sorted)
  sorted = !sorted
})