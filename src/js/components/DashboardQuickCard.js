import React from "react";
import { withStyles } from "@material-ui/core/styles";

import ButtonBase from "@material-ui/core/ButtonBase";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Fade from "@material-ui/core/Fade";
import Skeleton from "@material-ui/lab/Skeleton";

const styles = theme => ({
    relevant: {
        backgroundColor: theme.palette.secondary.light,
        color: theme.palette.primary.contrastText,
        height: "100%",
        position: "relative",
    },
    basic: {
        height: "100%",
        position: "relative",
    },
    cardContainer: {
        width: "100%",
        cursor: "pointer",
        position: "relative",
    },
    cardContent: {
        position: "relative"
    },
    iconContainer: {
        width: 100,
        height: 100,
        opacity: 0.1,
        position: "absolute",
        top: 8,
        right: 8,
        "& svg": {
            width: "100%",
            height: "100%"
        }
    },
    title: {
        fontSize: 21,
        margin: theme.spacing(1, 0),
    },
    buttonBaseReset: {
        border: 0,
        cursor: "pointer",
        margin: "inherit",
        display: "inherit",
        outline: "inherit",
        padding: "inherit",
        position: "inherit",
        alignItems: "inherit",
        borderRadius: 0,
        verticalAlign: "inherit",
        justifyContent: "inherit",
        height: "100%",
    }
});


class DashboardQuickCard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            classes: props.classes,
            text_content: props.text_content,
            label_content: props.label_content,
            icon_component: props.icon_component || null,
            relevant: props.relevant || false,
        };
    };

    componentWillReceiveProps(new_props) {

        this.setState(new_props);
    }

    render() {

        const { classes, icon_component, relevant } = this.state;
        const { text_content, label_content } = this.state;

        return (
            <div className={classes.cardContainer}>
                <Fade in>
                    <ButtonBase component="div" className={classes.buttonBaseReset}>
                        <Card className={relevant ? classes.relevant: classes.basic}>
                            <CardContent className={classes.cardContent}>
                                <h3 className={classes.title}>
                                    {
                                        text_content !== null ?
                                            text_content:
                                            <Skeleton />
                                    }
                                </h3>
                                <span>{label_content}</span>
                                <div className={classes.iconContainer}>
                                    {icon_component}
                                </div>
                            </CardContent>
                        </Card>
                    </ButtonBase>
                </Fade>
            </div>
        );
    }
}

export default withStyles(styles)(DashboardQuickCard);
