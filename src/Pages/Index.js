import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import axios from "axios/index";
import {setInvestSettings} from "../actions/actions"

import Calculator from "../Components/Calculator";

class Index extends Component {
    static contextTypes = {
        router: PropTypes.object
    }

    constructor() {
        super();
        this.state = {
            currency: "usd",
            capital: 10000,
            period: 14,
            interestPayment: "monthly",
            rates: undefined,
            rate: undefined,
            incomeMonthly: undefined,
            incomeTotal: undefined
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.settings) {
            return {
                currency: props.settings.currency,
                capital: props.settings.capital,
                period: props.settings.period,
                interestPayment: props.settings.interestPayment,
            }
        }
        return null
    }

    componentDidMount() {
        axios.get('/percents.json').then(response => {
            //console.log(response);
            this.setState({rates: response.data}, () => this.updateRate());
        });
    }

    updateRate = () => {
        const {period, currency, interestPayment} = this.state;

        const periodList = this.state.rates[currency][interestPayment];
        let rate;

        if (periodList[period]) {
            rate = periodList[period];
        } else {
            let keys = Object.keys(periodList);
            keys.map((periodKey, index) => {
                if (period < periodKey && period > keys[index - 1]) {
                    return rate = periodList[keys[index - 1]];
                }
            });
        }
        //console.log(rate);

        this.setState({rate}, () => this.countTotal());
    };

    countTotal = () => {
        const {period, capital, rate, interestPayment} = this.state;
        if (interestPayment === "monthly") {
            this.setState({
                incomeMonthly: Math.ceil((capital * rate) / 100 / 12),
                incomeTotal: Math.ceil(((capital * rate) / 100 / 12) * period)
            });
        } else if (interestPayment === "finally") {
            let incomeTotal =
                capital * Math.pow(1 + rate / 100 / 12, period) - capital;
            this.setState({
                incomeMonthly: Math.ceil(incomeTotal / period),
                incomeTotal: Math.ceil(incomeTotal)
            });
        }
    };

    handleInputChange = (name, value) => {
        this.setState({[name]: value}, () => this.updateRate());
    };

    handleSubmit = () => {
        const {currency, period, capital, rate, interestPayment, incomeMonthly, incomeTotal} = this.state;

        this.props.setInvestSettings({
            currency,
            capital,
            period,
            interestPayment,
            rate,
            incomeMonthly,
            incomeTotal
        });
        this.context.router.history.push('/invest')
    };

    render() {
        return (
            <div className="container">
                <Calculator
                    handleInputChange={this.handleInputChange}
                    currency={this.state.currency}
                    capital={this.state.capital}
                    period={this.state.period}
                    rate={this.state.rate}
                />
                <hr/>
                <div className="top_text">
                    Ваш пассивный доход
                </div>
                <div className="line final-count">
                    <div className="column-1">
                        <div
                            className="text-big">{this.state.currency === 'usd' && '$'} {this.state.incomeTotal} {this.state.currency === 'uah' && 'грн'} </div>
                        <div className="text-small">за весь срок вложения</div>
                    </div>
                    <div className="column">
                        <div
                            className="text-big">{this.state.currency === 'usd' && '$'} {this.state.incomeMonthly} {this.state.currency === 'uah' && 'грн'} </div>
                        <div className="text-small">ежемесячно</div>
                    </div>
                </div>

                <button onClick={this.handleSubmit} className="button_accented">Инвестировать</button>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    settings: state.invest.settings,
});

const mapDispatchToProps = dispatch => ({
    setInvestSettings: settings => dispatch(setInvestSettings(settings)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Index);
