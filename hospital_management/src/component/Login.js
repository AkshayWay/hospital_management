import React, { component, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import axios from "axios";
import "antd/dist/antd.css";
import { Form, Input, Button, Checkbox } from "antd";
import { Alert } from "antd";
import "../App.css";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      loggedIn: false,
      userName: "",
      userType: 0,
      errorMsg: "",
      errMSgDisplay: "none",
    };
  }
  // onEmailChange = (e) => this.setState({ email: e.target.value });
  // onPasswordChange = (e) => this.setState({ password: e.target.value });
  onSubmit = (e) => {
    // e.preventDefault();
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    var newEmail = e.email;
    var newPassword = e.password;
    axios
      .get(
        "http://localhost:5000/medicare/login/" + newEmail + "/" + newPassword
      )
      .then((response) => {
        console.log("response:", response.data[0]);
        if (response.data.length > 0) {
          sessionStorage.setItem(
            "full_name",
            response.data[0].tbl_user_fullName
          );
          sessionStorage.setItem("loggedIn", true);
          sessionStorage.setItem("user_id", response.data[0].tbl_user_id);
          sessionStorage.setItem("userType", response.data[0].tbl_user_type);
          this.props.history.push("/home");
          window.location.reload(true);
        } else {
          this.setState({
            errMSgDisplay: "inline",
            errorMsg: "User email or password is incorrect.",
          });

          console.log("Error MSg:", this.state.errorMsg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  onFinish = (values) => {
    console.log("Success:", values);
  };

  render() {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 10,
      },
    };
    const tailLayout = {
      wrapperCol: {
        offset: 8,
        span: 16,
      },
    };
    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not validate email!",
      },
    };

    return (
      <div className="center">
        <div style={{ textAlign: "center" }}>
          <h2>Login</h2>
        </div>
        <Alert
          message={this.state.errorMsg}
          style={{ display: this.state.errMSgDisplay }}
          type="warning"
        />
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={this.onSubmit}
          validateMessages={validateMessages}
        >
          <Form.Item
            label="Email"
            name="email"
            value={this.state.email}
            onChange={this.state.onEmailChange}
            rules={[
              {
                required: true,
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            value={this.state.password}
            onChange={this.state.onPasswordChange}
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}
