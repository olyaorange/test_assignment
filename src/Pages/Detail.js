import React, {Component} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link, withRouter} from "react-router-dom";

const Detail = props => {
    if (props.settings) {
        return (
            <div className="container">
                <div className="top_text">
                    Выбранные параметры
                </div>
                <div className="line">
                    <div className="column-1">
                        <div className="text-big">{props.settings.currency}</div>
                        <div className="text-small">Валюта</div>
                    </div>
                    <div className="column">
                        <div className="text-big">{props.settings.currency === 'usd' && '$'} {props.settings.capital} {props.settings.currency === 'uah' && 'грн'}</div>
                        <div className="text-small">Сумма</div>
                    </div>
                </div>
                <div className="line">
                    <div className="column-1">
                        <div className="text-big">{props.settings.period} мес</div>
                        <div className="text-small">Срок</div>
                    </div>
                    <div className="column">
                        <div className="text-big">{props.settings.interestPayment === "monthly" ? "ежемесячно" : "в конце срока"}</div>
                        <div className="text-small">Выплата</div>
                    </div>
                </div>
                <div className="line">
                    <div className="column-1">
                        <div className="text-big">{props.settings.rate}</div>
                        <div className="text-small">Процентная ставка</div>
                    </div>
                </div>
                <div className="top_text">
                    Ваш пассивный доход
                </div>
                <div className="line final-count">
                    <div className="column-1">
                        <div className="text-big">{props.settings.currency === 'usd' && '$'} {props.settings.incomeTotal} {props.settings.currency === 'uah' && 'грн'}</div>
                        <div className="text-small">за весь срок вложения</div>
                    </div>
                    <div className="column">
                        <div className="text-big">{props.settings.currency === 'usd' && '$'} {props.settings.incomeMonthly} {props.settings.currency === 'uah' && 'грн'}</div>
                        <div className="text-small">ежемесячно</div>
                    </div>
                </div>
                <div>
                    <Link to={'/'} className="button_accented">Изменить</Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className="container">
                <div className="top_text">
                    Вы еще не выбрали настройки пассивного дохода
                </div>
                <Link className="button_accented" to={'/'}>Начать инвестировать</Link>
            </div>
        )
    }
}

Detail.propTypes = {
    settings: PropTypes.object
};

const mapStateToProps = state => ({
    settings: state.invest.settings,
});

export default withRouter(connect(mapStateToProps)(Detail));