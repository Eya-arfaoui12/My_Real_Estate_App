import { useContext } from "react"
import SearchBar from "../../components/searchBar/searchBar"
import "./homePage.scss"
import { AuthContext } from "../../context/AuthContext"

function HomePage(){

    const {currentUser} = useContext(AuthContext)

    console.log(currentUser)
    return(
        <div className="homePage">
            <div className="textContainer">
                <div className="wrapper">
                <h1 className="title">Find Real Estate & Get Your Dream Place</h1>
                <p>Explore our exceptional properties tailored to your lifestyle. From cozy starter homes to luxurious estates, find detailed listings, high-quality images, and virtual tours to help you discover your perfect home. Your dream home is just a click away!</p>
               
               <SearchBar/>
               <div className="boxes">
                    <div className="box">
                        <h1>16+</h1>
                        <h2>Years of Experience</h2>
                    </div>
                    <div className="box">
                        <h1>200</h1>
                        <h2>Award Gained</h2>
                    </div>
                    <div className="box">
                        <h1>2000+</h1>
                        <h2>Property Ready</h2>
                    </div>
               </div>
               </div>
            </div>
            <div className="imgContainer">
                <img src="/bg.png" alt="" />
            </div>
        </div>
    )
}

export default HomePage