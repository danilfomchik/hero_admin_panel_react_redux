import classNames from "classnames";

const HeroesListItem = ({ onHeroDelete, name, description, element }) => {
    let cardClassName = classNames("card flex-row mb-4 shadow-lg text-white", {
        "bg-danger bg-gradient": element === "fire",
        "bg-primary bg-gradient": element === "water",
        "bg-success bg-gradient": element === "wind",
        "bg-secondary bg-gradient": element === "earth",
        "bg-warning bg-gradient": element === "",
    });

    return (
        <li className={cardClassName}>
            <img
                src="http://www.stpaulsteinbach.org/wp-content/uploads/2014/09/unknown-hero.jpg"
                className="img-fluid w-25 d-inline"
                alt="unknown hero"
                style={{ objectFit: "cover" }}
            />
            <div className="card-body">
                <h3 className="card-title">{name}</h3>
                <p className="card-text">{description}</p>
            </div>
            <span className="position-absolute top-0 start-100 translate-middle badge border rounded-pill bg-light">
                <button
                    type="button"
                    className="btn-close btn-close"
                    aria-label="Close"
                    onClick={onHeroDelete}
                ></button>
            </span>
        </li>
    );
};

export default HeroesListItem;
