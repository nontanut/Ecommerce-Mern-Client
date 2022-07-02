import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronUp } from "@fortawesome/free-solid-svg-icons";
import "../../customs/BackToTop.css";

const BackToTop = () => {
    const [goTop, setGoTop] = useState(false);

    // Show arrow when scroll down more than 400
    useEffect(() => {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 400) {
                setGoTop(true);
            } else {
                setGoTop(false);
            }
        })
    }, []);

    const goToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    };

    return (
        <div className="toTopBtn">
            {goTop && (
                <FontAwesomeIcon 
                    icon={faCircleChevronUp} 
                    className="icon_position icon_style"
                    onClick={goToTop}
                />
            )}
        </div>
    )
}

export default BackToTop;