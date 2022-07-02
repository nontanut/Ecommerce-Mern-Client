import "../../customs/Slide.css";

const Slide = () => {
    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
            </div>
            <div className="carousel-inner">
                <div className="carousel-item active">
                    <img id="slide-img" src="https://cdn.pixabay.com/photo/2017/08/01/11/48/woman-2564660_960_720.jpg" className="d-block w-100" alt="Fashion"/>
                </div>
                <div className="carousel-item">
                    <img id="slide-img" src="https://cdn.pixabay.com/photo/2018/08/12/16/59/parrot-3601194_960_720.jpg" className="d-block w-100" alt="Animals"/>
                </div>
                <div className="carousel-item">
                    <img id="slide-img" src="https://cdn.pixabay.com/photo/2015/01/08/18/30/man-593372_960_720.jpg" className="d-block w-100" alt="IT"/>
                </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    )
}

export default Slide;