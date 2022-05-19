import {
    useCallback,
    useEffect,
    useState
} from 'react';
import {
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Platform,
    View,
    StyleSheet
} from 'react-native';
import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import Widget from './src/components/Widget';

import { theme } from './src/theme';

import {
    Inter_400Regular,
    Inter_500Medium
} from '@expo-google-fonts/inter';

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync()

                await Font.loadAsync({
                    Inter_400Regular,
                    Inter_500Medium,
                })
            } catch (e) {
                console.warn(e)
            } finally {
                setAppIsReady(true)
            }
        }

        prepare();
    }, [])

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync()
        }
    }, [appIsReady])

    if (!appIsReady) {
        return null;
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={styles.inner}>

                    <View style={{ flex: 1, backgroundColor: theme.colors.background }} onLayout={onLayoutRootView}>
                        <StatusBar
                            style="light"
                            backgroundColor="transparent"
                            translucent
                        />
                        <Widget />
                    </View>

                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    inner: {
        flex: 1,
    }
});