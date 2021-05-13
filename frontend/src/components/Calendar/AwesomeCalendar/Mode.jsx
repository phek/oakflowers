import React from "react";
import classnames from "classnames";
import { dailyMode, monthlyMode } from "./constants";
import Button from "./Button";
import styles from "./index.module.scss";

const month = "month";
const day = "day";

export default class Mode extends React.PureComponent {
  returnModes() {
    const { active } = this.props;
    const modes = [
      {
        id: month,
        mode: monthlyMode,
        text: "Month",
      },
      {
        id: day,
        mode: dailyMode,
        text: "Day",
      },
    ];
    if (Array.isArray(modes) && modes.length) {
      return modes.map((mode) => {
        const classNames = [styles.modeButton];
        if (mode.mode === active) {
          classNames.push(styles.modeButtonActive);
        }
        return (
          <Button
            className={classnames(classNames)}
            key={mode.id}
            onClick={() => this.props.onClick(mode.mode)}
          >
            {mode.text}
          </Button>
        );
      });
    }
  }

  render() {
    return <div className={styles.modeWrapper}>{this.returnModes()}</div>;
  }
}
