import React from 'react';
import {Modal, Pressable, Text, View} from 'react-native';
import style from './styles';

class SubmitModal extends React.Component<{
  firstName: string;
  lastName: string;
  email: string;
  dob: Date | null;
  phone: string;
  password: string;
  modal: boolean;
  setModal: () => void;
}> {
  render(): React.ReactNode {
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.props.modal}
        onRequestClose={this.props.setModal}>
        <Pressable
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
          onPress={this.props.setModal}>
          <Pressable onPress={() => {}}>
            <View style={style.centeredView}>
              <View style={style.modalView}>
                <View style={{flex: 1, flexDirection: 'row-reverse'}}>
                  <Pressable onPress={this.props.setModal}>
                    <Text>X</Text>
                  </Pressable>
                </View>
                {/* <Image
                  source={
                    this.props.image
                      ? {uri: this.props.image}
                      : require('../assets/images/profile.png')
                  }
                  // style={style.image}
                /> */}
                <Text>First Name: {this.props.firstName}</Text>
                <Text>Last Name: {this.props.lastName}</Text>
                <Text>Email: {this.props.email}</Text>
                <Text>DOB: {this.props.dob?.toLocaleDateString()}</Text>
                <Text>Phone Number: {this.props.phone}</Text>
                <Text>Password: {this.props.password}</Text>
              </View>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    );
  }
}
export default SubmitModal;
