import React from 'react'

export default function Card(props) {
    console.log(props)
    return (
        <div className="card">
            <img src={props.imageUrl} />
            <div className="info">
                <div className="location">
                    <span className="material-symbols-outlined">location_on</span>
                    <h4>{props.location}</h4>
                    <a href={props.googleMapsUrl}>View on Google Maps</a>
                </div>
                <h1>{props.title}</h1>
                <h3>{props.startDate} - {props.endDate}</h3>
                <p>{props.description}</p>
            </div>
        </div>
    )
}