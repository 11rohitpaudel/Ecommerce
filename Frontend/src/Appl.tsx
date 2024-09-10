import React from 'react';
import './App.css';
import Header from './layout/Header';
import Footer from './layout/Footer';
import Display from './component/Display';

function App() {
 
  const handleClick = () => {
    console.log("Clicked")
  }
  // const handleClicked = () => {
  //   console.log("I am clicked")
  // }
  return (
    <div>
      <Header />
      <p className="font-bold"> Mero nam Hapre ho ...mero choso tikho cha</p>
      <Footer />
      <Display 
      FirstName={"Rohit"}
      LastName={"Paudel"}
      address={"aa"}
      age={50}
      onClick={handleClick}
      />
    </div>
  )
}

export default App;
