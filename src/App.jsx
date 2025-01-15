import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'






function Country({ country }){

  function getLanguages(){
    return Object.values(country.languages).map(language => <li key={language}>{language}</li>)
  }
  return (<>
    <h1>
      {country.name.common}
    </h1>
    <h2>
      {`Political Capital:`} <span className='red-color'>{country.capital[0]}</span><br />
      {`Surface Area: `} <span className='red-color'>{country.area}</span> km² <br />
      {`Population: `} <span className='red-color'>{country.population.toLocaleString('en')}</span> <br />
    </h2>
    <ul>{Object.values(country.languages).length> 1 ? 'Languages' : 'Language'}
      {getLanguages()}
    </ul>
    <div>
      <img src={country.flags.png} alt=""/>
    </div>
  </>)
}

function App() {

  const API_KEY = `010a8d7968b24bc3258842caf4853052 `

  const [country, setCountry] = useState({})
  const [countryInput, setCountryInput] = useState("")
  const [isloaded, setIsloaded] = useState(false)

  //grab data from the api by listening to the input value
  const [countries, setCountries] = useState([])

  // get all data from the api
  function getAllData(){
    return axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then(response => response.data)
  }

  // responding to the input value
  function resultFromInput(){
    return countries.filter(country => country.name.common.toLowerCase().includes(countryInput.toLowerCase()))
  }

  function getData(countryName = 'cameroon'){

    return  axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${countryName}`).then(response => response.data)
  
  }

  // get the weather of the capital city
  function getWeather(capitalCity){
    return axios.get(`api.openweathermap.org/data/2.5/weather?q=${capitalCity},uk&APPID=${API_KEY}`).then(response => response.data.main.temp
    )
  }
  useEffect(()=>{
    // getData().then(data =>{
    //   setCountry(data)
    //   setIsloaded(true)
    //   console.log(data)
    // } ).catch(error => {
    //   console.log('error', error.message)
    // })

    getAllData().then(data => {
      setCountries(data)
    }).catch(error => {
      console.log('error', error.message)
    })

    
  },[])

  return (
    <>
      <>
        <h1>Country information, flags, languages and capital weather forecast</h1>
        <div>
          {'find countries  '}
          <input type={'text'} value={countryInput} onChange={(e) => { setCountryInput(e.target.value.trim())}}/> <br/>
        </div>
        <div>{ 
         resultFromInput().length > 10?
         'Too many matches, specify another filter' :
           resultFromInput().map(country => <div key={country.name.common}>{country.name.common} <input type="button" value="show"
           onClick={() => {setCountry(country); setIsloaded(true)}
          }
           /></div>)}
           </div>

        <div> {isloaded ? <Country country={country}/> : `Result will be displayed here`}</div>
      </>
      <>
          <p>{getWeather('london')}</p>
      </>
      
    </>
  )
}

export default App
