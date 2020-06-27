function myfun(param){
    console.log(param);
    let rVal=param();
    console.log(rVal);
}

myfun(
    function smallerfn(){
        let a=10;
        a++;
        console.log("Iam function passed to myfun");
        return a
    }
)