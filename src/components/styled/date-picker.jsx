import styled, { css } from 'styled-components'
import { getThemeData } from '../../services/utils'

export const FPDatePicker = styled.div`
  float: left;
  position: relative;
  border-radius: 4px;
  width: 99%;
  border: 1px solid !important;
  border-color: ${({ theme }) =>
    getThemeData(theme, 'colors.input.border')} !important;

  .MyDatePicker * {
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Chrome/Safari/Opera */
    -khtml-user-select: none; /* Konqueror */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently */
  }

  .mdp-input {
    float: left;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 8px;

    input {
      background: transparent;
      color: ${({ theme }) =>
        getThemeData(theme, 'colors.primaryText')} !important;
      max-width: unset;
      /* border: 1px solid blue; */
      border-radius: 8px;
    }
  }
  .mdp-input input:focus {
    outline: none;
  }
  .mdp-input input {
    width: 150%;
    /* background: #f5f5f5; */
    /* border: none; */
    /* padding-right: 10px; */
    /* height: 38px; */
    padding: 8px 14px;
    /* text-align: center; */
    /* text-transform: uppercase; */
    -webkit-letter-spacing: 2px;
    -moz-letter-spacing: 2px;
    -ms-letter-spacing: 2px;
    /* letter-spacing: 2px; */
    /* font-size: 11px; */
    cursor: pointer;
    font-family: inherit;
    font-size: 1rem;
    border: none;
  }

  .mdp-container {
    float: left;
    position: absolute;
    left: 0;
    top: 40px;
    width: 300px;
    min-height: 350px;
    background-image: linear-gradient(
      ${(props) => getThemeData(props.theme, 'colors.card.start')},
      ${(props) => getThemeData(props.theme, 'colors.card.end')}
    ) !important;
    box-shadow: 10px 10px 40px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: hidden;
    padding: 25px 30px;
    z-index: 9;
  }
  .mdpc-head {
    float: left;
    width: 100%;
    height: 53px;
  }
  .mdpc-body {
    float: left;
    width: 100%;
    margin-top: 20px;
  }

  /**
* Controls
*/

  .mdpch-button {
    float: left;
    width: 45px;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    border-color: ${({ theme }) =>
      getThemeData(theme, 'colors.primaryButton')} !important;
  }
  .mdpchb-inner:hover > span {
    border-color: ${({ theme }) =>
      getThemeData(theme, 'colors.primaryButton')} !important;
    /* border-color: #555 !important; */
  }
  .mdpchb-inner:hover {
    cursor: pointer;
    /* background: #eee; */
  }
  .mdpchb-inner {
    float: left;
    height: 35px;
    width: 35px;
    /* background: #f4f4f4; */
    border-color: ${({ theme }) =>
      getThemeData(theme, 'colors.primaryButton')} !important;
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.primaryButton')} !important;
    border-radius: 100%;
    line-height: 35px;
    text-align: center;
    position: absolute;
    top: 50%;
    left: 50%;
    margin-left: -17px;
    margin-top: -17px;
  }

  .mdpchbi-right-arrows:after,
  .mdpchbi-left-arrows:after,
  .mdpchbi-right-arrow,
  .mdpchbi-right-arrows,
  .mdpchbi-left-arrow,
  .mdpchbi-left-arrows {
    display: block;
    float: left;
    width: 6px;
    height: 6px;
    border-left: 2px solid;
    border-bottom: 2px solid;
    position: absolute;
  }
  .mdpchbi-right-arrow,
  .mdpchbi-right-arrows,
  .mdpchbi-left-arrow,
  .mdpchbi-left-arrows {
    transform: rotate(45deg);
    left: 50%;
    top: 50%;
    margin-left: -2px;
    margin-top: -4px;
  }
  .mdpchbi-right-arrows,
  .mdpchbi-right-arrow {
    transform: rotate(225deg);
    margin-left: -4px;
  }
  .mdpchbi-right-arrows:after,
  .mdpchbi-left-arrows:after {
    content: '';
  }

  .mdpchbi-left-arrows {
    margin-left: -5px;
  }
  .mdpchbi-right-arrows {
    margin-left: -2px;
  }
  .mdpchbi-right-arrows:after,
  .mdpchbi-left-arrows:after {
    left: 3px;
    top: -5px;
  }

  .mdpch-container {
    float: left;
    width: 120px;
    height: 100%;
  }
  .mdpchc-year {
    float: left;
    width: 100%;
    height: 30px;
    font-size: 27px;
    color: #666;
    font-weight: 200px;
    text-align: center;
  }
  .mdpchc-month {
    float: left;
    width: 100%;
    height: 15px;
    font-size: 13px;
    color: #666;
    font-weight: 200px;
    text-align: center;
  }

  /**
*  Calendar
*/
  .cc-month,
  .cc-head,
  .cch-name,
  .cc-body,
  .cdc-day span,
  .cdc-day,
  .c-day-container,
  .c-container {
    position: relative;
    display: block;
    float: left;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .c-container {
    width: 100%;
    height: 100%;
  }

  .cc-month {
    height: 30px;
    width: 100%;
    font-family: Roboto;
    font-size: 16px;
    line-height: 30px;
    color: #666;
  }
  .cc-head {
    height: 30px;
    width: 100%;
    margin-top: 10px;
  }
  .cch-name {
    width: 14.285%;
    height: 30px;
    line-height: 30px;
    font-weight: 700;
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.border')} !important;
    font-size: 9px;
    text-align: center;
  }
  .cc-body {
    height: 270px;
    width: 100%;
  }
  .c-day-container {
    width: 14.285%;
    height: 16.6666%;
  }
  .cdc-day {
    width: 100%;
    height: 100%;
    font-size: 12px;
    font-weight: 300;
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.color')} !important;
    text-align: center;
  }
  .cdc-day span {
    width: 100%;
    height: 100%;
    font-size: 12px;
    font-weight: 300;
    color: ${({ theme }) =>
      getThemeData(theme, 'colors.input.color')} !important;
  }

  .cdc-day span:hover {
    cursor: pointer;
    background: #eee;
  }
  .cdc-day span {
    width: 30px;
    height: 30px;
    margin-top: -15px;
    margin-left: -15px;
    left: 50%;
    top: 50%;
    font-weight: 400;
    border-radius: 100%;
    line-height: 30px;
  }
  .c-day-container.disabled {
    pointer-events: none;
  }

  .c-day-container.disabled .cdc-day span {
    color: #ddd;
  }
  .c-day-container.disabled .cdc-day span {
    /* background: #fff !important; */
    color: #454545;
    cursor: not-allowed;
    /* background-image: linear-gradient(
      ${(props) => getThemeData(props.theme, 'colors.card.start')},
      ${(props) => getThemeData(props.theme, 'colors.card.end')}}
    ) !important; */
  }
  .c-day-container.highlight .cdc-day span {
    background: #efdbca;
    background-image: linear-gradient(
      ${(props) => getThemeData(props.theme, 'colors.card.start')},
      ${(props) => getThemeData(props.theme, 'colors.card.end')}}
    ) !important;
  }
  .c-day-container.highlight-green .cdc-day span {
    background: #d4e2cb;
  }
`
