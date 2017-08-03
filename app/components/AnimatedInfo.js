import React, {Component} from 'react';
import {
    Animated,
    Easing,
    StyleSheet,
} from 'react-native';

import infoBar from '../styles/infoBar';

export default class AnimatedInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fadeAnim: new Animated.Value(0),          // 透明度初始值设为0
            showInfo:true,
        };
    }

    componentDidMount() {
        var fadeIn = Animated.timing(                            // 随时间变化而执行的动画类型
            this.state.fadeAnim,                      // 动画中的变量值
            {
                toValue: 1,                             // 透明度最终变为1，即完全不透明
                duration: 1000, // 动画时间
                easing: Easing.linear // 缓动函数
            }
        );
        fadeIn.start();
        // 开始执行动画

        var fadeOut = Animated.timing(                            // 随时间变化而执行的动画类型
            this.state.fadeAnim,                      // 动画中的变量值
            {
                toValue: 0,                             // 透明度最终变为1，即完全不透明
                duration: 1500, // 动画时间
                easing: Easing.linear // 缓动函数
            }
        );
        var self = this;
        setTimeout(function () {
            fadeOut.start();
           self.props.showInfo(false);
        }, 3000);

    }

    render() {
        return (
            <Animated.View                            // 可动画化的视图组件
                style={[infoBar.infoBar,
                    {
                        opacity: this.state.fadeAnim,          // 将透明度指定为动画变量值
                    }]
                }
            >
                {this.props.children}
            </Animated.View>
        );
    }
}