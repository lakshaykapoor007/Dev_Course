console.log("Hello all");
let varname;
varname=10;
console.log(varname);

let numbers =21;
for(let i=2;i*i<=numbers; i++){
    if(numbers%i!=0){
        console.log("Number is not prime");
        return;
    }
}
console.log("Number is prime");

