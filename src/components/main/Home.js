import { Link, useNavigate } from "react-router-dom";
import "../../customs/Homepage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faShirt, faCopyright } from "@fortawesome/free-solid-svg-icons";

const Home = () => {
    const navigate = useNavigate();

    return (
        <>
            {/* showcase */}
            <section
            className="bg-dark text-light p-5 p-lg-0 pt-lg-5 text-center text-sm-start"
            >
                <div className="container">
                    <div className="d-sm-flex align-items-center justify-content-between">
                    <div id="textBox">
                        <h1>Welcome to <span className="text-warning"> Aw Shop </span></h1>
                        <p className="lead my-4">
                        It is a long-time established website shopping online. We focus to present quality products to you.
                        </p>
                        <Link to="/getallproducts">
                            <button
                            className="btn btn-danger btn-md fw-bold w-auto"
                            >
                            Show Now
                            </button>
                        </Link>
                    </div>
                    <img
                        className="img-fluid w-50 d-none d-sm-block"
                        src="https://res.cloudinary.com/pdev/image/upload/v1656052436/E-commerce-MERN/hd-wallpaper-g08ac2568e_640-removebg-preview_bbkclh.png"
                        alt="shopping girl"
                    />
                    </div>
                </div>
            </section>

            {/* flip */}
            <section className="container mt-3 mb-3">
                <div className="row text-center g-4">
                    <div className="col-md d-flex justify-content-center">
                        <div className="flip-box">
                            <div className="flip-box-inner">
                                <div className="flip-box-front">
                                    <img src="https://cdn.pixabay.com/photo/2019/11/08/11/56/kitten-4611189_960_720.jpg" alt="Animals" style={{width:"300px",height:"200px"}} />
                                </div>
                                <div className="flip-box-back p-1">
                                    <div className="h1">
                                        <FontAwesomeIcon icon={faPaw} />
                                    </div>
                                    <h2>Animals</h2>
                                    <p>What an amazing Animals in the world.</p>
                                    <button className="btn btn-danger" onClick={() => navigate("getallproducts")}>More</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md d-flex justify-content-center">
                        <div className="flip-box">
                            <div className="flip-box-inner">
                                <div className="flip-box-front">
                                    <img src="https://cdn.pixabay.com/photo/2019/07/06/11/49/woman-4320328_960_720.jpg" alt="Fashion" style={{width:"300px",height:"200px"}} />
                                </div>
                                <div className="flip-box-back p-1">
                                    <div className="h1">
                                        <FontAwesomeIcon icon={faShirt} />
                                    </div>
                                    <h2>Fashion</h2>
                                    <p>What an amazing Fashion in the world.</p>
                                    <button className="btn btn-danger" onClick={() => navigate("getallproducts")}>More</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-md d-flex justify-content-center">
                        <div className="flip-box">
                            <div className="flip-box-inner">
                                <div className="flip-box-front">
                                    <img src="https://cdn.pixabay.com/photo/2015/09/05/22/33/office-925806_960_720.jpg" alt="Electric" style={{width:"300px",height:"200px"}} />
                                </div>
                                <div className="flip-box-back p-1">
                                    <div className="h1">
                                        <i className="bi bi-laptop"></i>
                                    </div>
                                    <h2>Electric</h2>
                                    <p>Electrical Machine from the world.</p>
                                    <button className="btn btn-danger" onClick={() => navigate("getallproducts")}>More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Q&A */}
            <section className="p-5 bg-dark">
                <h2 className="text-light text-center mb-4">Frequently Asked Questions</h2>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingOne">
                        <button 
                            className="accordion-button fw-bold" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseOne" 
                            aria-expanded="true" 
                            aria-controls="collapseOne">
                            How to buy item?
                        </button>
                        </h2>
                        <div 
                            id="collapseOne" 
                            className="accordion-collapse collapse show" 
                            aria-labelledby="headingOne" 
                            data-bs-parent="#accordionExample"
                        >
                        <div className="accordion-body">
                            <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingTwo">
                        <button 
                            className="accordion-button collapsed fw-bold" 
                            type="button" data-bs-toggle="collapse" 
                            data-bs-target="#collapseTwo" 
                            aria-expanded="false" 
                            aria-controls="collapseTwo"
                        >
                        How long does it take to send the item?
                        </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the second item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header" id="headingThree">
                        <button 
                            className="accordion-button collapsed fw-bold" 
                            type="button" 
                            data-bs-toggle="collapse" 
                            data-bs-target="#collapseThree" 
                            aria-expanded="false" 
                            aria-controls="collapseThree"
                        >
                            Why choose Us?
                        </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
                        <div className="accordion-body">
                            <strong>This is the third item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                        </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* footer */}
            <footer className="footer p-2 text-center">
                <div className="container">
                    <p className="fw-bold text-light">Copyright 2022 <span><FontAwesomeIcon icon={faCopyright} /></span> AW Shop</p>
                </div>
            </footer>
          </>
    )
}

export default Home;