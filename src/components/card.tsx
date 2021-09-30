import React, {useEffect, useState} from "react";
import { IRepo } from "../interfaces/repo";
import axiosClient from "../axios"

import "./card.css";
const Card: React.FC<{data: IRepo}> = function({ data }) {
    
    const [languages, setLanguages] = useState<Array<string>>([]);

    useEffect(() => {
        axiosClient.get(data.languages_url, {
            baseURL: ""
        }).then(res => {
            setLanguages(Object.keys(res.data));
        }).catch(err => {
            console.log(err.response.data)
        })
    }, [data])
    
    return (
        <li>
            <h3>
                { data.name }
            </h3>
            <p>
                {data.description}
            </p>
            <div className="tags">    
                {
                    languages.map(l => (
                        <div className="tag" key={l}>
                            {l}
                        </div>
                    ))
                }
            </div>
        </li>
    )
}

export default Card;