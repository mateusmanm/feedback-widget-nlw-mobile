import { StyleSheet } from 'react-native';
import { theme } from '../../theme'
import { getBottomSpace } from 'react-native-iphone-x-helper'

export const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginBottom: 28,
        fontFamily: theme.fonts.medium,
        color: theme.colors.text_primary
    },
    options: {
        width: '100%',
        marginBottom: 36,
        flexDirection: 'row',
        justifyContent: 'center'
    }
});