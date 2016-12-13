/**
 * ProjectName: Demo
 * User: qinjia
 * Date: 2016/12/13
 * Time: 16:03
 * 创建原因：创建一个悬浮可拖拽按钮
 */
import React, { Component } from 'react';
import {
    Image,
    InteractionManager,
    View,
    Text,
    Alert,
    Animated,
    Dimensions,
    PanResponder
} from 'react-native';
import styles from './styles/base'

const _window = Dimensions.get('window');
class Base extends Component {
    // 构造函数
    constructor(props) {
        //继承父级属性
        super(props);
        // 初始状态
        this.state = {
            pan: new Animated.ValueXY()
        };
    }

    /**
     * 加载前
     */
    componentWillMount() {
        this._animatedValueX = 0;
        this._animatedValueY = 0;
        this.state.pan.x.addListener((value) => this._animatedValueX = value.value);
        this.state.pan.y.addListener((value) => this._animatedValueY = value.value);

        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {
                //大于屏幕宽度时，不能超出
                if(Math.abs(this._animatedValueX)> (_window.width - 60)){
                    this._animatedValueX > 0 ? this._animatedValueX = 0: this._animatedValueX = (this._animatedValueX + 60);
                    this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
                    this.state.pan.setValue({x: 0, y: 0});
                }else{
                    //大于屏幕高度时，不能超出
                    if(Math.abs(this._animatedValueY)> (_window.height - 110)){
                        this._animatedValueY > 0 ? this._animatedValueY = 0 : this._animatedValueY = (this._animatedValueY + 110);
                        this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
                        this.state.pan.setValue({x: 0, y: 0});
                    }else{
                        this.state.pan.setOffset({x: this._animatedValueX, y: this._animatedValueY});
                        this.state.pan.setValue({x: 0, y: 0});
                    }
                }
                //打印X轴的所有值
                console.log('screen width:'+_window.width);
                console.log('x:'+this.state.pan.x);
                console.log('offsetX:'+this._animatedValueX);
                //打印Y轴的所有值
                console.log('screen height:'+_window.height);
                console.log('y:'+this.state.pan.y);
                console.log('offsetY:'+this._animatedValueY);
            },
            onPanResponderMove: Animated.event([
                null, {dx: this.state.pan.x, dy: this.state.pan.y}
            ]),
            onPanResponderRelease: (e, gestureState) => {
                //停止拖动返回初始位置
                if (Math.abs(gestureState.dx)<2 && Math.abs(gestureState.dy)<2){
                    this.showAddMenuSet();
                }

            }
        });
    }

    componentWillUnMount() {
        //解除动画事件绑定
        this.state.pan.x.removeAllListeners();
        this.state.pan.y.removeAllListeners();
        this.setState({});
    }

    getStyle() {
        return [
            styles.circle,
            {//可定义转换，旋转，透明度变化
                transform: [
                    {
                        translateX: this.state.pan.x
                    },
                    {
                        translateY: this.state.pan.y
                    }
                ]
            }
        ];
    }

    /**
     * 按钮事件
     */
    showAddMenuSet=()=>{
        alert("点中我啦！");
    };

    /**
     * 渲染容器
     * @returns {XML}
     */
    render() {
        var router = this.props.router;
        return (
            <View style={styles.container}>
                <Animated.View
                    style={this.getStyle()}
                    {...this._panResponder.panHandlers}>
                    <Text style={styles.addIconFont} onPress={this.showAddMenuSet}>+</Text>
                </Animated.View>
            </View>
        );
    }
}

export default Base