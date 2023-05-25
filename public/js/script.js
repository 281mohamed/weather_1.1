let form = document.getElementById("form1")
const errorF = document.getElementById("error")
const forecastF = document.getElementById("forecast")
const locationF = document.getElementById("location")
const longtitudeF = document.getElementById("longtitude")
const latitudeF = document.getElementById("latitude")



form.addEventListener("submit", (e) => {
    e.preventDefault()
    console.log(document.getElementById("address").value)
    weatherFunc()
    form.reset()
})

let weatherFunc = async () => {
    try {
        const address = document.getElementById("address").value
        const res = await fetch('http://localhost:3000/weather?address=' + address)
        const data = await res.json()
        console.log(data)
        if(data.error){
            errorF.innerText = data.error
            locationF.innerText = ""
            forecastF.innerText = ""
        } else {
            setTimeout(() => {
                locationF.innerText = "Country is: " + data.location
            }, 500);

            setTimeout(() => {
                forecastF.innerText = "The Weather is: " + data.forecast
            }, 1000);

            setTimeout(() => {
                longtitudeF.innerText = "The Longtitude is: " + data.longtitude
            }, 1500);

            setTimeout(() => {
                latitudeF.innerText = "The Latitude is: " + data.latitude
            }, 2000);

            errorF.innerText = ""
        }
    } catch (e) {
        console.log(e)
    }
}
