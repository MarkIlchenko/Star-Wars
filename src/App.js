import React, {useState, useEffect} from "react";
import axios from 'axios';
import { List,
    ListItem,
    ListItemText,
    Dialog,
    DialogTitle,
    DialogContent,
    Grid,
    Typography,
    TextField,
    Button } from '@mui/material';

// Importing styles into a file to use them
import './App.css'
import './Media.css'

// Importing photos into a file to use them
import close from './img/Close.svg';
import Logo from './img/Logo.png'
import Logo2 from './img/Logo(Favicon).png'
import Blur from './img/Blur.png'

// What this code does is create two variables -- SWAPI_PEOPLE_URL and SWAPI_VEHICLE_URL. These variables store website addresses. The website addresses are for websites that give us information about characters and vehicles from Star Wars!
const SWAPI_PEOPLE_URL = "https://swapi.dev/api/people/";
const SWAPI_VEHICLE_URL = "https://swapi.dev/api/vehicles/";

function App() {
    //This is code written in JavaScript with React library. It is defining four different things that the program is keeping track of:
    //
    // 1. A list of people
    // 2. A selected person (which person is currently chosen)
    // 3. A selected vehicle (which vehicle is currently chosen)
    // 4. A search value (what someone is looking for)
    // When the program runs, it starts with an empty list of people and nothing selected for the person, vehicle or search. As the program runs, it can add people to the list, choose a person to see their vehicles or type in a search to find a specific person or vehicle.
    const [people, setPeople] = useState([]);
    const [selectedPerson, setSelectedPerson] = useState(null);
    const [selectedVehicle, setSelectedVehicle] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    
 
    // This is a JavaScript code using a library called "axios". It is calling an API (a place on the internet where we can get information) that provides information about characters from Star Wars. The code is saying that when the page loads, it will get the information about the characters and put them in a list called "People". If there is an error, it will be printed in the console (a special place where programmers can see messages).
    useEffect(() => {
        axios
             .get(SWAPI_PEOPLE_URL)
             .then((response) => {
                 setPeople(response.data.results);
             })
             .catch((error) => {
                 console.log(error);
             });
    }, []);
    
    // Imagine you have a list of people and vehicles. When you click on a person's name, this function will do two things:
    // It will remember that person you clicked on, using setSelectedPerson.
    // It will forget the vehicle you had previously clicked on (if any), using setSelectedVehicle.
    // So, if you clicked on a person, the function will only remember that person, but will forget the vehicle you had previously clicked on.
    const handleListItemClick = (person) => {
        setSelectedPerson(person);
        setSelectedVehicle(null);
    };
    
    //This code is creating a function called handleVehicleClick. A function is like a little robot that can do things for you.
    // This function takes a vehicle as a parameter, which means that it expects someone to give it a vehicle to work with.
    // When someone gives the function a vehicle, like a car or a bike, the function will save that vehicle as selectedVehicle.
    // So, if someone asks the function to handle the vehicle click, it will remember which vehicle was clicked.
    const handleVehicleClick = (vehicle) => {
        setSelectedVehicle(vehicle);
    };
    
    // Imagine you have two toys, a person and a car. You love playing with them but at the end of the day, it's time to go to sleep and you need to put them away. This code helps the computer put away your toys by saying "close" so that it knows to stop playing with them.
    // So, when this code is run, it tells the computer to choose the person and the car you were playing with and then put them away. This way, the computer doesn't keep playing with them even when it's time to stop playing.
    const handleClose = () => {
        setSelectedPerson(null);
        setSelectedVehicle(null);
    };
    
    return (
         <>
             {/*A container that stores images of the star wars logo and an image of an attack aircraft, when going to the page and when a character has not yet been selected*/}
             <div className="WelcomeContainer2  ">
                 <img src={"https://www.pngkit.com/png/full/0-6869_propel-star-wars-battle-drones-logo-star-wars.png"} alt="img"/>
                 {/*ClassName for animtaion*/}
                 <img src={"https://res.cloudinary.com/muhammederdem/image/upload/q_60/v1536405215/starwars/item-4.webp"} alt="img" className="FirstImage"/>
             </div>
             
             {/*Navbar*/}
             <div className="mb-auto mt-auto FirstWrapper">
                 <h1 className="ml-32px mr-32px mb-32px color-white">Charackters</h1>
                 <div className=" ml-32px mr-32px">
                     
                     {/*This is some code that helps you search through a list of people. It shows a box where you can type in a name you're looking for, and when you type it searches through the list of people and shows only the people with names that contain the letters you typed. When you click one of the names, it does something special that is not shown in this code.*/}
                     <TextField
                          label="Search"
                          value={searchValue}
                          onChange={(event) => setSearchValue(event.target.value)}
                          className="SearchInput"
                     />
                     <List>
                         {people
                              .filter(
                                   (person) =>
                                        person.name.toLowerCase().indexOf(searchValue.toLowerCase()) !==
                                        -1
                              )
                              .map((person) => {
                                  return (
                                       <ListItem
                                            button
                                            key={person.name}
                                            onClick={() => handleListItemClick(person)}
                                       >
                                           <span className="color-white navigation-link"><ListItemText primary={person.name} /></span>
                                       </ListItem>
                                  );
                              })}
                     </List>
                 </div>
             </div>
             {/*If there is a person selected, it will do something*/}
                 {selectedPerson && (
                      <div className="CharacterContainer">
                          <Dialog open={true} onClose={handleClose}>
                              
                              <div className="shape">
                              
                              <span className="Name"><DialogTitle>{selectedPerson.name}</DialogTitle></span>
                                  
                                      <DialogContent >
                                          
                                          <Grid container spacing={2}>
                                              <Grid item xs={6} >
                                                  <div className="d-flex justify-content-between wrap-content">
                                                      <div className="TestShape" onClick={handleClose}></div>
                                                      
                                                      <div className="mb-32px mr-32px informationContainer">
                                                          <Typography><span className="Label-information">Birth Year:</span></Typography>
                                                          <Typography><span className="infrormation">{selectedPerson.birth_year}</span></Typography>
                                                      </div>
                    
                                                      <div>
                                                          <Typography><span className="Label-information">Gender:</span></Typography>
                                                          <Typography><span className="infrormation">{selectedPerson.gender}</span></Typography>
                                                      </div>
                                                  </div>
                
                                                  {selectedPerson.vehicles.length && (
                                                       <div className="VehiclesContainer p-absolute">
                                                           <Typography><span className="Label-information">Vehicles:</span></Typography>
                                                           {/*This code is for a computer program that makes a list of vehicles that belong to a person. The program checks if the person owns any vehicles and if they do, it creates a list of their vehicles. For each vehicle, the program makes a button that has the name of the vehicle on it. If someone clicks on the button, the program will show information about that vehicle*/}
                                                           <List>
                                                               {selectedPerson.vehicles.map((vehicleUrl) => {
                                                                   return (
                                                                        <ListItem
                                                                             button
                                                                             key={vehicleUrl}
                                                                             onClick={() => {
                                                                                 axios
                                                                                      .get(vehicleUrl)
                                                                                      .then((response) => {
                                                                                          handleVehicleClick(response.data);
                                                                                      })
                                                                                      .catch((error) => {
                                                                                          console.log(error);
                                                                                      });
                                                                             }}
                                                                        >
                                                                            <ListItemText primary={vehicleUrl} className="vehicleBtn"/>
                                                                        </ListItem>
                                                                   );
                                                               })}
                                                           </List>
                                                           {/*The code is showing information about a vehicle. If we click on a button, it will show information like its name, parts, and features.*/}
                                                           {selectedVehicle && (
                                                                <Dialog open={true} fullScreen>
                                                                    <div className="TestShape" onClick={handleClose}></div>
                                  
                                  
                                                                    <div className="Wrapper padding-64px d-flex justify-colm justify-content-between">
                                                                        <h2>Vehicle information:</h2>
                                                                        <div>
                                                                            {selectedPerson.vehicles.map((vehicleUrl) => {
                                                                                return (
                                                                                     <ListItem
                                                                                          button
                                                                                          key={vehicleUrl}
                                                                                          onClick={() => {
                                                                                              axios
                                                                                                   .get(vehicleUrl)
                                                                                                   .then((response) => {
                                                                                                       handleVehicleClick(response.data);
                                                                                                   })
                                                                                                   .catch((error) => {
                                                                                                       console.log(error);
                                                                                                   });
                                                                                          }}
                                                                                     >
                                                                                         <ListItemText primary={vehicleUrl} className="vehicleBtn"/>
                                                                                     </ListItem>
                                                                                );
                                                                            })}
                                                                        </div>
                                                                        <div>
                                                                            <p className="SubHead">Name</p>
                                                                            <div className="mt-32px d-flex justify-content-between align-center">
                                                                                <Typography className="d-flex align-center"><span className="Label-information Label-information2">Selected Vehicle:</span></Typography>
                                                                                <Typography><span className="infrormation">{selectedVehicle.name}</span></Typography>
                                                                            </div>
    
                                                                            <div className="mt-32px justify-content-between d-flex align-center">
                                                                                <Typography className="d-flex align-center"><span className="Label-information Label-information2">Model:</span></Typography>
                                                                                <Typography><span className="infrormation">{selectedVehicle.model}</span></Typography>
                                                                            </div>
    
                                                                            <div className="mt-32px d-flex justify-content-between align-center">
                                                                                <Typography className="d-flex "><span className="Label-information Label-information2 align-center">Manufacturer:</span></Typography>
                                                                                <Typography><span className="infrormation">{selectedVehicle.manufacturer}</span></Typography>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </Dialog>
                                                           )}
                                                       </div>
                                                  )}
                                              </Grid>
                                          </Grid>
    
                                      </DialogContent>
                                  
                              </div>
                          </Dialog>
                      </div>
                 )}
         </>
    );
}

export default App;
