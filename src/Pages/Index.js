import React, {Component} from "react";
import {connect} from "react-redux";
import axios from "axios/index"

import Calculator from "../Components/Calculator";

class Index extends Component {
    constructor() {
        super();
        this.state = {
            currency: "usd",
            capital: "10000",
            period: "14",
            interestPayment: "monthly",
            rates: undefined,
            rate: undefined,
            incomeMonthly: undefined,
            incomeTotal: undefined
        };
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

    render() {
        return (
            <div className="container">
                <Calculator
                    handleInputChange={this.handleInputChange}
                    capital={this.state.capital}
                    period={this.state.period}
                />
                <h2>За весь срок</h2>
                <h2>{this.state.incomeTotal}</h2>

                <h2>Ежемесячно</h2>
                <h2>{this.state.incomeMonthly}</h2>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    //isLogged: state.login.isLogged,
    //name: state.login.name
});

export default connect(mapStateToProps)(Index);
