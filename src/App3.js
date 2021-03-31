import React, { useState, useEffect } from "react";
import data from "./data";
import uniqueVal from "./uniqeData";
import { TextField, FormControlLabel, Switch } from "@material-ui/core";
let filters = {};
const App2 = () => {
    const [arrDt, setArrDt] = useState([]);
    const [arrDts, setArrDts] = useState([]);
    const [searchName, setSearchName] = useState("");

    useEffect(() => {
        setArrDt(data);
        setArrDts(data);
    }, []);

    function populate(key, value, poped = false) {
        if (poped) {
            let index = filters[key].indexOf(value);
            if (index !== -1) filters[key].splice(index, 1);
        }
        else {
            if (key in filters) filters[key].push(value);
            else filters[key] = [value];
        }
        return filters;
    }

    function multiFilter(array, filters) {
        const filterKeys = Object.keys(filters);
        // filters all elements passing the criteria
        return array.filter((item) => {
            // dynamically validate all filter criteria
            return filterKeys.every((key) => {
                // ignores an empty filter
                if (!filters[key].length) return true;
                return filters[key].includes(item[key]);
            });
        });
    }

    const getData = (e, filterType) => {
        let ch = e.target.value;
        let v, filtered;
        if (e.target.checked)
            v = populate(filterType, ch);
        else
            v = populate(filterType, ch, true);
        filtered = multiFilter(arrDts, v);
        setArrDt(filtered);
    };

    return (
        <>
            <div className="container">
                <div className="row">
                    {data
                        ? Object.keys(data[0]).map((k, i) => {
                            if (k === "id" || k === "name") {
                            } else {
                                return (
                                    <div className="col-2">
                                        {k}
                                        <div style={{ marginLeft: "50px", float: "right" }}>
                                            {uniqueVal(data.map((v) => v[k])).map((val, i) => {
                                                return (
                                                    <FormControlLabel
                                                        value="end"
                                                        control={
                                                            <Switch
                                                                color="primary"
                                                                value={val}
                                                                onChange={(e) => getData(e, k)}
                                                            />
                                                        }
                                                        label={val}
                                                        labelPlacement="end"
                                                    />
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            }
                        })
                        : null}

                    <div className="col-4">
                        <TextField
                            id="standard-basic"
                            onChange={(e) => setSearchName(e.target.value)}
                            label="Name"
                        />
                    </div>
                </div>
            </div>
            <div style={{ marginTop: "120px" }}>
                <div className="container" style={{ border: "1px solid black" }}>
                    <table className="table">
                        <thead>
                            <tr>
                                {Object.keys(data[0]).map((k, i) => {
                                    return (
                                        <th scope="col" key={i}>
                                            {k}
                                        </th>
                                    );
                                })}
                            </tr>
                        </thead>
                        <tbody>
                            {arrDt
                                ? arrDt
                                    .filter((val) => {
                                        if (searchName === "") {
                                            return val;
                                        } else if (
                                            val.name
                                                .toLowerCase()
                                                .includes(searchName.toLowerCase())
                                        ) {
                                            return val;
                                        }
                                    })
                                    .map((val, i) => {
                                        return (
                                            <tr key={i}>
                                                {
                                                    Object.values(val).map((values, index) => {
                                                        return <td key={index}>{values}</td>
                                                    })
                                                }
                                            </tr>
                                        );
                                    })
                                : null}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default App2;
