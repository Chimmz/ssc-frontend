import { useState, useEffect, useRef } from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { v4 as uuidv4 } from 'uuid';

interface Props {
  title: string;
  children: React.ReactElement | React.ReactNode;
  onMouseLeave?(): void;
}

const AppTooltip: React.FC<Props> = function (props) {

  return (
    <OverlayTrigger
      placement="top"
      overlay={
        <Tooltip
          id={uuidv4()}
          className="tooltip bg-pry-dark"
          style={{ backgroundColor: 'green' }}
        >
          {props.title}
        </Tooltip>
      }
    >
      <button
        className="border-transparent bg-transparent"
        style={{ color: 'inherit' }}
        onMouseLeave={props.onMouseLeave}
      >
        {props.children}
      </button>
    </OverlayTrigger>
  );
};

export default AppTooltip;
