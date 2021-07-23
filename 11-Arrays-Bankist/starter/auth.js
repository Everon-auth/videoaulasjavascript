function auth (login,password,Data){

    let authenticationWitharray = (index) =>{
        
        return Data.find(acc => acc[index] === login)
    }
    return{
        authent : (index) =>{
            return authenticationWitharray(index)
        }
    }    
}


































/*    let generateToken = () =>{
        const abc = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]
        const ABC = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"]
        const specialChar = [":","?","*",".","@","%","&"]

        
    }
    let defineToken = () =>{
        
    }
    let validateToken = () =>{

    }
    let redirectValidation = () =>{

    }
    generateToken()*/