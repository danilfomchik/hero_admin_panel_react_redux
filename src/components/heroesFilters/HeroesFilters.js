import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import classNames from "classnames";

import { useHttp } from "../../hooks/http.hook";
// import { fetchFilters } from "../../actions";
import { filterHeroes, fetchFilters, selectAll } from "./filtersSlice";

import Spinner from "../spinner/Spinner";
// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {
    const { activeFilter, filtersLoadingStatus } = useSelector(
        (state) => state.filters
    );

    const filters = useSelector(selectAll);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
    }, []);

    const renderFilters = (filters) => {
        if (filters.length === 0) {
            return <h5 className="text-center mt-5">Filters not found</h5>;
        }

        return filters.map(({ name, className }) => {
            const btnClass = classNames("btn", className, {
                active: name === activeFilter,
            });

            return (
                <button
                    key={name}
                    className={btnClass}
                    onClick={() => dispatch(filterHeroes(name))}
                >
                    {name}
                </button>
            );
        });
    };

    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>;
    }

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter heroes by element</p>
                <div className="btn-group">{elements}</div>
            </div>
        </div>
    );
};

export default HeroesFilters;
