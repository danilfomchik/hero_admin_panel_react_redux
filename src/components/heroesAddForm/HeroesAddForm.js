import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { createHero } from "../heroesList/heroesSlice";
import { selectAll } from "../heroesFilters/filtersSlice";

import { useHttp } from "../../hooks/http.hook";

import { v4 as uuid } from "uuid";

// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uuid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const [newHeroName, setNewHeroName] = useState("");
    const [newHeroDescription, setNewHeroDescription] = useState("");
    const [newHeroElement, setNewHeroElement] = useState("");

    const { filtersLoadingStatus } = useSelector((state) => state.filters);
    const filters = useSelector(selectAll);

    const dispatch = useDispatch();

    const { request } = useHttp();

    const onFormSubmit = (e) => {
        e.preventDefault();

        // сделать в createAsyncThunk
        request(
            "http://localhost:3001/heroes",
            "POST",
            JSON.stringify({
                id: uuid(),
                name: newHeroName,
                description: newHeroDescription,
                element: newHeroElement,
            })
        )
            .then((response) => dispatch(createHero(response)))
            .catch((err) => console.log(err));
        // сделать в createAsyncThunk

        setNewHeroName("");
        setNewHeroDescription("");
        setNewHeroElement("");
    };

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Loading...</option>;
        } else if (status === "error") {
            return <option>Loading error</option>;
        }

        return filters.map(({ name }) => {
            if (name === "all") return;

            return (
                <option key={name} value={name}>
                    {name}
                </option>
            );
        });
    };

    return (
        <form
            className="border p-4 shadow-lg rounded"
            onSubmit={(e) => onFormSubmit(e)}
        >
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">
                    New hero name
                </label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="What is my name?"
                    value={newHeroName}
                    onChange={(e) => setNewHeroName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">
                    Description
                </label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="What can I do?"
                    style={{ height: "130px" }}
                    value={newHeroDescription}
                    onChange={(e) => setNewHeroDescription(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">
                    Choose hero element
                </label>
                <select
                    className="form-select"
                    id="element"
                    name="element"
                    value={newHeroElement}
                    onChange={(e) => setNewHeroElement(e.target.value)}
                >
                    <option value="" disabled>
                        I own the element...
                    </option>

                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">
                Create
            </button>
        </form>
    );
};

export default HeroesAddForm;
