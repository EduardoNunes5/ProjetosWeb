export function render(template, node){
    if(!node) return;
    else{
        if(typeof template === "function"){
            node.innerHTML = template();
        }
        else{
            node.innerHTML = template;
        }
    }
}
