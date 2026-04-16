function esperar (ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
    console.log("inicio");
    await esperar (3000);
    console.log("fin");
}

demo();
console.log("Findel programa");