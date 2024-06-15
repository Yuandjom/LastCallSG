import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { truncateText } from "@/utils/truncateText";
import { useEffect, useState } from "react";

interface MyModalProps {
  quantity: number;
  decreaseQuantity: () => void;
  increaseQuantity: () => void;
  onClose: () => void;
  shiftScreen: () => void;
  item: any;
  store: any;
}

const ItemQuantity: React.FC<MyModalProps> = ({
  quantity,
  decreaseQuantity,
  increaseQuantity,
  onClose,
  shiftScreen,
  item,
  store,
}) => {
  const formattedExpiryDate = item.expiryDate.toString().split("T")[0].slice(0,10);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalDiscount, setTotalDiscount] = useState(0);
  useEffect(() => {
    const price = quantity * item.originalPrice;
    const discount = quantity * item.originalPrice * item.discount;
    setTotalPrice(Number(price.toFixed(2)));
    setTotalDiscount(Number(discount.toFixed(2)));
  }, [quantity, item.finalPrice, item.discount]);

  return (
    <TouchableWithoutFeedback onPress={onClose}>
      <View style={styles.modalBackground}>
        <TouchableWithoutFeedback>
          <View style={styles.modalOverlay}>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <View style={styles.closeButton}>
                <Ionicons name="close" size={33} color="black" />
              </View>
            </TouchableOpacity>
            <View style={styles.detailAndQtyContainer}>
              <Text style={styles.itemName}>{truncateText(item.name, 20)}</Text>
              <Text style={styles.itemTime}>
                Best before {formattedExpiryDate}
              </Text>
              <View style={styles.seperator}></View>
              <Text style={styles.selectQuantity}>{"Select quantity"}</Text>
              <View style={styles.quantitySelector}>
                <TouchableOpacity
                  style={[
                    styles.minusButton,
                    quantity == 0
                      ? styles.minusButtonInactivatedColor
                      : styles.minusButtonActivatedColor,
                  ]}
                  onPress={decreaseQuantity}
                  disabled={quantity == 0}
                >
                  <Ionicons name="remove-outline" size={32} color="white" />
                </TouchableOpacity>
                <Text style={styles.quantity}>{quantity}</Text>
                <TouchableOpacity
                  onPress={increaseQuantity}
                  disabled={quantity === item.quantity}
                  style={[
                    styles.addButton,
                    quantity == item.quantity
                      ? styles.plusButtonInactivatedColor
                      : styles.plusButtonActivatedColor,
                  ]}
                >
                  <Ionicons name="add-outline" size={32} color="white" />
                </TouchableOpacity>
              </View>
              <View style={styles.seperator}></View>
              <View style={styles.priceContainer}>
                <Text>Price</Text>
                <Text>S${totalPrice}</Text>
              </View>
              <View style={styles.discountContainer}>
                <Text>Discount</Text>
                <Text>- S${((item.originalPrice - item.finalPrice) * quantity).toFixed(2) }</Text>
              </View>
              <View style={styles.seperator}></View>
              <View style={styles.confirmationContainer}>
                <View style={styles.totalPriceContainer}>
                  <Text>Total</Text>
                  <Text style={styles.finalPrice}>
                    S${(item.finalPrice * quantity).toFixed(2)}
                  </Text>
                </View>
                <TouchableOpacity
                  style={[
                    styles.confirmationButton,
                    quantity === 0 ? styles.confirmationButtonDisabled : {},
                  ]}
                  onPress={shiftScreen}
                  disabled={quantity === 0}
                >
                  <Text style={styles.confirmationText}>
                    {"Proceed to Confirm"}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  minusButtonActivatedColor: {
    backgroundColor: "#168F55",
  },
  minusButtonInactivatedColor: {
    backgroundColor: "grey",
  },
  plusButtonActivatedColor: {
    backgroundColor: "#168F55",
  },
  plusButtonInactivatedColor: {
    backgroundColor: "grey",
  },
  confirmationButtonDisabled: {
    backgroundColor: "gray",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  name: {
    fontWeight: "bold",
  },
  detailAndQtyContainer: {
    marginTop: "5%",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  itemName: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  itemTime: {},

  seperator: {
    height: 1, // Height of the line
    backgroundColor: "#EEEEEE", // Color of the line
    width: "80%", // Full width of the container
    marginVertical: 10, // Margin around the line
  },
  selectQuantity: {
    fontWeight: "bold",
    margin: 4,
  },

  quantity: {
    fontSize: 40,
    fontWeight: "bold",
    margin: 10,
  },

  quantitySelector: {
    justifyContent: "center",
    flexDirection: "row",
    height: "30%",
    alignItems: "center",
  },

  addButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#168F55",
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  minusButton: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: "#168F55",
    margin: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  modalOverlay: {
    backgroundColor: "white",
    height: "50%",
    marginTop: "auto",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: "center",
  },
  closeButton: {
    position: "absolute",
    top:10 ,
    right: 20,
    justifyContent: "center",
    alignItems: "stretch",
    // backgroundColor: "#F5F2F9",
    width: 40,
    height: 40,
    // borderRadius: 20,
    borderWidth:5 ,
    borderColor: 'red'
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  discountContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    margin: 5,
  },
  priceContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "90%",
    margin: 5,
  },
  confirmationContainer: {
    flexDirection: "row",
    width: "90%",
    height: "14%",
    justifyContent: "space-between",
  },
  confirmationButton: {
    backgroundColor: "#168F55",
    width: "60%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 32,
    padding: 14,
  },
  confirmationText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  totalPriceContainer: {
    justifyContent: "center",
  },
  finalPrice: {
    fontWeight: "bold",
    marginTop: 5,
    fontSize: 20,
  },
});

export default ItemQuantity;
