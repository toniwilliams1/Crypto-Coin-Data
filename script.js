// Dropdown Button

function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}

// Close the dropdown if the user clicks outside of it

window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}

 function getCurrency() {
  
  fetch(`https://coinlib.io/api/v1/coin?key=2cb95c644b9d1dc6&pref=EUR&symbol=BTC`)
    .then((res) => res.json())
    .then((data) => {
  
    
    // Print Hourly Market Data to DOM //
    

      document.querySelector(".delta_1h").innerText = data.delta_1h;
      document.querySelector(".delta_7d").innerText = data.delta_7d;
      document.querySelector(".delta_24h").innerText = data.delta_24h;
      document.querySelector(".delta_30d").innerText = data.delta_30d;
      
// Print Price Market Data to DOM

      document.querySelector("h3").innerText =`${data.name} Price`;
      document.querySelector(".price").innerText = data.price;
      document.querySelector(".rank").innerText = data.rank;
      document.querySelector(".volume_24h").innerText =
        data.markets[0].volume_24h;
        
        // Print Exchange Markets Data to DOM
        
      document.querySelector(".market_cap").innerText = data.market_cap;
      document.querySelector(".symbol").innerText = "Symbol";
      document.querySelector(".exchangeName").innerText =
        data.markets[0].exchanges[0].name;
      document.querySelector(".exchangePrice").innerText =
        data.markets[0].exchanges[0].price;
      document.querySelector(".exchangeVolume").innerText =
        data.markets[0].exchanges[0].volume_24h;
      document.querySelector(
        ".last_updated_timestamp"
      ).innerText = `The last updated timestamp is ${data.last_updated_timestamp}`;
    });
}

document.querySelector('#info').addEventListener('click', getCurrency) 

// Filter Results -- Show Price Only

document.querySelector('#hourly').addEventListener('click', showHourly)

function showHourly(){
      document.querySelector('#fl-table').style.display = 'show'
      document.querySelector('#fl-table1').style.display = 'none'
            document.querySelector('#fl-table2').style.display = 'none'
               document.querySelector('h2').innerText = `Displaying  Hourly Price Results`
                                document.querySelector('h3').style.display = 'none'
                 document.querySelector('h4').style.display = 'none'


}

document.querySelector('#price').addEventListener('click', showPrice)

function showPrice(){
      document.querySelector('#fl-table').style.display = 'none'
      document.querySelector('#fl-table1').style.display = 'block'
            document.querySelector('#fl-table2').style.display = 'none'
               document.querySelector('h2').innerText = `Displaying  Market Price Results`
                                document.querySelector('h3').style.display = 'block'
                 document.querySelector('h4').style.display = 'none'


}

document.querySelector('#exchanges').addEventListener('click', showExchange)

function showExchange(){
      document.querySelector('#fl-table').style.display = 'none'
      document.querySelector('#fl-table1').style.display = 'none'
            document.querySelector('#fl-table2').style.display = 'block'
               document.querySelector('h2').innerText = `Displaying  Market Exchange Results`
                                document.querySelector('h3').style.display = 'none'
                 document.querySelector('h4').style.display = 'block'


}
