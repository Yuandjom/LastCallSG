import { Text, Modal, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import ItemQuantity from './ItemQuantity';
import ItemReservation from './ItemReservation';

interface MyModalProps {
  visible: boolean;
  onClose: () => void;
}

const item ={
  name: "Bag of Breads",
  time: "Today: 09:00 - 12.00",
  selectQuantity: "Select Quantity",
  price: "S$15.98",
  discount: "- $0",
  confirmationText: "Proceed to Confirm"
}


const ItemModal: React.FC<MyModalProps> = ({ visible, onClose })=> {

const [quantity,setQuantity] = useState(0)
const [currentComponent, setComponent] = useState('A')
const [userEmail, setEmail] = useState('')
const [name, setName] = useState('')
const [contact, setContact] = useState('')


 
const increaseQuantity = () => {
  setQuantity(quantity + 1)
}

const decreaseQuantity = () => {
  var new_quantity = quantity - 1
  if(new_quantity >= 0) {
    setQuantity(new_quantity)
  }
}

const shiftScreen = () => {
  setComponent('B')
}




const renderComponent = () => {
  switch (currentComponent) {
    case 'A':
      return <ItemQuantity quantity={quantity} onClose={onClose} decreaseQuantity={decreaseQuantity} increaseQuantity={increaseQuantity} shiftScreen={shiftScreen}></ItemQuantity>;
    case 'B':
      return <ItemReservation setEmail={setEmail} setContact={setContact} setName={setName} onClose={onClose}></ItemReservation>
  }
}


  return (
      <Modal transparent={true} animationType="slide" visible={visible}>
          {renderComponent()}
      </Modal>
  )

}

const minusButtonInactivatedColor = {
  backgroundColor: 'grey'
};

const minusButtonActivatedColor = {
  backgroundColor: 'green'
}



export default ItemModal;
