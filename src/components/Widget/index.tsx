import React, { useRef, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { ChatTeardropDots } from 'phosphor-react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import { Options } from '../Options';
import { Form } from '../Form';
import { feedbackTypes } from '../../utils/feedbackTypes';

import { theme } from '../../theme'
import { styles } from './styles';
import { Success } from '../Success';


export type FeedbackType = keyof typeof feedbackTypes;

function Widget() {
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);
    const [feedbackSend, setFeedbackSend] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);

    function handleOpen() {
        bottomSheetRef.current?.expand();
    }

    function handleRestartFeedback() {
        setFeedbackType(null);
        setFeedbackSend(false);
    }

    function handleFeedbackSend() {
        setFeedbackSend(true);
    }

    return (
        <>
            <TouchableOpacity
                style={styles.button}
                onPress={handleOpen}
            >
                <ChatTeardropDots
                    size={24}
                    weight="bold"
                    color={theme.colors.text_on_brand_color}
                />
            </TouchableOpacity>

            <BottomSheet
                ref={bottomSheetRef}
                snapPoints={[.01, 300]}
                backgroundStyle={styles.modal}
                handleIndicatorStyle={styles.indicator}
            >
                {
                    feedbackSend ?
                        <Success onSendAnotherFeedback={handleRestartFeedback} />
                        :
                        <>
                            {
                                feedbackType ?
                                    <Form
                                        feedbackType={feedbackType}
                                        onFeedbackCanceled={handleRestartFeedback}
                                        onFeedbackSend={handleFeedbackSend}
                                    />
                                    :
                                    <Options onFeedbackTypeChanged={setFeedbackType} />
                            }
                        </>
                }
            </BottomSheet>
        </>
    );
}

export default gestureHandlerRootHOC(Widget);