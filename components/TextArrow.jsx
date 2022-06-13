export default function TextArrow({text, fontSize, fontFamily, fontColor, arrowColor}) {
  return (
    <div className={"textArrow"}>
       <span className={"arrow"}></span>
       <span className={"text"}>{text}</span>
       <style jsx>{`
        .textArrow{
          position: relative;
          display: inline-block;
        }

        .text{
          font-size:${fontSize};
          font-family:${fontFamily};
          color:${fontColor};
          margin: 0
        }
        .arrow{
          display: inline-block;
          width: 0px;
          height: 1px;
          background: ${arrowColor};
          top: 50%;
          position: absolute;
          left: -10px;
          opacity: 0;
          transition: width .5s;
        }

        .arrow::before{
          position: absolute;
          content: '';
          border-top: 1px solid ${arrowColor};
          border-right: 1px solid ${arrowColor};
          transform: rotate(45deg);
          right: 1px;
          width: 8px;
          height: 8px;
          top: -4px;
        }

        .textArrow:hover .arrow{
          width: calc(100% + 20px);
          opacity: 1;
        }
      `}</style>
    </div>
  )
}
