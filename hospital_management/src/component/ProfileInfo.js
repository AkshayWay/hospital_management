import React, { component, Component } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  hashHistory,
} from "react-router-dom";
import covid_banner from "../assets/images/covid_banner.jpg";
import axios from "axios";
import { Form, Input, InputNumber, Button } from "antd";
import { Alert } from "antd";

export default class ProfileInfo extends Component {
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      userId: 0,
      userFullName: "",
      userEmail: "",
      userPassword: "Healthcare",
      userPhoneNumber: "",
      userAddress: "",
      userCity: "",
      userState: "",
      userPincode: "",
      userType: 1,
      actionToPerform: "Add",
      errorMsg: false,
      warning_message: "",
      errMSgDisplay: "none",
    };
  }
  //onFullNameChange = (e) => this.setState({ userFullName: e.target.value });
  // onEmailChange = (e) => this.setState({ userEmail: e.target.value });
  //onPasswordChange = (e) => this.setState({ userPassword: e.target.value });
  //onAddressChange = (e) => this.setState({ userAddress: e.target.value });
  //onCityChange = (e) => this.setState({ userCity: e.target.value });
  //onStateChange = (e) => this.setState({ userState: e.target.value });
  //onPincodeChange = (e) => this.setState({ userPincode: e.target.value });

  onSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    //e.preventDefault();

    const obj = {
      tbl_user_id: this.state.userId,
      tbl_user_fullName: e.userFullName,
      tbl_user_email: e.userEmail,
      tbl_user_password: e.userPassword,
      tbl_user_phoneNumber: e.userPhoneNumber,
      tbl_user_address: e.userAddress,
      tbl_user_city: e.userCity,
      tbl_user_state: e.userState,
      tbl_user_pincode: e.userPincode,
      tbl_user_type: this.state.userType,
    };
    axios
      .post(
        "http://localhost:5000/medicare/patient_info/" +
          this.props.match.params.id,
        obj
      )
      .then((res) => {
        console.log("Patient information was successfully Inserted/Updated");
        if (parseInt(sessionStorage.getItem("user_id")) == this.state.userId) {
          this.props.history.push("/home");
        } else {
          this.props.history.push("/patientList");
        }
      })
      .catch(function (error) {
        console.log("Error : " + error);
      });
  };

  componentDidMount() {
    if (
      (sessionStorage.getItem("user_id") == this.props.match.params.id &&
        sessionStorage.getItem("userType") == 1) ||
      sessionStorage.getItem("userType") == 2
    ) {
      if (this.props.match.params.id != 0) {
        axios
          .get(
            "http://localhost:5000/medicare/patient_list/" +
              this.props.match.params.id
          )
          .then((response) => {
            this.setState({
              userId: response.data[0].tbl_user_id,
              userFullName: response.data[0].tbl_user_fullName,
              userEmail: response.data[0].tbl_user_email,
              userPassword: response.data[0].tbl_user_password,
              userPhoneNumber: response.data[0].tbl_user_phoneNumber,
              userAddress: response.data[0].tbl_user_address,
              userCity: response.data[0].tbl_user_city,
              userState: response.data[0].tbl_user_state,
              userPincode: response.data[0].tbl_user_pincode,
              userType: response.data[0].tbl_user_type,
              actionToPerform: "Edit",
            });
            this.formRef.current.setFieldsValue({
              userId: this.state.userId,
              userFullName: this.state.userFullName,
              userEmail: this.state.userEmail,
              userPassword: this.state.userPassword,
              userPhoneNumber: this.state.userPhoneNumber,
              userAddress: this.state.userAddress,
              userCity: this.state.userCity,
              userState: this.state.userState,
              userPincode: this.state.userPincode,
            });
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    } else {
      //Error message: 404 Not found
      this.setState({ errorMsg: true });
    }
  }
  validateMobileNumber = (rule, value, callback) => {
    console.log("this is a mobil validator", value);
    if (value.length != 10) {
      this.setState({
        errMSgDisplay: "inline",
        warning_message: "Invalid mobile number",
      });
    } else {
      this.setState({
        errMSgDisplay: "none",
      });
    }
  };
  handlePassword = (rule, inputPassword, callback) => {
    var passw = /^(?=.*[a-z])(?=.*[A-Z]).{8,20}$/;
    console.log(passw.exec(inputPassword));
    if (passw.exec(inputPassword) == null) {
      callback("incorrect password");
      //return true;
    }
  };

  render() {
    const errorMessage = this.state.errorMsg;
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };

    const validateMessages = {
      required: "${label} is required!",
      types: {
        email: "${label} is not validate email!",
        number: "${label} is not a validate number!",
        regexp: "${label} is not a validate password!",
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };
    if (errorMessage) {
      return <div>Error: 404 Page not found</div>;
    } else {
      return (
        <div style={{ padding: "50px 0" }}>
          <Alert
            message={this.state.warning_message}
            style={{ display: this.state.errMSgDisplay }}
            type="warning"
          />
          <Form
            {...layout}
            name="nest-messages"
            onFinish={this.onSubmit}
            validateMessages={validateMessages}
            ref={this.formRef}
          >
            <Form.Item
              name="userFullName"
              label="Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name="userEmail"
              label="Email"
              rules={[{ type: "email", required: true }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              name="userPassword"
              // onChange={this.handlePassword(this.value)}
              rules={[
                {
                  required: true,
                  type: "regexp",
                  pattern: /^(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
                  // message: "Wrong format Akshgay",
                },
                {
                  validator: this.handlePassword,
                },
              ]}
              label="Password"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="userPhoneNumber"
              label="Phone Number"
              onChange={this.state.onPhoneNumberChange}
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="userAddress" label="Address 1">
              <Input.TextArea />
            </Form.Item>
            <Form.Item label="Address 2" style={{ marginBottom: 0 }}>
              <Form.Item
                name="userCity"
                label="City"
                rules={[{ required: true }]}
                style={{ display: "inline-block", width: "calc(40% - 8px)" }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="userState"
                label="State"
                rules={[{ required: true }]}
                style={{
                  display: "inline-block",
                  width: "calc(40% - 8px)",
                  margin: "0 8px",
                }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="userPincode"
                label="Pin code"
                rules={[{ required: true }]}
                style={{
                  display: "inline-block",
                  width: "calc(15% - 8px)",
                  margin: "0 8px",
                }}
              >
                <InputNumber />
              </Form.Item>
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                {this.state.actionToPerform}
              </Button>
            </Form.Item>
          </Form>
        </div>
      );
    }
  }
}
