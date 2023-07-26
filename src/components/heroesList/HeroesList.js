import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useHttp } from "../../hooks/http.hook";

// import { fetchHeroes } from "../../actions";
import { deleteHero, fetchHeroes, filteredHeroesSelector } from "./heroesSlice";

import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from "../spinner/Spinner";

// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {
    const filteredHeroes = useSelector(filteredHeroesSelector);
    const heroesLoadingStatus = useSelector(
        (state) => state.heroes.heroesLoadingStatus
    );
    const dispatch = useDispatch();
    const { request } = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes());
        // eslint-disable-next-line
    }, []);

    // сделать в createAsyncThunk
    const onHeroDelete = useCallback(
        (id) => {
            request(`http://localhost:3001/heroes/${id}`, "DELETE")
                .then(dispatch(deleteHero(id)))
                .catch((err) => console.log(err));
        },
        [request]
    );
    // сделать в createAsyncThunk

    // добавить к элементам анимацию
    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>;
        }

        return arr.map(({ id, ...props }) => {
            return (
                <HeroesListItem
                    key={id}
                    {...props}
                    onHeroDelete={() => onHeroDelete(id)}
                />
            );
        });
    };

    // const filterHeroes = (heroes, filterParam) => {
    //     if (filterParam !== "all") {
    //         return heroes.filter((hero) => hero.element === filterParam);
    //     }
    //     return heroes;
    // };

    if (heroesLoadingStatus === "loading") {
        return <Spinner />;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>;
    }

    const elements = renderHeroesList(filteredHeroes);
    // const elements = renderHeroesList(filterHeroes(heroes, activeFilter));
    return <ul>{elements}</ul>;
};

export default HeroesList;
