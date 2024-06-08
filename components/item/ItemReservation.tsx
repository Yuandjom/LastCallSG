import React from 'react'
import { Text, Modal, TouchableOpacity, View, StyleSheet , TextInput, KeyboardAvoidingView, Platform} from 'react-native';
import { Ionicons } from "@expo/vector-icons";


interface MyModalProps {
    setEmail: React.Dispatch<React.SetStateAction<string>>
    setName: React.Dispatch<React.SetStateAction<string>>
    setContact: React.Dispatch<React.SetStateAction<string>>
    onClose: () => void;
}

const item ={

    confirmationText: "Proceed to Chope"
  }

const ItemReservation: React.FC<MyModalProps> = ({setEmail , setName, setContact, onClose}) => {

    return (
        <View style={styles.modalBackground}>
          <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === "ios" ? "padding" : undefined} >

              <View style={styles.modalOverlay}>
                <TouchableOpacity onPress={onClose} style={styles.closeButton}>
                  <Ionicons name="close-outline" size={32} color="black" />
                </TouchableOpacity>
                <Text style={styles.header}>Contact Details</Text>
                <View style={styles.inputContainer}>
                    <Text>Name</Text>
                    <TextInput
                        style={styles.nameInput}
                        placeholder="Jon"
                        onChangeText={setName}
                        placeholderTextColor="#B2BAC5"
                    />

                    
                    <Text>Contact</Text>
                    <TextInput
                        style={styles.contactInput}
                        placeholder="91234567"
                        onChangeText={setContact}
                        placeholderTextColor="#B2BAC5"
                    />
                    <Text>Email</Text>
                    <TextInput
                        style={styles.emailnput}
                        placeholder="ilhhasap@gmail.com"
                        onChangeText={setEmail}
                        placeholderTextColor="#B2BAC5"
                    />        

                    <TouchableOpacity style={styles.confirmationButton} >
                        <Text style={styles.confirmationText}>{item.confirmationText}</Text>
                    </TouchableOpacity>

                </View>
              </View>
          </KeyboardAvoidingView>

        </View>

    )

}


const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        justifyContent: 'flex-end',
    },
    
    header: {
        fontSize: 20,
        fontWeight: "bold"
    },

    nameInput: {
        height: 40,
        borderColor: '#CBD5E1',
        borderBottomWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        color: 'black'
      },
    emailnput: {
        height: 40,
        borderColor: '#CBD5E1',
        borderWidth: 1,
        marginBottom: 12,
        marginTop: 12,
        paddingHorizontal: 8,
        borderRadius: 5
    },

    contactInput: {
        height: 40,
        borderColor: '#CBD5E1',
        borderBottomWidth: 1,
        marginBottom: 12,
        paddingHorizontal: 8,
        width: '50%'

    },


    seperator:{
      height: 1, // Height of the line
      backgroundColor: '#EEEEEE', // Color of the line
      width: '80%', // Full width of the container
      marginVertical: 10, // Margin around the line
    },
    inputContainer:{
        marginTop: '10%',
        width: '100%'
    },

    modalOverlay: {
      backgroundColor:  'white',
      minHeight: '45%',
      top: '8%',
      marginTop: 'auto',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: 'center',
      padding: '5%',   
    },
    closeButton: {
      position: 'absolute',
      bottom: '95%',
      right: '4%',
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: '#F5F2F9',
      width: 36,
      height: 36,
      borderRadius: 18,
    },
    closeButtonText: {
      color: 'white',
      fontWeight: 'bold',
    },
    confirmationText: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white'
      },

    confirmationButton: {
        backgroundColor: 'green',
        width: "100%",
        height: "20%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20
      },

    container: {
      flex: 1,
      justifyContent: 'center',
      height: '40%',
      
    }

  });



export default ItemReservation;
 