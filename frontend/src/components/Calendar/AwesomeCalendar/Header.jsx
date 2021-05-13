import React from "react";
import { getMonthName } from "./util/calendar";
import Button from "./Button";
import ChevronIcon from "./ChevronIcon";
import styles from "./index.module.scss";
import { dailyMode, monthlyMode } from "./constants";

export default class Header extends React.PureComponent {
  returnTitle() {
    const { mode, current } = this.props;
    const { year, month, day } = current;
    const monthName = getMonthName(month);
    switch (mode) {
      case monthlyMode:
        return (
          <React.Fragment>
            <span className={styles.thickText}>{monthName}</span>
            &nbsp;
            <span className={styles.thinText}>{year}</span>
          </React.Fragment>
        );
      case dailyMode:
        return (
          <React.Fragment>
            <span className={styles.thickText}>{day}</span>
            &nbsp;
            <span className={styles.thickText}>{monthName}</span>
            &nbsp;
            <span className={styles.thinText}>{year}</span>
            &nbsp;
          </React.Fragment>
        );
      default:
        return null;
    }
  }

  returnButtonText(type) {
    const { mode } = this.props;
    const monthName = getMonthName(type.month);

    if (mode === monthlyMode) {
      return monthName;
    } else if (mode === dailyMode) {
      return `${type.day} ${monthName}`;
    }
  }

  render() {
    const { prev, next } = this.props;
    return (
      <div className={styles.calendarHeader}>
        <div className={styles.calendarHeaderButtons}>
          <Button onClick={this.props.onClickPrev} className={styles.navButton}>
            <ChevronIcon className={styles.arrowLeft} />
            {this.returnButtonText(prev)}
          </Button>
          <h1>{this.returnTitle()}</h1>
          <Button onClick={this.props.onClickNext} className={styles.navButton}>
            {this.returnButtonText(next)}
            <ChevronIcon className={styles.arrowRight} />
          </Button>
        </div>
      </div>
    );
  }
}
