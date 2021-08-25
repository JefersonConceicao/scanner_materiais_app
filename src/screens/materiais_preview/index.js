import React from 'react';
import { connect } from 'react-redux';
import { View, Text } from 'react-native';

const MateriaisPrev = () => {
    return (
        <View>
            <Text> Preview Screen </Text>
        </View>
    )
}

const mapStateToProps = ({ Scanner }) => {

}

export default connect(mapStateToProps, {

})(MateriaisPrev)