import React, { Component } from "react";

export class SuitCase extends Component {
  render() {
    const { suitcase } = this.props;
    return (
      <div
        className={
          suitcase.selected
            ? "suitcase value-hidden"
            : suitcase.chosen
            ? "suitcase value-chosen"
            : "suitcase value-reveal"
        }
        onClick={() => this.props.selectedSuitcase(suitcase)}
      >
        {suitcase.selected ? (
          <h4>${suitcase.value}</h4>
        ) : (
          <h4>{suitcase.label}</h4>
        )}
      </div>
    );
  }
}
export default SuitCase;
