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
    };
  }
  onFullNameChange = (e) => this.setState({ userFullName: e.target.value });
  onEmailChange = (e) => this.setState({ userEmail: e.target.value });
  onPasswordChange = (e) => this.setState({ userPassword: e.target.value });
  onPhoneNumberChange = (e) =>
    this.setState({ userPhoneNumber: e.target.value });
  onAddressChange = (e) => this.setState({ userAddress: e.target.value });
  onCityChange = (e) => this.setState({ userCity: e.target.value });
  onStateChange = (e) => this.setState({ userState: e.target.value });
  onPincodeChange = (e) => this.setState({ userPincode: e.target.value });

  onSubmit = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    //e.preventDefault();
    // const obj = {
    //   tbl_user_id: this.state.userId,
    //   tbl_user_fullName: this.state.userFullName,
    //   tbl_user_email: this.state.userEmail,
    //   tbl_user_password: this.state.userPassword,
    //   tbl_user_phoneNumber: this.state.userPhoneNumber,
    //   tbl_user_address: this.state.userAddress,
    //   tbl_user_city: this.state.userCity,
    //   tbl_user_state: this.state.userState,
    //   tbl_user_pincode: this.state.userPincode,
    //   tbl_user_type: this.state.userType,
    // };
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
    console.log("Data:", obj);
    axios
      .post(
        "http://localhost:5000/medicare/patient_info/" +
          this.props.match.params.id,
        obj
      )
      .then((res) => {
        console.log("Patient information was successfully Inserted/Updated");
        if (parseInt(sessionStorage.getItem("user_id")) == this.state.userId) {
          this.props.history.push("/");
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
            console.log("response:", response.data[0]);
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

            console.log("User id : " + this.state.userId);
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
            console.log("Userfull name", this.state.userFullName);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
      // else {
      //   this.setState({
      //     datesDisplay: "none",
      //   });
      // }
    } else {
      this.setState({ errorMsg: true });
    }
  }
  onFinish = (values) => {
    console.log(values);
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
      },
      number: {
        range: "${label} must be between ${min} and ${max}",
      },
    };
    var fullName = this.state.userFullName;
    if (errorMessage) {
      return <div>Error: 404</div>;
    } else {
      return (
        <div style={{ padding: "50px 0" }}>
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
            {/* <Form.Item
              name={["user", "age"]}
              label="Age"
              rules={[{ type: "number", min: 0, max: 99 }]}
            >
              <InputNumber />
            </Form.Item> */}
            <Form.Item
              name="userPassword"
              rules={[{ required: true }]}
              label="Password"
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              name="userPhoneNumber"
              label="Phone Number"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item name="userAddress" label="Address">
              <Input.TextArea />
            </Form.Item>

            <Form.Item label="City" style={{ marginBottom: 0 }}>
              <Form.Item
                name="userCity"
                rules={[{ required: true }]}
                style={{ display: "inline-block", width: "calc(40% - 8px)" }}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="userState"
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
                rules={[{ required: true }]}
                style={{
                  display: "inline-block",
                  width: "calc(15% - 8px)",
                  margin: "0 8px",
                }}
              >
                <Input />
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
