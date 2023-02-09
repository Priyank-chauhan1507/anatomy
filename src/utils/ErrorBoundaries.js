import React, { Component } from "react";

export default class ErrorBoundaries extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      Error: "",
      Info: "",
    };
  }
  static getDerivedStateFromError(error) {
    return {
      hasError: true,
    };
  }
  componentDidCatch(error, info) {
    return this.setState({
      Error: error.toString(),
      Info: info.componentStack.toString(),
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <center>
          <div
            style={{
              width: "50vw",
              height: "100vh",
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
            }}>
            <div style={{ textAlign: "justify" }}>
              <center>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  height='24px'
                  viewBox='0 0 24 24'
                  width='24px'
                  fill='#000000'>
                  <path d='M11 15h2v2h-2v-2zm0-8h2v6h-2V7zm.99-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z' />
                </svg>
              </center>

              <p
                style={{
                  textAlign: "center",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}>
                Unexpected Error occurred. Kindly Contact the Administrator
              </p>
              <br />
              <p style={{ fontWeight: "bold" }}>{this.state.Error}</p>
              {this.state.Info.split(")").map((item) => {
                return item === "" ? null : <p>{`${item})`}</p>;
              })}
            </div>
          </div>
        </center>
      );
    }
    return this.props.children;
  }
}
