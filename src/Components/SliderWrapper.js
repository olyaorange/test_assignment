import React, {Component} from "react";
import Slider from "react-rangeslider";

class SliderWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value
        }
    }

    handleOnChange = (value) => {
        this.setState({
            value
        });
        this.props.handleSliderChange(value)
    };

    formatLabel = (value) => {
        if (this.props.currency == 'usd') {
            return `$ ${value}`
        } else {
            return `${value} грн`
        }
    };

    formatDateLabel = (value) => {
        return `${value} мес`
    }

    render() {
        let {value} = this.state;
        return (
            <Slider
                value={value}
                tooltip={true}
                min={this.props.min}
                max={this.props.max}
                step={this.props.step}
                labels={this.props.labels}
                format={this.props.format == 'currency' ? this.formatLabel : this.formatDateLabel}
                onChange={this.handleOnChange}
            />
        )
    }
}

export default SliderWrapper;