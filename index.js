let header = document.getElementById("header");
let tbody = document.getElementById("tBody");
let div = document.getElementById("div");
let coinData =[];
var flag = false;
button = document.getElementsByTagName("button")[0];


let promise =fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false");
console.log(promise);
promise.then((x)=>{
   
    return x.json();
})

.then(x=>{
    coinData=x;
    rendertable(x)})




    function sort(){
        flag=true;
    }

    function rendertable(data){

        data.forEach(x=>{

    // table body data :
    let row = document.createElement("tr");

    if (x.price_change_percentage_24h<0) {
        row.innerHTML=`
    <th> <img class="c-image" src="${x.image}" alt="img"> </br>${x.name}</th>
    <td style="font-weight:600">${x.symbol.toUpperCase()}</td>
    <td>$${x.current_price}</td>
    <td>$${x.total_volume}</td>
    <td>$${x.market_cap}</td>
    <td id="red">${x.price_change_percentage_24h} %</td>`
    }else
    
    row.innerHTML=`
    <th> <img class="c-image" src="${x.image}" alt="img"> </br>${x.name}</th>
    <td style="font-weight:600">${x.symbol.toUpperCase()}</td>
    <td>$${x.current_price}</td>
    <td>$${x.total_volume}</td>
    <td>$${x.market_cap}</td>
    <td>${x.price_change_percentage_24h} %</td>`

    tbody.appendChild(row);

})


}


function search() {
    
    const searchInput = document.getElementById('searching');
    let searchTerm = searchInput.value.trim().toLowerCase();
    if (searchTerm === "") {
        alert("Search box is empty.. !!")
        return;
    }
    const rows = document.getElementById('tBody').getElementsByTagName('tr');
    for (let row of rows) {
      const cells = row.getElementsByTagName('td');
      let found = false;
      for (let cell of cells) {
        if (cell.innerText.toLowerCase().includes(searchTerm)) {
          found = true;
          div.appendChild(row);
          break;
        }
      }
      
  }
}



// Sort by market cap
function sortByMarketCap() {
    const sortedData = coinData.slice().sort((a, b) => a.market_cap - b.market_cap);
    
    // removetable();
    tbody.innerHTML="";
    rendertable(sortedData);
    

    
  }

  function percentage() {
    const percent = coinData.sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    
    // removetable();
    tbody.innerHTML="";
    rendertable(percent);

    
  }











