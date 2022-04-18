import React from 'react'
import { Form, Button, Input, message } from 'antd'
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './Login.css'
import Particles from "react-tsparticles"
import axios from 'axios'
export default function Login(props) {

    const onFinish = (values) => {
        console.log(values)

        axios.get(`/users?username=${values.username}&password=${values.password}&roleState=true&_expand=role`).then(res=>{
            console.log(res.data)
            if(res.data.length===0){
                message.error("用户名或密码不匹配")
            }else{
                localStorage.setItem("token",JSON.stringify(res.data[0]))
                props.history.push("/")
            }
        })
    }
    return (
        <div style={{ background: 'rgb(35, 39, 65)', height: "100%",overflow:'hidden' }}>
            <Particles height={document.documentElement.clientHeight}params={
                {
                  "background": {
                    "color": {
                      "value": "#2775b6"
                    },
                    "position": "50% 50%",
                    "repeat": "no-repeat",
                    "size": "cover"
                  },
                  "fullScreen": {
                    "zIndex": 1
                  },
                  "interactivity": {
                    "events": {
                      "onClick": {
                        "enable": true,
                        "mode": "push"
                      },
                      "onHover": {
                        "enable": true,
                        "mode": "repulse",
                        "parallax": {
                          "force": 60
                        }
                      }
                    },
                    "modes": {
                      "bubble": {
                        "distance": 400,
                        "duration": 2,
                        "opacity": 0.8,
                        "size": 40,
                        "divs": {
                          "distance": 200,
                          "duration": 0.4,
                          "mix": false,
                          "selectors": []
                        }
                      },
                      "grab": {
                        "distance": 400
                      },
                      "repulse": {
                        "divs": {
                          "distance": 200,
                          "duration": 0.4,
                          "factor": 100,
                          "speed": 1,
                          "maxSpeed": 50,
                          "easing": "ease-out-quad",
                          "selectors": []
                        }
                      }
                    }
                  },
                  "particles": {
                    "color": {
                      "value": "#ffffff"
                    },
                    "links": {
                      "color": {
                        "value": "#ffffff"
                      },
                      "distance": 150,
                      "enable": true,
                      "opacity": 0.4
                    },
                    "move": {
                      "attract": {
                        "rotate": {
                          "x": 600,
                          "y": 1200
                        }
                      },
                      "enable": true,
                      "path": {},
                      "outModes": {
                        "bottom": "out",
                        "left": "out",
                        "right": "out",
                        "top": "out"
                      },
                      "spin": {}
                    },
                    "number": {
                      "density": {
                        "enable": true
                      },
                      "value": 80
                    },
                    "opacity": {
                      "value": {
                        "min": 0.1,
                        "max": 0.5
                      },
                      "animation": {
                        "enable": true,
                        "speed": 1,
                        "minimumValue": 0.1
                      }
                    },
                    "shape": {
                      "options": {
                        "character": {
                          "value": [
                            "t",
                            "s",
                            "P",
                            "a",
                            "r",
                            "t",
                            "i",
                            "c",
                            "l",
                            "e",
                            "s"
                          ],
                          "font": "Verdana",
                          "style": "",
                          "weight": "400",
                          "fill": true
                        },
                        "char": {
                          "value": [
                            "t",
                            "s",
                            "P",
                            "a",
                            "r",
                            "t",
                            "i",
                            "c",
                            "l",
                            "e",
                            "s"
                          ],
                          "font": "Verdana",
                          "style": "",
                          "weight": "400",
                          "fill": true
                        }
                      },
                      "type": "char"
                    },
                    "size": {
                      "value": 16,
                      "animation": {
                        "speed": 10,
                        "minimumValue": 10
                      }
                    },
                    "stroke": {
                      "width": 1,
                      "color": {
                        "value": "#ffffff",
                        "animation": {
                          "h": {
                            "count": 0,
                            "enable": false,
                            "offset": 0,
                            "speed": 1,
                            "sync": true
                          },
                          "s": {
                            "count": 0,
                            "enable": false,
                            "offset": 0,
                            "speed": 1,
                            "sync": true
                          },
                          "l": {
                            "count": 0,
                            "enable": false,
                            "offset": 0,
                            "speed": 1,
                            "sync": true
                          }
                        }
                      }
                    }
                  }
                }
            }/>
            <div className="formContainer">
                <div className="logintitle">全球新闻发布管理系统</div>
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: '请输入用户名!' }]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: '请输入密码!' }]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                     </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}
