/**
 * ProjectName: Demo
 * User: qinjia
 * Date: 2016/12/13
 * Time: 16:06
 * 创建原因：
 */
import {
    StyleSheet,
    Dimensions
} from 'react-native';
let CIRCLE_RADIUS = 28;
const _window = Dimensions.get('window');
const styles = StyleSheet.create({
    container:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        width:_window.width
    },
    addIconFont:{
        color:'#FFFFFF',
        fontSize:49,
        textAlign:'center',
        lineHeight:49
    },
    circle: {
        width: CIRCLE_RADIUS*2,
        height: CIRCLE_RADIUS*2,
        borderRadius: CIRCLE_RADIUS,
        backgroundColor: '#29A1F7',
        position:'absolute',
        bottom:10,
        right:10
    }

});
export default styles;
