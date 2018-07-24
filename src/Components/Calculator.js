import React from "react";
import PropTypes from "prop-types";
import SliderWrapper from "./SliderWrapper"

const Calculator = props => {
    return (
        <div className="calculator">
            <div className="calculator__top">
                <div className="top_text">Рассчитайте пассивный доход</div>
                <div className="input_radio_wrapper">
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
            </div>
            <div className="calculator__slider">
                <div className="calculator__label">Сумма</div>
                <SliderWrapper
                    currency={props.currency}
                    value={props.capital}
                    min={1000}
                    max={100000}
                    step={1000}
                    labels={{0: (props.currency == 'usd' ? '$1000' : '1000грн'), 100000: (props.currency == 'usd' ? '$100000' : '100 000грн')}}
                    format={'currency'}
                    handleSliderChange={(value) => props.handleInputChange("capital", value)}/>
            </div>
            <div className="calculator__slider">
                <div className="calculator__label">Срок</div>
                <SliderWrapper
                    value={props.period}
                    min={3}
                    max={36}
                    step={1}
                    labels={{3: '3 мес', 36: '36 мес'}}
                    format={'date'}
                    handleSliderChange={(value) => props.handleInputChange("period", value)}/>
            </div>
            <div className="calculator__block">
                <div className="calculator__label">Выплата процентов</div>
                <div className="input_radio_wrapper">
                    <input
                        type="radio"
                        id="monthly"
                        name="interestPayment"
                        value="monthly"
                        defaultChecked
                        onChange={e => props.handleInputChange(e.target.name, e.target.value)}
                    />
                    <label htmlFor="monthly">ежемесячно</label>
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
            <div className="calculator__block">
                <div className="calculator__label">Процентная ставка</div>
                <div className="calculator__label_percent">
                    {props.rate} %
                    <span className="calculator__label_small">зависит от срока, валюты и формата выплаты процентов</span>
                </div>
            </div>
        </div>
    );
};

Calculator.propTypes = {
    handleInputChange: PropTypes.func.isRequired,
    capital: PropTypes.number.isRequired,
    period: PropTypes.number.isRequired
};

export default Calculator;
