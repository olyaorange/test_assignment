import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { Link, withRouter } from "react-router-dom";

class Detail extends Component {
    static propTypes = {
        settings: PropTypes.object
    };

    render() {
        return (
            <div>
                <div>Currency: {this.props.settings.currency}</div>
                <div>
                    <Link to={'/'}>back</Link>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    settings: state.invest.settings,
});

export default withRouter(connect(mapStateToProps)(Detail));