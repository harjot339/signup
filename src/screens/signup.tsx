import React from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Modal,
  Image,
  Keyboard,
} from 'react-native';
import style, {phoneInputStyle} from './styles';
import DatePicker from 'react-native-date-picker';
import {
  CameraOptions,
  ImageLibraryOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import SubmitModal from '../components/submit_modal';
import PhoneInput, {isValidNumber} from 'react-native-phone-number-input';
import {Country} from 'react-native-country-picker-modal';
function testInput(re: RegExp, str: string): boolean {
  return re.test(str);
}
const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w]{1,}$/;
const nameRegex = /^[a-zA-Z]*$/;
const passRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

class Signup extends React.Component<
  {},
  {
    firstName: string;
    lastName: string;
    email: string;
    dob: Date | null;
    isDateOpen: boolean;
    selectedCountry: Country;
    phone: string;
    password: string;
    confirmPassword: string;
    passVisible: boolean;
    confirmPassVisible: boolean;
    form: boolean;
    modal: boolean;
    image: string | undefined;
    cameraSheet: boolean;
  }
> {
  constructor(props: {}) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      email: '',
      dob: null,
      isDateOpen: false,
      selectedCountry: {
        callingCode: ['91'],
        cca2: 'IN',
        currency: ['INR'],
        flag: 'flag-in',
        name: 'India',
        region: 'Asia',
        subregion: 'Southern Asia',
      },
      phone: '',
      password: '',
      confirmPassword: '',
      passVisible: true,
      confirmPassVisible: true,
      form: false,
      modal: false,
      image: undefined,
      cameraSheet: false,
    };
    this.setModal = this.setModal.bind(this);
    this.submit = this.submit.bind(this);
    this.openCamera = this.openCamera.bind(this);
    this.openImagePicker = this.openImagePicker.bind(this);
  }
  setModal() {
    this.setState(state => {
      return {modal: !state.modal};
    });
  }
  openImagePicker = async () => {
    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };
    let response = await launchImageLibrary(options);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else {
      let imageUri = response.assets![0].uri;
      console.log(imageUri);
      this.setState({image: imageUri, cameraSheet: false});
    }
  };
  openCamera = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
    };
    let response = await launchCamera(options);
    console.log(response);
    if (response.didCancel) {
      console.log('User cancelled image picker');
    } else {
      let imageUri = response.assets![0].uri;
      console.log(imageUri);
      this.setState({image: imageUri, cameraSheet: false});
    }
  };
  submit() {
    this.setState({form: true});
    if (
      this.state.firstName !== '' &&
      testInput(nameRegex, this.state.firstName) &&
      this.state.lastName !== '' &&
      testInput(nameRegex, this.state.lastName) &&
      this.state.email !== '' &&
      testInput(emailRegex, this.state.email) &&
      this.state.phone !== '' &&
      isValidNumber(this.state.phone, this.state.selectedCountry.cca2) &&
      this.state.dob !== null &&
      this.state.password === this.state.confirmPassword
    ) {
      this.setState({modal: true});
    }
  }
  render(): React.ReactNode {
    return (
      <View style={style.main}>
        <SubmitModal
          firstName={this.state.firstName}
          lastName={this.state.lastName}
          dob={this.state.dob}
          email={this.state.email}
          password={this.state.password}
          phone={this.state.phone}
          modal={this.state.modal}
          setModal={this.setModal}
        />
        <Modal
          transparent={true}
          visible={this.state.cameraSheet}
          onRequestClose={() => {
            this.setState({cameraSheet: false});
          }}
          animationType="slide">
          <Pressable
            style={{flex: 1}}
            onPress={() => {
              this.setState({cameraSheet: false});
            }}>
            <Pressable style={style.bottomSheet} onPress={() => {}}>
              <Pressable
                style={style.sheetButton}
                onPress={this.openImagePicker}>
                <Text>Gallery</Text>
              </Pressable>
              <Pressable style={style.sheetButton} onPress={this.openCamera}>
                <Text>Camera</Text>
              </Pressable>
            </Pressable>
          </Pressable>
        </Modal>
        <Pressable
          style={style.imageButton}
          onPress={() => {
            this.setState({cameraSheet: true});
          }}>
          <Image
            source={
              this.state.image
                ? {uri: this.state.image}
                : require('../assets/images/profile.png')
            }
            style={style.image}
          />
        </Pressable>
        <Text style={[style.text, style.titleText]}>Create Your Account</Text>
        <Text style={style.text}>FIRST NAME</Text>
        <TextInput
          style={style.input}
          placeholder="First Name"
          value={this.state.firstName}
          onChangeText={e => {
            this.setState({firstName: e});
          }}
          placeholderTextColor="#5d5e67"
          autoCorrect={false}
          maxLength={30}
        />
        {!!this.state.firstName &&
          !testInput(nameRegex, this.state.firstName) && (
            <Text style={style.error}>First Name is not Valid</Text>
          )}
        {this.state.firstName === '' && this.state.form && (
          <Text style={style.error}>First Name cannot be Empty</Text>
        )}
        <Text style={style.text}>LAST NAME</Text>
        <TextInput
          style={style.input}
          placeholder="Last Name"
          value={this.state.lastName}
          onChangeText={e => {
            this.setState({lastName: e});
          }}
          placeholderTextColor="#5d5e67"
          maxLength={30}
          autoCorrect={false}
        />
        {!!this.state.lastName &&
          !testInput(nameRegex, this.state.lastName) && (
            <Text style={style.error}>First Name is not Valid</Text>
          )}
        {this.state.lastName === '' && this.state.form && (
          <Text style={style.error}>Last Name cannot be Empty</Text>
        )}
        <Text style={style.text}>EMAIL</Text>
        <TextInput
          style={style.input}
          placeholder="Email"
          keyboardType="email-address"
          value={this.state.email}
          onChangeText={e => {
            this.setState({email: e});
          }}
          placeholderTextColor="#5d5e67"
          autoCapitalize="none"
          autoCorrect={false}
        />
        {!!this.state.email && !testInput(emailRegex, this.state.email) && (
          <Text style={style.error}>Email is not Valid</Text>
        )}
        {this.state.email === '' && this.state.form && (
          <Text style={style.error}>Email cannot be Empty</Text>
        )}
        <Text style={style.text}>DOB</Text>
        <Pressable
          style={style.dob}
          onPress={() => {
            return this.setState({isDateOpen: true});
          }}>
          {this.state.dob === null ? (
            <Text style={style.dobPlaceholder}>Date of Birth</Text>
          ) : (
            <Text style={style.dobText}>
              {this.state.dob.toLocaleDateString()}
            </Text>
          )}
        </Pressable>
        <DatePicker
          modal
          mode="date"
          date={this.state.dob ?? new Date()}
          open={this.state.isDateOpen}
          maximumDate={new Date()}
          minimumDate={new Date('1950-1-1')}
          onConfirm={d => {
            this.setState({dob: d, isDateOpen: false});
          }}
          onCancel={() => {
            this.setState({isDateOpen: false});
          }}
          focusable={true}
        />
        {this.state.dob === null && this.state.form && (
          <Text style={style.error}>DOB cannot be Empty</Text>
        )}
        <Text style={style.text}>PHONE NUMBER</Text>
        <PhoneInput
          value={this.state.phone}
          onChangeText={str => {
            this.setState({phone: str});
          }}
          onChangeCountry={str => {
            this.setState({selectedCountry: str});
          }}
          containerStyle={phoneInputStyle.container}
          textContainerStyle={phoneInputStyle.textContainerStyle}
          codeTextStyle={phoneInputStyle.codeTextStyle}
          textInputStyle={phoneInputStyle.textInputStyle}
          textInputProps={{
            placeholderTextColor: '#5d5e67',
            selectionColor: undefined,
          }}
          defaultCode="IN"
          placeholder="0000 XXX XXX"
          layout="first"
          withDarkTheme
          withShadow
          renderDropdownImage={
            <Image source={require('../assets/images/dropdown_icon.png')} />
          }
        />
        {!!this.state.phone &&
          !isValidNumber(this.state.phone, this.state.selectedCountry.cca2) && (
            <Text style={style.error}>Phone number not valid</Text>
          )}
        {this.state.phone === '' && this.state.form && (
          <Text style={style.error}>Phone number cannot be Empty</Text>
        )}
        <Text style={style.text}>PASSWORD</Text>
        <View style={style.passInputContainer}>
          <TextInput
            style={style.passInput}
            placeholder="Password"
            secureTextEntry={this.state.passVisible}
            value={this.state.password}
            onChangeText={e => {
              this.setState({password: e});
            }}
            placeholderTextColor="#5d5e67"
            textContentType="oneTimeCode"
          />
          <Pressable
            onPress={() => {
              this.setState(state => {
                return {passVisible: !state.passVisible};
              });
            }}>
            <Text style={{color: 'white', textDecorationLine: 'underline'}}>
              {this.state.passVisible ? 'Show' : 'Hide'}
            </Text>
          </Pressable>
        </View>
        {!!this.state.password &&
          !testInput(passRegex, this.state.password) && (
            <Text style={style.error}>
              Password must contain atleast 1 Uppercase, 1 Lowercase, 1 Numeric
              and 1 Symbol Character
            </Text>
          )}
        {this.state.password === '' && this.state.form && (
          <Text style={style.error}>Password cannot be Empty</Text>
        )}
        <Text style={style.text}>CONFIRM PASSWORD</Text>
        <View style={style.passInputContainer}>
          <TextInput
            style={style.passInput}
            placeholder="Confirm Password"
            secureTextEntry={this.state.confirmPassVisible}
            value={this.state.confirmPassword}
            onChangeText={e => {
              this.setState({confirmPassword: e});
            }}
            placeholderTextColor="#5d5e67"
          />
          <Pressable
            onPress={() => {
              this.setState(state => {
                return {confirmPassVisible: !state.confirmPassVisible};
              });
            }}>
            <Text style={{color: 'white', textDecorationLine: 'underline'}}>
              {this.state.confirmPassVisible ? 'Show' : 'Hide'}
            </Text>
          </Pressable>
        </View>
        {!!this.state.confirmPassword &&
          !!this.state.password &&
          this.state.confirmPassword !== this.state.password && (
            <Text style={style.error}>Password do not match</Text>
          )}
        {this.state.confirmPassword === '' && this.state.form && (
          <Text style={style.error}>Confirm Password cannot be Empty</Text>
        )}
        <TouchableOpacity style={style.button} onPress={this.submit}>
          <Text style={style.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export default Signup;
