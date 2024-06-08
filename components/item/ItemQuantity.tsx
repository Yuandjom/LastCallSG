
import { Text, Modal, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";

const item = {
  name: "Bag of Breads",
  time: "Today: 09:00 - 12.00",
  selectQuantity: "Select Quantity",
  price: "S$15.98",
  discount: "- $0",
  confirmationText: "Proceed to Confirm"
}
interface MyModalProps {
  quantity: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
  onClose: () => void;
  shiftScreen: () => void;
}


const ItemQuantity: React.FC<MyModalProps> = ({ quantity, decreaseQuantity, increaseQuantity, onClose, shiftScreen }) => {

  return (
    <View style={styles.modalBackground}>
      <View style={styles.modalOverlay}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Ionicons name="close-outline" size={32} color="black" />
        </TouchableOpacity>
        <View style={styles.detailAndQtyContainer}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemTime}>{item.time}</Text>
          <View style={styles.seperator}></View>
          <Text style={styles.selectQuantity}>{item.selectQuantity}</Text>
          <View style={styles.quantitySelector}>
            <TouchableOpacity style={[styles.minusButton, quantity == 0 ? minusButtonInactivatedColor : minusButtonActivatedColor]} onPress={decreaseQuantity} disabled={quantity == 0}>
              <Ionicons name="remove-outline" size={32} color="white" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableOpacity style={styles.addButton} onPress={increaseQuantity}>
              <Ionicons name="add-outline" size={32} color="white" />
            </TouchableOpacity>
          </View>
          <View style={styles.seperator}></View>
          <View style={styles.priceContainer}>
            <Text>price</Text>
            <Text>{item.price}</Text>
          </View>
          <View style={styles.discountContainer}>
            <Text>discount</Text>
            <Text>{item.discount}</Text>
          </View>
          <View style={styles.seperator}></View>
          <View style={styles.confirmationContainer}>
            <View style={styles.totalPriceContainer}>
              <Text>Total</Text>
              {/* <Text style={styles.finalPrice}>{item.price}</Text> */}
            </View>
            <TouchableOpacity style={styles.confirmationButton} onPress={shiftScreen} >
              <Text style={styles.confirmationText}>{item.confirmationText}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )











}

const minusButtonInactivatedColor = {
  backgroundColor: 'grey'
};

const minusButtonActivatedColor = {
  backgroundColor: 'green'
}



const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  name: {
    fontWeight: "bold"
  },
  detailAndQtyContainer: {
    marginTop: '5%',
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  itemName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10
  },
  itemTime: {
  },

  seperator: {
    height: 1, // Height of the line
    backgroundColor: '#EEEEEE', // Color of the line
    width: '80%', // Full width of the container
    marginVertical: 10, // Margin around the line
  },
  selectQuantity: {
    fontWeight: "bold",
    margin: 4
  },

  quantity: {
    fontSize: 40,
    fontWeight: 'bold',
    margin: 10
  },

  quantitySelector: {
    justifyContent: "center",
    flexDirection: "row",
    height: "30%",
    alignItems: "center"
  },

  addButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "green",
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  minusButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'green',
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  modalOverlay: {
    backgroundColor: 'white',
    height: '50%',
    marginTop: 'auto',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',

  },
  closeButton: {
    position: 'absolute',
    bottom: '88%',
    right: '4%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: '#F5F2F9',
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  discountContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: '90%',
    margin: 5
  },
  priceContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: '90%',
    margin: 5

  },
  confirmationContainer: {
    flexDirection: 'row',
    width: "90%",
    height: "12%",
    justifyContent: "space-between"
  },
  confirmationButton: {
    backgroundColor: 'green',
    width: "40%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20
  },
  confirmationText: {
    fontSize: 15,
    fontWeight: 'bold',
    color: 'white'
  },
  totalPriceContainer: {
    justifyContent: 'space-between'
  },
  finalPrice: {
    fontWeight: 'bold',
    fontSize: 20
  }
});


export default ItemQuantity;
