import React from "react";

/**
 * General Loader component 
 * @returns loader 
 */
export default function LoaderComponet(props) {
    const { show, description } = props;

    return (
        <>
            {show ?
                <div className="loader-container">
                    <div className="loader"> </div>
                    <p className="description">{description}</p>
                </div>
                : null}
        </>)
}