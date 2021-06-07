import React from "react";
import { withStyles } from "@material-ui/core/styles";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import CircularProgress from "@material-ui/core/CircularProgress";
import Fade from "@material-ui/core/Fade";
import Skeleton from "@material-ui/lab/Skeleton";

import { scaleTime } from "d3-scale";
import {utcHour, utcDay, utcMonth, utcMonday} from "d3-time";
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

import price_formatter from "../utils/price-formatter";
import api from "../utils/api";

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(1),
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(1, 0),
            width: "100vw"
        }
    },
    chart: {
        width: "100%",
        height: 500,
        [theme.breakpoints.down("sm")]: {
            height: 250,
        }
    },
    floatRight: {
        float: "right",
        marginBottom: theme.spacing(1)
    },
    floatLeft: {
        float: "left",
        marginBottom: theme.spacing(1)
    },
    fullHeight: {
        height: "100%",
        position: "relative"
    },
    chartCardContent: {
        [theme.breakpoints.down("sm")]: {
            padding: theme.spacing(2, 0)
        }
    },
    flowRoot: {
        display: "flow-root"
    },
    contrastButton: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.secondary.contrastText,
        "&:hover": {
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.secondary.contrastText,
        }
    },
    contrast: theme.palette.secondary.contrast,
    overlay: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100%",
        height: "100%",
        transform: "translate(-50%, -50%)",
        backgroundColor: "rgba(0, 0, 0, .0)",
        zIndex: 1,
        pointerEvents: "none",
        color: theme.palette.primary.light
    },
    circularProgressContainer: {
        position: "absolute",
        top: "50%",
        left: "50%",
        width: "100%",
        transform: "translate(-50%, -50%)",
        textAlign: "center",
    }
});


class CoinChartsChart extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            coin_id: props.coin_id,
            selected_currency: props.selected_currency,
            selected_locales_code: props.selected_locales_code,
            _coin_chart_data: null,
            _is_coin_chart_data_loading: false,
            _coin_chart_data_time: "360",
            _coin_chart_data_type: "prices",
        };
    };

    componentWillReceiveProps(new_props) {

        const { coin_id } = this.state;

        this.setState(new_props, function(){

            if(coin_id !== new_props.coin_id) {

                this._get_coin_chart_data();
            }
        });
    }

    componentDidMount() {

        this._get_coin_chart_data();
    }

    _get_coin_chart_data() {

        const { coin_id, selected_currency, _coin_chart_data_time } = this.state;

        this.setState({_is_coin_chart_data_loading: true},

            api.get_coin_chart_data(coin_id, selected_currency.toLowerCase(), _coin_chart_data_time, this._set_coin_chart_data)
        );
    }

    _set_coin_chart_data = (error, _coin_chart_data) => {

        if(!error) {


            this.setState({_is_coin_chart_data_loading: false}, function(){

                const { _coin_chart_data_type, _coin_chart_data_time, _is_coin_chart_data_loading } = this.state;

                const graph_data = _coin_chart_data !== null ? _coin_chart_data[_coin_chart_data_type].map((row) => {
                    row.date = parseFloat(row.date);
                    return row;
                }): [];

                const sorted_graph_data = graph_data.sort(function(a, b) {
                    return a.date - b.date;
                });

                const ticks_array = this._get_coin_chart_data_ticks(sorted_graph_data, _coin_chart_data_time);
                const complete_data = this._get_graph_data_with_ticks(sorted_graph_data, ticks_array);

                const sorted_complete_graph_data = complete_data.sort(function(a, b) {
                    return a.date - b.date;
                });

                let regular_complete_sorted_data = [];
                sorted_complete_graph_data.forEach(function(item, index, array) {

                    if(item.value === "irregular" && !_is_coin_chart_data_loading) {

                        const previous_item = index > 0 ? array[index-1].value: array[index].value;
                        const next_item = index < array.length-1 ? array[index+1].value: array[index].value;
                        const middle_item = {
                            value: (previous_item + next_item) / 2,
                            date: item.date
                        };

                        regular_complete_sorted_data.push(middle_item);

                    }else {

                        regular_complete_sorted_data.push(item);
                    }
                });

                this.setState({_regular_complete_sorted_data: regular_complete_sorted_data, _ticks_array: ticks_array});

            });




        }else {

            this.setState({_is_coin_chart_data_loading: false});
        }
    };

    _set_coin_chart_data_time = (time) => {

        this.setState({
            _coin_chart_data_time: time
        }, this._get_coin_chart_data);
    };

    _set_coin_chart_data_type = (type) => {

        this.setState({
            _coin_chart_data_type: type
        }, this._get_coin_chart_data);
    };

    _get_coin_chart_data_ticks = (graph_data, coin_chart_data_time) => {

        if (!graph_data || !graph_data.length ) {return [];}

        const domain = [new Date(+graph_data[0].date), new Date(+graph_data[graph_data.length - 1].date)];
        const scale = scaleTime().domain(domain).range([0, 1]);
        let ticks = [];

        let date_array = [];

        switch (coin_chart_data_time) {
            case "1":

                ticks = scale.ticks(utcHour, 1);
                return ticks.map(entry => +entry);
            case "7":

                ticks = scale.ticks(utcDay, 1);
                return ticks.map(entry => +entry);
            case "30":

                ticks = scale.ticks(utcMonday, 1);
                return ticks.map(entry => +entry);
            case "180":

                ticks = scale.ticks(utcMonth, 1);
                return ticks.map(entry => +entry);
            case "360":

                ticks = scale.ticks(utcMonth, 1);
                return ticks.map(entry => +entry);
            case "max":

                ticks = scale.ticks(utcMonth, 1);
                return ticks.map(entry => +entry);
        }
    };


    _get_graph_data_with_ticks = (graph_data, ticks) => {

        if (!graph_data || !graph_data.length ) {return [];}

        const graph_data_map = new Map(graph_data.map((item) => [item.date, item]));

        ticks.forEach(function (item, index, array) {

            if(!graph_data_map.has(item)) {

                graph_data.push({date: item, value: "irregular"});
            }
        });
        return graph_data;
    };

    _price_formatter = (price, compact = false, display_currency = true) => {

        const { selected_locales_code, selected_currency } = this.state;

        return display_currency ?
            price_formatter(price, selected_currency, selected_locales_code, compact):
            price_formatter(price, null, selected_locales_code, compact);
    };

    _date_formatter = (date, coin_chart_data_time, selected_locales_code, precise = false) => {

        if(coin_chart_data_time === "1") {

            return precise ?
                new Intl.DateTimeFormat(selected_locales_code, {hour: "numeric", minute: "numeric"}).format(new Date(date)):
                new Intl.DateTimeFormat(selected_locales_code, {hour: "numeric"}).format(new Date(date));
        }else if(coin_chart_data_time === "7"){

            return precise ?
                new Intl.DateTimeFormat(selected_locales_code, {hour: "numeric", day: "numeric", month: "short"}).format(new Date(date)):
                new Intl.DateTimeFormat(selected_locales_code, {day: "numeric", month: "short"}).format(new Date(date));
        }else if(coin_chart_data_time === "30"){

            return precise ?
                new Intl.DateTimeFormat(selected_locales_code, {hour: "numeric", day: "numeric", month: "short"}).format(new Date(date)):
                new Intl.DateTimeFormat(selected_locales_code, {day: "numeric", month: "short"}).format(new Date(date));
        }else if(coin_chart_data_time === "180"){

            return precise ?
                new Intl.DateTimeFormat(selected_locales_code, {day: "numeric", month: "short"}).format(new Date(date)):
                new Intl.DateTimeFormat(selected_locales_code, {month: "short"}).format(new Date(date));
        }else if(coin_chart_data_time === "360"){

            return precise ?
                new Intl.DateTimeFormat(selected_locales_code, {day: "numeric", month: "short", year: "numeric"}).format(new Date(date)):
                new Intl.DateTimeFormat(selected_locales_code, {month: "short", year: "numeric"}).format(new Date(date));
        }else if(coin_chart_data_time === "max"){

            return precise ?
                new Intl.DateTimeFormat(selected_locales_code, {day: "numeric", month: "short", year: "numeric"}).format(new Date(date)):
                new Intl.DateTimeFormat(selected_locales_code, {month: "short", year: "numeric"}).format(new Date(date));
        }
    };

    render() {

        const { classes, selected_locales_code, _regular_complete_sorted_data, _ticks_array, _coin_chart_data_time, _coin_chart_data_type, _is_coin_chart_data_loading } = this.state;

        return (
            <div className={classes.fullHeight}>
                <div className={classes.overlay} style={_is_coin_chart_data_loading ? {}: {display: "none"}}>
                    <div className={classes.circularProgressContainer}>
                        <CircularProgress color="inherit" />
                    </div>
                </div>
                <Fade in>
                    <Card className={classes.fullHeight}>
                        <CardContent className={classes.flowRoot}>
                            <ButtonGroup size="small" aria-label="Price and market cap buttons" className={classes.floatLeft}>
                                <Button className={_coin_chart_data_type === "prices" ? classes.contrastButton: null} onClick={() => this._set_coin_chart_data_type("prices")}>price</Button>
                                <Button className={_coin_chart_data_type === "market_caps" ? classes.contrastButton: null} onClick={() => this._set_coin_chart_data_type("market_caps")}>cap.</Button>
                            </ButtonGroup>
                            <ButtonGroup size="small" aria-label="Chart time range button" className={classes.floatRight}>
                                <Button className={_coin_chart_data_time === "1" ? classes.contrastButton: null} onClick={() => this._set_coin_chart_data_time("1")}>1d</Button>
                                <Button className={_coin_chart_data_time === "7" ? classes.contrastButton: null} onClick={() => this._set_coin_chart_data_time("7")}>7d</Button>
                                <Button className={_coin_chart_data_time === "30" ? classes.contrastButton: null} onClick={() => this._set_coin_chart_data_time("30")}>30d</Button>
                                <Button className={_coin_chart_data_time === "180" ? classes.contrastButton: null} onClick={() => this._set_coin_chart_data_time("180")}>180d</Button>
                                <Button className={_coin_chart_data_time === "360" ? classes.contrastButton: null} onClick={() => this._set_coin_chart_data_time("360")}>1y</Button>
                                <Button className={_coin_chart_data_time === "max" ? classes.contrastButton: null} onClick={() => this._set_coin_chart_data_time("max")}>max</Button>
                            </ButtonGroup>
                        </CardContent>
                        <CardContent className={classes.chartCardContent}>
                            <Fade in timeout={300}>
                                <div className={classes.chart}>
                                    {
                                        Boolean(_regular_complete_sorted_data) ?
                                            <ResponsiveContainer>
                                                <AreaChart
                                                    data={_regular_complete_sorted_data}
                                                >
                                                    <defs>
                                                        <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#131162" stopOpacity="0"></stop>
                                                            <stop offset="95%" stopColor="#131162" stopOpacity="0"></stop>
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="date"
                                                           angle={60} height={75} dy={10} textAnchor="start"
                                                           tickFormatter={value => this._date_formatter(value, _coin_chart_data_time, selected_locales_code)}
                                                           ticks={_ticks_array}
                                                           tickCount={_ticks_array.length}/>
                                                    <YAxis dataKey="value"
                                                           type={"number"}
                                                           tickFormatter={value => this._price_formatter(value, true, false)}/>
                                                    <Tooltip formatter={value => this._price_formatter(value)}
                                                             labelFormatter={value => this._date_formatter(value, _coin_chart_data_time, selected_locales_code, true)}/>
                                                    <Area type="monotone" stroke="#131162" fill="url(#colorUv)" dataKey="value" strokeLinecap="round" dot={false} strokeWidth={2}/>
                                                </AreaChart>
                                            </ResponsiveContainer>:
                                            <Skeleton className={classes.chart} />
                                    }
                                </div>
                            </Fade>
                        </CardContent>
                    </Card>
                </Fade>
            </div>
        );
    }
}

export default withStyles(styles)(CoinChartsChart);
