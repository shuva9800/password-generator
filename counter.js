const value=document.querySelector('#content');
console.log(value);
function decrement(){
    let p=parseInt(value.textContent);
    p=p-1;
    value.textContent=p;

}
function increment(){
    let p=parseInt(value.textContent);
    p=p+1;
    value.textContent=p;

}