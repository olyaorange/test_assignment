import React from "react";
import PropTypes from "prop-types";
import Slider from "react-rangeslider";

const Calculator = props => {
    return (
        <div>
            <div>
                <Slider
                    value={+props.capital}
                    //orientation="vertical"
                    //onChange={() => props.handleInputChange(value)}
                    min={1000}
                    max={100000}
                    step={1000}
                />
            </div>
            <div>
                <input
                    type="radio"
                    id="usd"
                    name="currency"
                    value="usd"
                    defaultChecked
                    onChange={e => props.handleInputChange(e.target.name, e.target.value)}
                />
                <label htmlFor="usd">USD</label>
                <input
                    type="radio"
                    id="uah"
                    name="currency"
                    value="uah"
                    onChange={e => props.handleInputChange(e.target.name, e.target.value)}
                />
                <label htmlFor="uah">UAH</label>
            </div>
            <div>
                <input
                    name="capital"
                    value={props.capital}
                    onChange={e => props.handleInputChange(e.target.name, e.target.value)}
                />
            </div>
            <div>
                <input
                    name="period"
                    value={props.period}
                    onChange={e => props.handleInputChange(e.target.name, e.target.value)}
                />
            </div>
            <div>
                <input
                    type="radio"
                    id="monthly"
                    name="interestPayment"
                    value="monthly"
                    defaultChecked
                    onChange={e => props.handleInputChange(e.target.name, e.target.value)}
                />
                <label htmlFor="monthly">Ежемесячно</label>
                <input
                    type="radio"
                    id="finally"
                    name="interestPayment"
                    value="finally"
                    onChange={e => props.handleInputChange(e.target.name, e.target.value)}
                />
                <label htmlFor="finally">в конце срока</label>
            </div>
        </div>
    );
};

Calculator.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    capital: PropTypes.string.isRequired,
    period: PropTypes.string.isRequired
};

export default Calculator;
